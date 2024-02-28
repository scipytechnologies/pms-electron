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
import { useSearchParams } from 'react-router-dom'

function PaymentHistory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState([])
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loginedUser)
  const pump = useSelector((state) => state.pumpstore)
  const [skin, setSkin] = useState(currentSkin)
  console.log(pump)
  const navigate = useNavigate()
  // const [user, setUser] = useState("")



  const [show, setShow] = useState(false)
  const [customer, setCustomer] = useState({})
  const [item, setItem] = useState({})

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  async function handleOpen(item) {
    setShow(true)
    console.log(item)
    const customer = await mainservice.getCustomerById(item.CustomerID)
    if (customer.data != null) {
      setCustomer(customer.data.result2)
      setItem(item)
    }
    // get customer by customer ID and display bill
  }
  const [sale, setSale] = useState({})
  const [product, setProduct] = useState([])
  const [card, setCard] = useState([])
  const [upi, setUpi] = useState([])
  const [creditors, setCreditors] = useState([])
  const [cash, setCash] = useState([{}])

  async function getCreditPayment(id) {
    const res = await mainservice.getCreditPayment(id)
    // console.log(res.data.result)
    setData(res.data.result)
    Redirecthandler(res.data.result)
  }
  function handleClose() {
    setShow(false)
  }

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  async function Redirecthandler(data) {
    const myParam = searchParams.get('redirect')
    if (myParam) {
      const id = searchParams.get('id')
      const item = await data.filter((x) => x._id == id)
      console.log(item);
      handleOpen(item[0])
    }
  }
  useEffect(() => {
    getCreditPayment(user.PumpId)
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
                <Link to="/dashboard/SalesDetails"> Credit Payment</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Sales Details
              </li>
            </ol>
            <h4 className="main-title mt-2 mb-0">Payment History</h4>
          </div>
          <Button
            style={{ color: 'white' }}
            variant="primary"
            className="d-flex align-items-center gap-2"
            onClick={() => navigate('/dashboard/Customer/CustomerDetails')}
          >
            <i className="ri-user-search-fill"></i>View Customer
            <span className="d-none d-sm-inline"></span>
          </Button>
        </div>
        <Card>
          <Card.Body>
            <Grid
              data={data.slice().reverse().map((item) => [
                item.serialNumber,
                formatDate(item.createdAt),
                item.Customer,
                item.Amount,
                item.Balance,
                _(
                  <>
                    <ButtonGroup>
                      <Button size="sm" variant="white" onClick={() => handleOpen(item)}>
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
              ])}
              columns={['Bill No.', 'Date', 'Customer', 'Paid Amount', 'Balance', 'Action']}
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
            <div className="d-flex p-2">
              <div className="w-50">
                <div></div>
                <div>Customer details :</div>
                <div className="mt-2">
                  <b>{customer.Name}</b> <br />
                  {customer.Address}
                  <br />
                  Mobile Number : {customer.MobileNo}
                  <br />
                  Email : {customer.EmailID}
                  <br />
                </div>
                <div className="mt-2">
                  Date :
                  <b>
                    {formatDate(item.createdAt)}
                  </b>
                </div>  
              </div> 
              <div className="w-50">
                <div className="m-3 border p-2">
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
              </div>
            </div>
            <div className="w-100 border mt-4 p-2">
              <div>
                <Table>
                  <tr>
                    <th>Title</th>
                    <th>Credit</th>
                    <th>Received</th>
                    <th>Balance</th>
                  </tr>
                  <tr>
                    <td>Total Pending Credit Amount to Pay</td>
                    <td>{parseInt(item.Amount) + parseInt(item.Balance)}</td>
                    <td></td>
                    <td>{parseInt(item.Amount) + parseInt(item.Balance)}</td>
                  </tr>
                  <tr>
                    <td> Amount Recieved</td>
                    <td></td>
                    <td>{item.Amount}</td>
                    <td>{item.Balance}</td>
                  </tr>
                </Table>
              </div>
              <div className="d-flex justify-content-end pe-5 ">
                <Table
                  bordered
                  style={{ fontSize: '18px', backgroundColor: 'lightgray' }}
                  className="w-40"
                >
                  <tr>
                    <td>Balance</td>
                    <th>{item.Balance}</th>
                  </tr>
                </Table>
              </div>
              <div className="d-flex justify-content-center ">
                {' '}
                <p style={{ fontSize: '9px' }}>This is a computer generated Invoice</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handlePrint}>
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
export default PaymentHistory
