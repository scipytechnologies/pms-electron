import apicall from './interceptor'

async function Login(data) {
  // console.log(data);
  const response = await apicall.apicall('post', 9000, 'user/signin', data)
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
  const response = await apicall.apicall('post',9000,`DipStockRouter/createDipStock`,data)
  return response
}

async function PostEmployee(data,id) {
  const response = await apicall.apicall('post',9000,`employee/createemployee/${id}`,data)
  return response
}

////////////////////////////////{Customer}//////////////////////////////////////////
async function createCustomer(data,id) {
  const response = await apicall.apicall('post',9000,`customer/createcustomer/${id}`,data)
  return response
}
async function getCustomer() {
  const response = await apicall.apicall('get',9000,'customer/getcustomer')
  return response
}

async function getCustomerById(id) {
  const response = await apicall.apicall('get',9000,`customer/getcustomerbyid/${id}`)
  return response
}

async function updateCustomer(id,data) {
  const response = await apicall.apicall('put',9000,`customer/updatecustomer/${id}`,data)
  return response
}

async function deleteCustomer(pumpId,customerId) {
  const response = await apicall.apicall('delete',9000,`customer/deletecustomer/${pumpId}/${customerId}`)
  return response
}
//////////////////////////{Employee}////////////////////////////////
async function getEmployee() {
  const response = await apicall.apicall('get',9000,'employee/getemployee')
  return response
}

async function updateEmployee(id, data) {
  const response = await apicall.apicall('put',9000,`employee/updateemployee/${id}`,data)
  return response
}

async function getEmployeeById(id) {
  const response = await apicall.apicall('get',9000,`employee/getemployeebyid/${id}`)
  return response
} 

async function deleteEmployee(pumpId,employeeId) {
  const response = await apicall.apicall('delete',9000,`employee/deleteemployee/${pumpId}/${employeeId}`)
  return response
}
/////////////////////{inventory}//////////////////////////////////
async function getInventoryManagement() {
  const response = await apicall.apicall('get',9000,'InventoryManagementRouter/getInventoryManagement')
  return response
}
async function createInventoryManagement(data,id) {
  const response = await apicall.apicall('post',9000,`InventoryManagementRouter/createInventoryManagement/${id}`,data)
  return response
}
async function getInventoryManagementById(id) {
  const response = await apicall.apicall('get',9000,`InventoryManagementRouter/getInventoryManagementById/${id}`)
  return response
}

async function updateInventoryManagement(id,data) {
  const response = await apicall.apicall('put',9000,`InventoryManagementRouter/updateInventoryManagement/${id}`,data)
  return response
}

async function deleteInventoryManagement(pumpId,inventoryId) {
  const response = await apicall.apicall('delete',9000,`InventoryManagementRouter/deleteInventoryManagement/${pumpId}/${inventoryId}`)
  return response
}
///////////////////////{Product}////////////////////////////////////////
async function createProduct(data,id) {
  const response = await apicall.apicall('post',9000,`ProductRouter/createProduct/${id}`,data)
  return response
}

async function getProduct() {
  const response = await apicall.apicall('get',9000,'ProductRouter/getProduct')
  return response
}
async function getProductById(id) {
  const response = await apicall.apicall('get',9000,`ProductRouter/getProductById/${id}`)
  return response
}

async function updateProduct(id, data) {
  const response = await apicall.apicall('put',9000,`ProductRouter/updateProduct/${id}`,data)
  return response
}

async function deleteProduct(categoryId,id   ) {
  const response = await apicall.apicall('delete',9000,`ProductRouter/deleteProduct/${categoryId}/${id}`)
  return response
}
//////////////////////////////{Sales}////////////////////////////////////////
async function createSalesAndBilling(id,data) {
  const response = await apicall.apicall('post',9000,`SalesAndBilling/createSalesAndBilling/${id}`,data)
  return response
}
async function getSalesAndBilling() {
  const response = await apicall.apicall('get',9000,'SalesAndBilling/getSalesAndBilling')
  return response
}
async function getSalesAndBillingById(id) {
  const response = await apicall.apicall('get',9000,`SalesAndBilling/getSalesAndBillingById/${id}`)
  return response
}

async function updateSalesAndBilling(id,data) {
  const response = await apicall.apicall('put',9000,`SalesAndBilling/updateSalesAndBilling/${id}`,data)
  return response
}

