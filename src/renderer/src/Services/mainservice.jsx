import { applicationsMenu } from '../data/Menu'
import apicall from './interceptor'

async function Login(data) {
  const response = await apicall.apicall('post', 9000, 'user/signin', data)
  return response
}
async function SignUp(data) {
  const response = await apicall.apicall('post', 9000, 'user/signup', data)
  return response
}
async function DeleteColab(id) {
  const response = await apicall.apicall('delete', 9000, `user/deleteColab/${id}`)
  return response
}
async function Auth(data) {
  const response = await apicall.apicall('post', 9000, 'user/auth', data)
  return response
}
async function GetUserById(id) {
  const response = await apicall.apicall('get', 9000, `user/getuser/${id}`)
  return response
}
async function CreateTank(data, id) {
  const response = await apicall.apicall('put', 9000, `pump/createTank/${id}`, data)
  return response
}

async function GetTankDetails(id) {
  const response = await apicall.apicall('get', 9000, `pump/getpumpbyid/${id}`)
  return response
}

async function PostDipStock(data) {
  const response = await apicall.apicall('post', 9000, `DipStockRouter/createDipStock`, data)
  return response
}

async function PostEmployee(data, id) {
  const response = await apicall.apicall('post', 9000, `employee/createemployee/${id}`, data)
  return response
}

////////////////////////////////{Customer}//////////////////////////////////////////
async function createCustomer(data, id) {
  const response = await apicall.apicall('post', 9000, `customer/createcustomer/${id}`, data)
  return response
}
async function getCustomer() {
  const response = await apicall.apicall('get', 9000, 'customer/getcustomer')
  return response
}

async function getCustomerById(id) {
  const response = await apicall.apicall('get', 9000, `customer/getcustomerbyid/${id}`)
  return response
}

async function updateCustomer(id, pumpid, data) {
  const response = await apicall.apicall(
    'put',
    9000,
    `customer/updatecustomer/${id}/${pumpid}`,
    data
  )
  return response
}

async function deleteCustomer(pumpId, customerId) {
  const response = await apicall.apicall(
    'delete',
    9000,
    `customer/deletecustomer/${pumpId}/${customerId}`
  )
  return response
}
//////////////////////////{Employee}////////////////////////////////
async function getEmployee() {
  const response = await apicall.apicall('get', 9000, 'employee/getemployee')
  return response
}

async function updateEmployee(id, pumpid, data) {
  const response = await apicall.apicall('put', 9000, `employee/updateemployee/${id}/${pumpid}`, data)
  return response
}

async function getEmployeeById(id) {
  const response = await apicall.apicall('get', 9000, `employee/getemployeebyid/${id}`)
  return response
}

async function deleteEmployee(pumpId, employeeId) {
  const response = await apicall.apicall(
    'delete',
    9000,
    `employee/deleteemployee/${pumpId}/${employeeId}`
  )
  return response
}
/////////////////////{inventory}//////////////////////////////////
async function getInventoryManagement() {
  const response = await apicall.apicall(
    'get',
    9000,
    'InventoryManagementRouter/getInventoryManagement'
  )
  return response
}
async function createInventoryManagement(data, id) {
  const response = await apicall.apicall(
    'post',
    9000,
    `InventoryManagementRouter/createInventoryManagement/${id}`,
    data
  )
  return response
}
async function getInventoryManagementById(id) {
  const response = await apicall.apicall(
    'get',
    9000,
    `InventoryManagementRouter/getInventoryManagementById/${id}`
  )
  return response
}

async function updateInventoryManagement(id, data) {
  const response = await apicall.apicall(
    'put',
    9000,
    `InventoryManagementRouter/updateInventoryManagement/${id}`,
    data
  )
  return response
}

async function deleteInventoryManagement(pumpId, inventoryId) {
  const response = await apicall.apicall(
    'delete',
    9000,
    `InventoryManagementRouter/deleteInventoryManagement/${pumpId}/${inventoryId}`
  )
  return response
}
///////////////////////{Product}////////////////////////////////////////
async function createProduct(data, id) {
  const response = await apicall.apicall('post', 9000, `ProductRouter/createProduct/${id}`, data)
  return response
}

async function getProduct() {
  const response = await apicall.apicall('get', 9000, 'ProductRouter/getProduct')
  return response
}
async function getProductById(id) {
  const response = await apicall.apicall('get', 9000, `ProductRouter/getProductById/${id}`)
  return response
}

async function updateProduct(id, data) {
  const response = await apicall.apicall('put', 9000, `ProductRouter/updateProduct/${id}`, data)
  return response
}

