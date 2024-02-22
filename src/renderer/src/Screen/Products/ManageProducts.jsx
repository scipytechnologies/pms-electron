import React, { useEffect, useState } from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import { Button, Card, Col, Nav, Form, Row, Image } from 'react-bootstrap'
import mainservice from '../../Services/mainservice'
import { useSelector, useDispatch } from 'react-redux'
import { pumpInfo } from '../../store/pump'
import { Link, useNavigate } from 'react-router-dom'
import { Modal, Table } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import img1 from '../../assets/img/img1.jpg'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default function ManageProducts() {
  ///// Skin Switch /////
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const [skin, setSkin] = useState(currentSkin)

  const switchSkin = (skin) => {
    if (skin === 'dark') {
      const btnWhite = document.getElementsByClassName('btn-white')

      for (const btn of btnWhite) {
        btn.classList.add('btn-outline-primary')
        btn.cassList.remove('btn-white')
      }
    } else {
      const btnOutlinePrimary = document.getElementsByClassName('btn-outline-primary')

      for (const btn of btnOutlinePrimary) {
        btn.classList.remove('btn-outline-primary')
        btn.classList.add('btn-white')
      }
    }
  }

  const location = useLocation()
  const user = useSelector((state) => state.loginedUser)
  const productdata = useSelector((state) => state.pumpstore.Product)
  const productId = new URLSearchParams(location.search).get('productId')

  const [form, setform] = useState({})
  const [show, setShow] = useState(false)
  const [showproduct, setShowProduct] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState([])
  const [modalProduct, setModalProduct] = useState([])
  const [quantities, setQuantities] = useState(1)
  const [cart, setCart] = useState([])
  const [data, setData] = useState([])
  const [selectedcategory, setSelectedcategory] = useState([])
  const [selectedcategoryid, setSelectedcategoryid] = useState([])
  const [totalGST, setTotalGST] = useState(0)
  console.log("selectedProduct", selectedProduct)
  console.log("selectedcategoryid", selectedcategoryid)

  function handleClose() {
    setShow(false)
  }
  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setform({
      ...form,
      [event.target.name]: event.target.value
    })
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(form);
    const data = { ...form, ...{ 'OnSale': true, Category: selectedcategory } }
    const res = await mainservice.updateProduct(productId, data)
    if (res.data != null) {
      console.log(res.data)
      fetchPump(user.PumpId)
      setShow(false)
    } else {
      console.log(res)
    }
  }

  const SubmitHandler = async (cat,id) => {
    const res = await mainservice.onSales(cat, id)
    if (res.data != null) {
      console.log(res.data)
      fetchPump(user.PumpId)
    }
    else {
      console.log(res)
    }
  }

  async function deleteProduct(cat,id) {
    const res = await mainservice.deleteProduct(cat,id)
    if (res.data != null) {
      console.log(res)
      getProductbyid(productId)
    } else {
      console.log(res.message)
    }
  }

  const onDeleteHandler = (item) => {
    const cat = selectedcategoryid;
    console.log("categoryid",cat)
    const id = item._id;
    console.log("id",id)
    deleteProduct(cat,id)
  }

  async function getProductbyid(productId) {
    const res = await mainservice.getProductById(productId)
    if (res.data != null) {
      setSelectedProduct(res.data.result2.product)
      setSelectedcategory(res.data.result2.CategoryName)
      setSelectedcategoryid(res.data.result2._id)
      console.log(res)
    } else {
      console.log(res.message)
    }
  }
  const fetchPump = async (id) => {
    const pumpdetails = await mainservice.getPumpById(id)
    if (pumpdetails.data != null) {
      dispatch(pumpInfo(pumpdetails.data.result2))
      getProductbyid(productId)
    }
  }
  useEffect(() => {
    getProductbyid(productId)
  }, [])



  switchSkin(skin)

  useEffect(() => {
    switchSkin(skin)
  }, [skin])

  return (
    <React.Fragment>
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item">
                <Link to="#">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Category
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Product
              </li>
            </ol>
            <h4 className="main-title mb-0">Products</h4>
          </div>

          <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
            <Button style={{ color: 'white' }} onClick={() => setShow(true)}>Add Product</Button>
          </div>
        </div>

        <Row className="g-3">
          <Col xl="12">
            <Card className="card-one">
              <Card.Header>
                <Card.Title as="h6">Products</Card.Title>
              </Card.Header>
              <Card.Body className="p-3">
                <Row>
                  {selectedProduct &&
                    selectedProduct.map((item, index) => (
                      <Col sm="6" md="3" key={index}>
                        <Card className="card-people">
                          <Card.Body>
                            <img
                              style={{ width: '100%', height: 'auto' }}
                              src={"https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"}
                              alt="productName"
                            ></img>
                            <div className="d-flex">
                              <div className="w-80">
                                <h6 className="mt-3">
                                  <Link to="">{item.Name}</Link>
                                </h6>
                                <div>
                                  {' '}
                                  <small>
                                    Category : <b>{item.Category} </b>{' '}
                                  </small>
                                </div>
                              </div>
                              <div className="d-flex justify-content-center align-items-center">
                                <h6>
                                  <b style={{ color: 'green' }}>Rs.{item.Price}/-</b>
                                </h6>
                              </div>
                            </div>
                            <div className="">
                              <small> Brand : {item.Brand} </small>
                            </div>
                            {/* <div className="">
                              <small>Description : {item.ProductDescription} </small>
                            </div> */}
                            <div className="d-flex justify-content-between mutual-badge mb-1 mt-1">
                              <div className="w-100">

                                {item.OnSale && item.OnSale === true ?
                                  <Button
                                    className="w-100"
                                    style={{ color: 'white' }}
                                    variant="primary"
                                    onClick={() => SubmitHandler(selectedcategoryid, item._id)}
                                  //   onClick={() => addToCart({ Name: item.Name, Price: item.Price }, -1)}
                                  >
                                    On Sale
                                  </Button> : <Button
                                    className="w-100"
                                    style={{ color: 'white' }}
                                    variant="secondary"
                                    onClick={() => SubmitHandler(selectedcategoryid, item._id)}
                                  //   onClick={() => addToCart({ Name: item.Name, Price: item.Price }, -1)}
                                  >
                                    Off Sale
                                  </Button>}


                              </div>
                              <div className="w-20">
                                <Button
                                  className="w-100"
                                  style={{ color: 'white' }}
                                  variant="danger"
                                  onClick={() => onDeleteHandler(item)}

                                //   onClick={() => addToCart({ Name: item.Name, Price: item.Price }, -1)}
                                >
                                  <i className="ri-delete-bin-fill"></i>
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Name</h6>
                </Col>
                <Col md>
                  <Form.Control
                    name="Name"
                    onChange={onChangeHandler}
                    type="text"
                  />
                </Col>
                <Col md>
                  <h6>Category</h6>
                </Col>
                <Col md>
                  <Form.Control
                    disabled={true}
                    name="Category"
                    onChange={onChangeHandler}
                    type="text"
                    value={selectedcategory}
                  />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Brand</h6>
                </Col>
                <Col md>
                  <Form.Control
                    name="Brand"
                    onChange={onChangeHandler}
                    type="text"
                  />
                </Col>
                <Col md>
                  <h6>Price</h6>
                </Col>
                <Col md>
                  <Form.Control
                    name="Price"
                    onChange={onChangeHandler}
                    type="text"
                  />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2">
                <Col md>
                  <h6>Description</h6>
                </Col>
                <Col md>
                  <Form.Control
                    name="ProductDescription"
                    onChange={onChangeHandler}
                    as="textarea"
                    rows={3}
                  />
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" style={{ color: 'white' }} onClick={onSubmitHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


        <Footer />
      </div>
    </React.Fragment>
  )
}
