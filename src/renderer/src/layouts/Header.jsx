import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import userAvatar from '../assets/img/img1.jpg'
import notification from '../data/Notification'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import mainservice from '../Services/mainservice'
import { pumpInfo } from '../store/pump'
import { event } from 'jquery'




export default function Header({ onSkin }) {
  const fuel = useSelector((state) => state.pumpstore.Fuel)
  const user = useSelector((state) => state.loginedUser)
  const dispatch = useDispatch()
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
      className="dropdown-link"
    >
      {children}
    </Link>
  ))

  const fetchPump = async (id) => {
    const pumpdetails = await mainservice.getPumpById(id)
      if (pumpdetails.data != null) {
         dispatch(pumpInfo(pumpdetails.data.result2))
      }
    }

  const [form, setForm] = useState({})
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
    console.log(form)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const res = await mainservice.createFuel(user.PumpId,{ Fuel: form })
    if (res.data != null) {
      fetchPump(user.PumpId)
    } else {
      console.log(res)
    }
  }

  const onRemoveHandler = async (id) => {
    console.log( id);
    const res = await mainservice.deleteFuel(user.PumpId,id)
    if (res.data != null) {
      fetchPump(user.PumpId)
    } else {
      console.log(res)
    }
  }
  const toggleSidebar = (e) => {
    e.preventDefault()
    let isOffset = document.body.classList.contains('sidebar-offset')
    if (isOffset) {
      document.body.classList.toggle('sidebar-show')
    } else {
      if (window.matchMedia('(max-width: 991px)').matches) {
        document.body.classList.toggle('sidebar-show')
      } else {
        document.body.classList.toggle('sidebar-hide')
      }
    }
  }

  function NotificationList() {
    const notiList = notification.map((item, key) => {
      return (
        <li className="list-group-item" key={key}>
          <div className={item.status === 'online' ? 'avatar online' : 'avatar'}>{item.avatar}</div>
          <div className="list-group-body">
            <p>{item.text}</p>
            <span>{item.date}</span>
          </div>
        </li>
      )
    })

    return <ul className="list-group">{notiList}</ul>
  }
  const [editModes, setEditModes] = useState(() => Array(fuel.length).fill(false));

  function FuelList() {
    const handleEditClick = (index) => {
      setEditModes((prevEditModes) => {
        const updatedEditModes = [...prevEditModes];
        updatedEditModes[index] = !updatedEditModes[index]; // Toggle edit mode
        return updatedEditModes;
      });
    };
  
    const handleSaveClick = async (index,item) => {
      // Implement save logic here
      setEditModes((prevEditModes) => {
        const updatedEditModes = [...prevEditModes];
        updatedEditModes[index] = !updatedEditModes[index]; // Toggle edit mode
    
        const UpdatehData = async () => {
          try {
            const res = await mainservice.editFuel(user.PumpId,item._id,form);
            if (res.data != null) {
              fetchPump(user.PumpId);
            } else {
              console.log(res);
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
        };
    
        UpdatehData(); // Call the asynchronous function here
    
        return updatedEditModes;
      });
    };
    
    
  
    const notiList = fuel.map((item, index) => (
      <li className="list-group-item" key={index}>
        <div><i className="ri-price-tag-3-line"></i></div>
        <div className="list-group-body">
          <p style={{ width: '160px' }}>
            Fuel :
            <b style={{ paddingLeft: '8px' }}>{item.FuelName} </b>
          </p>
          <span>Price per litre</span>
        </div>
        <div style={{ height: '50px' }}>
          { !editModes[index] ? 
          <Form.Control
            disabled={true}
            value={item.FuelPricePerLitre}
            name="FuelName"
            type="text"
          />:
            <Form.Control
            disabled={false} 
            name="FuelName"
            type="text"
            onChange={(event)=>{setForm({FuelName:item.FuelName,FuelPricePerLitre : event.target.value}) 
            console.log(form);}}
          />}
        </div>
        <div>
          {editModes[index] ? (
            <Button
              className="ms-1"
              variant="success"
              onClick={() => handleSaveClick(index, item)}
            >
              Save
            </Button>
          ) : (
            <Button
              className="ms-1"
              variant="white"
              onClick={() => handleEditClick(index)}
            >
              Edit
            </Button>
          )}
        </div>
        <div>
          <Button
            className="ms-1"
            variant="danger"
            onClick={() => onRemoveHandler(item._id)}
          >
            <i className="ri-delete-bin-5-fill"></i>
          </Button>
        </div>
      </li>
    ));
  
    return <ul className="list-group">{notiList}</ul>;
  }

  const skinMode = (e) => {
    e.preventDefault()
    e.target.classList.add('active')

    let node = e.target.parentNode.firstChild
    while (node) {
      if (node !== e.target && node.nodeType === Node.ELEMENT_NODE) node.classList.remove('active')
      node = node.nextElementSibling || node.nextSibling
    }

    let skin = e.target.textContent.toLowerCase()
    let HTMLTag = document.querySelector('html')

    if (skin === 'dark') {
      HTMLTag.setAttribute('data-skin', skin)
      localStorage.setItem('skin-mode', skin)

      onSkin(skin)
    } else {
      HTMLTag.removeAttribute('data-skin')
      localStorage.removeItem('skin-mode')

      onSkin('')
    }
  }

  const sidebarSkin = (e) => {
    e.preventDefault()
    e.target.classList.add('active')

    let node = e.target.parentNode.firstChild
    while (node) {
      if (node !== e.target && node.nodeType === Node.ELEMENT_NODE) node.classList.remove('active')
      node = node.nextElementSibling || node.nextSibling
    }

    let skin = e.target.textContent.toLowerCase()
    let HTMLTag = document.querySelector('html')

    HTMLTag.removeAttribute('data-sidebar')

    if (skin !== 'default') {
      HTMLTag.setAttribute('data-sidebar', skin)
      localStorage.setItem('sidebar-skin', skin)
    } else {
      localStorage.removeItem('sidebar-skin', skin)
    }
  }

  return (
    <div className="header-main px-3 px-lg-4">
      <Link onClick={toggleSidebar} className="menu-link me-3 me-lg-4">
        <i className="ri-menu-2-fill"></i>
      </Link>

      {/* <div className="form-search me-auto">
        <input type="text" className="form-control" placeholder="Search" />
        <i className="ri-search-line"></i>
      </div> */}
      <div className="d-flex justify-content-center align-items-center w-25 me-auto p-2 ">
        <div style={{ width: '120px', fontWeight: 'bolder' }}>Fuel Price</div>
        <div className="w-100 form-search">
          <marquee direction="left">
            <div className="d-flex">
              {fuel.map((item) => {
                return (
                  <div style={{ paddingRight: '25px' }}>
                    {' '}
                    {item.FuelName} : {item.FuelPricePerLitre}/-
                  </div>
                )
              })}
            </div>
          </marquee>
        </div>
        <Dropdown className="dropdown-notification " align="end">
          <Dropdown.Toggle
            className="d-flex justify-content-center"
            style={{
              backgroundColor:'white',
              alignItems: 'center',
              width: '50px',
              fontWeight: 'bolder',
              color:'black',
              border:0
            }}
          >
            {/* <i class="ri-edit-box-line"></i> */}
          </Dropdown.Toggle>
          <Dropdown.Menu  style={{width:'400px'}}  className="mt-10-f me--10-f">
            <div className="dropdown-menu-header">
              <h6 className="dropdown-menu-title"> Manage Fuel</h6>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>New Fuel</h6>
                  <Form.Control name="FuelName" type="text"  onChange={onChangeHandler} />
                </Col> 
                <Col md>
                  <h6>Price</h6>
                  <Form.Control name="FuelPricePerLitre" type="text"  onChange={onChangeHandler} />
                </Col>
                <Col>
                  <Button style={{ color:'white', width:'100%',marginTop:'19px'}} onClick={onSubmitHandler}>Add</Button>
                </Col>
              </Row>
            </div>
            {FuelList()}
            {/* <div className="dropdown-menu-footer">
            <Link to="#">Show all Notifications</Link>
          </div> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* <Dropdown className="dropdown-skin" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <i className="ri-settings-3-line"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f">
          <label>Skin Mode</label>
          <nav className="nav nav-skin">
            <Link
              onClick={skinMode}
              className={localStorage.getItem('skin-mode') ? 'nav-link' : 'nav-link active'}
            >
              Light
            </Link>
            <Link
              onClick={skinMode}
              className={localStorage.getItem('skin-mode') ? 'nav-link active' : 'nav-link'}
            >
              Dark
            </Link>
          </nav>
          <hr />
          <label>Sidebar Skin</label>
          <nav id="sidebarSkin" className="nav nav-skin">
            <Link
              onClick={sidebarSkin}
              className={!localStorage.getItem('sidebar-skin') ? 'nav-link active' : 'nav-link'}
            >
              Default
            </Link>
            <Link
              onClick={sidebarSkin}
              className={
                localStorage.getItem('sidebar-skin') === 'prime' ? 'nav-link active' : 'nav-link'
              }
            >
              Prime
            </Link>
            <Link
              onClick={sidebarSkin}
              className={
                localStorage.getItem('sidebar-skin') === 'dark' ? 'nav-link active' : 'nav-link'
              }
            >
              Dark
            </Link>
          </nav>
        </Dropdown.Menu>
      </Dropdown> */}

      {/* <Dropdown className="dropdown-notification ms-3 ms-xl-4" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <small>3</small>
          <i className="ri-notification-3-line"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f me--10-f">
          <div className="dropdown-menu-header">
            <h6 className="dropdown-menu-title">Notifications</h6>
          </div>
          {NotificationList()}
          <div className="dropdown-menu-footer">
            <Link to="#">Show all Notifications</Link>
          </div>
        </Dropdown.Menu>
      </Dropdown> */}

      <Dropdown className="dropdown-profile ms-3 ms-xl-4" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <div className="avatar online">
            <img src={userAvatar} alt="" />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f">
          <div className="dropdown-menu-body">
            <div className="avatar avatar-xl online mb-3">
              <img src={userAvatar} alt="" />
            </div>
            <h5 className="mb-1 text-dark fw-semibold">{user.firstName} {user.lastName}</h5>
            <p className="fs-sm text-secondary">Premium Member</p>

            <nav className="nav">
              <Link to="">
                <i className="ri-edit-2-line"></i> Edit Profile
              </Link>
              <Link to="">
                <i className="ri-profile-line"></i> View Profile
              </Link>
            </nav>
            <hr />
            <nav className="nav">
              <Link to="">
                <i className="ri-question-line"></i> Help Center
              </Link>
              <Link to="">
                <i className="ri-lock-line"></i> Privacy Settings
              </Link>
              <Link to="">
                <i className="ri-user-settings-line"></i> Account Settings
              </Link>
              <Link to="/pages/signin">
                <i className="ri-logout-box-r-line"></i> Log Out
              </Link>
            </nav>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
