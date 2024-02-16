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


function EvaporationLoss() {
    const dispatch = useDispatch()
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const [skin, setSkin] = useState(currentSkin)
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const user = useSelector((state) => state.loginedUser)

  const evaporationData = useSelector((state) => state.pumpstore.Evaporation)
  console.log("evaporationData", evaporationData)

  async function evaporationDetails() {
    setData(evaporationData)
  }
  useEffect(() => {
    evaporationDetails()
  }, [])

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
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-md-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/dashboard/EmployeeDetails">Evaporation</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
              Evaporation Details
              </li>
            </ol>
            <h4 className="main-title mt-2 mb-0">Evaporation Details</h4>
          </div>
        </div>

        <Card>
          <Card.Body>
            <Grid
              data={evaporationData.map((item) => [
                item.Date,
                item.Tank,
                item.InitialQuantity,
                item.ActualQuantity,
                item.Missing,
                _(
                  <>
                    <ButtonGroup>
                      <Button className="p-0" variant="white">
                        <Dropdown drop="end">
                          <Dropdown.Toggle variant="white" size="sm" className="btn-no-outline">
                            <i className="ri-more-2-fill" color="primary"></i>
                          </Dropdown.Toggle>
                        </Dropdown>
                      </Button>
                    </ButtonGroup>
                  </>
                )
              ])}
              columns={[
                'Date',
                'Tank',
                'Initial Quantity',
                'Actual Quantity',
                'Evapourated'
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
export default EvaporationLoss