async function deleteProduct(categoryId, id) {
  const response = await apicall.apicall(
    'delete',
    9000,
    `ProductRouter/deleteProduct/${categoryId}/${id}`
  )
  return response
}

async function deleteCategory(pumpid, id) {
  const response = await apicall.apicall('delete', 9000, `ProductRouter/deleteCategory/${pumpid}/${id}`)
  return response
}

async function onSales(cat,id) {
  const response = await apicall.apicall('put', 9000, `ProductRouter/onsale/${cat}/${id}`)
  return response
}
//////////////////////////////{Sales}////////////////////////////////////////
async function createSalesAndBilling(id, data) {
  const response = await apicall.apicall(
    'post',
    9000,
    `SalesAndBilling/createSalesAndBilling/${id}`,
    data
  )
  return response
}
async function getSalesAndBilling() {
  const response = await apicall.apicall('get', 9000, 'SalesAndBilling/getSalesAndBilling')
  return response
}
async function getSalesAndBillingById(id) {
  const response = await apicall.apicall(
    'get',
    9000,
    `SalesAndBilling/getSalesAndBillingById/${id}`
  )
  return response
}

async function updateSalesAndBilling(id, data) {
  const response = await apicall.apicall(
    'put',
    9000,
    `SalesAndBilling/updateSalesAndBilling/${id}`,
    data
  )
  return response
}

async function deleteSalesAndBilling(id) {
  const response = await apicall.apicall(
    'delete',
    9000,
    `SalesAndBilling/deleteSalesAndBilling/${id}`
  )
  return response
}

async function getSalesReport(id, date, employ) {
  const response = await apicall.apicall(
    'get',
    9000,
    `SalesAndBilling/getSalesReport?date=${date}&employ=${employ}&pumpID=${id}`
  )
  return response
}
////////////////////////{Dipstock}////////////////////////////
async function createDipStock(id, data) {
  const response = await apicall.apicall('post', 9000, `DipStockRouter/createDipStock/${id}`, data)
  return response
}
async function getDipStock(id) {
  const response = await apicall.apicall('get', 9000, `DipStockRouter/getDipStock/${id}`)
  return response
}
async function getDipStockById(id) {
  const response = await apicall.apicall('get', 9000, `DipStockRouter/getDipStockById/${id}`)
  return response
}

async function updateDipStock(id, pumpid, data) {
  const response = await apicall.apicall('put', 9000, `DipStockRouter/updateDipStock/${id}/${pumpid}`, data)
  return response
}

async function deleteDipStock(pumpId,DipStockId) {
  const response = await apicall.apicall('delete', 9000, `DipStockRouter/deleteDipStock/${pumpId}/${DipStockId}`)
  return response
}
/////////////////////////{Pump}//////////////////////////////////
async function createPump(data) {
  const response = await apicall.apicall('post', 9000, 'pump/createpump', data)
  return response
}
async function getPump() {
  const response = await apicall.apicall('get', 9000, 'pump/getpump')
  return response
}
async function getPumpById(id) {
  const response = await apicall.apicall('get', 9000, `pump/getpumpbyid/${id}`)
  return response
}

async function updatePump(id, data) {
  const response = await apicall.apicall('put', 9000, `pump/updatepump/${id}`, data)
  return response
}
async function createFuel(id, data) {
  const response = await apicall.apicall('put', 9000, `pump/createFuel/${id}`, data)
  return response
}
async function editFuel(pumpid, id, data) {
  const response = await apicall.apicall('put', 9000, `pump/editFuel/${pumpid}/${id}`, data)
  return response
}

async function deletePump(id) {
  const response = await apicall.apicall('delete', 9000, `pump/deletepump/${id}`)
  return response
}

