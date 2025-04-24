import React, { useRef, useState } from 'react';
import Image from "next/image";
import { emptyUser, logo, QR } from '../utils/images';
import { FaFilePdf } from 'react-icons/fa';

const Model = ({ setShowModal, userData }) => {
    const printRef = useRef();
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowModal(false);
        }, 400); // Matches fadeOutScale duration
    };


    const printHandler = () => {
        const printContent = printRef.current.innerHTML;
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>
               <link rel="stylesheet" href="/pdf.css" />
            </head>
            <body>${printContent}</body>
          </html>
        `);
    };
    return (
        <div>
            <div className="modal-overlay" onClick={handleClose}>
                <div
                    className={`modal-content ${isClosing ? 'closing' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="modal-title">Identity Card</h2>
                    <div className="modal-body" ref={printRef}>
                        <div className='card-row'>
                            <div className='card-front'>
                                <div className='card-holder'></div>
                                <div className='logo-image-div'>
                                    <Image src={logo} alt='logo-image' style={{ background: 'lightgrey', borderRadius: '20px' }} />
                                </div>
                                <div className='profile-image-div'>

                                    <Image src={emptyUser} width={100} height={100} alt='profile' />
                                </div>
                                <div className='name-div'>
                                    <h3>{userData?.name}</h3>
                                    <p>{userData?.department}</p>
                                </div>
                                <div className='card-details-row'>
                                    <div className='detail-keys'>

                                        <p>Phone:</p>
                                        <p>CNIC:</p>
                                        <p>DOB:</p>
                                        <p>Department:</p>
                                        <p>Issue Date:</p>
                                        <p>Email:</p>
                                    </div>
                                    <div className='detail-values'>

                                        <p>{userData?.phone}</p>
                                        <p>{userData?.cnic}</p>
                                        <p>{userData?.dob.slice(0, 10)}</p>
                                        <p>{userData?.department}</p>
                                        <p>{userData?.createdAt.slice(0, 10)}</p>
                                        <p>{userData?.email}</p>

                                    </div>
                                </div>

                            </div>
                            <div className='card-back'>
                                <h3 className='imp-text'>Important</h3>
                                <div className='imp-text-details'>
                                    <p style={{ marginBottom: '10px' }}>1. Every one expected to carry their cards with them while on duty & produce the same on demand.</p>
                                    <p>2. Loss of this card must be reported to the Issuing Authority.</p>
                                </div>
                                <div className='qr-code-div'>
                                    <Image src={QR} alt='QR Code' height={100} width={100} />
                                </div>
                                <div className='found-div'>
                                    <p>If found please return to:</p>
                                    <p>abc block xyz town</p>
                                    <p>Pakistan - 54000</p>


                                </div>
                            </div>

                        </div>
                        <div className='pdf-btn-con'>
                            <button onClick={printHandler} className="download-btn-pdf">
                                <FaFilePdf />
                                Download PDF
                            </button>

                        </div>
                    </div>
                    <button className="close-btn" onClick={handleClose}>❌</button>
                </div>
            </div>
        </div>
    )
}

export default Model