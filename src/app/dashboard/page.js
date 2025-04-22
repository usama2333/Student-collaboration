"use client"

import '../styles/dashboard.css';
import Image from "next/image";
import { blue, red } from '../utils/images';
import getUsersApi from '../api/getUserApi';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import sendMagicLinkApi from '../api/sendMagicLinkApi';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const userData = JSON.parse(localStorage.getItem('user'));

  const handleSendLink = async () => {
    if (email) {
      await sendMagicLinkApi(email,toast,setEmail);  
    } else {
      toast.error(`Enter valid email`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    getUsersApi({ setUsers });
  }, []);

  return (
    <div className='dashboard-con'>
      <p className='welcome-text'>Welcome</p>
      <p className='user-name'>{userData.name ? userData.name : ''}</p>

      <div className='users-row'>
        <div className='user-depart-row'>
          <div className='user-con'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={red} alt="Red" className="" />
              <p className='no-user'>No of Users</p>
            </div>
            <p className='no-user-val'>{users.length}</p>
          </div>
          <div className='user-con'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={blue} alt="Red" className="" />
              <p className='no-depart'>Departments</p>
            </div>
            <p className='no-user-val'>3</p>
          </div>
        </div>
        <div className='add-user-con'>
          <div className='add-user-div'>
            <p className='add-user-text'>Add New Users</p>
            <p className='send-email-text'>Add an Email & send the magic link to users.</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>

            </div>
            <div className="email-form-group">
            <input
                type="email"
                className="email-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Handle email input
              />
              <button className="send-link-btn" onClick={handleSendLink}>
                Send Link <span style={{ marginLeft: '5px' }}>✉️</span>
              </button>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
    </div>
  );
}