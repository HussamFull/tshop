import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import style from "./sidebar.module.css";

export default function CustomSidebar() {
  return (
    <>
     
     
     <Sidebar className={style.sidebar}>
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
