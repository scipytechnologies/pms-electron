import { React, useEffect, useState } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Button, Card, Col, Nav, Row, Dropdown, Offcanvas, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import mainservice from "../../Services/mainservice";
import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import { useSelector } from "react-redux";

function TankDetails() {
    const currentSkin = (localStorage.getItem('skin-mode')) ? 'dark' : '';
    const [skin, setSkin] = useState(currentSkin);
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [data, setData] = useState([])


    async function getPump() {
        const res = await mainservice.getPump();
        console.log(res.data.result1)
        setData(res.data.result1)
    }
    useEffect(() => {
        getPump()
    }, []);

    async function deleteTank(id) {
        const res = await mainservice.deleteTank(id);
        if (res.data != null) {
            console.log("deleted");
            getPump()
        }
        else {
            console.log(res.message);
        }
    }

    const onDeleteHandler = (item) => {
        console.log(item._id);
        deleteTank(item._id);
    }

    return (

        <>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="d-md-flex align-items-center justify-content-between mb-4">
                    <div>
                        <ol className="breadcrumb fs-sm mb-1">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item"><Link to="/dashboard/TankDetails">Tank</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Tank Details</li>
                        </ol>
                        <h4 className="main-title mt-2 mb-0">Tank Details</h4>
                    </div>

                    <Button variant="primary" className="d-flex align-items-center gap-2" onClick={() => navigate('/dashboard/tank')}>
                        <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Add Tank<span className="d-none d-sm-inline"></span>
                    </Button>
                </div>

                <Card>
                    <Card.Body>
                        <Grid
                            data={data !== undefined ? data.map((item) => [
                                item.PumpName,
                                item.PhoneNumber,
                                item.Address,
                                _(
                                    <>
                                        <ButtonGroup>
                                            <Button size="sm" variant='white' onClick={() => handleCanvas()}><i className='ri-eye-line'></i></Button>
                                            <Button className='p-0' variant="white">


                                                <Dropdown drop="end">
                                                    <Dropdown.Toggle variant='white' size="sm" className='btn-no-outline'>
                                                        <i className='ri-more-2-fill' color="primary"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => navigate(`/dashboard/tank/?id=${item._id}`)}>Edit</Dropdown.Item>
                                                        <Dropdown.Item style={{ color: 'red' }} onClick={() => onDeleteHandler(item)}>Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Button>
                                        </ButtonGroup>

                                    </>

                                )
                            ])
                                : []
                            }
                            columns={['Pump Name', 'Phone Number', 'Address', 'Action']}
                            search={true}
                            pagination={true}
                            sort={true}
                            resizable={true}
                            className={{
                                table: 'table table-bordered mb-0',
                            }}
                        />
                    </Card.Body>                 
                </Card>
                <Footer />
            </div>
        </>
    )


}
export default TankDetails