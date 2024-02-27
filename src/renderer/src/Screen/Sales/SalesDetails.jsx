import { React, useEffect, useState, useRef } from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import {
  Button,
  Card,
  Dropdown,
  Offcanvas,
  ButtonGroup,
  CardBody,
  Modal,
  Table
} from 'react-bootstrap'
import { Grid } from 'gridjs-react'
import { _ } from 'gridjs-react'
import { Link, useNavigate } from 'react-router-dom'
import mainservice from '../../Services/mainservice'
import { pumpInfo } from '../../store/pump'
import { useSelector, useDispatch } from 'react-redux'
import { useReactToPrint } from 'react-to-print'

function SalesAndBilling() {
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loginedUser)
  const pump = useSelector((state) => state.pumpstore)
  const [skin, setSkin] = useState(currentSkin)
  console.log(pump)
  const navigate = useNavigate()
  // const [user, setUser] = useState("")
  const [data, setData] = useState([])
  const salesData = useSelector((state) => state.pumpstore.SalesAndBilling)

  function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }


  useEffect(() => {
    setData(pump.SalesAndBilling)
  }, [pump])

  const fetchPump = async (id) => {
    const pumpdetails = await mainservice.getPumpById(id)
    if (pumpdetails.data != null) {
      dispatch(pumpInfo(pumpdetails.data.result2))
      console.log(pumpdetails.data.result2)
    }
  }

  const [show, setShow] = useState(false)

  function handleOpen(id) {
    setShow(true)
    getSalesDataById(id)
  }
  const [sale, setSale] = useState({})
  const [product, setProduct] = useState([])
  const [card, setCard] = useState([])
  const [upi, setUpi] = useState([])
  const [creditors, setCreditors] = useState([])
  const [cash, setCash] = useState([{}])

  async function getSalesDataById(id) {
    const res = await mainservice.getSalesAndBillingById(id)
    setSale(res.data.result2)
    setProduct(res.data.result2.Product)
    setCard(res.data.result2.Cardpayment)
    setUpi(res.data.result2.Upipayment)
    setCreditors(res.data.result2.Otherpayment)
    setCash(res.data.result2.Dinomination)
    console.log(res.data.result2)
    setData(salesData)
  }
  function handleClose() {
    setShow(false)
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  useEffect(() => {
    fetchPump(user.PumpId)
  }, [])

  return (
    <>
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-md-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/dashboard/SalesDetails">Sales</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Sales Details
              </li>
            </ol>
            <h4 className="main-title mt-2 mb-0">Sales Details</h4>
          </div>
          <Button
            variant="primary"
            style={{ color: 'white' }}
            className="d-flex align-items-center gap-2"
            onClick={() => navigate('/dashboard/addSales')}
          >
            <i className="ri-shopping-cart-line"></i>Add Sales
            <span className="d-none d-sm-inline"></span>
          </Button>
        </div>
        <Card>
          <Card.Body>
            <Grid
              data={
                salesData
                  ? data.slice().reverse().map((item) => [
                    '#' + item.serialNumber,
                    formatDate(item.Date),
                    item.Employee,
                    item.Shift,
                    item.TotalAmount,
                    _(
                      <>
                        <ButtonGroup>
                          <Button size="sm" variant="white" onClick={() => handleOpen(item.ID)}>
                            <i className="ri-eye-line"></i>
                          </Button>
                          {/* <Button className="p-0" variant="white">
                                                <Dropdown drop="end">
                                                    <Dropdown.Toggle variant="white" size="sm" className="btn-no-outline">
                                                        <i className="ri-more-2-fill" color="primary"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => navigate(`/dashboard/addSales/?id=${item._id}`)}>Edit</Dropdown.Item>
                                                        <Dropdown.Item style={{ color: "red" }} oncClick={() => onDeleteHandler(item)}>Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Button> */}
                        </ButtonGroup>
                      </>
                    )
                  ])
                  : []
              }
              columns={['BillNumber', 'Date', 'Employee', 'Shift', 'Total Sales Amount', 'Action']}
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

        <Modal style={{ minWidth: '1200px' }} show={show} onHide={handleClose} size="lg" centered>
          <Modal.Body style={{ padding: '30px', minHeight: '700px' }} ref={componentRef}>
            <div className="m-3">
              <div style={{ fontWeight: 'bold', fontSize: '30px', textAlign: 'center' }}>
                {pump.PumpName}
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>
                {pump.Address}
              </div>
              <div style={{ fontSize: '12px', textAlign: 'center' }}>
                Phone No : {pump.PhoneNumber}
              </div>
            </div>
            <div className="d-flex border p-2">
              <div className="w-50">
                <div></div>
                <div>
                  Employye Name : <b>{sale.Employee}</b>
                </div>
                <div>
                  Shift : <b>{sale.Shift}</b>
                </div>
              </div>
              <div className="w-50">
                <div className="w-100" style={{ textAlign: 'right' }}>
                  Date : <b>{formatDate(sale.Date)}</b>
                </div>
                <div className="w-100" style={{ textAlign: 'right' }}>
                  Sales Number : <b>{'#' + sale.serialNumber}</b>
                </div>
              </div>
            </div>
            <div className="p-2"></div>
            <div className=" w-100"></div>
            <div className="w-100">
              <h6>Products</h6>
              <Table style={{ marginTop: '10px' }} striped bordered size="sm" className="mb-0">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Nozzle Id</th>
                    <th scope="col">Opening</th>
                    <th scope="col">Closing</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((x) => {
                    return (
                      <tr>
                        <th scope="row">{x.Product}</th>
                        <td>{x.NozzleName}</td>
                        <td>{x.Opening}</td>
                        <td>{x.Closing}</td>
                        <td>{x.Quantity}</td>
                        <td>{x.Price}</td>
                        <td>{x.Amount}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
            <div className="d-flex">
              <div style={{ height: '100%', flexWrap: 'wrap' }} className=" d-flex w-70">
                <div className="w-50 ">
                  <h6 style={{ marginTop: '20px' }} >Card Payment</h6>
                  <Table striped bordered size="sm" className="mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Machine ID</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {card.map((x) => {
                        return (
                          <tr>
                            <th scope="row">{x.Machine}</th>
                            <td>{x.Price}</td>
                          </tr>)
                      })}
                    </tbody>
                  </Table>
                </div>
                <div style={{ paddingLeft: '20px' }} className="  w-50 ">
                  <h6 style={{ marginTop: '20px' }}>UPI Payment</h6>
                  <Table striped bordered size="sm" className="mb-0">
                    <thead>
                      <tr>
                        <th scope="col">UPI Method</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upi.map((x) => {
                        return (
                          <tr>
                            <th scope="row">{x.Method}</th>
                            <td>{x.Price}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
                <div className=" w-100 ">
                  <h6 style={{ marginTop: '20px' }} >Creditors</h6>
                  <Table striped bordered size="sm" className="mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Creditor</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {creditors.map((x) => {
                        return (
                          <tr>
                            <th scope="row">{x.Method}</th>
                            <td>{x.Price}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div style={{ paddingLeft: '20px' }} className="w-30">
                <h6 style={{ marginTop: '20px' }} >Dinomination</h6>
                <Table striped bordered size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Cash</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">2000</th>
                      <td>{cash[0].TwoK}</td>
                    </tr>
                    <tr>
                      <th scope="row">500</th>
                      <td>{cash[0].FiveH}</td>
                    </tr>
                    <tr>
                      <th scope="row">200</th>
                      <td>{cash[0].TwoH}</td>
                    </tr>
                    <tr>
                      <th scope="row">100</th>
                      <td>{cash[0].OneH}</td>
                    </tr>
                    <tr>
                      <th scope="row">50</th>
                      <td>{cash[0].FiveT}</td>
                    </tr>
                    <tr>
                      <th scope="row">20</th>
                      <td>{cash[0].TwoT}</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td>{cash[0].Ten}</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>{cash[0].Five}</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>{cash[0].Two}</td>
                    </tr>
                    <tr>
                      <th scope="row">1</th>
                      <td>{cash[0].One}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="d-flex">
              <div className=" d-flex w-50">
                <div style={{ minHeight: '120px' }} className="w-100 border m-3">
                  {' '}
                  <p style={{ fontSize: '11px', padding: '10px' }}>Note</p>
                </div>
              </div>
              <div style={{ height: '100%', flexWrap: 'wrap' }} className=" d-flex w-50">
                <div className="w-100 ">
                  <h6 style={{ marginTop: '20px' }} > Summary </h6>
                  <Table striped bordered size="sm" className="mb-0">
                    <tbody>
                      <tr>
                        <th scope="row">Total Amount</th>
                        <td>{sale.TotalAmount}</td>
                      </tr>
                      <tr>
                        <th scope="row">Creditors</th>
                        <td>{sale.Credit}</td>
                      </tr>
                      <tr>
                        <th scope="row">Total Received</th>
                        <td>{sale.TotalAmountRec}</td>
                      </tr>
                      <tr>
                        <th scope="row">Excess Amount</th>
                        <td>{sale.ExcessAmount}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ color: 'white' }} variant="danger" onClick={handlePrint}>
              Print
            </Button>
            <Button style={{ color: 'white' }} variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
export default SalesAndBilling
