import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row, Form, Nav, Card, Button, Table, Modal, Tab, ListGroup } from 'react-bootstrap'

import Footer from '../../layouts/Footer'
import HeaderMobile from '../../layouts/HeaderMobile'
import Avatar from '../../components/Avatar'

import img8 from '../../assets/img/img8.jpg'
import img9 from '../../assets/img/img9.jpg'
import img10 from '../../assets/img/img10.jpg'
import img11 from '../../assets/img/img11.jpg'
import img14 from '../../assets/img/img14.jpg'
import Header from '../../layouts/Header'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import mainservice from '../../Services/mainservice'
import { pumpInfo } from '../../store/pump'


export default function PostSales() {
  const navigate = useNavigate()
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const [skin, setSkin] = useState(currentSkin)
  const dispatch = useDispatch()
  const employees = useSelector((state) => state.pumpstore.Employee)
  const user = useSelector((state) => state.loginedUser)
  const nozzle = useSelector((state) => state.pumpstore.Nozzle)
  const tank = useSelector((state) => state.pumpstore.Tank)
  const fuel = useSelector((state) => state.pumpstore.Fuel)
  const card = useSelector((state) => state.pumpstore.CardPayment)
  const upi = useSelector((state) => state.pumpstore.UPIPayment)
  const creditors = useSelector((state) => state.pumpstore.Customer)
  

  const CustomerOptions = (x) => {
    return x.map((y) => {
      const { CustomerName } = y
      return { label: CustomerName, value: CustomerName }
    })
  }

  const UpiOptions = (upis) => {
    return upis.map((upi) => {
      const { Name } = upi
      return { label: Name, value: Name }
    })
  }

  const EmployeeOptions = (employees) => {
    return employees.map((employee) => {
      const { EmployeeName, EmployeeId } = employee
      return { label: EmployeeName, value: EmployeeId }
    })
  }
  const CardPaymentOptions = (cardPayments) => {
    return cardPayments.map((cardPayment) => {
      const { Name } = cardPayment
      return { label: Name, value: Name }
    })
  }

  const NozzleOptions = (nozzles) => {
    return nozzles.map((nozzle) => {
      const { NozzleName, _id } = nozzle
      return { label: NozzleName, value: _id }
    })
  }
  const creditorData = CustomerOptions(creditors)
  const CardPaymentData = CardPaymentOptions(card)
  const NozzleData = NozzleOptions(nozzle)
  const EmployeeData = EmployeeOptions(employees)
  const UpiData = UpiOptions(upi)

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
      NozzleId: '',
      Opening: 0,
      Closing: 0,
      Price: 0,
      Product: '',
      Quantity: 0,
      Amount: 0,
      NozzleName: ''
    }
  ])

  const [fields2, setFields2] = useState([
    {
      Machine: '',
      Price: 0
    }
  ])
  const [fields3, setFields3] = useState([
    {
      UPIProvider: '',
      Price: 0
    }
  ])
  const [fields4, setFields4] = useState([
    {
      Method: '',
      Price: 0
    }
  ])
  const [TotalSalesAmount, setTotalSalesAmount] = useState(0)
  function calculateTotals() {
    let sum = 0
    fields.map((item) => {
      sum = sum + parseInt(item.Amount)
    })
    setTotalSalesAmount(sum)
  }

  const handleAddField = () => {
    const newItem = {
      NozzleId: '',
      Opening: 0,
      Closing: 0,
      Quantity: 0,
      Amount: 0
    }
    setFields([...fields, newItem])
  }
  const handleAddField2 = () => {
    const newItem = {
      Machine: '',
      Price: 0
    }
    setFields2([...fields2, newItem])
    calculateTotals()
  }
  const handleAddField3 = () => {
    const newItem = {
      UPIProvider: '',
      Price: 0
    }
    setFields3([...fields3, newItem])
    calculateTotals()
  }
  const handleAddField4 = () => {
    const newItem = {
      Method: '',
      Price: 0
    }
    setFields4([...fields4, newItem])
    calculateTotals()
  }

  const handleRemoveField = (index) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
  }

  const handleRemoveField2 = (index) => {
    const newFields = [...fields2]
    newFields.splice(index, 1)
    setFields2(newFields)
    calculateTotals()
  }
  const handleRemoveField3 = (index) => {
    const newFields = [...fields3]
    newFields.splice(index, 1)
    setFields3(newFields)
    calculateTotals()
  }
  const handleRemoveField4 = (index) => {
    const newFields = [...fields4]
    newFields.splice(index, 1)
    setFields4(newFields)
    calculateTotals()
  }
  const handleChangeField = (index, event) => {
    const { name, value } = event.target
    const newFields = [...fields]
    newFields[index][name] = value

    // Calculate TotalPrice for the current row
    if (name === 'Closing') {
      newFields[index].Quantity = newFields[index].Closing - newFields[index].Opening
      newFields[index].Amount = (newFields[index].Quantity * newFields[index].Price).toFixed(2)
    }
    if (name === 'NozzleId') {
      const opening = nozzle.filter((x) => x._id == value)
      const Tank = tank.filter((x) => x._id == opening[0].FuelId)
      const Fuel = fuel.filter((x) => x._id == Tank[0].ProductCode)
      newFields[index]['Product'] = Fuel[0].FuelName
      newFields[index]['Price'] = Fuel[0].FuelPricePerLitre
      newFields[index]['Opening'] = opening[0].Reading
      newFields[index]['NozzleName'] = opening[0].NozzleName

    }
    setFields(newFields)
    console.log(fields);
    TotalReceivedAmount()
  }
  const [cardsAmount, setCardsAmount] = useState(0)
  function TotalsInCards() {
    let sum = 0
    fields2.map((item) => {
      sum = sum + parseInt(item.Price)
    })
    setCardsAmount(sum)
    TotalReceivedAmount()
  }
  const handleChangeField2 = (index, event) => {
    const { name, value } = event.target
    const newFields = [...fields2]
    newFields[index][name] = value
    setFields2(newFields)
    TotalsInCards()
    TotalReceivedAmount()
  }
  const [upisAmount, setUPIsAmount] = useState(0)
  function TotalsInUPI() {
    let sum = 0
    fields3.map((item) => {
      sum = sum + parseInt(item.Price)
    })
    setUPIsAmount(sum)
    TotalReceivedAmount()
  }
  const handleChangeField3 = (index, event) => {
    const { name, value } = event.target
    const newFields = [...fields3]
    newFields[index][name] = value
    setFields3(newFields)
    TotalsInUPI()
  }
  const [othersAmount, setOthersAmount] = useState(0)
  function TotalsInOthers() {
    let sum = 0
    fields4.map((item) => {
      sum = sum + parseInt(item.Price)
    })
    setOthersAmount(sum)
    TotalReceivedAmount()
  }
  const handleChangeField4 = (index, event) => {
    const { name, value } = event.target
    const newFields = [...fields4]
    newFields[index][name] = value
    setFields4(newFields)
    TotalsInOthers()
  }

  const [show, setShow] = useState(false)
  const [cardshow, setCard] = useState(false)
  const [showupi, setUpi] = useState(false)

  function handleCardClose() {
    setCard(false)
  }

  function handleUpiClose() {
    setUpi(false)
  }

  function handleClose() {
    setShow(false)
    // setTwok(0)
    // setfiveh(0)
    // settwoh(0)
    // setoneh(0)
    // setfivet(0)
    // settwot(0)
    // setten(0)
    // setfive(0)
    // settwo(0)
    // setone(0)
    // setTotalCash(0)
    // setReceivedAmount(0)
  }

  function clearData() {
    // setShow(false)
    setTwok(0)
    setfiveh(0)
    settwoh(0)
    setoneh(0)
    setfivet(0)
    settwot(0)
    setten(0)
    setfive(0)
    settwo(0)
    setone(0)
    setTotalCash(0)
    setReceivedAmount(0)
    setUPIsAmount(0)
    setOthersAmount(0)
    setCardsAmount(0)
    setCash({
      TwoK: 0,
      FiveH: 0,
      TwoH: 0,
      OneH: 0,
      FiveT: 0,
      TwoT: 0,
      Ten: 0,
      Five: 0,
      Two: 0,
      One: 0
    })
    setFields2([
      {
        Machine: '',
        Price: 0
      }
    ])
    setFields3([
      {
        UPIProvider: '',
        Price: 0
      }
    ])
    setFields4([
      {
        Method: '',
        Price: 0
      }
    ])
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [cash, setCash] = useState({})
  const [twok, setTwok] = useState(0)
  const [fiveh, setfiveh] = useState(0)
  const [twoh, settwoh] = useState(0)
  const [oneh, setoneh] = useState(0)
  const [fivet, setfivet] = useState(0)
  const [twot, settwot] = useState(0)
  const [ten, setten] = useState(0)
  const [five, setfive] = useState(0)
  const [two, settwo] = useState(0)
  const [one, setone] = useState(0)

  const onChangeHandler = (event) => {
    setCash({
      ...cash,
      [event.target.name]: event.target.value
    })
    if (event.target.name == 'TwoK') {
      setTwok(event.target.value * 2000)
    }
    if (event.target.name == 'FiveH') {
      setfiveh(event.target.value * 500)
    }
    if (event.target.name == 'TwoH') {
      settwoh(event.target.value * 200)
    }
    if (event.target.name == 'OneH') {
      setoneh(event.target.value * 100)
    }
    if (event.target.name == 'FiveT') {
      setfivet(event.target.value * 50)
    }
    if (event.target.name == 'TwoT') {
      settwot(event.target.value * 20)
    }
    if (event.target.name == 'Ten') {
      setten(event.target.value * 10)
    }
    if (event.target.name == 'Five') {
      setfive(event.target.value * 5)
    }
    if (event.target.name == 'Two') {
      settwo(event.target.value * 2)
    }
    if (event.target.name == 'One') {
      setone(event.target.value * 1)
    }
    console.log(cash)
  }
  const [totalCash, setTotalCash] = useState(0)

  function CalculateCash() {
    setTotalCash(one + two + five + ten + oneh + twot + fivet + fiveh + twoh + twok)
    // TotalReceivedAmount()
  }

  const [receivedAmount, setReceivedAmount] = useState(0)
  function TotalReceivedAmount() {
    setReceivedAmount(totalCash + cardsAmount + upisAmount + othersAmount)
  }
  const [excessAmount, setExcessAmount] = useState(0)
  function CalculateExcessAmount() {
    setExcessAmount(receivedAmount - TotalSalesAmount)
  }

  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const ChangeHandler = (selectedOption) => {
    setSelectedEmployee(selectedOption)
  }
  const [form, setForm] = useState({})
  const onChangeHandlerbasic = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
    console.log(form)
  }




  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const data = {
      Employee: selectedEmployee.label,
      EmployeeId: selectedEmployee.value,
      Shift: form.Shift,
      TotalAmount: TotalSalesAmount,
      PumpId: user.PumpId,
      ExcessAmount: excessAmount,
      Date: form.Date,
      Product: fields,
      Dinomination: cash,
      CardPayment: fields2,
      UpiPayment: fields3,
      OthersPayment: fields4,
      TotalAmountRec: receivedAmount,
      Credit: othersAmount
    }
    console.log(data)

    const res = await mainservice.createSalesAndBilling(user.PumpId, data)
    if (res.data != null) {
      navigate('/dashboard/Sales/SalesDetails')
    } else {
      console.log(res)
    }
  }

  switchSkin(skin)
  useEffect(() => {
    switchSkin(skin)
  }, [skin])

  useEffect(() => {
    CalculateCash()
  }, [one, two, five, ten, oneh, twot, fivet, fiveh, twoh, twok])

  useEffect(() => {
    calculateTotals()
  }, [fields])

  useEffect(() => {
    TotalReceivedAmount()
  }, [
    one,
    two,
    five,
    ten,
    oneh,
    twot,
    fivet,
    fiveh,
    twoh,
    twok,
    cardsAmount,
    totalCash,
    upisAmount,
    othersAmount
  ])

  useEffect(() => {
    CalculateExcessAmount()
  }, [receivedAmount, TotalSalesAmount])


  

  //cardpost
  const [cardform, setcardform] =  useState({ CardPayment: { Name: '' } });
  const onChangeHandlercard = (event) => {
    const { name, value } = event.target;
    setcardform({
      ...cardform,
      CardPayment: {
        ...cardform.CardPayment,
        [name]: value,
      },
    })
  }
  const onSubmitHandlercard = async (event) => {
    event.preventDefault()
    console.log("card",cardform);
      try {
      const res = await mainservice.createCardPayment(cardform, user.PumpId);
      console.log("hi", user.PumpId);
      console.log(res)

      if (res.data != null) {
        console.log("result",res.data);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error('Error submitting card payment:', error);
    }
  }

  
  //upipost
  const [upiform, setupiform] = useState({ UPIPayment: { Name: '' } });
  const onChangeHandlerupi = (event) => {
    const { name, value } = event.target;
    setupiform({
      ...upiform,
      UPIPayment: {
        ...cardform.UPIPayment,
        [name]: value,
      },
    })
  }
  const onSubmitHandlerupi = async (event) => {
    event.preventDefault()
    console.log(upiform);
    const res = await mainservice.createUPIPayment(upiform, user.PumpId)
    console.log("hi",user.PumpId)
    if (res.data != null) {
      console.log(res.data)
    } else {
      console.log(res)
    }
  }

  return (
    <React.Fragment>
      <Header onSkin={setSkin} />
      <div style={{ marginTop: '50px' }} className="main p-4 p-lg-5">
        <ol className="breadcrumb fs-sm mb-2">
          <li className="breadcrumb-item">
            <Link to="#">dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">Sales</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Sales
          </li>
        </ol>
        <h2 className="main-title">Add Sales</h2>

        <Card className="card-settings">
          {/* <Card.Header>
            <Card.Title>Create a New Sales</Card.Title>
            <Card.Text>short Description</Card.Text>
          </Card.Header> */}
          <Card.Body className="p-0">
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Employee</h6>
                </Col>
                <Col md>
                  <Select
                    isDisabled={false}
                    isSearchable={true}
                    name="color"
                    options={EmployeeData}
                    onChange={ChangeHandler}
                  />
                </Col>
                <Col md>
                  <h6>Shift</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="text"
                    placeholder="Choose Shift"
                    name="Shift"
                    onChange={onChangeHandlerbasic}
                  />
                </Col>
                <Col md>
                  <h6>Date</h6>
                </Col>
                <Col md>
                  <Form.Control
                    type="Date"
                    placeholder="Date"
                    name="Date"
                    onChange={onChangeHandlerbasic}
                  />
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
        <Card className="card-settings mt-4">
          <Card.Header>
            <Card.Title>Nozzle Details</Card.Title>
            <Card.Text>short Description</Card.Text>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="setting-item">
              <Row className="g-2">
                <div>
                  <Row className="g-2 align-items-center">
                    <Col md>
                      <Table size="sm" borderless className="mb-0" hover>
                        <thead>
                          <tr>
                            <th scope="col">Nozzle</th>
                            <th scope="col">Opening</th>
                            <th scope="col">Closing</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Amount</th>
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
                                        isDisabled={false}
                                        isSearchable={true}
                                        name="color"
                                        options={NozzleData}
                                        onChange={(event) =>
                                          handleChangeField(index, {
                                            target: { name: 'NozzleId', value: event.value }
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
                                        name="Opening"
                                        value={field.Opening}
                                        disabled={true}
                                        onChange={(event) => handleChangeField(index, event)}
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="mt-2">
                                    <div key={index}>
                                      <Form.Control
                                        type="text"
                                        name="Closing"
                                        value={field.Closing}
                                        onChange={(event) => handleChangeField(index, event)}
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
                                        value={field.Quantity}
                                        disabled={true}
                                        onChange={(event) => handleChangeField(index, event)}
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="mt-2">
                                    <div key={index}>
                                      <Form.Control
                                        type="text"
                                        name="Amount"
                                        value={field.Amount}
                                        disabled={true}
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
                          <Button onClick={handleAddField}>
                            <i class="ri-add-circle-fill"></i> Add Item
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
                  <h6>Total Sales Amount</h6>
                  <h5>{TotalSalesAmount.toFixed(2)}</h5>
                </Col>
                <Col md>
                  <h6>Amount Received</h6>
                  <div className="d-flex">
                    <h5 style={{ marginRight: '200px' }}>{receivedAmount.toFixed(2)}</h5>
                    <Button
                      variant="primary"
                      className="d-flex align-items-center gap-2"
                      onClick={() => setShow(true)}
                    >
                      Add Amount
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
        <Card className="card-settings mt-4">
          <Card.Body className="p-0">
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col className="d-flex justify-content-end p-2">
                  <div style={{ textAlign: 'right' }}>
                    <h4>
                      <b>Summary</b>
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h6>Grand Total :</h6>
                      <h6>
                        <b>{TotalSalesAmount.toFixed(2)}/-</b>
                      </h6>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h6 style={{ paddingRight: '20px' }}>Total Amount Received :</h6>
                      <h6>
                        <b>{receivedAmount.toFixed(2)}/-</b>
                      </h6>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h6>Credit Amount :</h6>
                      <h6>
                        <b>{othersAmount.toFixed(2)}/-</b>
                      </h6>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h6>Excess Amount :</h6>
                      <h6>
                        <b>{excessAmount.toFixed(2)}/-</b>
                      </h6>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
        <Card className="card-settings mt-4">
          <Card.Body className="p-0">
            <div className="setting-item d-flex justify-content-end">
              <Button
                variant="primary"
                className="d-flex align-items-center gap-2"
                onClick={onSubmitHandler}
              >
                <i className="ri-bar-chart-2-line fs-18 lh-1"></i> Save
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>Cash Management</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="1">Cash</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="2">Credit / Debit Cards</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="3">UPI</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="4">Others</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="1">
                      <Card className="card-settings mt-4">
                        <Card.Header>
                          <Card.Title>Tank Details</Card.Title>
                          <Card.Text>
                            Debitis aut rerum necessitatibus saepe eveniet ut et voluptates.
                          </Card.Text>
                        </Card.Header>
                        <Card.Body>
                          <ListGroup>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>2000 x </h5>
                              </div>
                              <Form.Control
                                style={{ width: '200px' }}
                                type="text"
                                placeholder="Rs.0.0/-"
                                name="TwoK"
                                value={cash.TwoK}
                                onChange={onChangeHandler}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  width: '60px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>=</h5>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'start',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>{twok}</h5>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>500 x </h5>
                              </div>
                              <Form.Control
                                style={{ width: '200px' }}
                                type="text"
                                placeholder="Rs.0.0/-"
                                name="FiveH"
                                value={cash.FiveH}
                                onChange={onChangeHandler}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  width: '60px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>=</h5>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'start',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>{fiveh}</h5>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>200 x </h5>
                              </div>
                              <Form.Control
                                style={{ width: '200px' }}
                                type="text"
                                placeholder="Rs.0.0/-"
                                name="TwoH"
                                value={cash.TwoH}
                                onChange={onChangeHandler}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  width: '60px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>=</h5>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'start',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>{twoh}</h5>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>100 x </h5>
                              </div>
                              <Form.Control
                                style={{ width: '200px' }}
                                type="text"
                                placeholder="Rs.0.0/-"
                                name="OneH"
                                value={cash.OneH}
                                onChange={onChangeHandler}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  width: '60px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>=</h5>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'start',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>{oneh} </h5>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>50 x </h5>
                              </div>
                              <Form.Control
                                style={{ width: '200px' }}
                                type="text"
                                placeholder="Rs.0.0/-"
                                name="FiveT"
                                value={cash.FiveT}
                                onChange={onChangeHandler}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  width: '60px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>=</h5>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'start',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>{fivet} </h5>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>20 x </h5>
                              </div>
                              <Form.Control
                                style={{ width: '200px' }}
                                type="text"
                                placeholder="Rs.0.0/-"
                                name="TwoT"
                                value={cash.TwoT}
                                onChange={onChangeHandler}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  width: '60px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>=</h5>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'start',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>{twot}</h5>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>10 x </h5>
                              </div>
                              <Form.Control
                                style={{ width: '200px' }}
                                type="text"
                                placeholder="Rs.0.0/-"
                                name="Ten"
                                value={cash.Ten}
                                onChange={onChangeHandler}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  width: '60px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>=</h5>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'start',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>{ten}</h5>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>5 x </h5>
                              </div>
                              <Form.Control
                                style={{ width: '200px' }}
                                type="text"
                                placeholder="Rs.0.0/-"
                                name="Five"
                                value={cash.Five}
                                onChange={onChangeHandler}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  width: '60px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>=</h5>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'start',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>{five}</h5>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>2 x </h5>
                              </div>
                              <Form.Control
                                style={{ width: '200px' }}
                                type="text"
                                placeholder="Rs.0.0/-"
                                name="Two"
                                value={cash.Two}
                                onChange={onChangeHandler}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  width: '60px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>=</h5>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'start',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>{two}</h5>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>1 x </h5>
                              </div>
                              <Form.Control
                                style={{ width: '200px' }}
                                type="text"
                                placeholder="Rs.0.0/-"
                                name="One"
                                value={cash.One}
                                onChange={onChangeHandler}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  width: '60px',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>=</h5>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '200px',
                                  justifyContent: 'start',
                                  alignItems: 'center'
                                }}
                              >
                                <h5>{one}</h5>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '100%',
                                  justifyContent: 'end',
                                  alignItems: 'center',
                                  padding: '5px'
                                }}
                              >
                                <h5>Total : {totalCash}/- </h5>
                              </div>
                            </ListGroup.Item>
                          </ListGroup>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="2">
                      <Card className="card-settings mt-4">
                        <div className="d-flex justify-content-end gap-2 mt-3 mt-md-0">

                          <Button
                            variant="primary"
                            className="d-flex align-items-center gap-2"
                            onClick={() => {
                              setCard(true)
                            }}
                          >
                            Add Card
                          </Button>
                        </div>
                        <Card.Header>
                          <Card.Title>Tank Details</Card.Title>
                          <Card.Text>
                            Debitis aut rerum necessitatibus saepe eveniet ut et voluptates.
                          </Card.Text>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <div className="setting-item">
                            <Row className="g-2">
                              <div>
                                <Row className="g-2 align-items-center">
                                  <Col md>
                                    <Table size="sm" borderless className="mb-0" hover>
                                      <thead>
                                        <tr>
                                          <th scope="col">Machine</th>
                                          <th scope="col">Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {fields2.map((field, index) => {
                                          return (
                                            <tr>
                                              <td scope="row">
                                                <div className="mt-2">
                                                  <div key={index}>
                                                    <Select
                                                      isDisabled={false}
                                                      isSearchable={true}
                                                      name="color"
                                                      options={CardPaymentData}
                                                      onChange={(event) =>
                                                        handleChangeField2(index, {
                                                          target: {
                                                            name: 'Machine',
                                                            value: event.value
                                                          }
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
                                                      name="Price"
                                                      value={field.Price}
                                                      placeholder="Item Name"
                                                      onChange={(event) =>
                                                        handleChangeField2(index, event)
                                                      }
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
                                                      onClick={() => handleRemoveField2(index)}
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
                                        <Button onClick={handleAddField2}>
                                          <i class="ri-add-circle-fill"></i> Add Item
                                        </Button>
                                      </div>
                                    </Table>
                                  </Col>
                                </Row>
                              </div>
                            </Row>
                          </div>
                          <div className="setting-item">
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '100%',
                                  justifyContent: 'end',
                                  alignItems: 'center',
                                  padding: '5px'
                                }}
                              >
                                <h5>Total : {cardsAmount}/- </h5>
                              </div>
                            </ListGroup.Item>
                          </div>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="3">
                      <Card className="card-settings mt-4">
                        <div className="d-flex justify-content-end gap-2 mt-3 mt-md-0">

                          <Button
                            variant="primary"
                            className="d-flex align-items-center gap-2"
                            onClick={() => {
                              setUpi(true)
                            }}
                          >
                            Add UPI
                          </Button>
                        </div>
                        <Card.Header>
                          <Card.Title>Tank Details</Card.Title>
                          <Card.Text>
                            Debitis aut rerum necessitatibus saepe eveniet ut et voluptates.
                          </Card.Text>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <div className="setting-item">
                            <Row className="g-2">
                              <div>
                                <Row className="g-2 align-items-center">
                                  <Col md>
                                    <Table size="sm" borderless className="mb-0" hover>
                                      <thead>
                                        <tr>
                                          <th scope="col">UPI provider</th>
                                          <th scope="col">Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {fields3.map((field, index) => {
                                          return (
                                            <tr>
                                              <td scope="row">
                                                <div className="mt-2">
                                                  <div key={index}>
                                                    <Select
                                                      isDisabled={false}
                                                      isSearchable={true}
                                                      name="color"
                                                      options={UpiData}
                                                      onChange={(event) =>
                                                        handleChangeField3(index, {
                                                          target: {
                                                            name: 'UPIProvider',
                                                            value: event.value
                                                          }
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
                                                      name="Price"
                                                      value={field.Price}
                                                      placeholder="Price"
                                                      onChange={(event) =>
                                                        handleChangeField3(index, event)
                                                      }
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
                                                      onClick={() => handleRemoveField3(index)}
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
                                        <Button onClick={handleAddField3}>
                                          <i class="ri-add-circle-fill"></i> Add Item
                                        </Button>
                                      </div>
                                    </Table>
                                  </Col>
                                </Row>
                              </div>
                            </Row>
                          </div>
                          <div className="setting-item">
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '100%',
                                  justifyContent: 'end',
                                  alignItems: 'center',
                                  padding: '5px'
                                }}
                              >
                                <h5>Total : {upisAmount}/- </h5>
                              </div>
                            </ListGroup.Item>
                          </div>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="4">
                      <Card className="card-settings mt-4">
                        <Card.Header>
                          <Card.Title>Tank Details</Card.Title>
                          <Card.Text>
                            Debitis aut rerum necessitatibus saepe eveniet ut et voluptates.
                          </Card.Text>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <div className="setting-item">
                            <Row className="g-2">
                              <div>
                                <Row className="g-2 align-items-center">
                                  <Col md>
                                    <Table size="sm" borderless className="mb-0" hover>
                                      <thead>
                                        <tr>
                                          <th scope="col">Method</th>
                                          <th scope="col">Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {fields4.map((field, index) => {
                                          return (
                                            <tr>
                                              <td scope="row">
                                                <div className="mt-2">
                                                  <div key={index}>
                                                    <Select
                                                      isDisabled={false}
                                                      isSearchable={true}
                                                      name="color"
                                                      options={creditorData}
                                                      onChange={(event) =>
                                                        handleChangeField4(index, {
                                                          target: {
                                                            name: 'Method',
                                                            value: event.value
                                                          }
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
                                                      name="Price"
                                                      value={field.Price}
                                                      placeholder="Price"
                                                      onChange={(event) =>
                                                        handleChangeField4(index, event)
                                                      }
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
                                                      onClick={() => handleRemoveField4(index)}
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
                                        <Button onClick={handleAddField4}>
                                          <i class="ri-add-circle-fill"></i> Add Item
                                        </Button>
                                      </div>
                                    </Table>
                                  </Col>
                                </Row>
                              </div>
                            </Row>
                          </div>
                          <div className="setting-item">
                            <ListGroup.Item className="d-flex" style={{ padding: '5px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  width: '100%',
                                  justifyContent: 'end',
                                  alignItems: 'center',
                                  padding: '5px'
                                }}
                              >
                                <h5>Total : {othersAmount}/- </h5>
                              </div>
                            </ListGroup.Item>
                          </div>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Modal.Body>
          <Modal.Footer>
            <div style={{ width: '80%' }}>
              <ListGroup>
                <ListGroup.Item>
                  Total Sales Amount : {TotalSalesAmount}/- <br />
                  Total Received Amount : {receivedAmount}/- <br />
                  Excess Amount :{excessAmount}/- <br />
                </ListGroup.Item>
              </ListGroup>
            </div>
            <Button variant="danger" onClick={clearData}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={cardshow} onHide={handleCardClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Name</h6>
                </Col>
                <Col md>
                  <Form.Control name="Name" onChange={onChangeHandlercard} type="text" placeholder='Name of Card'/>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCardClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSubmitHandlercard}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showupi} onHide={handleUpiClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New UPI</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Name</h6>
                </Col>
                <Col md>
                  <Form.Control name="Name" onChange={onChangeHandlerupi} type="text" placeholder='Name of UPI'/>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUpiClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSubmitHandlerupi}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Footer />
      </div>
    </React.Fragment>
  )
}