async function createNozzle(data, id) {
  const response = await apicall.apicall('put', 9000, `pump/createNozzle/${id}`, data)
  return response
}
async function deleteFuel(pumpid, id) {
  const response = await apicall.apicall('delete', 9000, `pump/deleteFuel/${pumpid}/${id}`)
  return response
}
///////////////////////////////{Card}///////////////////////////////////////////
async function createCardPayment(data, id) {
  const response = await apicall.apicall('put', 9000, `pump/createCardPayment/${id}`, data)
  return response
}
////////////////////////////////{UPI}///////////////////////////////////////////
async function createUPIPayment(data, id) {
  const response = await apicall.apicall('put', 9000, `pump/createUPIPayment/${id}`, data)
  return response
}
//////////////////////////////////{DailyReport}/////////////////////////////////////////////
async function getPumpSalesOnDate(data, id) {
  const response = await apicall.apicall('get', 9000, `DailyReport/getdailyByid/${id}`, data)
  return response
}
///////////////////////////////////{MonthlyReport}////////////////////////////////////////////////
async function getPumpSalesOnMonth(data, id) {
  const response = await apicall.apicall('get', 9000, `MonthlyReport/getmonthlyByid/${id}`, data)
  return response
}
////////////////////////////////{YearlyReport}////////////////////////////////////////////////
async function getPumpSalesOnYear(data, id) {
  const response = await apicall.apicall('get', 9000, `YearlyReport/getyearlyByid/${id}`, data)
  return response
}
async function createCreditSales(id, data) {
  const response = await apicall.apicall('post', 9000, `CreditSale/createcredit/${id}`, data)
  return response
}
async function createCreditPayment(id, data) {
  const response = await apicall.apicall('post', 9000, `Payment/createpayment/${id}`, data)
  return response
}
async function getCreditSales(id) {
  const response = await apicall.apicall('get', 9000, `CreditSale/getcredit/${id}`)
  return response
}
async function getCreditPayment(id) {
  const response = await apicall.apicall('get', 9000, `Payment/getpayment/${id}`)
  return response
}
async function getColab(id) {
  const response = await apicall.apicall('get', 9000, `user/getColab/${id}`)
  return response
}
async function getChart(id) {
  const response = await apicall.apicall('get', 9000, `SalesAndBilling/getchart/${id}`)
  return response
}
/////////////////////////////////{Ecommerce}////////////////////////////////////////////////
async function createEcommerce(id, data){
  const response = await apicall.apicall('post',9000,`Ecommerce/createEcommerce/${id}`, data)
  return response
}
async function getEcommerce(){
  const response = await apicall.apicall('get',9000,'Ecommerce/getEcommerce')
  return response
}
async function getByIdEcommerce(id){
  const response = await apicall.apicall('get',9000,`Ecommerce/getByIdEcommerce/${id}`)
  return response
}
////////////////////////////{Fuel Test}/////////////////////////////////////////////////////////
async function createFuelTest(id, data){
  const response = await apicall.apicall('post',9000,`FuelTest/createFuelTest/${id}`, data)
  return response
}

/////////////////////////////////{Evaporation}////////////////////////////////////////////////////////
async function createEvaporation(data, id){
  const response = await apicall.apicall('post',9000,`Evaporation/createEvaporation/${id}`, data)
  return response
}
async function getEvaporation() {
  const response = apicall.apicall('get',9000,'Evaporation/getEvaporation')
  return response
}
async function getEvaporationById(id) {
  const response = apicall.apicall('get',9000,`Evaporation/getEvaporationById/${id}`)
  return response
}
async function editEvaporation(id,data) {
  const response = apicall.apicall('put',9000,`Evaporation/editEvaporation/${id}`, data)
  return response
}
async function deleteEvaporation(id, pumpid) {
  const response = apicall.apicall('delete',9000,`Evaporation/deleteEvaporation/${id}/${pumpid}`)
  return response
}


////////////////////////////////////////////////////////////////////////////////////////

export default {
  createEcommerce,
  getByIdEcommerce,
  getEcommerce,
  GetUserById,
  Login,
  SignUp,
  Auth,
  CreateTank,
  GetTankDetails,
  deleteFuel,
  PostDipStock,
  createNozzle,
  PostEmployee,
  getCustomer,
  getEmployee,
  getInventoryManagement,
  getProduct,
  getSalesAndBilling,
  getDipStock,
  getPump,
  updateEmployee,
  getEmployeeById,
  deleteEmployee,
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  createInventoryManagement,
  getInventoryManagementById,
  updateInventoryManagement,
  deleteInventoryManagement,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createSalesAndBilling,
  getSalesAndBillingById,
  updateSalesAndBilling,
  deleteSalesAndBilling,
  createDipStock,
  getDipStockById,
  updateDipStock,
  deleteDipStock,
  createPump,
  getPumpById,
  updatePump,
  createFuel,
  deletePump,
  editFuel,
  createCardPayment,
  createUPIPayment,
  getPumpSalesOnDate,
  getPumpSalesOnMonth,
  getPumpSalesOnYear,
  createCreditSales,
  createCreditPayment,
  getCreditSales,
  getSalesReport,
  getCreditPayment,
  getColab,
  DeleteColab,
  getChart,
  createFuelTest,
  createEvaporation,
  getEvaporation,getEvaporationById,editEvaporation,deleteEvaporation,onSales,deleteCategory
}
