"use client"

import "../styles/navbar.css";
import Image from "next/image";
import { pie } from "../utils/images";
import { FaBell,  } from "react-icons/fa";
import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routeMap } from "@/constants/routes";
import AuthContext from "@/redux/auth-contex";
import { useRouter } from "next/navigation";
import logoutApi from "../api/logoutApi";
import { toast } from "react-toastify";

export default function Navbar() {
  const authCtx = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
 
  const activePage = routeMap[pathname] || "DASHBOARD"; 

  const handleLogout = () => {
 
    logoutApi(authCtx,router,toast,setTimeout)
  };

  return (
    <nav className="navbar">
      <div className="nav_flex">
        <p className="nav_text">{activePage}</p>

        <div className="email_profile_row">
          <div className="notification">
            <FaBell className="icon" />
            <span className="badge">5</span>
          </div>
          <div>
            <p className="name_text">User Name</p>
            <p className="email_text">CS189022.gmail.com</p>
          </div>
          <Image
            src={pie}
            alt="Logo"
            className="pie_image"
            onClick={() => setIsOpen(!isOpen)}
          />
           {isOpen && (
          <div className="dropdown-menu" onClick={() => setIsOpen(!isOpen)}>
            <ul>
              <li ><Link href="/dashboard">Dashboard</Link></li>
              <li ><Link href="/dashboard/users">Users</Link></li>
              <li ><Link href="/dashboard/add-user">Add User</Link></li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
        </div>
      </div>
    </nav>
  );
}
