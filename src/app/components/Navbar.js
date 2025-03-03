"use client"
import Image from "next/image";
import "../styles/navbar.css";
import { pie } from "../utils/images";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setShow } from "@/redux/features/sidebarSlice";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const show = useSelector((state) => state.sidebar.show);
  const dispatch = useDispatch();
  return (
    <nav className="navbar">
      <div className="nav_flex">
        <p className="nav_text">{show}</p>

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
              <li onClick={() => dispatch(setShow('DASHBOARD'))}><Link href="/dashboard">Dashboard</Link></li>
              <li onClick={() => dispatch(setShow('USERS'))}><Link href="/dashboard/users">Users</Link></li>
              <li onClick={() => dispatch(setShow('ADD USER'))}><Link href="/dashboard/add-user">Add User</Link></li>
              <li ><Link href="/login">Logout</Link></li>
            </ul>
          </div>
        )}
        </div>
      </div>
    </nav>
  );
}
