import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import userAvatar from '../assets/img/img1.jpg'
import notification from '../data/Notification'
import Select from 'react-select'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import mainservice from '../Services/mainservice'
import { pumpInfo } from '../store/pump'
import { event } from 'jquery'

export default function Header({ onSkin }) {
  const fuel = useSelector((state) => state.pumpstore.Fuel)
  const user = useSelector((state) => state.loginedUser)
  const employees = useSelector((state) => state.pumpstore.Employee)
  const nozzle = useSelector((state) => state.pumpstore.Nozzle)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)
  const [inputform, setInputForm] = useState([])
  const [fuelform, setFuelForm] = useState({
    EmployeeName: '',
    NozzleName: ''
  })
  const labelText = isChecked ? 'Pass' : 'Fail'
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

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked)
  }

  const fetchPump = async (id) => {
    const pumpdetails = await mainservice.getPumpById(id)
    if (pumpdetails.data != null) {
      dispatch(pumpInfo(pumpdetails.data.result2))
    }
  }

  const EmployeeOptions = (employees) => {
    return employees.map((employee) => {
      const { EmployeeName, EmployeeId } = employee
      return { label: EmployeeName, value: EmployeeId }
    })
  }

  const NozzleOptions = (nozzles) => {
    return nozzles.map((nozzle) => {
      const { NozzleName, _id } = nozzle
      return { label: NozzleName, value: _id }
    })
  }
  const NozzleData = NozzleOptions(nozzle)
  const EmployeeData = EmployeeOptions(employees)

  const [form, setForm] = useState({})
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
    console.log(form)
  }
  const [opening, setOpening] = useState('')
  const ChangeSelectHandler = (selectedOption, action) => {
    setFuelForm((prevFuelForm) => ({
      ...prevFuelForm,
      [action.name]: {
        label: selectedOption.label,
        value: selectedOption.value
      }
    }))
    if (action.name === 'NozzleName') {
      const opening = nozzle.filter((x) => x._id == selectedOption.value)
      setOpening(opening[0].Reading)
    }
  }
