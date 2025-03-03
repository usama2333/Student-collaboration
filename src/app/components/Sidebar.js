"use client";

import Link from "next/link";
import Image from "next/image";
import { logo, dashboard, user } from "../utils/images"; 
import "../styles/sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { setShow } from "@/redux/features/sidebarSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
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
          <li onClick={() => dispatch(setShow('DASHBOARD'))}>
            <Link style={{display:'flex', alignItems:'center',gap:'10px'}} href="/dashboard" className="nav-link">
              <Image src={dashboard} alt="Dashboard Icon" />
              <p>Dashboard</p>
            </Link>
          </li>
          <li onClick={() => dispatch(setShow('USERS'))}>
            <Link style={{display:'flex', alignItems:'center',gap:'10px'}} href="/dashboard/users" className="nav-link">
              <Image src={user} alt="User Icon" />
              <p>Users</p>
            </Link>
          </li>
          <li onClick={() => dispatch(setShow('ADD USERS'))}>
            <Link style={{display:'flex', alignItems:'center',gap:'10px'}} href="/dashboard/add-user" className="nav-link">
              <Image src={user} alt="User Icon" />
              <p>Add User</p>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
