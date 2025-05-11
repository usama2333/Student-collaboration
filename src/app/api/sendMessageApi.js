import axios from 'axios';

export default async function sendMessageApi({ to, subject, message }, Swal, resetForm) {
  try {
    const response = await axios.post("http://localhost:5000/api/send-message", {
      to,
      subject,
      message,
    });

    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for reaching out. We will get back to you soon.',
        confirmButtonColor: '#e37256',
      });

      if (resetForm) resetForm();
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong. Please try again later.',
      confirmButtonColor: '#e37256',
    });
    console.error("Send message error:", error?.response?.data || error.message);
  }
}
