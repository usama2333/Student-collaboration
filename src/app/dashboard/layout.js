
import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="container">
     <Sidebar/>
      {/* Main Content */}
      <main className="content">
     <Navbar/>
        {children}
      </main>
    </div>
  );
}
