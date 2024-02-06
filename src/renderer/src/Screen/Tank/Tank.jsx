import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Nav, ProgressBar, Row, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../../layouts/Footer'
import Header from '../../layouts/Header'
import { dp3 } from '../../data/DashboardData'
import ReactApexChart from 'react-apexcharts'
import { useSelector, useDispatch } from 'react-redux'
import GaugeChart from 'react-gauge-chart'
import mainservice from '../../Services/mainservice'
import { pumpInfo } from '../../store/pump'
import Select from 'react-select'

export default function Tank() {
  const user = useSelector((state) => state.loginedUser)
  const nozzle = useSelector((state) => state.pumpstore.Nozzle)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [nozzleModal, setNozzleModal] = useState(false)
  const [form, setForm] = useState({})
  const [nozzleForm, setNozzleForm] = useState({})
  const [tanks, setTanks] = useState([])
  const [TankID, setTankID] = useState('')
  function handleClose() {
    setShow(false)
  }
  function handleCloseAddNozzle() {
    setNozzleModal(false)
    setTankID('')
  }

  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const [skin, setSkin] = useState(currentSkin)

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

  const fuel = useSelector((state) => state.pumpstore.Fuel)
  const FuelOptions = (fuels) => {
    return fuels.map((fuel) => {
      const { FuelName, _id } = fuel
      return { label: FuelName, value: _id }
    })
  }

  const fuelData = FuelOptions(fuel)
  const [selectedFuel, setSelectedFuel] = useState(null)
  const ChangeSelect = (selectedOption) => {
    setSelectedFuel(selectedOption)
  }
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }
  const onChangeNozzle = (event) => {
    setNozzleForm({
      ...nozzleForm,
      [event.target.name]: event.target.value
    })
    console.log(nozzleForm)
  }

  const fetchPump = async (id) => {
    const pumpdetails = await mainservice.getPumpById(id)
    if (pumpdetails.data != null) {
      dispatch(pumpInfo(pumpdetails.data.result2))
    }
  }

  const onSubmitNozzle = async (event) => {
    event.preventDefault()

    let data = { ...nozzleForm, FuelId: TankID }
    const res = await mainservice.createNozzle({ Nozzle: data }, user.PumpId)
    if (res.data != null) {
      fetchPump(user.PumpId)
    } else {
      console.log(res)
    }
    console.log('data', data)
    handleClose()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const data = { ...form, Product: selectedFuel.label, ProductCode: selectedFuel.value }
    console.log(data)
    const res = await mainservice.CreateTank({ Tank: data }, user.PumpId)
    if (res.data != null) {
      GetTanks()
    } else {
      console.log(res)
    }
    handleClose()
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

  switchSkin(skin)
  useEffect(() => {
    switchSkin(skin)
    GetTanks()
  }, [skin])
  return (
    <React.Fragment>
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-md-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item">
                <Link to="#">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Tank
              </li>
            </ol>
            <h4 className="main-title mb-0">TANK</h4>
          </div>
          <div className="d-flex gap-2 mt-3 mt-md-0">
            {/* <Button variant="" className="btn-white d-flex align-items-center gap-2">
              <i className="ri-share-line fs-18 lh-1"></i>Share
            </Button>
            <Button variant="" className="btn-white d-flex align-items-center gap-2">
              <i className="ri-printer-line fs-18 lh-1"></i>Print
            </Button> */}
            <Button
            style={{color:'white'}}
              variant="primary"
              className="d-flex align-items-center gap-2"
              onClick={() => {
                setShow(true)
              }}
            >
              <i className="ri-bar-chart-2-line fs-18 lh-1"></i> Add Tank
            </Button>
          </div>
        </div>

        <Modal show={nozzleModal} onHide={handleCloseAddNozzle} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Nozzle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Nozzle Name</h6>
                </Col>
                <Col md>
                  <Form.Control name="NozzleName" onChange={onChangeNozzle} type="text" />
                </Col>
                <Col md>
                  <h6>Initial Reading</h6>
                </Col>
                <Col md>
                  <Form.Control name="Reading" onChange={onChangeNozzle} type="text" />
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddNozzle}>
              Close
            </Button>
            <Button variant="primary" onClick={onSubmitNozzle}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Tank</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Tank Number</h6>
                </Col>
                <Col md>
                  <Form.Control name="TankNumber" onChange={onChangeHandler} type="text" />
                </Col>
                <Col md>
                  <h6>Volume</h6>
                </Col>
                <Col md>
                  <Form.Control name="Volume" onChange={onChangeHandler} type="text" />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Product</h6>
                </Col>
                <Col md>
                  <Select
                    isDisabled={false}
                    isSearchable={true}
                    name="color"
                    options={fuelData}
                    onChange={ChangeSelect}
                  />
                </Col>
                <Col md>
                  <h6>Initial Quantity</h6>
                </Col>
                <Col md>
                  <Form.Control
                    name="Quantity"
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Agent 1"
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
                    name="note"
                    onChange={onChangeHandler}
                    as="textarea"
                    rows="3"
                    placeholder="Enter tagline"
                  />
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
        <Row className="g-3">
          {tanks.map((item, index) => (
            <Col xs="6" md="3" xl="3" key={index}>
              <Card className="card-one card-product">
                <Card.Body className="p-3 ">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex p-1">
                      <i className="ri-database-2-line"></i>
                      <h6>TANK No.{index + 1}</h6>
                    </div>
                    <Button
                      className="p-1"
                      variant="white"
                      onClick={() => {
                        setNozzleModal(true)
                        setTankID(item._id)
                      }}
                    >
                      <i class="ri-gas-station-fill"></i>
                    </Button>
                  </div>

                  <GaugeChart
                    id="gauge-chart5"
                    textColor={'#000000'}
                    needleColor={'gray'}
                    cornerRadius={0}
                    nrOfLevels={420}
                    arcsLength={[0.1, 0.2, 0.45, 0.15, 0.1]}
                    colors={['red', 'orange', 'yellow', 'green', 'red']}
                    percent={item.Quantity / item.Volume}
                    arcPadding={0.02}
                  />
                  <div className="d-flex justify-content-between">
                    <div className="p-1" style={{ textAlign: 'center' }}>
                      <h6 style={{ fontWeight: 'bold' }}>{item.Product}</h6>
                    </div>
                    <div className="p-1" style={{ textAlign: 'center' }}>
                      <h6 style={{ fontWeight: 'bold' }} className={'text-success'}>
                        {item.Quantity}/{item.Volume}
                      </h6>
                    </div>
                    {/* <div className="bg-secondary" style={{ textAlign: 'center' }}>
                      <h6>TANK No.{index + 1}</h6>
                    </div> */}
                  </div>

                  {nozzle.map((nitem) => {
                    return (
                      <div className="d-flex">
                        {nitem.FuelId == item._id ? (
                          <div className=" d-flex justify-content-between w-100">
                            <h6>
                              <i class="ri-gas-station-fill"></i> Nozzle : {nitem.NozzleName}
                            </h6>
                            <h6>{nitem.Reading}</h6>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}

                  {/* <div className="d-flex justify-content-between w-100">
                    <div className="d-flex justify-content-center align-content-center">
                      <p className="m-2" style={{ fontSize: '11px', flexWrap: 'wrap' }}>
                        Nozzle Name 1 :
                      </p>{' '}
                      <b className="p-1">000012 </b>
                    </div>
                    <div className="d-flex justify-content-center align-content-center">
                      <p className="m-2" style={{ fontSize: '11px', flexWrap: 'wrap' }}>
                        Nozzle Name 1 :
                      </p>{' '}
                      <b className="p-1">000012 </b>
                    </div>                  
                  </div> */}
                  {/* <div className="d-flex justify-content-between w-100">
                    <div className="d-flex justify-content-center align-content-center">
                      <p className="m-2" style={{ fontSize: '11px', flexWrap: 'wrap' }}>
                        Nozzle Name 1 :
                      </p>{' '}
                      <b className="p-1">000012 </b>
                    </div>
                    <div className="d-flex justify-content-center align-content-center">
                      <p className="m-2" style={{ fontSize: '11px', flexWrap: 'wrap' }}>
                        Nozzle Name 1 :
                      </p>{' '}
                      <b className="p-1">000012 </b>
                    </div>
                  </div> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Footer />
      </div>
    </React.Fragment>
  )
}
