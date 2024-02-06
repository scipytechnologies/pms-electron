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

function ViewProduct() {
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loginedUser)
  const pump = useSelector((state) => state.pumpstore)
  const [skin, setSkin] = useState(currentSkin)
  console.log(pump)
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const productData = useSelector((state) => state.pumpstore.Ecommerce)

  useEffect(() => {
    setData(pump.Ecommerce)
  }, [pump])

  const fetchPump = async (id) => {
    const pumpdetails = await mainservice.getPumpById(id)
    if (pumpdetails.data != null) {
      dispatch(pumpInfo(pumpdetails.data.result2))
      console.log("poda",pumpdetails.data.result2)
    }
  }

  const [show, setShow] = useState(false)

  function handleOpen(id) {
    setShow(true)
    getProductDataById(id)
  }
  const [sale, setSale] = useState({})
  const [product, setProduct] = useState([])

  async function getProductDataById(id) {
    const res = await mainservice.getByIdEcommerce(id)
    setSale(res.data.result2)
    setProduct(res.data.result2.EcommerceSale)
    setData(productData)
  }
  function handleClose() {
    setShow(false)
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
                <Link to="/dashboard/SalesDetails">Product</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Product Details
              </li>
            </ol>
            <h4 className="main-title mt-2 mb-0">Product Details</h4>
          </div>
          <Button
            variant="primary"
            className="d-flex align-items-center gap-2"
            onClick={() => navigate('/dashboard/category')}
          >
            <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Add Product
            <span className="d-none d-sm-inline"></span>
          </Button>
        </div>
        <Card>
          <Card.Body>
            <Grid
              data={
                productData
                  ? data.map((item) => [
                    _(
                      new Date(item.Date).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })
                    ),
                    item.SalesId,
                    item.TotalSaleAmount,
                    _(
                      <>
                        <ButtonGroup>
                          <Button size="sm" variant="white" onClick={() => handleOpen(item.ID)}>
                            <i className="ri-eye-line"></i>
                          </Button>
                        </ButtonGroup>
                      </>
                    )
                  ])
                  : []
              }
              columns={['Date', 'Sales Id', 'TotalSaleAmount', 'Action']}
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
                <div className="w-100" style={{ textAlign: 'left' }}>
                  Date : <b>{new Date(sale.createdAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}</b>
                </div>
              </div>
              <div className="w-50">
                <div className="w-100" style={{ textAlign: 'right' }}>
                  Sales Number : <b>{sale.SalesId}</b>
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
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.ProductName}</th>
                        <td>{item.Price}</td>
                        <td>{item.Quantity}</td>
                        <td>{item.TotalAmount}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-end">
              <div style={{ height: '100%', flexWrap: 'wrap' }} className=" d-flex w-50">
                <div className="w-100 ">
                  <h6 style={{ marginTop: '20px' }} > Summary </h6>
                  <Table striped bordered size="sm" className="mb-0">
                    <tbody>
                      <tr>
                        <th scope="row">Total GST</th>
                        <td>{sale.GST}</td>
                      </tr>
                      <tr>
                        <th scope="row">Total Sale Amount</th>
                        <td>{sale.TotalSaleAmount}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handlePrint}>
              Print
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
export default ViewProduct