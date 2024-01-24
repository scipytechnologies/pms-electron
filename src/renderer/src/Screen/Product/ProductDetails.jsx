import React, { useEffect, useState } from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import { Button, Card, Col, Nav, Form, Row, Image } from 'react-bootstrap'
import mainservice from '../../Services/mainservice'
import { useSelector, useDispatch } from 'react-redux'
import { pumpInfo } from '../../store/pump'
import { Link, useNavigate } from 'react-router-dom'
import { Modal, Table } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

export default function ProductDetails() {
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

  const productId = new URLSearchParams(location.search).get('productId');

  const [form, setform] = useState({})
  const [show, setShow] = useState(false)
  const [showproduct, setShowProduct] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [modalProduct, setModalProduct] = useState([])
  const [quantities, setQuantities] = useState(1)
  const [cart, setCart] = useState([])

  function handleClose() {
    setShow(false)
  }
  function handleproductClose() {
    setShowProduct(false)
  }
  const handleShowProduct = async (index) => {
    const product = selectedProduct[index];
    setModalProduct([product])
    setShowProduct(true);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantities(newQuantity)
  };
  const calculateTotalAmount = (price, quantity) => {
    return price * quantity;
  };

  const handleIncrement = (productId) => {
    setCart((prevData) => {
      return prevData.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalAmount: calculateTotalAmount(item.price, item.quantity + 1),
          };
        }
        return item;
      });
    });
  };

  const handleDecrement = (productId) => {
    setCart((prevData) => {
      return prevData.map((item) => {
        if (item.productId === productId && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
            totalAmount: calculateTotalAmount(item.price, item.quantity - 1),
          };
        }
        return item;
      });
    });
  };

  console.log('cart,..', cart)

  console.log('quanit state...', quantities)
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.productId === product._id);
    // console.log('exisi', existingProductIndex)
    if (existingProductIndex !== -1) {
      // need to deal
      let exisitingProductQuanity = parseInt(cart?.[existingProductIndex]?.quantity, 10);
      console.log('type of exiisi', typeof exisitingProductQuanity)
      setCart((prevData) => {
        let newData = prevData?.map((item, index) => {
          if (index === existingProductIndex) {
            return {
              ...item,
              quantity: exisitingProductQuanity + parseInt(quantities, 10),
              totalAmount: calculateTotalAmount(product.Price, exisitingProductQuanity + parseInt(quantities, 10)),
            };
          }
          return item;
        });

        return newData;
      });
    }
    else {
      setCart((prevData) => {
        let newData = {
          productId: product?._id,
          name: product.Name,
          price: product.Price,
          quantity: parseInt(quantities, 10),
          totalAmount: calculateTotalAmount(product.Price, parseInt(quantities, 10)),
        };
        let data = [...prevData, newData];
        return data;
      });
    }
  }

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
  };



  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setform({
      ...form,
      [event.target.name]: event.target.value
    })
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const res = await mainservice.updateProduct(productId, form)
    if (res.data != null) {
      console.log(res.data)
      fetchPump(user.PumpId);
    } else {
      console.log(res)
    }
  }

  async function getProductbyid(productId) {
    const res = await mainservice.getProductById(productId)
    if (res.data != null) {
      setSelectedProduct(res.data.result2.product);
      console.log(res)
    }
    else {
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
  }, []);

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
                Product Details
              </li>
            </ol>
            <h4 className="main-title mb-0">Welcome to Dashboard</h4>
          </div>

          <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
            <Button
              onClick={() => setShow(true)}
            >
              Add Product
            </Button>
          </div>
        </div>

        <Row className="g-3">
          <Col xl="8">
            <Card className="card-one">
              <Card.Header>
                <Card.Title as="h6">Products</Card.Title>
                <Nav className="nav-icon nav-icon-sm ms-auto">
                  <Nav.Link href="">
                    <i className="ri-refresh-line"></i>
                  </Nav.Link>
                  <Nav.Link href="">
                    <i className="ri-more-2-fill"></i>
                  </Nav.Link>
                </Nav>
              </Card.Header>
              <Card.Body className="p-3">
                <Row>
                  {selectedProduct && selectedProduct.map((category, index) => (
                    <Col key={index} sm="4" md="4" lg="4" className="p-1">
                      <Card className="card-one">
                        <Card.Body className="p-3">
                          <div className="text-center p-3 bg-white rounded mb-3">
                            <Image
                              style={{ height: '150px' }}
                              src="https://www.petron.com/wp-content/uploads/2020/10/Blaze-Racing-BR450-Premium-Multi-Grade-20W-50.jpg"
                              fluid={true}
                              alt={`Category ${index}`}
                            />
                          </div>
                          <p>Name: {category.Name}</p>
                          <p>Description: {category.ProductDescription}</p>

                          <div className="d-flex justify-content-between">
                            <Button
                              style={{ marginRight: '5px' }}
                              as={Link}
                              to={`/dashboard/Product/ProductDetails?productId=${category.ProductId}`}
                              variant="primary"
                              className="btn-sm w-100"
                              onClick={() => {
                                console.log("Clicked Add Products. ProductId:", category.ProductId)
                                setShowProduct(true)
                                handleShowProduct(index)
                              }}
                            >
                              View Products
                            </Button>
                            <Button variant="danger" className="btn-icon">
                              <i className="ri-delete-bin-fill"></i>
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

              </Card.Body>
            </Card>
          </Col>
          <Col xl="4" style={{ height: '400px' }}>
            <Card className="card-one">
              <Card.Header>
                <Card.Title as="h6">Add To Cart</Card.Title>
              </Card.Header>
              <Card.Body className="p-3">
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {cart.map((product, index) => (
                  <div key={index}>
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <div className="product-thumb">
                              <img src="https://www.petron.com/wp-content/uploads/2020/10/Blaze-Racing-BR450-Premium-Multi-Grade-20W-50.jpg" />
                            </div>
                          </td>
                          <td>
                            <p>{product.name}</p>
                            <label style={{ fontStyle:'oblique', fontSize:'0.7rem'}}>Price</label>
                            <p style={{ fontSize:'0.7rem'}}><span>&#x20B9;</span> {product.price}</p>
                          </td>
                          <td>
                            <p>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                style={{ padding: '0rem 0.2rem 0rem 0.2rem', fontSize: '0.7rem', width:'15px' }}
                                onClick={() => handleDecrement(product.productId)}
                              >
                                -
                              </Button>{" "}
                              {product.quantity}{" "}
                              <Button
                                variant="outline-primary"
                                size="sm"
                                style={{ padding: '0rem 0.2rem', fontSize: '0.7rem', width:'15px' }}
                                onClick={() => handleIncrement(product.productId)}
                              >
                                +
                              </Button>
                            </p>
                            <label style={{ fontStyle:'oblique', fontSize:'0.7rem'}}>Amount</label>
                            <p style={{ fontSize:'0.7rem'}}><span>&#x20B9;</span> {product.totalAmount}</p>
                          </td>
                          <td>
                            <Button variant="danger" className="btn-sm btn-danger" style={{ padding: '2px 5px', height: '25px', marginBottom: '2px', marginLeft: '0px' }} onClick={() => removeFromCart(product.productId)}>
                              x
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                ))}
                </div>
                <Button variant="Success" className="btn-sm btn-success" style={{ marginTop: '10px', width: "50px" }} onClick={() => removeFromCart(product.productId)}>
                  Buy
                </Button>
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
                  <Form.Control name="Name" onChange={onChangeHandler} type="text" placeholder='Name' />
                </Col>
                <Col md>
                  <h6>Category</h6>
                </Col>
                <Col md>
                  <Form.Control name="Category" onChange={onChangeHandler} type="text" placeholder='Category' />
                </Col>
                <Col md>
                  <h6>Tax</h6>
                </Col>
                <Col md>
                  <Form.Control
                    name="Tax"
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Tax"
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
                    placeholder="Brand"
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
                    placeholder="Price"
                  />
                </Col>
                <Col md>
                  <h6>On Sale</h6>
                </Col>
                <Col md>
                  <Form.Control
                    name="OnSale"
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="On Sale"
                  />
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Profit</h6>
                </Col>
                <Col md>
                  <Form.Control
                    name="Profit"
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Profit"
                  />
                </Col>
                <Col md>
                  <h6>Margin</h6>
                </Col>
                <Col md>
                  <Form.Control
                    name="Margin"
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Margin"
                  />
                </Col>
                <Col md>
                  <h6>SKU</h6>
                </Col>
                <Col md>
                  <Form.Control
                    name="SKU"
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="SKU"
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
                  <Form.Control name="ProductDescription" onChange={onChangeHandler} as="textarea" rows={3} placeholder='Description' />
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


        <Modal show={showproduct} onHide={handleproductClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>View Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="setting-item">
              <Row className="g-2 align-items-center">
                {modalProduct?.map((product, index) => (
                  <Col key={index} sm="4" md="4" lg="4" className="p-1">
                    <Card className="card-one">
                      <Card.Body className="p-0">
                        <div key={index} className="setting-item">
                          <div className="text-center p-3 bg-white rounded mb-3">
                            <Image
                              style={{ height: '150px' }}
                              src="https://www.petron.com/wp-content/uploads/2020/10/Blaze-Racing-BR450-Premium-Multi-Grade-20W-50.jpg"
                              fluid={true}
                              alt={`Category ${index}`}
                            />
                          </div>
                          <Row className="g-2 align-items-center">
                            <Col md>
                              <h6>Name</h6>
                            </Col>
                            <Col md>
                              <h6>{product.Name}</h6>
                            </Col>
                            <Row className="g-2 align-items-center">
                              <Col md>
                                <h6>Price</h6>
                              </Col>
                              <Col md>
                                <h6>{product.Price}</h6>
                              </Col>
                            </Row>
                            <Row className="g-2 align-items-center">
                              <Col md>
                                <h6>Quantity</h6>
                              </Col>
                              <Col md>
                                <Form.Control
                                  as="select"
                                  name={`quantity_${index}`}
                                  onChange={(e) => handleQuantityChange(e.target.value)}
                                  size={5}
                                  style={{ overflowY: 'auto', maxHeight: '100px' }}
                                >
                                  {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => (
                                    <option key={quantity} value={quantity}>
                                      {quantity}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Col>
                            </Row>
                            <Row className="g-2 align-items-center">
                              <Col md>
                                <h6>Total Amount</h6>
                              </Col>
                              <Col md>
                                <h6>{calculateTotalAmount(product.Price, quantities)}</h6>
                              </Col>
                            </Row>
                          </Row>
                          <Row className="g-2 align-items-center">
                            <Button
                              variant="primary"
                              className="btn-sm h-15"
                              onClick={() => addToCart(product)}
                            >
                              Add to Cart
                            </Button>
                          </Row>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleproductClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Footer />
      </div>
    </React.Fragment>
  )
}
