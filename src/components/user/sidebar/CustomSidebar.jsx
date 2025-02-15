import React from "react";
import { Sidebar, Menu, MenuItem ,SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import style from "./sidebar.module.css";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { useState } from "react";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { LiaFirstOrder } from "react-icons/lia";

import { FaEnvelope, FaCog, FaUser, FaKey, FaBell, FaTools, FaQuestionCircle } from 'react-icons/fa';




export default function CustomSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <>

<div style={{ height: '100vh' }}>

      <Sidebar
      collapsed={isCollapsed}
        breakPoint="sm, md"
        transitionDuration={300}
        style={{
          backgroundColor: '#f5f5f5',
          color: '#333',
          borderRight: '1px solid #e0e0e0',
          transition: 'all 0.3s ease',
          width: isCollapsed? '60px' : '250px',
          zIndex: 1000,
          boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.1)',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',

          //fontWeight: 'bold',
          fontSize: '14px',
          overflow: 'hidden', // لمنع تجاوز النص للحاوية
          whiteSpace: 'nowrap', // لمنع التفاف النص
          textOverflow: 'ellipsis', // لإضافة ثلاث نقاط إذا تجاوز النص
         
          
        }}
         className={style.sidebar}
         
      >
        {isCollapsed ? <FaExpandArrowsAlt onClick={toggleCollapsed} /> : < FaCompressArrowsAlt onClick={toggleCollapsed} />}

        {/* Header Section */}
        <div style={{ padding: '20px', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center' ,  boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.1)', }}>
  <img
    
    src="../assets/img/product/single-product/review-1.png" // استبدل هذا بمسار رابط الصورة أو مسارها المحلي
    alt="صورة الملف الشخصي"
    style={{
      width: '50px',         // تحديد عرض الصورة
      height: '50px',        // تحديد ارتفاع الصورة (لجعلها مربعة)
      borderRadius: '50%',   // لجعلها دائرية
      marginRight: '5px',   // إضافة مساحة بين الصورة والنص
      
    }}
  />
  <p style={{ margin: 0 }}> alnabelsi.hussam!</p>
</div>

        {/* Main Content */}
        <Menu iconShape="square">  
 
          <SubMenu
          title="Persönliches Profil"
            icon={<FaCog />}
            style={{ fontWeight: 'bold' }}
            
          > 
          <MenuItem icon={<FaUser />} component={<Link to="/profile/info" />}>info Profil</MenuItem>
          <MenuItem icon={<FaEnvelope />} component={<Link to="/profile/imageProfile" />}>image Profil</MenuItem>
            <MenuItem icon={<FaCog />}>Kontoeinstellungen</MenuItem>
            
            <MenuItem icon={<FaKey />}>Anmeldungs-Management</MenuItem>
            <MenuItem icon={<FaKey />}>Passwort ändern</MenuItem>
            <MenuItem icon={<FaBell />}>Abonnieren</MenuItem>
          </SubMenu>

          {/* Mein Produkt Section */}
          <SubMenu
          
            title="Mein Produkt"
            icon={<FaTools />}
            style={{ fontWeight: 'bold' }}
          > 
            <MenuItem icon={<LiaFirstOrder />} component={<Link to="/profile/orders" />}>Orders</MenuItem>
            <MenuItem icon={<LiaFirstOrder />} component={<Link to="/profile/createOrder" />}>CreateOrder</MenuItem>
            
            <MenuItem>Status der Registrierung</MenuItem>
          </SubMenu>

          {/* Support Section */}
          <MenuItem
            icon={<FaQuestionCircle />}
            style={{ fontWeight: 'bold', borderTop: '1px solid #e0e0e0', marginTop: '15px' }}
          >
            Support und Dienste
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>


    {/* 
      <Sidebar   breakPoint="sm , md"  transitionDuration={300} collapsed={isCollapsed} className={style.sidebar}>
        <Menu className={style.sidebar}>
          {isCollapsed ? <FaExpandArrowsAlt onClick={toggleCollapsed} /> : < FaCompressArrowsAlt onClick={toggleCollapsed} />}
          <MenuItem icon={<CgProfile />} component={<Link to="/profile/info" />}> info</MenuItem>
          <MenuItem icon={<LiaFirstOrder />} component={<Link to="/profile/orders" />}> Order </MenuItem>
        </Menu>
      </Sidebar>

       */}
    </>
  );
}
