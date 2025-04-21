"use client";

import "../styles/sidebar.css";
import Link from "next/link";
import Image from "next/image";
import { logo, dashboard, user } from "../utils/images"; 
import { FaSignOutAlt,FaUser, FaUserPlus,FaTachometerAlt  } from 'react-icons/fa';  
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthContext from "@/redux/auth-contex";
import logoutApi from "../api/logoutApi";

export default function Sidebar() {

  const authCtx = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = () => {
   
      logoutApi(authCtx,router,toast,setTimeout)
    };
  

  return (
    <aside className="sidebar">
      <div className="logo_row">
        <Image src={logo} alt="Logo" className="logo_image"  />
        <p className="logo_text">
          Student <br /> Collaboration
        </p>
      </div>

      <nav>
        <ul>
          <li>
            <Link style={{display:'flex', alignItems:'center',gap:'10px'}} href="/dashboard" className="nav-link">
            <FaTachometerAlt  size={24} />
              <p>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{display:'flex', alignItems:'center',gap:'10px'}} href="/dashboard/users" className="nav-link">
            <FaUser size={24} />
              <p>Users</p>
            </Link>
          </li>
          <li>
            <Link style={{display:'flex', alignItems:'center',gap:'10px'}} href="/dashboard" className="nav-link">
            <FaUserPlus  size={24} />
              <p>Add User</p>
            </Link>
          </li>
          <li style={{position:'absolute', bottom: '40px',width:'250px', cursor:'pointer'}} onClick={handleLogout}>
            <a style={{display:'flex', alignItems:'center',gap:'10px'}} className="nav-link">
            <FaSignOutAlt size={24} />
              <p>Logout</p>
            </a>
          </li>  
         
        </ul>
      </nav>
    </aside>
  );
}
