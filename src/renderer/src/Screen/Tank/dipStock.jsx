import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Col, Row, Form, Nav, Card, Button, Table, CardBody } from 'react-bootstrap'
import Footer from '../../layouts/Footer'
import HeaderMobile from '../../layouts/HeaderMobile'
import Avatar from '../../components/Avatar'

import img8 from '../../assets/img/img8.jpg'
import img9 from '../../assets/img/img9.jpg'
import img10 from '../../assets/img/img10.jpg'
import img11 from '../../assets/img/img11.jpg'
import img14 from '../../assets/img/img14.jpg'
import Header from '../../layouts/Header'
import mainservice from '../../Services/mainservice'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { identity } from '@fullcalendar/core/internal'
import { Toaster, toast } from 'sonner'

export default function DipStock() {
  const user = useSelector((state) => state.loginedUser)
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const [skin, setSkin] = useState(currentSkin)
  const [form, setform] = useState({})
  const [tanks, setTanks] = useState([])
  const navigate = useNavigate()

  const switchSkin = (skin) => {
    if (skin === 'dark') {
      const btnWhite = document.getElementsByClassName('btn-white')

      for (const btn of btnWhite) {
        btn.classList.add('btn-outline-primary')
        btn.classList.remove('btn-white')
      }
    } else {
      const btnOutlinePrimary = document.getElementsByClassName('btn-outline-primary')

      for (const btn of btnOutlinePrimary) {
        btn.classList.remove('btn-outline-primary')
        btn.classList.add('btn-white')
      }
    }
  }

  const [fields, setFields] = useState([
    {
      Tank: '',
      Quantity: ''
    }
  ])

  const [quantityFilled, setQuantityFilled] = useState(0)
  function calculateTotals() {
    let sum = 0
    const total = fields.map((item) => {
      sum = sum + parseInt(item.Quantity)
    })
    setQuantityFilled(sum)
  }

  const handleAddField = () => {
    const newItem = {
      Tank: '',
      Quantity: ''
    }
    setFields([...fields, newItem])
    console.log(fields)
    calculateTotals()
  }

  const handleRemoveField = (index) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
    calculateTotals()
  }

  const handleChangeField = (index, event) => {
    const { name, value } = event.target
    const newFields = [...fields]
    newFields[index][name] = value
    setFields(newFields)
    calculateTotals()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    // const Bal = form.Quantity - quantityFilled
    const data = {
      ...form,
      TankDistribution: fields,
      PumpId: user.PumpId,
      TotalQuantityFilled: quantityFilled,
      RemainingQuantity: form.Quantity - quantityFilled
    }
    console.log(user)
    const res = await mainservice.createDipStock(user.PumpId, data)
    if (res.data != null) {
      navigate('/dashboard/DipStock/StockDetails')
      toast.success('Successfully Created')
      console.log(res.data)
    } else {
      console.log(res)
      toast.error('Something Went Wrong')
    }
  }

  async function GetTanks() {
    const res = await mainservice.GetTankDetails(user.PumpId)
    if (res.data != null) {
      setTanks(res.data.result2.Tank)
      console.log(tanks)
    } else {
      console.log(res)
    }
  }
  const options = tanks.map((x) => {
    return { label: x.TankNumber + x.Product, value: x._id }
  })
  const [select, setSelect] = useState('')

  const onSelectHandler = (event, field) => {
    const temp = tanks.filter((x) => x._id === event.value)
    setSelect((prev) => ({
      ...prev,
      [field]: event.value
    }))
    console.log(select)
  }
  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setform({
      ...form,
      [event.target.name]: event.target.value
    })
    setUform({
      ...uform,
      [event.target.name]: event.target.value
    })
    console.log(uform)
  }

  const onUpdateHandler = (event) => {
    event.preventDefault()
    console.log(uform)
    updateDipStock(uform)
  }

  async function updateDipStock(uform) {
    const res = await mainservice.updateDipStock(id, user.PumpId, uform)
    console.log('updateId', id)
    if (res.data != null) {
      navigate('/dashboard/DipStock/StockDetails')
      console.log(res.data, 'Employee Details Updated')
      toast.success('Successfully Updated')
    } else {
      console.log(res.data)
      toast.error('Something Went Wrong')
    }
  }

  let [searchParams, setSearchParams] = useSearchParams()
  const [uform, setUform] = useState([])
  console.log(uform, 'uformresult2details')
  // console.log(uform?.result2?.AadhaarId, "individual")
  const [editMode, setEditMode] = useState(false)
  const id = searchParams.get('id')
  const CheckEdit = async () => {
    if (id) {
      setEditMode(true)
      const res = await mainservice.getDipStockById(id)
      console.log("getdipid", id)
      setUform(res.data.result2)
      console.log(res.data.result2, 'this')
    }
  }
  useEffect(() => {
    CheckEdit()
  }, [])

  switchSkin(skin)
  useEffect(() => {
    GetTanks()
    switchSkin(skin)
  }, [skin])
  return (
    <React.Fragment>
      <Toaster richColors />
      <Header onSkin={setSkin} />
      <div style={{ marginTop: '50px' }} className="main p-4 p-lg-5">
        <ol className="breadcrumb fs-sm mb-2">
          <li className="breadcrumb-item">
            <Link to="#">Dashboard  </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">Tank  </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Manage Dip Stock
          </li>
        </ol>
        <h2 className="main-title">Manage Dip Stock</h2>

        <Card className="card-settings">
          <Card.Header>
            <Card.Title>Dip Stock Update</Card.Title>
            <Card.Text>Create your new Dip Stock Updates</Card.Text>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Date</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="date"
                    name="Date"
                    value={uform.Date}
                    onChange={onChangeHandler}
                  />
                </Col>
                <Col md>
                  <h6>Invoice Number</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    name="InvoiceNumber"
                    value={uform.InvoiceNumber}
                    onChange={onChangeHandler}
                  />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Vehicle No.</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    name="VehicleNumber"
                    value={uform.VehicleNumber}
                    onChange={onChangeHandler}
                  />
                </Col>
                <Col md>
                  <h6>Agent Name</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    name="AgentName"
                    value={uform.AgentName}
                    onChange={onChangeHandler}
                  />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Product</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    name="Product"
                    value={uform.Product}
                    onChange={onChangeHandler}
                  />
                </Col>
                <Col md>
                  <h6>Quantity</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    name="Quantity"
                    value={uform.Quantity}
                    onChange={onChangeHandler}
                  />
                </Col>
                <Col md>
                  <h6>Price</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    name="Price"
                    value={uform.Price}
                    onChange={onChangeHandler}
                  />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2">
                <Col md="5">
                  <h6>Note</h6>
                </Col>
                <Col md>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="Note"
                    value={uform.Note}
                    onChange={onChangeHandler}
                  />
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>


        <Card className="card-settings mt-4">
          <Card.Body className="p-0">
            <div className="setting-item d-flex justify-content-end">
              {' '}
              <Col xs="12">
                {editMode ? (
                  <div className="mt-1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onUpdateHandler} style={{ color: 'white' }} type="submit">
                      Update
                    </Button>
                  </div>
                ) : (
                  <Card className="card-settings mt-4">
                    <Card.Header>
                      <Card.Title>Tank Details</Card.Title>
                      {/* <Card.Text>Debitis aut rerum necessitatibus saepe eveniet ut et voluptates.</Card.Text> */}
                    </Card.Header>
                    <Card.Body className="p-0">
                      <div className="setting-item">
                        <Row className="g-2">
                          <div>
                            <Row className="g-2 align-items-center">
                              <Col md="5">
                                <h6>Tank Distribution</h6>
                                {/* <p>Neque porro quisquam est qui dolorem.</p> */}
                              </Col>
                              <Col md>
                                <Table size="sm" borderless className="mb-0" hover>
                                  <thead>
                                    <tr>
                                      <th scope="col">Tank</th>
                                      <th scope="col">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {fields.map((field, index) => {
                                      return (
                                        <tr>
                                          <td scope="row">
                                            <div className="mt-2">
                                              <div key={index}>
                                                <Select
                                                  styles={{
                                                    control: (baseStyles) => ({
                                                      ...baseStyles,
                                                      border: 0
                                                    })
                                                  }}
                                                  options={options}
                                                  isSearchable={true}
                                                  onChange={(event) =>
                                                    handleChangeField(index, {
                                                      target: { name: 'Tank', value: event.value }
                                                    })
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="mt-2">
                                              <div key={index}>
                                                <Form.Control
                                                  type="text"
                                                  name="Quantity"
                                                  value={field.ItemName}
                                                  onChange={(event) => handleChangeField(index, event)}
                                                />
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="mt-2">
                                              <div className="input-group ">
                                                <Button
                                                  className="ms-2"
                                                  variant="danger"
                                                  onClick={() => handleRemoveField(index)}
                                                >
                                                  <i class="ri-delete-bin-5-fill"></i>
                                                </Button>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                  <div className="mt-3">
                                    <Button onClick={handleAddField} style={{ color: 'white' }}>
                                      Add Tank
                                    </Button>
                                  </div>
                                </Table>
                              </Col>
                            </Row>
                          </div>
                        </Row>
                      </div>
                      <div className="setting-item">
                        <Row className="g-2">
                          <Col md="5"></Col>
                          <Col md>
                            <h6>Total Quantity Filled</h6>
                            <h5>{quantityFilled}</h5>
                          </Col>
                          <Col md>
                            <h6>Remaining Quantity</h6>
                            <h5>{form.Quantity - quantityFilled}</h5>
                          </Col>
                        </Row>
                      </div>
                      <div className="mt-1" style={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <Button onClick={onSubmitHandler} type="submit" style={{ color: 'white' }}>
                          Submit
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Col>{' '}
            </div>
          </Card.Body>
        </Card>

        {/* <Card className="card-settings mt-4">
          <Card.Body className="p-0">
            <div className="setting-item d-flex justify-content-end">
              {' '}
              <Col xs="12">
                {editMode ? (
                  <div className="mt-1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onUpdateHandler} style={{ color: 'white' }} type="submit">
                      Update
                    </Button>
                  </div>
                ) : (
                  <div className="mt-1" style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <Button onClick={onSubmitHandler} type="submit" style={{ color: 'white' }}>
                      Submit
                    </Button>
                  </div>
                )}
              </Col>{' '}
            </div>
          </Card.Body>
        </Card> */}

        <Footer />
      </div>
    </React.Fragment >
  )
}
