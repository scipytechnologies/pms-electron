import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="main-footer">
      <span>&copy; 2023. indhanX.com. All Rights Reserved.</span>
      <span>Created by: <Link to="http://SciPy Technologies.me" target="_blank">SciPy Technologies</Link></span>
    </div>
  )
}