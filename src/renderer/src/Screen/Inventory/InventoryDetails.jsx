import { React, useEffect, useState } from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import {
  Button,
  Card,
  Offcanvas,
  ButtonGroup,
  Dropdown,
  Modal,
  Form,
  Col,
  Row,
  Table
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import mainservice from '../../Services/mainservice'
import { Grid } from 'gridjs-react'
import { _ } from 'gridjs-react'
import { useSelector, useDispatch } from 'react-redux'
import { pumpInfo } from '../../store/pump'
import Select from 'react-select'
import { Toaster, toast } from 'sonner'

function InventoryDetails() {
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const [skin, setSkin] = useState(currentSkin)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [selectedmode, setSelectedMode] = useState([])
  const [id, setId] = useState({})
  const inventoryData = useSelector((state) => state.pumpstore.InventoryManagement)
  const pumpId = useSelector((state) => state.loginedUser.PumpId)
  const user = useSelector((state) => state.loginedUser)
  console.log('data', data)

  async function getInventoryManagement() {
    fetchPump(user.PumpId)
    setData(inventoryData)
  }
  useEffect(() => {
    getInventoryManagement()
  }, [])

  function formatDate(inputDate) {
    const date = new Date(inputDate)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  }

  async function deleteInventoryManagement(pumpId, inventoryId) {
    const res = await mainservice.deleteInventoryManagement(pumpId, inventoryId)
    if (res.data != null) {
      console.log('deleted')
      getInventoryManagement()
      toast.success('Deleted Successfully')
    } else {
      console.log(res.message)
      toast.error('Something Went Wrong')
    }
  }

  const onDeleteHandler = (item) => {
    const inventoryId = item.InventoryManagementId
    console.log('invenId', inventoryId)
    deleteInventoryManagement(pumpId, inventoryId)
  }

  const fetchPump = async (id) => {
    const pumpdetails = await mainservice.getPumpById(id)
    if (pumpdetails.data != null) {
      dispatch(pumpInfo(pumpdetails.data.result2))
      console.log(pumpdetails.data.result2)
    }
  }
  const [show, setShow] = useState(false)
  function handleClose() {
    setform({})
    setShow(false)
  }
  function handleOpen(id) {
    setShow(true)
    setId(id)
  }
  const [view, setView] = useState(false)
  const [inventory, setInventory] = useState({})
  console.log('inventory', inventoryData)
  function handleViewClose() {
    setView(false)
  }
  const [track, setTrack] = useState([])
  async function handleViewOpen(id) {
    const data = await mainservice.getInventoryManagementById(id)
    console.log(data)
    setInventory(data.data.result2)
    if (data.data.result2.InventoryHistory) {
      setTrack(data.data.result2.InventoryHistory)
      console.log('hello...', data.data.result2)
    }
    setView(true)
  }

  const [form, setform] = useState({})
  const onChangeHandler = (event) => {
    setform({
      ...form,
      Mode: selectedmode.value,
      [event.target.name]: event.target.value
    })
  }

  const ChangeHandler = (selectedOption) => {
    setSelectedMode(selectedOption)
    console.log('selectedmode', selectedmode)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!form.Date) {
      toast.error('Please add a Date')
    } else {
      const res = await mainservice.updatehistory(id, pumpId, form)
      if (res.data != null) {
        fetchPump(user.PumpId)
        handleClose()
        toast.success('Successfully Created')
        console.log(res)
      } else {
        toast.error('Something Went Wrong')
      }
    }
  }

  const options = [
    { value: 'Add to Store', label: 'Add to Store' },
    { value: 'Add New Stock', label: 'Add New Stock' },
    { value: 'Damaged', label: 'Damaged' }
  ]
  useEffect(() => {
    fetchPump(user.PumpId)
  }, [])

  return (
    <>
      <Header onSkin={setSkin} />
      <Toaster richColors />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-md-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/dashboard/InventoryDetails">Inventory</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Inventory Details
              </li>
            </ol>
            <h4 className="main-title mt-2 mb-0">Inventory Details</h4>
          </div>

          <Button
            variant="primary"
            style={{ color: 'white' }}
            className="d-flex align-items-center gap-2"
            onClick={() => navigate('/dashboard/addinventory')}
          >
            <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Add Inventory
            <span className="d-none d-sm-inline"></span>
          </Button>
        </div>

        <Card>
          <Card.Body>
            <Grid
              data={inventoryData
                .slice()
                .reverse()
                .map((item) => [
                  item.serialNumber,
                  item.CategoryName,
                  item.ItemName,
                  item.CurrentStock,
                  _(
                    <>
                      <ButtonGroup>
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => handleOpen(item.InventoryManagementId)}
                        >
                          Manage Stock
                        </Button>
                      </ButtonGroup>
                    </>
                  ),
                  _(
                    <>
                      <ButtonGroup>
                        <Button
                          size="sm"
                          variant="white"
                          onClick={() => handleViewOpen(item.InventoryManagementId)}
                        >
                          <i className="ri-eye-line"></i>
                        </Button>
                        <Button
                          className="p-1"
                          variant="danger"
                          onClick={() => onDeleteHandler(item)}
                        >
                          <i className="ri-delete-bin-5-fill" color="primary"></i>
                          {/* <Dropdown drop="end">
                                                    <Dropdown.Toggle variant='white' size="sm" className='btn-no-outline'>
                                                        <i className='ri-more-2-fill' color="primary"></i>
                                                    </Dropdown.Toggle> */}

                          {/* <Dropdown.Menu> */}
                          {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item> */}
                          {/* <Dropdown.Item onClick={() => navigate(`/dashboard/addinventory/?id=${item.InventoryManagementId}`)}>Edit</Dropdown.Item> */}
                          {/* <Dropdown.Item style={{ color: 'red' }} onClick={() => onDeleteHandler(item)}>Delete</Dropdown.Item>
                                                    </Dropdown.Menu> */}
                          {/* </Dropdown> */}
                        </Button>
                      </ButtonGroup>
                    </>
                  )
                ])}
              columns={[' Id', 'Category', 'Item', 'Current Stock', 'Manage Stock', 'Action']}
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
        <Modal show={view} onHide={handleViewClose} centered size="xl">
          <Modal.Header closeButton>
            <Modal.Title>View Stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row style={{ color: 'black' }} className="border m-2 p-2">
              <Table borderless>
                <tr>
                  <th>Item Name</th>
                  <td> {inventory.ItemName}</td>

                  <th>Category</th>
                  <td> {inventory.CategoryName}</td>
                </tr>
                <tr>
                  <th>Created Date</th>
                  <td>
                    {' '}
                    {new Date(inventory.createdAt).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </td>

                  <th>Current Stock</th>
                  <td>
                    {' '}
                    <p>
                      <b>{inventory.CurrentStock}</b>
                    </p>{' '}
                  </td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{inventory.Description}</td>
                </tr>
              </Table>
            </Row>{' '}
            <hr />
            <div className=" d-flex w-100">
              <div
                style={{ height: '300px' }}
                className=" d-flex justify-content-center w-100 border "
              >
                <Table
                  size="sm"
                  style={{ minWidth: '100vh' }}
                  bordered
                  hover
                  striped
                  responsive
                  className="mb-0"
                >
                  <thead>
                    <tr>
                      <th scope="col"> Date</th>
                      <th scope="col"> Mode</th>
                      <th scope="col"> Stock</th>
                      <th scope="col"> Current Stock</th>
                      <th scope="col"> Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {track
                      .slice()
                      .reverse()
                      .map((x) => {
                        return (
                          <tr>
                            <td scope="row">
                              {x.Date
                                ? formatDate(x.Date)
                                : new Date(inventory.createdAt).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                  })}
                            </td>
                            <td>{x.Mode}</td>
                            <td>{x.Stock}</td>
                            <th>{x.CurrentStock}</th>
                            <th>{x.Note}</th>
                          </tr>
                        )
                      })}
                  </tbody>
                </Table>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ color: 'white' }} onClick={handleViewClose} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={show} onHide={handleClose} centered size="md">
          <Modal.Header closeButton>
            <Modal.Title>Manage Stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col md className="p-1">
              <Col md>
                <h6>Date</h6>
              </Col>
              <Form.Control
                type="Date"
                name="Date"
                placeholder="dd-mm-yy"
                onChange={onChangeHandler}
              />
            </Col>
            <Col md className="p-1">
              <Col md>
                <h6>Mode</h6>
              </Col>
              <Select options={options} onChange={ChangeHandler} />
            </Col>
            <Col md className="p-1">
              <Col md>
                <h6>Stock</h6>
              </Col>
              <Form.Control
                type="number"
                name="Stock"
                placeholder="Stock"
                onChange={onChangeHandler}
              />
            </Col>
            <Col md className="p-1">
              <Col md>
                <h6>Note</h6>
              </Col>
              <Form.Control type="text" name="Note" placeholder="Note" onChange={onChangeHandler} />
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ color: 'white' }} onClick={handleClose} variant="secondary">
              Close
            </Button>
            <Button style={{ color: 'white' }} onClick={onSubmitHandler} variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <Footer />
      </div>
    </>
  )
}
export default InventoryDetails
