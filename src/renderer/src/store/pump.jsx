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
  OtherPayment: []
}

export const PumpSlice = createSlice({
  name: 'pumpstore',
  initialState,
  reducers: {
    pumpInfo : (state,action ) => {
        const { PumpName,
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
        Ecommerce} = action.payload;
        state.PumpName= PumpName,
        state.PhoneNumber= PhoneNumber,
        state.Address= Address,
        state.email= email,
        state.Tank= Tank,
        state.Employee= Employee,
        state.Fuel= Fuel,
        state.Customer= Customer,
        state.InventoryManagement= InventoryManagement,
        state.Product= Product,
        state.SalesAndBilling= SalesAndBilling,
        state.DipStock= DipStock,
        state.Nozzle= Nozzle,
        state.CardPayment= CardPayment,
        state.UPIPayment= UPIPayment,
        state.OtherPayment= OtherPayment,
        state.Ecommerce= Ecommerce
    },
  }
})

// Action creators are generated for each case reducer function
export const {pumpInfo} = PumpSlice.actions

export default PumpSlice.reducer
