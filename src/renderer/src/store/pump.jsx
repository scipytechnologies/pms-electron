import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  PumpName: '',
  PhoneNumber: '',
  Address: '',
  email: '',
  Tank: [],
  Employee: [],
  Fuel: [],
  Customer: [],
  InventoryManagement: [],
  Product: [],
  SalesAndBilling: [],
  DipStock: [],
  Nozzle: [],
  CardPayment: [],
  UPIPayment: [],
  OtherPayment: [],
  Payment: [],
  CreditSales: [],
  Shift: [],
  FuelTesting: [],
  Evaporation: []
}

export const PumpSlice = createSlice({
  name: 'pumpstore',
  initialState,
  reducers: {
    pumpInfo: (state, action) => {
      const {
        PumpName,
        PhoneNumber,
        Address,
        email,
        Tank,
        Employee,
        Fuel,
        Customer,
        InventoryManagement,
        Product,
        SalesAndBilling,
        DipStock,
        Nozzle,
        CardPayment,
        UPIPayment,
        OtherPayment,
        Payment,
        Shift,
        CreditSales,
        Ecommerce,
        FuelTesting,
        Evaporation
      } = action.payload
      ;(state.PumpName = PumpName),
        (state.PhoneNumber = PhoneNumber),
        (state.Address = Address),
        (state.email = email),
        (state.Tank = Tank),
        (state.Employee = Employee),
        (state.Fuel = Fuel),
        (state.Customer = Customer),
        (state.InventoryManagement = InventoryManagement),
        (state.Product = Product),
        (state.SalesAndBilling = SalesAndBilling),
        (state.DipStock = DipStock),
        (state.Nozzle = Nozzle),
        (state.CardPayment = CardPayment),
        (state.UPIPayment = UPIPayment),
        (state.OtherPayment = OtherPayment),
        (state.Payment = Payment),
        (state.Shift = Shift),
        (state.CreditSales = CreditSales),
        (state.Ecommerce = Ecommerce),
        (state.FuelTesting = FuelTesting),
        (state.Evaporation = Evaporation)
    }
  }
})

// Action creators are generated for each case reducer function
export const { pumpInfo } = PumpSlice.actions

export default PumpSlice.reducer
