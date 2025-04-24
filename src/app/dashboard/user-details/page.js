"use client"

import React, { useState,useEffect, useMemo } from 'react';
import '../../styles/userdetail.css';
import Image from "next/image";
import { emptyUser } from '@/app/utils/images';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiDownload, FiEdit } from 'react-icons/fi';
import Model from '@/app/components/Model';
import getUsersApi from '@/app/api/getUserApi';
import { useSelector } from "react-redux";

const page = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState('')
   const [currentRole, setCurrentRole] = useState(null);
   const [displayedUser, setDisplayedUser] = useState(null);
   const viewData = useSelector((state) => state.dashboard.view);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = JSON.parse(localStorage.getItem('user'));
        setCurrentRole(userData)
      }
  
      getUsersApi({ setUsers });
    }, []);

    const currentUserData = useMemo(() => {
      if (!Array.isArray(users) || !currentRole) return null;
      return users.find(user => user.email === currentRole.email);
    }, [users, currentRole]);

    console.log('View data', viewData)
    useEffect(() => {
      if (viewData?.length > 0) {
        setDisplayedUser(viewData[0]);
      } else {
        setDisplayedUser(currentUserData);
      }
    }, [viewData, currentUserData]);

  return (
    <div className='user-details-con'>
      <div className='main-row'>
        <div>
          <Image src={emptyUser} height={220} width={220} alt='User' className="floating-img" />
        </div>
        <div style={{ width: '100%' }}>
          <div className='upper-detail-row'>
            <div>
              <p className='user-name'>{displayedUser?.name}</p>
              <p className='user-desig'>{displayedUser?.department}</p>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <FaMapMarkerAlt style={{ marginRight: '8px', color: 'gray' }} />
                <span className='user-address'>{displayedUser?.address}</span>
              </div>
            </div>
            <div className="button-group">
              <button className="download-btn" onClick={() => setShowModal(true)}>
                <FiDownload /> Download
              </button>
              <button className="edit-btn">
                <FiEdit /> Edit User
              </button>
            </div>
          </div>

          <div className='line'></div>

          <div>
            <p className='general-info'>General info</p>
            <div className='general-info-flex'>
              <div style={{display:'flex',gap:'50px'}}>
                <div>
                  <p>Department:</p>
                  <p>CNIC:</p>
                  <p>Created At:</p>
                </div>

                <div>
                <p>{displayedUser?.department}</p>
                  <p>{displayedUser?.cnic}</p>
                  <p>{displayedUser?.createdAt.slice(0, 10)}</p>
                </div>

              </div>


              <div style={{display:'flex',gap:'50px'}}>
                <div>
                  <p>Email:</p>
                  <p>Phone:</p>
                  <p>DOB:</p>
                </div>

                <div>
                <p>{displayedUser?.email}</p>
                  <p>{displayedUser?.phone}</p>
                  <p>{displayedUser?.dob.slice(0, 10)}</p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {showModal && (
       <Model setShowModal={setShowModal} userData={displayedUser} />
      )}

    </div>
  )
}

export default page