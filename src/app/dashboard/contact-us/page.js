'use client';
import React from 'react';
import Swal from 'sweetalert2';
import '../../styles/contact.css';

const Page = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'Thank you for reaching out. We will get back to you soon.',
      confirmButtonColor: '#e37256'
    });

    // Optional: clear form inputs if needed
    e.target.reset();
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you — reach out anytime!</p>
      </div>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" placeholder="Your Name" required />

          <label>Email</label>
          <input type="email" placeholder="Your Email" required />

          <label>Message</label>
          <textarea rows="6" placeholder="Type your message..." required></textarea>

          <button type="submit">Send Message</button>
        </form>
         {/* <div className="contact-info">
          <h3>Our Info</h3>
          <p>📧 Email: support@studentcollab.com</p>
          <p>📍 Location: Virtual Campus, Worldwide</p>
          <p>⏰ Hours: Mon - Fri (9am - 6pm)</p>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
