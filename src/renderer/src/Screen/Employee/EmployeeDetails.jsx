import { React, useEffect, useState } from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import { Button, Card, Col, Nav, Row, Dropdown, Modal, ButtonGroup, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import mainservice from '../../Services/mainservice'
import { Grid } from 'gridjs-react'
import { _ } from 'gridjs-react'
import { useSelector, useDispatch } from 'react-redux'
import { pumpInfo } from '../../store/pump'


function EmployeeDetails() {
    const dispatch = useDispatch()
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const [skin, setSkin] = useState(currentSkin)
  const navigate = useNavigate()
  const user = useSelector((state) => state.loginedUser)

  const employeeData = useSelector((state) => state.pumpstore.Employee)

  async function getEmployee() {
    setData(employeeData)
  }
  useEffect(() => {
    getEmployee()
  }, [])

  async function deleteEmployee(pumpId,employeeId) {
    const res = await mainservice.deleteEmployee(pumpId,employeeId)
    if (res.data != null) {
      console.log('deleted')
      getEmployee()
    } else {
      console.log(res.message)
    }
  }

  const onDeleteHandler = (item) => {
    const pumpId = user.PumpId;
    console.log("pumpid",pumpId)
    const employeeId = item.EmployeeId
    console.log("employeeId",employeeId)
    deleteEmployee(pumpId,employeeId)
  }

  const [show, setShow] = useState(false)
  const [emp, setEmp] = useState({})

  async function getEmployeeDataById(id) {
    const res = await mainservice.getEmployeeById(id)
    if (res.data != null) {
      console.log(res.data)
      setEmp(res.data.result2)
    } else {
      console.log(res.message)
    }
  }

  function handleOpen(id) {
    setShow(true)
    getEmployeeDataById(id)
  }
  function handleClose() {
    setShow(false)
  }
  const fetchPump = async (id) => {
    const pumpdetails = await mainservice.getPumpById(id)
    if (pumpdetails.data != null) {
      dispatch(pumpInfo(pumpdetails.data.result2))
      console.log(pumpdetails.data.result2)
    }
  }
  useEffect(() => {
    fetchPump(user.PumpId)
  }, [])

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" d-flex w-100">
            <div style={{ height: '280px' }} className="w-25 border m-3"></div>
            <div style={{ height: '280px' }} className="w-75 border m-3">
              <p className="m-2">Personal Details</p>
              <Table borderless size="xl" striped className="mb-0">
                <tbody>
                  <tr>
                    <th scope="row"> Full Name</th>
                    <td>
                      {emp.FirstName}
                      {emp.LastName}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Date of Birth</th>
                    <td>{emp.DOB}</td>
                  </tr>
                  <tr>
                    <th scope="row">Department</th>
                    <td>{emp.Department}</td>
                  </tr>
                  <tr>
                    <th scope="row">Designation</th>
                    <td>{emp.Designation}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{emp.Email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phone Number</th>
                    <td>{emp.PhoneNumber}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div style={{ height: '350px' }} className="w-90 border m-3">
            <p className="m-2">Other Details</p>
            <div className="d-flex">
              <Table borderless size="xl" striped className="mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Join Date</th>
                    <td><Date>{emp.createdAt}</Date></td>
                  </tr>
                  <tr>
                    <th scope="row">Permanent Address</th>
                    <td>{emp.PermanentAddress}</td>
                  </tr>
                  <tr>
                    <th scope="row">Temporary Address</th>
                    <td>{emp.TemporaryAddress}</td>
                  </tr>
                  <tr>
                    <th scope="row">Aadhaar Id</th>
                    <td>{emp.AadhaarId}</td>
                  </tr>
                  <tr>
                    <th scope="row">PAN Number</th>
                    <td>{emp.PANCardNumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">Voter Id</th>
                    <td>{emp.VoterId}</td>
                  </tr>
                </tbody>
              </Table>
              <Table borderless size="xl" striped className="mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Salary</th>
                    <td>{emp.Salary}</td>
                  </tr>
                  <tr>
                    <th scope="row">Account Number</th>
                    <td>{emp.AccountNumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">Branch</th>
                    <td>{emp.Branch}</td>
                  </tr>
                  <tr>
                    <th scope="row">IFSC Code</th>
                    <td>{emp.AadhaarId}</td>
                  </tr>
                  <tr>
                    <th scope="row">PF Number</th>
                    <td>{emp.PFNumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">ESI ID</th>
                    <td>{emp.ESINumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">UAN ID</th>
                    <td>{emp.UAN}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>{' '}
          <div style={{ height: 'auto' }} className="w-90 border m-3">
            <p className="m-2">Note</p>
            <Table borderless size="xl" striped className="mb-0">
              <tbody>
                <tr>
                  <td>{emp.Note}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-md-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/dashboard/EmployeeDetails">Employee</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Employee Details
              </li>
            </ol>
            <h4 className="main-title mt-2 mb-0">Employee Details</h4>
          </div>

          <Button
            variant="primary"
            className="d-flex align-items-center gap-2"
            onClick={() => navigate('/dashboard/addEmployee')}
            style={{color:'white'}}
          >
            <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Add Employee
            <span className="d-none d-sm-inline"></span>
          </Button>
        </div>

        <Card>
          <Card.Body>
            <Grid
              data={employeeData.map((item) => [
                item.EmployeeId,
                item.EmployeeName,
                item.DOB,
                item.Designation,
                item.PhoneNumber,
                _(
                  <>
                    <ButtonGroup>
                      <Button size="sm" variant="white" onClick={() => handleOpen(item.EmployeeId)}>
                        <i className="ri-eye-line"></i>
                      </Button>
                      <Button className="p-0" variant="white">
                        <Dropdown drop="end">
                          <Dropdown.Toggle variant="white" size="sm" className="btn-no-outline">
                            <i className="ri-more-2-fill" color="primary"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => navigate(`/dashboard/addEmployee/?id=${item.EmployeeId}`)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              style={{ color: 'red' }}
                              onClick={() => onDeleteHandler(item)}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Button>
                    </ButtonGroup>
                  </>
                )
              ])}
              columns={[
                'Employee Id',
                'Employee Name',
                'Date of Birth',
                'Designation',
                'Phone Number',
                'Action'
              ]}
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
      </div>
    </>
  )
}
export default EmployeeDetails
