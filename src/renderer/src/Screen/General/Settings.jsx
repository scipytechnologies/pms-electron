import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Form, Nav, Card, Button, Table, Modal } from 'react-bootstrap'
import Footer from '../../layouts/Footer'
import HeaderMobile from '../../layouts/HeaderMobile'
import Avatar from '../../components/Avatar'

import img8 from '../../assets/img/img8.jpg'
import img9 from '../../assets/img/img9.jpg'
import img10 from '../../assets/img/img10.jpg'
import img11 from '../../assets/img/img11.jpg'
import img14 from '../../assets/img/img14.jpg'
import { useSelector, useDispatch } from 'react-redux'
import mainservice from '../../Services/mainservice'

export default function Settings() {
  const user = useSelector((state) => state.loginedUser)
  const [colab, setColabs] = useState([])
  const [show, setShow] = useState(false)
  const [form, setform] = useState({})
  const fetchcolabs = async (id) => {
    const colabs = await mainservice.getColab(id)
    if (colabs.data != null) {
      setColabs(colabs.data)
    }
  }

  function handleOpen() {
    setShow(true)
  }
  function handleClose() {
    setShow(false)
  }

  const onChangeHandler = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const extra = { PumpId: user.PumpId, role: 'user' }
    const data = { ...form, ...extra }
    console.log(data)
    const res = await mainservice.SignUp(data)
    if (res.data != null) {
      setShow(false)
      fetchcolabs(user.PumpId)
    } else {
      console.log(res)
    }
  }
  const onDeleteHandler = async (id) => {
    const res = await mainservice.DeleteColab(id)
    if (res.data != null) {
      fetchcolabs(user.PumpId)
    } else {
      console.log(res)
    }
  }

  useEffect(() => {
    fetchcolabs(user.PumpId)
  }, [])
  return (
    <React.Fragment>
      <HeaderMobile />
      <div className="main p-4 p-lg-5">
        <ol className="breadcrumb fs-sm mb-2">
          <li className="breadcrumb-item">
            <Link to="#">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">General</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Settings
          </li>
        </ol>
        <h2 className="main-title">Settings</h2>

        <Nav className="nav-line mb-4">
          <Nav.Link href="" className="active">
            General
          </Nav.Link>
          {/* <Nav.Link href="">Notifications</Nav.Link>
          <Nav.Link href="">Language &amp; Region</Nav.Link>
          <Nav.Link href="">Accessibility</Nav.Link>
          <Nav.Link href="">Advanced</Nav.Link> */}
        </Nav>

        {/* <Card className="card-settings">
          <Card.Header>
            <Card.Title>Company Information</Card.Title>
            <Card.Text>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</Card.Text>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md="5">
                  <h6>Company Name</h6>
                  <p>Neque porro quisquam est qui dolorem.</p>
                </Col>
                <Col md>
                  <Form.Control type="text" placeholder="Enter company name" />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2">
                <Col md="5">
                  <h6>Tagline</h6>
                  <p>Temporibus autem quibusdam et aut officiis.</p>
                </Col>
                <Col md>
                  <Form.Control as="textarea" rows="3" placeholder="Enter tagline" />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md="5">
                  <h6>Company Logo</h6>
                  <p>Temporibus autem quibusdam et aut officiis.</p>
                </Col>
                <Col md>
                  <Button variant="" className="btn-white">Upload logo</Button>
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md="5">
                  <h6>Company Email</h6>
                  <p>Neque porro quisquam est qui dolorem.</p>
                </Col>
                <Col md>
                  <Form.Control type="text" placeholder="Enter email address" />
                  <Form.Check type="checkbox" label="Blanditiis praesentium voluptatum deleniti atque." className="mt-3" />
                  <Form.Check type="checkbox" label="Similique sunt in culpa qui officia." className="mt-1" />
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card> */}

        <Card className="card-settings mt-4">
          <Card.Header className="d-flex justify-content-between">
            <div>
              <Card.Title>Member Access</Card.Title>
              <Card.Text>Manage your members Access</Card.Text>
            </div>
            {user.role == 'owner' ? (
              <div>
                <Button
                  style={{ color: 'white' }}
                  variant="primary"
                  className="d-flex align-items-center gap-2"
                  onClick={handleOpen}
                >
                  <i className="ri-user-add-fill"></i>Add New Collaborator
                  <span className="d-none d-sm-inline"></span>
                </Button>
              </div>
            ) : (
              []
            )}
          </Card.Header>
          <Card.Body className="p-0">
            <div className="setting-item">
              <Row className="g-2">
                <Col md="5">
                  <h6>Collaborators</h6>
                </Col>
                <Col md>
                  <Table className="mb-0" responsive>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {colab.map((x, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <span>{x.firstName + ' ' + x.LastName}</span>
                            </div>
                          </td>
                          <td>{x.role}</td>
                          {user.role !== 'owner' ? (
                            []
                          ) : (
                            <td>
                              {x.role === 'owner' ? (
                                <>- - - -</>
                              ) : (
                                <>
                                  <>
                                    {' '}
                                    <Nav as="nav">
                                      <Link to="">
                                        <i className="ri-pencil-line"></i>
                                      </Link>
                                      <Link
                                        onClick={() => {
                                          onDeleteHandler(x.id)
                                        }}
                                      >
                                        <i className="ri-delete-bin-line"></i>
                                      </Link>
                                    </Nav>
                                  </>
                                </>
                              )}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>

        <Card className="card-settings mt-4">
          <Card.Header>
            <Card.Title>Change Password</Card.Title>
            {/* <Card.Text>Quia voluptas sit aspernatur aut odit aut fugit nemo enim ipsam voluptatem.</Card.Text> */}
          </Card.Header>
          <Card.Body className="p-0">
            <div className="setting-item">
              <Row className="g-3">
                <Col className="d-flex ">
                  <Form.Control className='m-2 ' type="text" placeholder="Enter New Password" />
                  <Form.Control className=' m-2 ' type="text" placeholder="Confirm Password" />
                  <Button style={{color:'white'}} className='m-2'>Submit</Button>{' '}
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose} centered size="md">
          <Modal.Header closeButton>
            <Modal.Title>Add Colab</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>First Name</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder=""
                    onChange={onChangeHandler}
                  />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Last Name</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder=" "
                    onChange={onChangeHandler}
                  />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>E mail</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder=""
                    onChange={onChangeHandler}
                  />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Password</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    name="password"
                    placeholder=""
                    onChange={onChangeHandler}
                  />
                </Col>
              </Row>
            </div>{' '}
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <Button
                    style={{ color: 'white' }}
                    variant="primary"
                    className="d-flex"
                    onClick={onSubmitHandler}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Footer />
      </div>
    </React.Fragment>
  )
}
