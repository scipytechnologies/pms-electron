import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id:' ',
    isConnected : false,
    role:'',
    firstName:'',
    lastName:'',
    PumpId:'',
    email:''   
  }

  export const LoginedUserSlice = createSlice({
    name:'loginedUser',
    initialState,
    reducers: {
       loggeduser : (state,action ) => {
           state.id = action.payload 
       },
       isConnected : (state) => {
            state.isConnected = true
       },
       setRole : (state,action) => {
        state.role = action.payload
       },
       setUserProfile :(state,action) =>{
        const {firstName,lastName,PumpId,email} = action.payload;
        console.log(action.payload);
        state.firstName = firstName;
        state.lastName = lastName;
        state.PumpId = PumpId;
        state.email = email;
       } 
        
  }
  })
  
  // Action creators are generated for each case reducer function
  export const {loggeduser,isConnected,setRole,setUserProfile} = LoginedUserSlice.actions
  
  export default  LoginedUserSlice.reducer