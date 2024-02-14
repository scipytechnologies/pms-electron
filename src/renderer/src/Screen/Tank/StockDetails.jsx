import { React, useEffect, useState, useRef } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Button, Card, Col, Nav, Row, Dropdown, Offcanvas, ButtonGroup, Modal, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import mainservice from "../../Services/mainservice";
import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from 'react-to-print'
import { pumpInfo } from '../../store/pump'


function StockDetails() {
    const currentSkin = (localStorage.getItem('skin-mode')) ? 'dark' : '';
    const [skin, setSkin] = useState(currentSkin);
    const dispatch = useDispatch()
    const user = useSelector((state) => state.loginedUser)
    const pump = useSelector((state) => state.pumpstore)
    console.log(pump)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const productData = useSelector((state) => state.pumpstore.DipStock)
    console.log("dipstockdatafrompump", productData)

    useEffect(() => {
        setData(pump.DipStock)
    }, [pump])  

    const fetchPump = async (id) => {
        const pumpdetails = await mainservice.getPumpById(id)
        if (pumpdetails.data != null) {
            dispatch(pumpInfo(pumpdetails.data.result2))
            console.log("poda", pumpdetails.data.result2)
        }
    }

    const [show, setShow] = useState(false)

    function handleOpen(id) {
        console.log("ididididi", id)
        setShow(true)
        getDipstockDataById(id)
    }
    const [sale, setSale] = useState({})
    const [product, setProduct] = useState([])
    console.log("productstate", product)
    console.log("salestate", sale)


    async function getDipstockDataById(id) {
        const res = await mainservice.getDipStockById(id)
        console.log("getdipstockdata", res)
        setSale(res.data.result2);
        setProduct(res.data.result2);
        setData(productData);
    }
    function handleClose() {
        setShow(false)
    }

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    useEffect(() => {
        fetchPump(user.PumpId)
    }, [])


    async function getDipStock() {
        setData(dipstockData)
    }
    useEffect(() => {
        getDipStock()
    }, []);

    async function deleteDipStock(pumpId,DipStockId) {
        const res = await mainservice.deleteDipStock(pumpId,DipStockId);
        if (res.data != null) {
            console.log("deleted");
            getDipStock()
        }
        else {
            console.log(res.message);
        }
    }

    const onDeleteHandler = (item) => {
        const pumpId = user.PumpId
        console.log("pumpId",pumpId)
        const DipStockId = item.DipStockId
        console.log("dipstockid",item.DipStockId);
        deleteDipStock(pumpId,DipStockId);
    }

    return (

        <>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="d-md-flex align-items-center justify-content-between mb-4">
                    <div>
                        <ol className="breadcrumb fs-sm mb-1">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item"><Link to="/dashboard/DipStock">DipStock</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">DipStock Details</li>
                        </ol>
                        <h4 className="main-title mt-2 mb-0">DipStock Details</h4>
                    </div>

                    <Button variant="primary" className="d-flex align-items-center gap-2" onClick={() => navigate('/dashboard/dipStock')}>
                        <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Add DipStock<span className="d-none d-sm-inline"></span>
                    </Button>
                </div>

                <Card>
                    <Card.Body>
                        <Grid
                            data={productData .map((item) => [
                                _(
                                    new Date(item.Date).toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })
                                ),
                                item.InvoiceNumber,
                                item.Product,
                                item.Quantity,
                                item.Price,

                                _(
                                    <>
                                        <ButtonGroup>
                                            <Button size="sm" variant='white' onClick={() => handleOpen(item.DipStockId)}><i className='ri-eye-line'></i></Button>
                                            <Button className='p-0' variant="white">


                                                <Dropdown drop="end">
                                                    <Dropdown.Toggle variant='white' size="sm" className='btn-no-outline'>
                                                        <i className='ri-more-2-fill' color="primary"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => navigate(`/dashboard/dipStock/?id=${item.DipStockId}`)}>Edit</Dropdown.Item>
                                                        <Dropdown.Item style={{ color: 'red' }} onClick={() => onDeleteHandler(item)}>Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Button>
                                        </ButtonGroup>

                                    </>

                                )
                            ])
                            }
                            columns={['Date', 'Invoice Number', 'Product', 'Quantity', 'Price', 'Action']}
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
                <Modal style={{ minWidth: '1200px' }} show={show} onHide={handleClose} size="lg" centered>
                    <Modal.Body style={{ padding: '30px', minHeight: '700px' }} ref={componentRef}>
                        <div className="m-3">
                            <div style={{ fontWeight: 'bold', fontSize: '30px', textAlign: 'center' }}>
                                {pump.PumpName}
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>
                                {pump.Address}
                            </div>
                            <div style={{ fontSize: '12px', textAlign: 'center' }}>
                                Phone No : {pump.PhoneNumber}
                            </div>
                        </div>
                        <div className="d-flex border p-2">
                            <div className="w-50">
                                <div></div>
                                <div className="w-100" style={{ textAlign: 'left' }}>
                                    Date : <b>{new Date(sale.Date).toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}</b>
                                </div>
                            </div>
                        </div>
                        <div className="p-2"></div>
                        <div className=" w-100"></div>
                        <div className="w-100">
                            <h6>DipStocks</h6>
                            <Table style={{ marginTop: '10px' }} striped bordered size="sm" className="mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Invoice Number</th>
                                        <th scope="col">Vehicle Number</th>
                                        <th scope="col">Agent Name</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{product.InvoiceNumber}</td>
                                        <td>{product.VehicleNumber}</td>
                                        <td>{product.AgentName}</td>
                                        <td>{product.Product}</td>
                                        <td>{product.Quantity}</td>
                                        <td>{product.Price}</td>
                                    </tr>  
                                </tbody>
                            </Table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handlePrint}>
                            Print
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )


}
export default StockDetails