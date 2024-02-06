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
  Table,
  Alert
} from 'react-bootstrap'
import { Grid } from 'gridjs-react'
import { _ } from 'gridjs-react'
import { Link, useNavigate } from 'react-router-dom'
import mainservice from '../../Services/mainservice'
import { pumpInfo } from '../../store/pump'
import { useSelector, useDispatch } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import Select from 'react-select'
function SalesReport() {
  const currentSkin = localStorage.getItem('skin-mode') ? 'dark' : ''
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loginedUser)
  const pump = useSelector((state) => state.pumpstore)
  const employees = useSelector((state) => state.pumpstore.Employee)
  const [skin, setSkin] = useState(currentSkin)
  const navigate = useNavigate()
  // const [user, setUser] = useState("")
  const [data, setData] = useState([])
  const salesData = useSelector((state) => state.pumpstore.SalesAndBilling)
  const [disday, setDisDay] = useState(false)
  const [disMon, setDisMon] = useState(false)

  const [selectedYear, setSelectedYear] = useState({ value: null, label: null })
  const [selectedMonth, setSelectedMonth] = useState({ value: null, label: null })
  const [selectedDay, setSelectedDay] = useState({ value: null, label: null })
  const [employee, setEmployee] = useState({ value: 'all', label: 'All' })
  const [protable, setProtable] = useState(false)

  const handleYearChange = (selected) => {
    ///////////////// Error //////////////////////////////////
    const empty = { value: null, label: null }
    handleMonthChange(empty)

    setSelectedYear(selected)

    if (selected.value == 'all') {
      setDisMon(true)
      setDisDay(true)
    } else {
      setDisMon(false)
      setDisDay(false)
    }
  }

  const handleMonthChange = (selected) => {
    // Reset selected day when the month changes
    const empty = { value: null, label: null }
    handleDayChange(empty)
    setSelectedMonth(selected)
    if (selected.value == 'all') {
      setDisDay(true)
    } else {
      setDisDay(false)
    }
  }

  const handleDayChange = (selected) => {
    setSelectedDay(selected)
    // Perform any other actions based on the selected day
  }
  const handleEmployee = (selected) => {
    setEmployee(selected)
    // Perform any other actions based on the selected day
  }
  const EmployeeOptions = (employees) => {
    return employees.map((employee) => {
      const { EmployeeName, EmployeeId } = employee
      return { label: EmployeeName, value: EmployeeId }
    })
  }
  const EmployData = EmployeeOptions(employees)
  const EmployeeData = [{ label: 'All', value: 'all' }].concat(EmployData)

  const currentYear = new Date().getFullYear()

  // Generate options for the current year and the prev two years
  const yearsData = Array.from({ length: 2 }, (_, index) => {
    const year = currentYear - index
    return { value: year.toString(), label: year.toString() }
  })

  const years = [{ label: 'All', value: 'all' }].concat(yearsData)
  // Generate options for all 12 months
  const monthOpt = Array.from({ length: 12 }, (_, index) => {
    const month = (index + 1).toString().padStart(2, '0')

    return {
      value: month,
      label: new Date(2000, index, 1).toLocaleString('default', { month: 'long' })
    }
  })

  const monthOptions = [{ label: 'All', value: 'all' }].concat(monthOpt)

  const dayOptions = selectedMonth
    ? Array.from(
        { length: new Date(selectedYear.value, selectedMonth.value, 0).getDate() },
        (_, index) => {
          const day = (index + 1).toString().padStart(2, '0')
          return { value: day, label: day }
        }
      )
    : []

  const day = [{ label: 'none', value: 'none' }].concat(dayOptions)

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const generateReport = async (event) => {
    let date = null
    event.preventDefault()
    if (selectedYear.value == null) {
      alert('Please Select Year')
    }
    if (selectedYear && selectedYear.value == 'all') {
      date = 'all'
    } else {
      if ((selectedMonth && selectedMonth.value == 'all') || selectedMonth.value === null) {
        if (selectedDay.value != null) {
          alert('Please Select a valid month')
        } else {
          date = selectedYear.value
        }
      } else {
        if ((selectedDay && selectedDay.value === null) || selectedDay.value === 'none') {
          date = selectedYear.value + '-' + selectedMonth.value
        } else {
          date = selectedYear.value + '-' + selectedMonth.value + '-' + selectedDay.value
        }
      }
    }

    const res = await mainservice.getSalesReport(user.PumpId, date, employee.value)
    if (res.data != null) {
      console.log(res.data)
      if (res.data.report) {
        setProtable(true)
        setData(res.data.report)
      } else {
        setProtable(false)
        setData(res.data)
        formatData(res.data)
      }
    } else {
      console.log(res)
    }
  }

  const [main, setMain] = useState(['Date', 'Product'])
  function formatData(data) {
    data.map((x) => {
      if (Object.keys(x)[1] == 'month') {
        setMain('Month')
      } else if (Object.keys(x)[0] == 'date') {
        setMain('Date')
      } else {
        setMain('Year')
      }
    })
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

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
            <h4 className="main-title mt-2 mb-0">Sales Report</h4>
          </div>
          <Button
            variant="primary"
            className="d-flex align-items-center gap-2"
            onClick={() => navigate('/dashboard/addSales')}
            style={{ color: 'white' }}
          >
            Add Sales
            <span className="d-none d-sm-inline"></span>
          </Button>
        </div>
        <Card className="mb-3">
          <Card.Body>
            <div className="d-flex">
              <div className="w-100 p-2">
                <div className="p-1">Employee</div>
                <Select
                  isDisabled={false}
                  isSearchable={true}
                  name="color"
                  options={EmployeeData}
                  onChange={handleEmployee}
                  defaultValue={EmployeeData[0]}
                  value={employee}
                />
              </div>

              <div className="w-100 p-2">
                <div className="p-1">Year</div>
                <Select
                  isDisabled={false}
                  isSearchable={true}
                  name="color"
                  options={years}
                  onChange={handleYearChange}
                  // value={selectedYear}
                />
              </div>
              <div className="w-100 p-2">
                <div className="p-1">Month</div>
                <Select
                  isDisabled={disMon}
                  isSearchable={true}
                  name="color"
                  options={monthOptions}
                  onChange={handleMonthChange}
                  defaultValue={monthOptions[0]}
                  value={selectedMonth}
                />
              </div>
              <div className="w-100 p-2">
                <div className="p-1">Day</div>
                <Select
                  isDisabled={disday}
                  isSearchable={true}
                  name="color"
                  options={day}
                  onChange={handleDayChange}
                  defaultValue={day[0]}
                  value={selectedDay}
                />
              </div>
              <div className="w-100 p-2">
                <div className="p-1">Generate Report </div>
                <Button
                  style={{ color: 'white' }}
                  variant="primary"
                  className="d-flex justify-content-center align-items-center w-100"
                  onClick={generateReport}
                >
                  <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Submit
                  <span className="d-none d-sm-inline"></span>
                </Button>
              </div>
              <div className="w-100 p-2">
                <div className="p-1">Reset Input</div>
                <Button
                  style={{ color: 'white' }}
                  variant="danger"
                  className="d-flex justify-content-center align-items-center w-100"
                  onClick={generateReport}
                >
                  <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Reset
                  <span className="d-none d-sm-inline"></span>
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        {protable ? (
          <Card>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Total Sales</th>
                    <th>Shift</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((employeeEntry, index) => (
                    <>
                      <tr>
                        <td rowSpan={employeeEntry.shiftSales.length + 1}>
                          {employeeEntry.employee}
                        </td>
                        <td rowSpan={employeeEntry.shiftSales.length + 1}>
                          {employeeEntry.totalSales}
                        </td>
                      </tr>
                      {employeeEntry.shiftSales.map((shiftEntry, subIndex) => (
                        <tr key={subIndex}>
                          <td>{shiftEntry.shift}</td>
                          <td>{shiftEntry.quantity}</td>
                          <td>{shiftEntry.price}</td>
                          <td>{shiftEntry.amount}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Body>
              <Table style={{ marginTop: '10px' }} bordered size="sm" className="mb-0">
                <thead>
                  <tr>
                    <th scope="col">{main}</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((x) => {
                    return (
                      <tr>
                        {x.date ? <td scope="row">{x.date}</td> : []}
                        {x.month || x.date ? [] : <td scope="row">{x.year}</td>}
                        {x.month ? <td scope="row">{months[x.month - 1]}</td> : []}

                        <td>
                          {Object.keys(x.product).map((productName) => {
                            return (
                              <>
                                <Table borderless className="mb-0">
                                  <tbody>
                                    <tr>
                                      <td>{productName}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </>
                            )
                          })}
                        </td>
                        <td>
                          {Object.keys(x.product).map((productName) => {
                            return (
                              <>
                                <Table borderless className="mb-0">
                                  <tbody>
                                    <tr>
                                      <td>{x.product[productName].Quantity}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </>
                            )
                          })}
                        </td>
                        <td>
                          {Object.keys(x.product).map((productName) => {
                            return (
                              <>
                                <Table borderless className="mb-0">
                                  <tbody>
                                    <tr>
                                      <td>{x.product[productName].Amount}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </>
                            )
                          })}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        <Footer />
      </div>
    </>
  )
}
export default SalesReport
