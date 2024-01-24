import { React, useEffect, useState } from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import { Button, Card, Col, Form, Modal, Dropdown, ButtonGroup, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import mainservice from '../../Services/mainservice'
import { Grid } from 'gridjs-react'
import { _ } from 'gridjs-react'
import { useSelector, useDispatch } from 'react-redux'
import { pumpInfo } from '../../store/pump'
import Select from 'react-select'

function CustomerDetails() {
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const [skin, setSkin] = useState(currentSkin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pumpId = useSelector((state) => state.loginedUser.PumpId)
  const customerData = useSelector((state) => state.pumpstore.Customer)
  const user = useSelector((state) => state.loginedUser)
  const fuel = useSelector((state) => state.pumpstore.Fuel)
  console.log(fuel)

  async function getCustomer() {
    setData(customerData)
  }
  useEffect(() => {
    getCustomer()
  }, [])
  useEffect(() => {
    fetchPump(user.PumpId)
  }, [])

  async function deleteCustomer(pumpId, customerId) {
    try {
      const res = await mainservice.deleteCustomer(pumpId, customerId)
      if (res.data != null) {
        fetchPump(user.PumpId)
      } else {
        console.log('Deletion failed. Server response:', res)
      }
    } catch (error) {
      console.log('An error is occurred in deletion', error)
    }
  }

  const onDeleteHandler = (item) => {
    const customerId = item.CustomerId
    console.log('customerId', customerId)
    deleteCustomer(pumpId, customerId)
  }
  const fetchPump = async (id) => {
    const pumpdetails = await mainservice.getPumpById(id)
    if (pumpdetails.data != null) {
      dispatch(pumpInfo(pumpdetails.data.result2))
      console.log(pumpdetails.data.result2)
    }
  }
  const [show, setShow] = useState(false)
  const [cust, setCust] = useState({})
  async function getCustomerDataById(id) {
    const res = await mainservice.getCustomerById(id)
    if (res.data != null) {
      console.log(res.data)
      setCust(res.data.result2)
    } else {
      console.log(res.message)
    }
  }
  const [credit, setCredit] = useState([])
  async function getCreditSaleDataById(id) {
    const res = await mainservice.getCreditSales(id)
    if (res.data != null) {
      console.log(res.data)
      setCredit(res.data.result1)
    } else {
      console.log(res.message)
    }
  }
  const [Balance,SetBalance] = useState('')

  function handleOpen(id) {
    setShow(true)
    getCustomerDataById(id.CustomerId)
    getCreditSaleDataById(id.CustomerId)
    SetBalance(id.CreditBalance)
    
  }
  function handleClose() {
    setShow(false)
  }
  const [customer, setCustomer] = useState('')
  const [showcredit, setShowcredit] = useState(false)
  const [showpay, setShowpay] = useState(false)
  function handleCreditOpen(id) {
    setShowcredit(true)
    setCustomer(id)
  }
  function handleCreditClose() {
    setShowcredit(false)
    setForm({ Quantity: 0 })
    setSelectedProduct({ lablel: '', value: 0 })
  }
  const [paydata, setPayData] = useState({})
  function handlePayOpen(data) {
    setShowpay(true)
    console.log(data)
    setPayData(data)
  }
  function handlePayClose() {
    setShowpay(false)
  }
  const [form, setForm] = useState({ Quantity: 0 })
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
    console.log(form)
  }
  const [selectedProduct, setSelectedProduct] = useState({ label: '', value: 0 })
  const ChangeHandler = (selectedOption) => {
    setSelectedProduct(selectedOption)
  }

  const ProductOptions = (fuels) => {
    return fuels.map((fuel) => {
      const { FuelName, FuelPricePerLitre } = fuel
      return { label: FuelName, value: FuelPricePerLitre }
    })
  }
  const ProductData = ProductOptions(fuel)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const data = {
      VehicleNumber: form.VehicleNumber,
      Product: selectedProduct.label,
      Quantity: form.Quantity,
      Price: selectedProduct.value,
      Customer: customer,
      Amount: form.Quantity * selectedProduct.value
    }
    console.log(data)

    const res = await mainservice.createCreditSales(user.PumpId, data)
    if (res.data != null) {
      console.log('Credit Sales Created')
      handleClose()
    } else {
      console.log(res)
    }
  }
  const [form2, setForm2] = useState({})
  const onChangeHandler2 = (event) => {
    setForm2({
      ...form2,
      [event.target.name]: event.target.value
    })
    console.log(form2)
  }
  const onSubmitHandler2 = async (event) => {
    event.preventDefault()
    const data = {
      CustomerID: paydata.CustomerId,
      Amount: form2.Amount,
      Balance: paydata.CreditBalance - form2.Amount,
      Customer: paydata.CustomerName
    }
    console.log(data)

    const res = await mainservice.createCreditPayment(user.PumpId, data)
    if (res.data != null) {
      console.log('Credit Payment Created')
      handleClose()
    } else {
      console.log(res)
    }
  }

  return (
    <>
      {/*////////////////////////////////////////////////////////////////// Add Credit Sales////////////////////////////////////////////////////////// // */}
      <Modal show={showcredit} onHide={handleCreditClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Credit Sales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="setting-item">
              <Row className="g-2 align-items-center">
             Arya Agency 22002
              </Row>
            </div> */}
          <div className="setting-item">
            <Row className="g-2 align-items-center">
              <Col md>
                <h6>Vechicle Number</h6>
              </Col>
              <Col md>
                <Form.Control name="VehicleNumber" onChange={onChangeHandler} type="text" />
              </Col>
              <Col md>
                <h6>Product</h6>
              </Col>
              <Col md>
                <Select
                  isDisabled={false}
                  isSearchable={true}
                  name="Product"
                  options={ProductData}
                  onChange={ChangeHandler}
                />
              </Col>
            </Row>
          </div>
          <div className="setting-item">
            <Row className="g-2 align-items-center">
              <Col md>
                <h6>Quantity</h6>
              </Col>
              <Col md>
                <Form.Control name="Quantity" onChange={onChangeHandler} type="text" />
              </Col>
              <Col md>
                <h6>Quantity</h6>
                <h6>Price</h6>
                <h6>Total Amount</h6>
              </Col>
              <Col md>
                <p style={{ fontWeight: 'bold', fontSize: '15px' }}>{form.Quantity}</p>
                <p style={{ fontWeight: 'bold', fontSize: '15px' }}>{selectedProduct.value}</p>
                <p style={{ fontWeight: 'bold', fontSize: '15px' }}>
                  {form.Quantity * selectedProduct.value}
                </p>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/*////////////////////////////////////////////////////////////////// Add Payment////////////////////////////////////////////////////////// // */}
      <Modal show={showpay} onHide={handlePayClose} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="setting-item bg-info">
            <Row className="g-2 align-items-center p-1">
              <p style={{ color: 'black', fontSize: '14px' }}>
                Customer Name : <b>{paydata.CustomerName}</b>
              </p>
            </Row>
            <Row className="g-2 align-items-center p-1">
              <p style={{ color: 'black', fontSize: '14px' }}>
                Amount to be Paid : <b>{paydata.CreditBalance}</b>
              </p>
            </Row>
          </div>
          <div className="setting-item">
            <Row className="g-2 align-items-center">
              <Col md>
                <h6>Amount Paid</h6>
              </Col>
              <Col md>
                <Form.Control name="Amount" onChange={onChangeHandler2} type="text" />
              </Col>
            </Row>
          </div>
          <div className="setting-item">
            <Row className="g-2 align-items-center">
              <Col md>
                <h6>Balance Amount</h6>
              </Col>
              <Col md>
                <p>{paydata.CreditBalance - form2.Amount}</p>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmitHandler2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/*////////////////////////////////////////////////////////////////// Show Customer Details////////////////////////////////////////////////////////// // */}
      <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" d-flex w-100">
            <div style={{ height: '280px' }} className=" d-flex w-100 border m-3">
              <Table borderless size="xl" className="mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Customer Name</th>
                    <td>{cust.Name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phone Number</th>
                    <td>{cust.MobileNo}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{cust.EmailID}</td>
                  </tr>
                  <tr>
                    <th scope="row">Address</th>
                    <td>{cust.Address}</td>
                  </tr>
                  <tr>
                    <th scope="row">Office Number</th>
                    <td>{cust.OfficePhoneNo}</td>
                  </tr>
                </tbody>
              </Table>
              <Table borderless size="xl" className="mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Credit limit</th>
                    <td>{cust.CreditLimit}</td>
                  </tr>
                  <tr>
                    <th scope="row">Total Sales</th>
                    <td>Not Available</td>
                  </tr>
                  <tr>
                    <th scope="row">Payment Duration</th>
                    <td>Not Available</td>
                  </tr>
                  <tr>
                    <th scope="row">Payment Duration</th>
                    <td>Not Available</td>
                  </tr>
                  <tr>
                    <th scope="row">OutStanding Balance</th>
                    <td>
                      <p style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>
                        {Balance}/-
                      </p>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className=" d-flex w-100">
            <div
              style={{ height: '300px' }}
              className=" d-flex justify-content-center w-100 border m-3"
            >
              <Table
                size="sm"
                style={{ minWidth: '100vh' }}
                bordered
                hover
                striped
                responsive
                className="mb-0"
              >
                <thead>
                  <tr>
                    <th scope="col"> Sl.No</th>
                    <th scope="col"> Date</th>
                    <th scope="col"> Vechicle Number</th>
                    <th scope="col"> Product</th>
                    <th scope="col"> Quantity</th>
                    <th scope="col"> Price</th>
                    <th scope="col"> Amount</th>
                    <th scope="col"> Status</th>
                  </tr>
                </thead>
                <tbody>
                  {credit.map((x) => {
                    return (
                      <tr>
                        <th scope="row">1</th>
                        <td>12/11/2023</td>
                        <td>{x.VehicleNumber}</td>
                        <td>{x.Product}</td>
                        <td>{x.Quantity}</td>
                        <td>{x.Price}</td>
                        <td>{x.Amount}</td>
                        <td>{x.Status}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-md-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/dashboard/CustomerDetails">Customer</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Customer Details
              </li>
            </ol>
            <h4 className="main-title mt-2 mb-0">Customer Details</h4>
          </div>

          <Button
            variant="primary"
            className="d-flex align-items-center gap-2"
            onClick={() => navigate('/dashboard/addCustomer')}
          >
            <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Add Customer
            <span className="d-none d-sm-inline"></span>
          </Button>
        </div>

        <Card>
          <Card.Body>
            <Grid
              data={customerData.map((item) => [
                item.CustomerId,
                item.CustomerName,
                item.MobileNo,
                item.CreditBalance,
                _(
                  <>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => handleCreditOpen(item.CustomerId)}
                      >
                        Credit Sale
                      </Button>
                      <Button
                        style={{ color: 'white' }}
                        size="sm"
                        variant="primary"
                        onClick={() => handlePayOpen(item)}
                      >
                        Pay
                      </Button>
                    </ButtonGroup>
                  </>
                ),
                _(
                  <>
                    <ButtonGroup>
                      <Button size="sm" variant="white" onClick={() => handleOpen(item)}>
                        <i className="ri-eye-line"></i>
                      </Button>
                    </ButtonGroup>
                    <Button className="p-0" variant="white">
                      <Dropdown drop="end">
                        <Dropdown.Toggle variant="white" size="sm" className="btn-no-outline">
                          <i className="ri-more-2-fill" color="primary"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              navigate(`/dashboard/addCustomer/?id=${item.CustomerId}`)
                            }
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            style={{ color: 'red' }}
                            onClick={() => onDeleteHandler(item)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Button>
                  </>
                )
              ])}
              columns={[
                'Customer Id',
                'Customer Name',
                'Phone Number',
                'OutStanding Balance',
                'Sales',
                'Action'
              ]}
              search={true}
              pagination={true}
              sort={true}
              resizable={true}
              className={{
                table: 'table table-bordered mb-0'
              }}
            />
          </Card.Body>
        </Card>
        <Footer />
      </div>
    </>
  )
}
export default CustomerDetails
