import React, { useEffect, useState } from "react";
import { Button, Card, Col, Nav, ProgressBar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { dp3 } from "../data/DashboardData";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from 'react-redux'

export default function Home() {
  const user = useSelector((state) => state.loginedUser)
  const pump = useSelector((state) => state.pumpstore)
  console.log(user);


  const seriesOne = [{
    name: 'series1',
    data: dp3
  }, {
    name: 'series2',
    data: dp3
  }];

  const optionOne = {
    chart: {
      parentHeightOffset: 0,
      type: 'area',
      toolbar: { show: false },
      stacked: true
    },
    colors: ['#4f6fd9', '#506fd9'],
    grid: {
      borderColor: 'rgba(72,94,144, 0.08)',
      padding: { top: -20 },
      yaxis: {
        lines: { show: false }
      }
    },
    stroke: {
      curve: 'straight',
      width: [2, 0]
    },
    xaxis: {
      type: 'numeric',
      tickAmount: 13,
      axisBorder: { show: false },
      labels: {
        style: {
          colors: '#6e7985',
          fontSize: '11px'
        }
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0,
      }
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: { enabled: false }
  };

  const seriesTwo = [{
    type: 'column',
    data: [[0, 10], [1, 20], [2, 35], [3, 30], [4, 35], [5, 50], [6, 30], [7, 25], [8, 15], [9, 20], [10, 32], [11, 40], [12, 55], [13, 40], [14, 30], [15, 20], [16, 34], [17, 45], [18, 35], [19, 20], [20, 40], [21, 20], [22, 35], [23, 30], [24, 35], [25, 50], [26, 30], [27, 25], [28, 15], [29, 20], [30, 32], [31, 40], [32, 55], [33, 40], [34, 30], [35, 20], [36, 34], [37, 45], [38, 35], [39, 20], [40, 40]]
  }, {
    type: 'area',
    data: [[0, 70], [1, 71], [2, 70], [3, 70], [4, 78], [5, 79], [6, 75], [7, 70], [8, 75], [9, 72], [10, 74], [11, 76], [12, 80], [13, 81], [14, 80], [15, 78], [16, 80], [17, 82], [18, 87], [19, 80], [20, 81], [21, 80], [22, 70], [23, 70], [24, 71], [25, 75], [26, 74], [27, 76], [28, 80], [29, 80], [30, 80], [31, 76], [32, 75], [33, 80], [34, 81], [35, 80], [36, 79], [37, 78], [38, 80], [39, 81], [40, 80]]
  }];

  const optionTwo = {
    chart: {
      parentHeightOffset: 0,
      type: 'line',
      toolbar: { show: false }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    colors: ['#c1ccf1', '#506fd9'],
    grid: {
      borderColor: 'rgba(72,94,144, 0.07)',
      padding: {
        top: -20,
        bottom: -5
      },
      yaxis: {
        lines: { show: false }
      }
    },
    fill: {
      type: ['solid', 'gradient'],
      gradient: {
        type: 'vertical',
        opacityFrom: 0.35,
        opacityTo: 0.2,
        gradientToColors: ['#f3f5fc']
      }
    },
    stroke: {
      width: [0, 1.5]
    },
    xaxis: {
      type: 'numeric',
      tickAmount: 8,
      decimalsInFloat: 0,
      labels: {
        style: {
          colors: '#6e7985',
          fontSize: '9px'
        }
      },
      axisBorder: { show: false }
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100
    },
    legend: { show: false },
    tooltip: { enabled: false }
  };

  const seriesThree = [{
    type: 'column',
    data: [[0, 32], [1, 40], [2, 55], [3, 40], [4, 30], [5, 20], [6, 34], [7, 45], [8, 35], [9, 20], [10, 40], [11, 20], [12, 35], [13, 30], [14, 35], [15, 50], [16, 30], [17, 25], [18, 15], [19, 20], [20, 32], [21, 40], [22, 55], [23, 40], [24, 30], [25, 20], [26, 34], [27, 45], [28, 35], [29, 20], [30, 40], [31, 20], [32, 35], [33, 30], [34, 35], [35, 50], [36, 30], [37, 25], [38, 15], [39, 20], [40, 32]]
  }, {
    type: 'area',
    data: [[0, 82], [1, 80], [2, 85], [3, 80], [4, 76], [5, 70], [6, 74], [7, 75], [8, 75], [9, 70], [10, 71], [11, 72], [12, 75], [13, 80], [14, 85], [15, 80], [16, 70], [17, 95], [18, 95], [19, 90], [20, 92], [21, 90], [22, 95], [23, 90], [24, 90], [25, 90], [26, 84], [27, 85], [28, 85], [29, 80], [30, 70], [31, 70], [32, 75], [33, 70], [34, 75], [35, 80], [36, 75], [37, 85], [38, 78], [39, 70], [40, 82]]
  }];

  const optionThree = {
    chart: {
      parentHeightOffset: 0,
      type: 'line',
      toolbar: { show: false }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    colors: ['#cde1ff', '#85b6ff'],
    grid: {
      borderColor: 'rgba(72,94,144, 0.07)',
      padding: {
        top: -20,
        bottom: -5
      },
      yaxis: {
        lines: { show: false }
      }
    },
    fill: {
      type: ['solid', 'gradient'],
      gradient: {
        type: 'vertical',
        opacityFrom: 0.35,
        opacityTo: 0.2,
        gradientToColors: ['#f3f5fc']
      }
    },
    stroke: {
      width: [0, 1.5]
    },
    xaxis: {
      type: 'numeric',
      tickAmount: 8,
      decimalsInFloat: 0,
      labels: {
        style: {
          colors: '#6e7985',
          fontSize: '9px'
        }
      },
      axisBorder: { show: false }
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100
    },
    legend: { show: false },
    tooltip: { enabled: false }
  }

  const seriesFour = [{
    type: 'column',
    data: [[0, 0], [1, 0], [2, 5], [3, 6], [4, 8], [5, 10], [6, 15], [7, 18], [8, 13], [9, 11], [10, 13], [11, 15], [12, 13], [13, 7], [14, 5], [15, 8], [16, 11], [17, 7], [18, 5], [19, 5], [20, 6], [21, 6], [22, 5], [23, 5], [24, 6]]
  }, {
    type: 'column',
    data: [[0, 9], [1, 7], [2, 4], [3, 8], [4, 4], [5, 12], [6, 4], [7, 6], [8, 5], [9, 10], [10, 4], [11, 5], [12, 10], [13, 2], [14, 6], [15, 16], [16, 5], [17, 17], [18, 14], [19, 6], [20, 5], [21, 2], [22, 12], [23, 4], [24, 7]]
  }];

  const optionFour = {
    chart: {
      stacked: true,
      sparkline: { enabled: true }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    colors: ['#01a174', '#e5e9f2'],
    grid: {
      padding: {
        bottom: 10,
        left: -6,
        right: -5
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        endingShape: 'rounded'
      },
    },
    stroke: {
      curve: 'straight',
      lineCap: 'square'
    },
    yaxis: {
      min: 0,
      max: 30
    },
    tooltip: { enabled: false }
  };

  const seriesFive = [{
    type: 'column',
    data: [[0, 2], [1, 3], [2, 5], [3, 7], [4, 12], [5, 17], [6, 10], [7, 14], [8, 15], [9, 12], [10, 8], [11, 6], [12, 9], [13, 12], [14, 5], [15, 10], [16, 12], [17, 16], [18, 13], [19, 7], [20, 4], [21, 2], [22, 2], [23, 2], [24, 5]]
  }, {
    type: 'column',
    data: [[0, 12], [1, 7], [2, 4], [3, 5], [4, 8], [5, 10], [6, 4], [7, 7], [8, 11], [9, 9], [10, 5], [11, 3], [12, 4], [13, 6], [14, 6], [15, 10], [16, 5], [17, 7], [18, 4], [19, 16], [20, 15], [21, 11], [22, 12], [23, 4], [24, 7]]
  }];

  const optionFive = {
    chart: {
      stacked: true,
      sparkline: { enabled: true }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    colors: ['#85b6ff', '#e5e9f2'],
    grid: {
      padding: {
        bottom: 10,
        left: -6,
        right: -5
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        endingShape: 'rounded'
      },
    },
    stroke: {
      curve: 'straight',
      lineCap: 'square'
    },
    yaxis: {
      min: 0,
      max: 30
    },
    tooltip: { enabled: false }
  };

  const seriesSix = [{
    name: 'series1',
    data: dp3
  }, {
    name: 'series2',
    data: dp3
  }];

  const optionSix = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      },
      stacked: true,
      sparkline: {
        enabled: true
      }
    },
    colors: ['#506fd9', '#85b6ff'],
    stroke: {
      curve: 'straight',
      width: [0, 0]
    },
    yaxis: {
      min: 0,
      max: 60,
      show: false
    },
    xaxis: {
      min: 20,
      max: 30
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.75,
        opacityTo: 0.25,
      }
    },
    legend: { show: false },
    tooltip: { enabled: false }
  };

  const seriesSeven = [{
    data: [10, 12, 18, 25, 15, 30, 40, 10, 20, 12, 16, 60, 20, 15, 10, 60, 50, 40, 80, 100, 30, 40, 10, 20, 12, 16, 60, 20, 15, 60, 20, 15, 10, 60, 50, 40, 30, 40, 10, 20, 16, 60, 20, 15, 60, 20, 15, 10, 60, 50, 40, 30, 40, 10, 20]
  }, {
    data: [-10, -12, -18, -25, -15, -30, -40, -10, -20, -12, -16, -60, -20, -15, -10, -60, -50, -40, -80, -40, -30, -40, -10, -20, -12, -16, -60, -20, -15, -60, -20, -15, -10, -60, -50, -40, -30, -40, -10, -20, -40, -10, -20, -12, -16, -60, -20, -15, -60, -20, -15, -10, -60, -50, -40]
  }];

  const optionSeven = {
    chart: {
      parentHeightOffset: 0,
      stacked: true,
      toolbar: { show: false }
    },
    colors: ['#506fd9', '#85b6ff'],
    grid: {
      borderColor: 'rgba(72,94,144, 0.07)',
      padding: {
        top: -20,
        left: 0,
        bottom: -5
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        endingShape: 'rounded'
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    yaxis: {
      max: 130,
      tickAmount: 5,
      labels: {
        style: {
          colors: '#6e7985',
          fontSize: '10px'
        }
      }
    },
    xaxis: {
      type: 'numeric',
      tickAmount: 10,
      decimalsInFloat: 0,
      labels: {
        style: {
          colors: '#6e7985',
          fontSize: '10px',
          fontWeight: 'bold'
        }
      },
      axisBorder: { show: false }
    },
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    legend: { show: false },
    tooltip: { enabled: false }
  }
const generateDateSeries = (startDate, numberOfDays) => {
  const dateSeries = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < numberOfDays; i++) {
    dateSeries.push([currentDate.getTime(), Math.floor(Math.random() * 100000)]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateSeries;
};

const startDate = '2024-02-01'; // Replace with your desired start date
const numberOfDays = 31; // Adjust based on the number of days in your month

const seriesEight = [
  {
    type: 'column',
    data: generateDateSeries(startDate, numberOfDays),
  },
  {
    type: 'column',
    data: generateDateSeries(startDate, numberOfDays),
  },
];

const optionEight = {
  chart: {
    parentHeightOffset: 0,
    stacked: true,
    type: 'line',
    toolbar: { show: false },
  },
  grid: {
    borderColor: 'rgba(72,94,144, 0.07)',
    padding: {
      top: -20,
      left: 5,
      bottom: -10,
    },
  },
  states: {
    hover: {
      filter: { type: 'none' },
    },
    active: {
      filter: { type: 'none' },
    },
  },
  colors: ['#01a174', '#e5e9f2'],
  plotOptions: {
    bar: {
      columnWidth: '40%',
      endingShape: 'rounded',
    },
  },
  stroke: {
    curve: 'straight',
    lineCap: 'square',
    width: 0,
  },
  yaxis: {
    min: 0,
    max: 200000,
    tickAmount: 5,
  },
  xaxis: {
    type: 'datetime', // Specify that the x-axis represents dates
    labels: {
      style: {
        colors: '#6e7985',
        fontSize: '10px',
        fontWeight: '500',
      },
      formatter: function (value, timestamp) {
        const date = new Date(timestamp);
        return date.getDate(); // Display only the day of the month
      },
    },
    tickAmount: 30,
  },
  tooltip: { enabled: false },
  legend: { show: false },
};

  const optionDonut = {
    chart: {
      parentHeightOffset: 0
    },
    colors: ['#506fd9', '#85b6ff', '#51596d', '#eff1f5'],
    dataLabels: { enabled: false },
    grid: {
      padding: {
        top: 0,
        bottom: 0
      }
    },
    legend: { show: false }
  };

  const currentSkin = (localStorage.getItem('skin-mode')) ? 'dark' : '';
  const [skin, setSkin] = useState(currentSkin);

  const switchSkin = (skin) => {
    if (skin === 'dark') {
      const btnWhite = document.getElementsByClassName('btn-white');

      for (const btn of btnWhite) {
        btn.classList.add('btn-outline-primary');
        btn.classList.remove('btn-white');
      }
    } else {
      const btnOutlinePrimary = document.getElementsByClassName('btn-outline-primary');

      for (const btn of btnOutlinePrimary) {
        btn.classList.remove('btn-outline-primary');
        btn.classList.add('btn-white');
      }
    }
  };

  switchSkin(skin);
  useEffect(() => {
    switchSkin(skin);
  }, [skin]);

  return (
    <React.Fragment>
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-md-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Home</li>
            </ol>
          </div>
          <div className="d-flex gap-2 mt-3 mt-md-0">
            <Button variant="" className="btn-white d-flex align-items-center gap-2">
              <i className="ri-truck-line fs-18 lh-1"></i>Dip Stock
            </Button>
            <Button variant="" className="btn-white d-flex align-items-center gap-2">
              <i className="ri-calculator-line fs-18 lh-1"></i>Add Daily Sales   
            </Button>
            {/* <Button variant="primary" className="d-flex align-items-center gap-2">
              <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Generate<span className="d-none d-sm-inline"> Report</span>
            </Button> */}
          </div>
        </div>

        <Row className="g-3">
          <Col>
            <Card className="card-one">
              <Card.Body className="rounded bg-primary p-3 p-xl-4">
              <h4 style={{color:'white'}} className="main-title mb-0">Welcome {user.firstName} {user.lastName} to {pump.PumpName} Management System</h4>
              <p style={{color:'white',fontSize:'12px',paddingTop:'5px'}}>We are excited to welcome you to our state-of-the-art Petrol Station Management System Dashboard – your all-in-one solution for revolutionizing the way you manage and grow your petrol station business.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-3 mt-2">
          <Col>
            <Card className="card-one">
              <Card.Body style={{minHeight:'210px'}} className="rounded p-3 p-xl-4">
              <ReactApexChart series={seriesEight} options={optionEight} height={'100%'} className="apex-chart-three" />


              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card-one">
              <Card.Body className="rounded p-3 p-xl-4">
                                <Row className="g-4 mb-2">
                  {[
                    {
                      "name": "Tank 1",
                      "value": "6,000",
                      "percent": "40%",
                      "progress": 60
                    }, {
                      "name": "Tank 2",
                      "value": "3,750",
                      "percent": "25%",
                      "progress": 75,
                      "variant": "ui-02"
                    }, {
                      "name": "Tank 3",
                      "value": "3,000",
                      "percent": "20%",
                      "progress": 80,         
                      "variant": "gray-700"
                    }, {
                      "name": "Tank 4",
                      "value": "2,250",
                      "percent": "15%",
                      "progress": 85,
                      "variant": "gray-500"
                    }
                  ].map((item, index) => (
                    <Col xs="6" key={index}>
                      <label className="fs-sm fw-medium mb-1">{item.name}</label>
                      <h3 className="card-value mb-2">{item.value} <small>{item.percent}</small></h3>
                      <ProgressBar now={item.progress} className="ht-5 mb-0" variant={item.variant} />
                    </Col>
                  ))}
                </Row>
                 </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="g-3 mt-2">
        <Col>
            <Card className="card-one">
              <Card.Body style={{minHeight:'210px'}} className=" d-flex justify-content-center align-item-center rounded p-3 p-xl-4">
              {/* <ReactApexChart series={seriesEight} options={optionEight} height={'100%'} className="apex-chart-three" /> */}
              <p style={{height:'100%'}}>Coming Soon...</p>


              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card-one">
              <Card.Body style={{minHeight:'210px'}} className=" d-flex justify-content-center align-item-center rounded p-3 p-xl-4">
              {/* <ReactApexChart series={seriesEight} options={optionEight} height={'100%'} className="apex-chart-three" /> */}
              <p style={{height:'100%'}}>Coming Soon...</p>


              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card-one bg-primary">
              <Card.Body style={{minHeight:'210px'}} className=" d-flex justify-content-center align-item-center rounded p-3 p-xl-4">
              {/* <ReactApexChart series={seriesEight} options={optionEight} height={'100%'} className="apex-chart-three" /> */}
              <p style={{ color:'white',height:'100%'}}>Coming Soon...</p>


              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="g-3 mt-2">
        <Col>
            <Card className="card-one bg-dark">
              <Card.Body style={{minHeight:'210px'}} className=" d-flex justify-content-center align-item-center rounded p-3 p-xl-4">
              {/* <ReactApexChart series={seriesEight} options={optionEight} height={'100%'} className="apex-chart-three" /> */}
              <p style={{height:'100%',color:'white'}}>Coming Soon...</p>


              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card-one">
              <Card.Body style={{minHeight:'210px'}} className=" d-flex justify-content-center align-item-center rounded p-3 p-xl-4">
              {/* <ReactApexChart series={seriesEight} options={optionEight} height={'100%'} className="apex-chart-three" /> */}
              <p style={{height:'100%'}}>Coming Soon...</p>


              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card-one">
              <Card.Body style={{minHeight:'210px'}} className=" d-flex justify-content-center align-item-center rounded p-3 p-xl-4">
              {/* <ReactApexChart series={seriesEight} options={optionEight} height={'100%'} className="apex-chart-three" /> */}
              <p style={{height:'100%'}}>Coming Soon...</p>


              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Footer />
      </div>
    </React.Fragment>
  );
}
