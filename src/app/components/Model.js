import React from 'react';
import Image from "next/image";
import { emptyUser, logo, QR } from '../utils/images';
import { FaFilePdf } from 'react-icons/fa';

const Model = ({ setShowModal }) => {
    return (
        <div>
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2 className="modal-title">Identity Card</h2>
                    <div className="modal-body">
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
                                    <h3>Usama Ahmed</h3>
                                    <p>Engineer</p>
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

                                        <p>03000000000</p>
                                        <p>33333333333</p>
                                        <p>12-12-2024</p>
                                        <p>Engenering</p>
                                        <p>12-03-2025</p>
                                        <p>usama.wizz@gmail.com</p>

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
                            <button className="download-btn-pdf">
                               <FaFilePdf/>
                                Download PDF
                            </button>

                        </div>
                    </div>
                    <button className="close-btn" onClick={() => setShowModal(false)}>❌</button>
                </div>
            </div>
        </div>
    )
}

export default Model