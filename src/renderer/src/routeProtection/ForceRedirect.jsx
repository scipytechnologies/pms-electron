import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const ForceRedirect = ({ user, children }) => {
  const active = useSelector((state) => state.loginedUser.role)
  // console.log(user)
  console.log(active);
  if (user == true) {
    switch(active) {
      case 'owner': 
      return <Navigate to="/" replace />;
      case 'user': 
      return <Navigate to="/" replace />;
      case 'employee' :
      return <Navigate to="/" replace />;
      case '' :
        return <Navigate to="/" replace />;
    }
    
  } 
  return children;
};

export default ForceRedirect; 