async function deleteSalesAndBilling(id) {
  const response = await apicall.apicall('delete',9000,`SalesAndBilling/deleteSalesAndBilling/${id}`)
  return response
}
////////////////////////{Dipstock}////////////////////////////
async function createDipStock(id,data) {
  const response = await apicall.apicall('post',9000,`DipStockRouter/createDipStock/${id}`,data)
  return response
}
async function getDipStock(id) {
  const response = await apicall.apicall('get',9000,`DipStockRouter/getDipStock/${id}`)
  return response
}
async function getDipStockById(id) {
  const response = await apicall.apicall('get',9000,`DipStockRouter/getDipStockById/${id}`)
  return response
}

async function updateDipStock(id,data) {
  const response = await apicall.apicall('put',9000,`DipStockRouter/updateDipStock/${id}`,data)
  return response
}

async function deleteDipStock(id) {
  const response = await apicall.apicall('delete',9000,`DipStockRouter/deleteDipStock/${id}`)
  return response
}
/////////////////////////{Pump}//////////////////////////////////
async function createPump(data) {
  const response = await apicall.apicall('post',9000,'pump/createpump',data)
  return response
}
async function getPump() {
  const response = await apicall.apicall('get',9000,'pump/getpump')
  return response
}
async function getPumpById(id) {
  const response = await apicall.apicall('get',9000,`pump/getpumpbyid/${id}`)
  return response
}

async function updatePump(id,data) {
  const response = await apicall.apicall('put',9000,`pump/updatepump/${id}`,data)
  return response
}
async function createFuel(id,data) {
  const response = await apicall.apicall('put',9000,`pump/createFuel/${id}`,data)
  return response
}
async function editFuel(pumpid,id,data) {
  const response = await apicall.apicall('put',9000,`pump/editFuel/${pumpid}/${id}`,data)
  return response
}


async function deletePump(id) {
  const response = await apicall.apicall('delete',9000,`pump/deletepump/${id}`)
  return response
}

async function createNozzle(data,id) {
  const response = await apicall.apicall('put',9000,`pump/createNozzle/${id}`,data)
  return response
}
async function deleteFuel(pumpid,id) {
  const response = await apicall.apicall('delete',9000,`pump/deleteFuel/${pumpid}/${id}`)
  return response
}
///////////////////////////////{Card}///////////////////////////////////////////
async function createCardPayment(data,id){
  const response = await apicall.apicall('put',9000,`pump/createCardPayment/${id}`,data)
  return response
}
////////////////////////////////{UPI}///////////////////////////////////////////
async function createUPIPayment(data,id){
  const response = await apicall.apicall('put',9000,`pump/createUPIPayment/${id}`,data)
  return response
}
//////////////////////////////////{DailyReport}/////////////////////////////////////////////
async function getPumpSalesOnDate(data,id){
  const response = await apicall.apicall('get',9000,`DailyReport/getdailyByid/${id}`,data)
  return response
}
///////////////////////////////////{MonthlyReport}////////////////////////////////////////////////
async function getPumpSalesOnMonth(data,id){
  const response = await apicall.apicall('get',9000,`MonthlyReport/getmonthlyByid/${id}`,data)
  return response
}
////////////////////////////////{YearlyReport}////////////////////////////////////////////////
async function getPumpSalesOnYear(data,id){
  const response = await apicall.apicall('get',9000,`YearlyReport/getyearlyByid/${id}`,data)
  return response
}



export default {
  GetUserById,
  Login,
  Auth,
  CreateTank,
  GetTankDetails,
  deleteFuel,
  PostDipStock,
  createNozzle,
  PostEmployee,getCustomer,getEmployee,getInventoryManagement,getProduct,getSalesAndBilling,getDipStock,getPump,updateEmployee,getEmployeeById,
  deleteEmployee,createCustomer,getCustomerById,updateCustomer,deleteCustomer,createInventoryManagement,getInventoryManagementById,updateInventoryManagement,deleteInventoryManagement,
  createProduct,getProductById,updateProduct,deleteProduct,createSalesAndBilling,getSalesAndBillingById,updateSalesAndBilling,deleteSalesAndBilling,createDipStock,
  getDipStockById,updateDipStock,deleteDipStock,createPump,getPumpById,updatePump,createFuel,deletePump,editFuel,createCardPayment,createUPIPayment,getPumpSalesOnDate,getPumpSalesOnMonth,getPumpSalesOnYear
}
