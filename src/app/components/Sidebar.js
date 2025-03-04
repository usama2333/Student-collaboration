"use client";

import Link from "next/link";
import Image from "next/image";
import { logo, dashboard, user } from "../utils/images"; 
import "../styles/sidebar.css";

export default function Sidebar() {

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
              <Image src={dashboard} alt="Dashboard Icon" />
              <p>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{display:'flex', alignItems:'center',gap:'10px'}} href="/dashboard/users" className="nav-link">
              <Image src={user} alt="User Icon" />
              <p>Users</p>
            </Link>
          </li>
          <li>
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
