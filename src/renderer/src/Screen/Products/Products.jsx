import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Col, Nav, Row, Form, Button } from 'react-bootstrap'
import Footer from '../../layouts/Footer'
import HeaderMobile from '../../layouts/HeaderMobile'
import Avatar from '../../components/Avatar'

import img1 from '../../assets/img/img1.jpg'
import img6 from '../../assets/img/img6.jpg'
import img7 from '../../assets/img/img7.jpg'
import img8 from '../../assets/img/img8.jpg'
import img9 from '../../assets/img/img9.jpg'
import img10 from '../../assets/img/img10.jpg'
import img11 from '../../assets/img/img11.jpg'
import img12 from '../../assets/img/img12.jpg'
import img13 from '../../assets/img/img13.jpg'
import img14 from '../../assets/img/img14.jpg'
import img15 from '../../assets/img/img15.jpg'
import img16 from '../../assets/img/img16.jpg'
import img19 from '../../assets/img/img19.jpg'
import Select from 'react-select'
import mainservice from '../../Services/mainservice'
import { useSelector, useDispatch } from 'react-redux'

export default function Product() {
  const user = useSelector((state) => state.loginedUser)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  async function FetchProduct() {
    const res = await mainservice.getProduct(user.PumpId)
    if (res.data != null) {
      setCategories(res.data.result1)
      const data = collectProduct(res.data.result1)
      setFilteredProducts(data)
      console.log(data)
    } else {
      console.log(res)
    }
  }

  function collectProduct(cat) {
    let data = []
    cat.map((x) => {
      if (x.product) {
        x.product.map((y) => {
          if (y.OnSale) {
            data.push(y)
          }
        })
      }
    })
    return data
  }
  const [cart, setCart] = useState([])
  const [quantities, setQuantities] = useState({})

  const addToCart = (item, quantity = 1) => {
    if (cart.some((cartItem) => cartItem.Name === item.Name)) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.Name === item.Name) {
          const newQuantity = cartItem.Quantity + quantity
          const updatedQuantity = Math.max(newQuantity, 0)
          const totalPrice = updatedQuantity > 0 ? parseInt(item.Price) * updatedQuantity : 0
          return {
            ...cartItem,
            Quantity: updatedQuantity,
            Total: totalPrice
          }
        }
        return cartItem
      })
      setCart(updatedCart)
      setQuantities({
        ...quantities,
        [item.Name]: Math.max((quantities[item.Name] || 0) + quantity, 0)
      })
    } else {
      const newItem = {
        Name: item.Name,
        CategoryName: item.Category,
        Price: item.Price,
        Quantity: quantity,
        ProductId: item._id,
        Total: parseInt(item.Price) * quantity
      }
      setCart([...cart, newItem])
      setQuantities({ ...quantities, [item.Name]: quantity })
    }
  }
  const removeFromCart = (itemName) => {
    const updatedCart = cart.filter((item) => item.Name !== itemName)
    setCart(updatedCart)
    setQuantities({ ...quantities, [itemName]: 0 })
  }
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.Total, 0)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    let TotalSalesAmount = getTotalPrice()
    const data = {
      SalesId: '123',
      GST: (TotalSalesAmount * 18) / 100,
      TotalSaleAmount: TotalSalesAmount,
      EcommerceSale: cart
    }
    console.log(data)
    const res = await mainservice.createEcommerce(user.PumpId, data)
    if (res.data != null) {
      navigate(`/dashboard/viewProductSales?redirect=true&id=${res.data._id}`)
    } else {
      console.log(res)
    }
  }

  const handleSearch = (event) => {
    const query = event.target.value
    setSearchQuery(query)
    // Filter products based on search query
    const filtered = categories.flatMap((category) =>
      category.product.filter((product) => product.Name.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredProducts(filtered)
    console.log(filtered)
  }

  useEffect(() => {
    FetchProduct()
  }, [])

  return (
    <React.Fragment>
      <HeaderMobile />
      <div className="main p-4 p-lg-5">
        <Row className="g-5">
          <Col xl>
            <ol className="breadcrumb fs-sm mb-2">
              <li className="breadcrumb-item">
                <Link to="#">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Products
              </li>
            </ol>
            <h2 className="main-title">Products</h2>

            <Nav className="nav-line mb-4">
              <Form.Control
                className="m-2"
                type="text"
                placeholder="Search"
                onChange={handleSearch}
              />
              {/* <div className="d-flex w-40 align-items-center">
                <Form.Label className="m-2">Category</Form.Label>
                <Select className="m-2 w-100"></Select>
              </div> */}
            </Nav>

            <Row className="g-2 g-xxl-3 mb-5">
              {filteredProducts.map((item, index) => (
                <Col sm="6" md="3" key={index}>
                  <Card className="card-people">
                    <Card.Body>
                      <div
                        style={{
                          height: '220px',
                          backgroundImage: `url(http://52.66.119.51:9000/employee/getImage/${item.image})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover'
                        }}
                        className="w-100"
                      ></div>
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
                        <small> Brand : {item.Name} </small>
                      </div>
                      {/* <div className="">
                        <small>Description : {item.ProductDescription} </small>
                      </div> */}
                      <div className="mutual-badge mb-3">
                        {/* <ul>
                          {connection.mutual.map((item, ind) => (
                            <li key={ind}>
                              <Avatar img={item} />
                            </li>
                          ))}
                        </ul> */}
                        {/* <label>{item.count} mutual connections</label> */}
                      </div>
                      <div className="d-grid">
                        {cart.some((x) => x.Name === item.Name) ? (
                          <div className="d-flex">
                            <Button
                              style={{ color: 'white' }}
                              variant="primary"
                              onClick={() => addToCart({ Name: item.Name, Price: item.Price }, -1)}
                            >
                              -
                            </Button>
                            <Button className="w-100" variant="">
                              {cart.some((x) => x.Name === item.Name) ? (
                                <>{quantities[item.Name]}</>
                              ) : (
                                []
                              )}
                            </Button>
                            <Button
                              style={{ color: 'white' }}
                              variant="primary"
                              onClick={() => addToCart(item)}
                            >
                              +
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline-primary" onClick={() => addToCart(item)}>
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xl="4" xxl="3" className="d-none d-xl-block">
            <h5 className="section-title">Cart</h5>
            {/* <p className="text-secondary fs-sm mb-4">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
            </p> */}
            <hr />
            {cart.map((item) => {
              return (
                <Card>
                  <Card.Body className="d-flex justify-content-between align-items-center ">
                    <div>
                      <h6>
                        <small>
                          <b>{item.Name}</b>
                        </small>
                      </h6>
                    </div>
                    <div>
                      <small>
                        <h6>{item.Price}</h6>
                      </small>
                    </div>
                    <div>
                      <h6>
                        <small>{item.Quantity}</small>
                      </h6>
                    </div>
                    <div>
                      <h6>
                        <small>{item.Total}/-</small>
                      </h6>
                    </div>
                    <Button variant="" onClick={() => removeFromCart(item.Name)}>
                      x
                    </Button>
                  </Card.Body>
                </Card>
              )
            })}
            <hr />
            <Card>
              <Card.Body className="d-flex justify-content-between">
                <div>
                  <h6>GST : {(getTotalPrice() * 18) / 100} /-</h6>
                  <h6>
                    {' '}
                    Total Amount : <b style={{ fontSize: '18px' }}>{getTotalPrice()} /- </b>
                  </h6>{' '}
                </div>
                <div>
                  <Button style={{ color: 'white' }} variant="primary" onClick={onSubmitHandler}>
                    Submit
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <hr className="my-4 opacity-0" />
          </Col>
        </Row>
        <Footer />
      </div>
    </React.Fragment>
  )
}
