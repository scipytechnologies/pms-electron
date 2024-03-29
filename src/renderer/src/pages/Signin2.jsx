import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import bg1 from '../assets/img/bg1.jpg'
import icon from '../assets/img/fullLogo.jpg'
import mainservice from '../Services/mainservice'
import { Toaster, toast } from 'sonner'
export default function Signin2() {
  const [form, setForm] = useState({})

  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
    console.log(form)
  }

  async function Login(form) {
    console.log(form)
    const res = await mainservice.Login(form)
    if (res.data != null) {
      toast.success('Sign In Sucessful')
      const token = res.data.token
      localStorage.setItem('user-token', JSON.stringify(token))
      window.location.reload(false)
    } else {
      toast.error('Login Failed')
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    Login(form)
  }
  return (
    <div className="page-sign d-block py-0">
       <Toaster  richColors />
      <Row className="g-0">
        <Col md="7" lg="5" xl="4" className="col-wrapper ">
          <div>
            
            <img style={{ width: '400px', backgroundBlendMode: 'darken' }} src={icon} alt="icon" />
            <Card className="card-sign">
              <Card.Header>
                <Card.Title>Sign In</Card.Title>
                <Card.Text>Welcome back! Please signin to continue.</Card.Text>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmitHandler}>
                  <div className="mb-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      type="text"
                      placeholder="Enter your email address"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="mb-4">
                    <Form.Label className="d-flex justify-content-between">
                      Password
                      {/* <Link to="">Forgot password?</Link> */}
                    </Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <Button type="submit" className="btn-sign">
                    Sign In
                  </Button>

                  {/* <div className="divider"><span>or sign in with</span></div>

                <Row className="gx-2">
                  <Col><Button variant="" className="btn-facebook"><i className="ri-facebook-fill"></i> Facebook</Button></Col>
                  <Col><Button variant="" className="btn-google"><i className="ri-google-fill"></i> Google</Button></Col>
                </Row> */}
                </Form>
              </Card.Body>
              {/* <Card.Footer>
              Don't have an account? <Link to="/pages/signup2">Create an Account</Link>
            </Card.Footer> */}
            </Card>
          </div>
        </Col>
        <Col style={{ height: '100vh' }} className="d-none d-lg-block">
          <img src={bg1} className="auth-img" alt="" />
        </Col>
      </Row>
    </div>
  )
}