const [quantity,setQuantity] =useState('')
  const ChangeInputHandler = (event) => {
    const { name, value } = event.target
    setInputForm({
      ...inputform,
      [name]: value
    })
    // console.log('hiinput',value,nozzle.opening[0].Reading)
    if (name === 'Closing') {
      const Quantity =(value - opening)
      setQuantity(Quantity)
    }
  }

  useEffect(() => {
    console.log('hiselect', fuelform)
  }, [fuelform])

  const SubmitHandler = async (event) => {
    event.preventDefault()
    const formData = {
      ...inputform,
      EmployeeName: fuelform.EmployeeName.label,
      EmployeeId: fuelform.EmployeeName.value,
      NozzleId: fuelform.NozzleName.value,
      TestResult: isChecked,
      Opening: opening,
      Quantity : quantity
    }

    console.log('wholedata', formData)
    const res = await mainservice.createFuelTest(user.PumpId, formData)
    if (res.data != null) {
      navigate('/dashboard/FuelTest/TestHistory')
      fetchPump(user.PumpId)
      console.log('console.res', res)
    } else {
      console.log(res)
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const res = await mainservice.createFuel(user.PumpId, { Fuel: form })
    if (res.data != null) {
      fetchPump(user.PumpId)
    } else {
      console.log(res)
    }
  }

  const onRemoveHandler = async (id) => {
    console.log(id)
    const res = await mainservice.deleteFuel(user.PumpId, id)
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
  const [editModes, setEditModes] = useState(() => Array(fuel.length).fill(false))

  function FuelList() {
    const handleEditClick = (index) => {
      setEditModes((prevEditModes) => {
        const updatedEditModes = [...prevEditModes]
        updatedEditModes[index] = !updatedEditModes[index] // Toggle edit mode
        return updatedEditModes
      })
    }

    const handleSaveClick = async (index, item) => {
      // Implement save logic here
      setEditModes((prevEditModes) => {
        const updatedEditModes = [...prevEditModes]
        updatedEditModes[index] = !updatedEditModes[index] // Toggle edit mode

        const UpdatehData = async () => {
          try {
            const res = await mainservice.editFuel(user.PumpId, item._id, form)
            if (res.data != null) {
              fetchPump(user.PumpId)
            } else {
              console.log(res)
            }
          } catch (error) {
            console.error('An error occurred:', error)
          }
        }

        UpdatehData() // Call the asynchronous function here

        return updatedEditModes
      })
    }

    const notiList = fuel.map((item, index) => (
      <li className="list-group-item" key={index}>
        <div>
          <i className="ri-price-tag-3-line"></i>
        </div>
        <div className="list-group-body">
          <p style={{ width: '160px' }}>
            Fuel :<b style={{ paddingLeft: '8px' }}>{item.FuelName} </b>
          </p>
          <span>Price per litre</span>
        </div>
        <div style={{ height: '50px' }}>
          {!editModes[index] ? (
            <Form.Control
              disabled={true}
              value={item.FuelPricePerLitre}
              name="FuelName"
              type="text"
            />
          ) : (
            <Form.Control
              disabled={false}
              name="FuelName"
              type="text"
              onChange={(event) => {
                setForm({ FuelName: item.FuelName, FuelPricePerLitre: event.target.value })
                console.log(form)
              }}
            />
          )}
        </div>
        <div>
          {editModes[index] ? (
            <Button className="ms-1" variant="success" onClick={() => handleSaveClick(index, item)}>
              Save
            </Button>
          ) : (
            <Button className="ms-1" variant="white" onClick={() => handleEditClick(index)}>
              Edit
            </Button>
          )}
        </div>
        <div>
          <Button className="ms-1" variant="danger" onClick={() => onRemoveHandler(item._id)}>
            <i className="ri-delete-bin-5-fill"></i>
          </Button>
        </div>
      </li>
    ))

    return <ul className="list-group">{notiList}</ul>
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

  function LogOut(){
    localStorage.removeItem('user-token')
    window.location.reload(false);
    
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
      <div className="d-flex justify-content-center align-items-center w-50 me-auto p-2 ">
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
              backgroundColor: 'white',
              alignItems: 'center',
              width: '50px',
              fontWeight: 'bolder',
              color: 'black',
              border: 0
            }}
          >
            {/* <i class="ri-edit-box-line"></i> */}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ width: '400px' }} className="mt-10-f me--10-f">
            <div className="dropdown-menu-header">
              <h6 className="dropdown-menu-title"> Manage Fuel</h6>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>New Fuel</h6>
                  <Form.Control name="FuelName" type="text" onChange={onChangeHandler} />
                </Col>
                <Col md>
                  <h6>Price</h6>
                  <Form.Control name="FuelPricePerLitre" type="text" onChange={onChangeHandler} />
                </Col>
                <Col>
                  <Button
                    style={{ color: 'white', width: '100%', marginTop: '19px' }}
                    onClick={onSubmitHandler}
                  >
                    Add
                  </Button>
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

      {/* FuelTest */}
      <div className="d-flex justify-content-end align-items-center w-100 p-0 ">
        <div className="dropdown" style={{ position: 'absolute', right: '120px' }}>
          {/* <div style={{ width: '80px', fontWeight: 'bolder' }}>Test Fuel</div> */}
          <Dropdown className="dropdown-notification " align="end">
            <Dropdown.Toggle
              className="d-flex justify-content-left"
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                width: '50px',
                fontWeight: 'bolder',
                color: 'black',
                border: 0
              }}
            >
              <span style={{ width: '80px' }}>Test Fuel</span>
              <span style={{ marginLeft: 'auto' }}></span>
              {/* <i class="ri-edit-box-line"></i> */}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: '400px' }} className="mt-10-f me--10-f">
              <div className="dropdown-menu-header">
                <h6 className="dropdown-menu-title"> Fuel Testing</h6>
              </div>
              <div className="setting-item">
                <Row className="g-4 align-items-center">
                  <Col md>
                    <h6>Date</h6>
                    <Form.Control name="Date" type="Date" onChange={ChangeInputHandler} />
                  </Col>
                  <Col md>
                    <h6>Employee Name</h6>
                    <Select
                      isDisabled={false}
                      isSearchable={true}
                      name="EmployeeName"
                      options={EmployeeData}
                      onChange={ChangeSelectHandler}
                    />
                  </Col>
                </Row>
                <Row className="g-4 align-items-center mt-0">
                  <Col>
                    <h6>Nozzle</h6>
                    <Select
                      isDisabled={false}
                      isSearchable={true}
                      name="NozzleName"
                      options={NozzleData}
                      onChange={ChangeSelectHandler}
                    />
                  </Col>
                  <Col md>
                    <h6>Opening</h6>
                    <Form.Control
                      disabled={true}
                      value={opening}
                      name="Opening"
                      type="text"
                      onChange={ChangeInputHandler}
                    />
                  </Col>
                </Row>
                <Row className="g-4 align-items-center mt-0">
                  <Col md>
                    <h6>Closing</h6>
                    <Form.Control name="Closing" type="text" onChange={ChangeInputHandler} />
                  </Col>
                  <Col md> 
                    <h6>Quantity</h6>
                    <Form.Control disabled={true} value={quantity} name="Quantity" type="text" onChange={ChangeInputHandler} />
                  </Col>
                </Row>
                <Row className="g-2 align-items-center mt-0" style={{ marginRight: '30px' }}>
                  <Col md>
                    <div
                      className="form-check form-switch"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <h6 style={{ marginRight: '40px' }}>Test Result</h6>
                      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                        <input
                          className="form-check-input mr-0"
                          name="TestResult"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                      </label>
                      <span style={{ marginLeft: '8px', color: isChecked ? 'green' : 'red' }}>
                        {labelText}
                      </span>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      onClick={SubmitHandler}
                      type="submit"
                      style={{
                        color: 'white',
                        width: '50%',
                        marginTop: '19px',
                        marginLeft: '90px'
                      }}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
            <img src="https://www.nabapravat.com/img/team/avatar.svg" alt="" />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f">
          <div className="dropdown-menu-body">
            <div className="avatar avatar-xl online mb-3">
              <img src="https://www.nabapravat.com/img/team/avatar.svg" alt="" />
            </div>
            <h5 className="mb-1 text-dark fw-semibold">
              {user.firstName} {user.lastName}
            </h5>
            <p className="fs-sm text-secondary">{user.role}</p>

            {/* <nav className="nav">
              <Link to="">
                <i className="ri-edit-2-line"></i> Edit Profile
              </Link>
              <Link to="">
                <i className="ri-profile-line"></i> View Profile
              </Link>
            </nav> */}
            <hr />
            <nav className="nav">
              {/* <Link to="">
                <i className="ri-question-line"></i> Help Center
              </Link>
              <Link to="">
                <i className="ri-lock-line"></i> Privacy Settings
              </Link>
              <Link to="">
                <i className="ri-user-settings-line"></i> Account Settings
              </Link> */}
              <Link onClick={LogOut}>
                <i className="ri-logout-box-r-line"></i> Log Out
              </Link>
            </nav>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
