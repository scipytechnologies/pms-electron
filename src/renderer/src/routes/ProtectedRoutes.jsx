import React from 'react'

// Dashboard
import EventManagement from '../dashboard/EventManagement'
import WebsiteAnalytics from '../dashboard/WebsiteAnalytics'
import FinanceMonitoring from '../dashboard/FinanceMonitoring'
import ProductManagement from '../dashboard/ProductManagement'
// Apps
import GalleryMusic from '../apps/GalleryMusic'
import GalleryVideo from '../apps/GalleryVideo'
import Tasks from '../apps/Tasks'
import Contacts from '../apps/Contacts'
import Chat from '../apps/Chat'
import AppCalendar from '../apps/AppCalendar'
import Email from '../apps/Email'
import FileManager from '../apps/FileManager'

// Pages
import Pricing from '../pages/Pricing'
import Faq from '../pages/Faq'
import Profile from '../pages/Profile'
import People from '../pages/People'
import Activity from '../pages/Activity'
import Events from '../pages/Events'
import Settings from '../Screen/General/Settings'
import Home from '../dashboard/Home'
import Tank from '../Screen/Tank/Tank'
import DipStock from '../Screen/Tank/dipStock'
import PostEmployee from '../Screen/Employee/AddEmployee'
import PostCustomer from '../Screen/Customer/AddCustomer'
import PostSales from '../Screen/Sales/AddSales'
import PostInventory from '../Screen/Inventory/AddInventory'

import CustomerDetails from '../Screen/Customer/CustomerDetails'
import EmployeeDetails from '../Screen/Employee/EmployeeDetails'
import InventoryDetails from '../Screen/Inventory/InventoryDetails'

import SalesAndBilling from '../Screen/Sales/SalesDetails'
import StockDetails from '../Screen/Tank/StockDetails'
import TankDetails from '../Screen/Tank/TankDetails'
import SalesReport from '../Screen/Sales/SalesReport'
import PaymentHistory from '../Screen/Customer/PaymentHistory'
import Product from '../Screen/Products/Products'
import ViewProductSales from '../Screen/Products/ViewSales'
import AddProduct from '../Screen/Products/AddProduct'
import ManageProducts from '../Screen/Products/ManageProducts'
import TestHistory from '../Screen/Tank/TestHistory'
import EvaporationLoss from '../Screen/Tank/EvaporationLoss'

const protectedRoutes = [
  { path: '', element: <Home /> },
  { path: 'dashboard/tank', element: <Tank /> },
  { path: 'dashboard/DipStock/dipStock', element: <DipStock /> },
  { path: 'dashboard/addEmployee', element: <PostEmployee /> },
  { path: 'dashboard/addCustomer', element: <PostCustomer /> },
  { path: 'dashboard/addSales', element: <PostSales /> },
  { path: 'dashboard/addinventory', element: <PostInventory /> },
  { path: 'dashboard/finance', element: <FinanceMonitoring /> },
  { path: 'dashboard/events', element: <EventManagement /> },
  { path: 'dashboard/analytics', element: <WebsiteAnalytics /> },
  { path: 'dashboard/product', element: <ProductManagement /> },
  { path: 'apps/gallery-music', element: <GalleryMusic /> },
  { path: 'apps/gallery-video', element: <GalleryVideo /> },
  { path: 'apps/tasks', element: <Tasks /> },
  { path: 'apps/contacts', element: <Contacts /> },
  { path: 'apps/chat', element: <Chat /> },
  { path: 'apps/calendar', element: <AppCalendar /> },
  { path: 'apps/email', element: <Email /> },
  { path: 'apps/file-manager', element: <FileManager /> },
  { path: 'pages/pricing', element: <Pricing /> },
  { path: 'pages/faq', element: <Faq /> },
  { path: 'pages/profile', element: <Profile /> },
  { path: 'pages/people', element: <People /> },
  { path: 'pages/activity', element: <Activity /> },
  { path: 'pages/events', element: <Events /> },
  { path: 'pages/settings', element: <Settings /> },

  { path: 'dashboard/Customer/CustomerDetails', element: <CustomerDetails /> },
  { path: 'dashboard/Customer/paymentHistory', element: <PaymentHistory /> },
  { path: 'dashboard/Employee/EmployeeDetails', element: <EmployeeDetails /> },
  { path: 'dashboard/Inventory/InventoryDetails', element: <InventoryDetails /> },

  { path: 'dashboard/Sales/SalesDetails', element: <SalesAndBilling /> },
  { path: 'dashboard/DipStock/StockDetails', element: <StockDetails /> },
  { path: 'dashboard/Tank/TankDetails', element: <TankDetails /> },
  { path: 'dashboard/Sales/SalesReport', element: <SalesReport /> },
  { path: 'dashboard/products', element: <Product /> },
  { path: 'dashboard/viewProductSales', element: <ViewProductSales /> },
  { path: 'dashboard/manageProducts', element: <ManageProducts /> },
  { path: 'dashboard/addproduct', element: <AddProduct /> },
  { path: 'dashboard/FuelTest/TestHistory', element: <TestHistory /> },
  { path: 'dashboard/Evaporation/EvaporationLoss', element: <EvaporationLoss /> }
]

export default protectedRoutes
