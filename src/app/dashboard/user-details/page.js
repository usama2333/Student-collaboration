"use client"

import React, { useState } from 'react';
import '../../styles/userdetail.css';
import Image from "next/image";
import { emptyUser } from '@/app/utils/images';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiDownload, FiEdit } from 'react-icons/fi';
import Model from '@/app/components/Model';

const page = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='user-details-con'>
      <div className='main-row'>
        <div>
          <Image src={emptyUser} height={220} width={220} alt='User' className="floating-img" />
        </div>
        <div style={{ width: '100%' }}>
          <div className='upper-detail-row'>
            <div>
              <p className='user-name'>Usama Ahmed</p>
              <p className='user-desig'>Software Engineer</p>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <FaMapMarkerAlt style={{ marginRight: '8px', color: 'gray' }} />
                <span className='user-address'>New York, USA</span>
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
                  <p>Engerering</p>
                  <p>11111111111</p>
                  <p>10-12-25</p>
                </div>

              </div>


              <div style={{display:'flex',gap:'50px'}}>
                <div>
                  <p>Email:</p>
                  <p>Phone:</p>
                  <p>DOB:</p>
                </div>

                <div>
                  <p>usama.wizz@gmail.com</p>
                  <p>030000000000</p>
                  <p>10-12-25</p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {showModal && (
       <Model setShowModal={setShowModal}/>
      )}

    </div>
  )
}

export default page