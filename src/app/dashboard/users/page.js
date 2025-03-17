import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/users.css";
import data from "@/constants/data";

const Users = () => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.department}</td>
              <td>{item.designation}</td>
              <td
                className={
                  item.status === "Active" ? "status-active" : "status-inactive"
                }
              >
                {item.status}
              </td>
              <td className="icon-container">
                <FaEye className="icon view-icon" title="View" />
                <FaEdit className="icon edit-icon" title="Edit" />
                <FaTrash className="icon delete-icon" title="Delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
