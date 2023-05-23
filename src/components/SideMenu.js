import React from 'react';
import { Outlet, Link } from "react-router-dom";

function SideMenu() {
  return (
    
    <div style={{width:"100%", height:"100%", backgroundColor:"red", display:"flex", flexDirection:"row" }} >
    <div style={{width:"30%", height:"100%", backgroundColor:"blue" }} >
          </div>
    <div style={{width:"70%", height:"100%",  backgroundColor:"green"}} >
    </div>
    </div>
  );
}

export default SideMenu;
