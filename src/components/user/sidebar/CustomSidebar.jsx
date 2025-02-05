import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import style from "./sidebar.module.css";
import { FaExpandArrowsAlt } from "react-icons/fa";

import { useState } from "react";


import { FaCompressArrowsAlt } from "react-icons/fa";



export default function CustomSidebar() {
   const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <>
     
     
     <Sidebar collapsed={isCollapsed} className={style.sidebar}>
    
    {isCollapsed ?  <FaExpandArrowsAlt    onClick={toggleCollapsed} /> : < FaCompressArrowsAlt  onClick={toggleCollapsed} />}


  <Menu     
 className={style.sidebar}
  >
    <MenuItem component={<Link to="/documentation" />}> Documentation</MenuItem>
    <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
    <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
  </Menu>
</Sidebar>;
    </>
  );
}
