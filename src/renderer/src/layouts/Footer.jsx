import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="main-footer">
      <span>&copy; 2024. indhanX.com. All Rights Reserved.</span>
      <span>Created by: <Link to="https://www.scipytechnologies.com" target="_blank">SciPy Technologies</Link></span>
    </div>
  )
}