import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import style from "./sidebar.module.css";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { useState } from "react";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { LiaFirstOrder } from "react-icons/lia";

export default function CustomSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <>


      <Sidebar collapsed={isCollapsed} className={style.sidebar}>



        <Menu className={style.sidebar}>
          {isCollapsed ? <FaExpandArrowsAlt onClick={toggleCollapsed} /> : < FaCompressArrowsAlt onClick={toggleCollapsed} />}
          <MenuItem icon={<CgProfile />} component={<Link to="/profile/info" />}> info</MenuItem>
          <MenuItem icon={<LiaFirstOrder />} component={<Link to="/profile/orders" />}> Order </MenuItem>
        </Menu>
      </Sidebar>;
    </>
  );
}
