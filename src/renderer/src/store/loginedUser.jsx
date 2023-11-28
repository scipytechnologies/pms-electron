import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id:' ',
    isConnected : false,
    role:'owner',
    firstName:'',
    lastName:'',
    pumpID:'',
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
        // state.role = action.payload
        state.role = "owner"
       },
       setUserProfile :(state,action) =>{
        const {firstName,lastName,pumpID,email} = action.payload;
        state.firstName = firstName;
        state.lastName = lastName;
        state.pumpID = pumpID;
        state.email = email
       } 
        
  }
  })
  
  // Action creators are generated for each case reducer function
  export const {loggeduser,isConnected,setRole,setUserProfile} = LoginedUserSlice.actions
  
  export default  LoginedUserSlice.reducer