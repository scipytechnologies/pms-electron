import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './layouts/Main'
import NotFound from './pages/NotFound'
import mainservice from './Services/mainservice'

import publicRoutes from './routes/PublicRoutes'
import protectedRoutes from './routes/ProtectedRoutes'
import { useSelector, useDispatch } from 'react-redux'
import { isConnected, loggeduser, setUserProfile, setRole } from './store/loginedUser'
import { pumpInfo } from './store/pump'
import Redirect from './routeProtection/ForceRedirect'
import ProtectedRoute from './routeProtection/ProtectedRoute'
import Splash from './assets/splash.mp4'
// import css
import './assets/css/remixicon.css'

// import scss
import './scss/style.scss'
import VideoSplashScreen from './VideoSplashScreen'

// set skin on load
window.addEventListener('load', function () {
  let skinMode = localStorage.getItem('skin-mode')
  let HTMLTag = document.querySelector('html')

  if (skinMode) {
    HTMLTag.setAttribute('data-skin', skinMode)
  }
})

export default function App() {
  localStorage.setItem('sidebar-skin', 'dark')
  const dispatch = useDispatch()
  const active = useSelector((state) => state.loginedUser.isConnected)
  async function Auth() {
    if (typeof window !== 'undefined') {
      const token = JSON.parse(localStorage.getItem('user-token'))
      if (token) {
        const data = { token: token }
        const res = await mainservice.Auth(data)
        if (res.data != null) {
          console.log(res.data)
          dispatch(loggeduser(res.data._id))
          dispatch(isConnected())
          dispatch(setRole(res.data.role))
          fetchData(res.data._id)
        } else {
          console.log('error')
        }
      } else {
        // setIsconnected(false);
        // dispatch(isNotConnected())
      }
    }
  }

  const fetchPump = async (id) => {
    const pumpdetails = await mainservice.getPumpById(id)
    if (pumpdetails.data != null) {
      dispatch(pumpInfo(pumpdetails.data.result2))
    }
  }

  const fetchData = async (id) => {
    const userData = await mainservice.GetUserById(id)
    if (userData.data != null) {
      const newUser = {
        firstName: userData.data.firstName,
        lastName: userData.data.LastName,
        PumpId: userData.data.PumpId,
        email: userData.data.email
      }
      dispatch(setUserProfile(newUser))
      fetchPump(userData.data.PumpId)
    } else {
      console.log('user data not found')
    }
  }

  useEffect(() => {
    Auth()
    // console.log(id);
  }, [])

  const [showSplashScreen, setShowSplashScreen] = useState(true)

  const handleVideoEnd = () => {
    setShowSplashScreen(false)
  }

  return (
    <React.Fragment>
      {showSplashScreen && (
        <VideoSplashScreen videoSrc={Splash} onVideoEnd={handleVideoEnd} />
      )}
      {!showSplashScreen && (
        <Routes>
          <Route path="/" element={<Main />}>
            {protectedRoutes.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={<ProtectedRoute user={active}>{route.element} </ProtectedRoute>}
                  key={index}
                />
              )
            })}
          </Route>
          {publicRoutes.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={<Redirect user={active}> {route.element} </Redirect>}
                key={index}
              />
            )
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </React.Fragment>
  )
}
