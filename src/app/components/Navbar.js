import Image from "next/image";
import "../styles/navbar.css";
import { pie } from "../utils/images";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav_flex">
        <p className="nav_text">Dashboard</p>
        <div className="email_profile_row">
          <div>
            <p className="name_text">User Name</p>
            <p className="email_text">CS189022.gmail.com</p>
          </div>
            <Image src={pie} alt="Logo" className="pie_image"  />


        </div>

      </div>
    </nav>
  );
}
