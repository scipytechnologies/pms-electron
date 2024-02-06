import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Form, Nav, Card, Button, Table } from 'react-bootstrap'
import Footer from '../../layouts/Footer'
import { useSearchParams } from "react-router-dom"
import mainservice from '../../Services/mainservice'
import { useSelector } from 'react-redux'
import HeaderMobile from '../../layouts/HeaderMobile'
import Avatar from '../../components/Avatar'

import img8 from '../../assets/img/img8.jpg'
import img9 from '../../assets/img/img9.jpg'
import img10 from '../../assets/img/img10.jpg'
import img11 from '../../assets/img/img11.jpg'
import img14 from '../../assets/img/img14.jpg'
import Header from '../../layouts/Header'

export default function PostProduct() {
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

  const user = useSelector((state) => state.loginedUser)
  console.log("pump",user.PumpId)

  const [form, setform] = useState({})
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setform({
      ...form,
      [event.target.name]: event.target.value
    })
    setUform({
      ...uform,
      [event.target.name]: event.target.value
    });
    console.log(uform);
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(form);
    const res = await mainservice.createProduct(form, user.PumpId)
    if (res.data != null) {
      console.log(res.data)
    } else {
      console.log(res)
    }
  }
  const onUpdateHandler = async (event) => {
    event.preventDefault()
    console.log(uform)
    await updateProduct(uform)
  }

  async function updateProduct(uform) {
    console.log("updateId", id)
    let payload = {
      "product": [
     {
         "Name": uform?.Name,
         "Description": uform?.Description,
         "Category": uform?.Category,
         "GST": uform?.GST,
         "Brand": uform?.Brand,
         "Price": uform?.Price,
         "OnSale": uform?.OnSale,
         "Profit": uform?.Profit,
         "Margin": uform?.Margin,
         "SKU": uform?.SKU
     }
      ]
     }
    const res = await mainservice.updateProduct(id, payload)
    console.log(res,"res")
    if (res.data != null) {
      console.log(res.data, "Product Details Updated")
    }
    else {
      console.log(res.data)
    }
  }

  let [searchParams, setSearchParams] = useSearchParams();
  const [uform, setUform] = useState({});
  console.log(uform, "productuform")
  console.log("uformpro",uform._id)
  const [editMode, setEditMode] = useState(false);
  const id = searchParams.get("id");
  console.log(id,"search")
  const CheckEdit = async () => {
    if (id) {
      setEditMode(true)
      const res = await mainservice.getProductById(id);
      setUform(res.data.result2.product[0])
      console.log(res.data.result2.product[0], "this");
    }
  }
  useEffect(() => {
    CheckEdit()
  }, []);

  switchSkin(skin)
  useEffect(() => {
    switchSkin(skin)
  }, [skin])
  return (
    <React.Fragment>
      <Header onSkin={setSkin} />
      <div style={{ marginTop: '50px' }} className="main p-4 p-lg-5">
        <ol className="breadcrumb fs-sm mb-2">
          <li className="breadcrumb-item">
            <Link to="#">dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">Product</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Product
          </li> 
        </ol>
        <h2 className="main-title">Add Product</h2>

        <Card className="card-settings">
          <Card.Header>
            <Card.Title>Create a New Product</Card.Title>
            <Card.Text>short Description</Card.Text>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>SKU</h6>
                </Col>
                <Col md>
                  <Form.Control type="text" name="SKU" value={uform.SKU} placeholder="eg.100-25484" onChange={onChangeHandler}/>
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Product Name</h6>
                </Col>
                <Col md>
                  <Form.Control type="text" name="Name" value={uform.Name} placeholder="eg.100-25484" onChange={onChangeHandler} />
                </Col>
                <Col md>
                  <h6>Category</h6>
                </Col>
                <Col md>
                  <Form.Control type="text" name="Category" value={uform.Category} placeholder="eg.100-25484" onChange={onChangeHandler}/>
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2">
                <Col>
                  <h6>Description</h6>
                  <p>Temporibus autem quibusdam et aut officiis.</p>
                </Col>
                <Col md>
                  <Form.Control as="textarea" rows="3" name="Description" value={uform.Description} placeholder="Enter tagline" onChange={onChangeHandler}/>
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Brand</h6>
                </Col>
                <Col md>
                  <Form.Control type="text" name="Brand" value={uform.Brand} placeholder="Petrol" onChange={onChangeHandler}/>
                </Col>
                <Col md>
                  <h6>GST</h6>
                </Col>
                <Col md>
                  <Form.Control type="text" name="GST" value={uform.GST} placeholder="600 Litre" onChange={onChangeHandler}/>
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                  <h6>Price</h6>
                </Col>
                <Col md>
                  <Form.Control type="text" name="Price" value={uform.Price} placeholder="Petrol" onChange={onChangeHandler}/>
                </Col>
                <Col md>
                  <h6>Margin</h6>
                </Col>
                <Col md>
                  <Form.Control type="text" name="Margin" value={uform.Margin} placeholder="35000/-" onChange={onChangeHandler}/>
                </Col>
              </Row>
            </div>
            <div className="setting-item">
              <Row className="g-2 align-items-center">
                <Col md>
                <h6>Preview</h6>
                <p> Product Name : <b> Product</b></p>
                <p> Category : <b> Category</b></p>
                <p> Sales Price : <b> Rs.1200</b></p>
                <p> Profit : <b style={{color:'green'}}> +70</b></p>
                </Col>
                <Col md className='d-flex justify-content-end'>
                  <Form.Group controlId="formFile" className="mb-3 w-50">
                    <Form.Label>Upload Picture</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
              </Row>
            </div>
  
          </Card.Body>
        </Card>


        <Card className="card-settings mt-4">
          <Card.Body className="p-0">
            <div className="setting-item d-flex justify-content-end">
            <Col xs="12">
                {editMode ?
                  <div className="mt-1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onUpdateHandler} type="submit">Update</Button>
                  </div> :
                  <div className="mt-1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onSubmitHandler} type="submit">Submit</Button>
                  </div>}

              </Col>
            </div>
          </Card.Body>
        </Card>

        <Footer />
      </div>
    </React.Fragment>
  )
}
