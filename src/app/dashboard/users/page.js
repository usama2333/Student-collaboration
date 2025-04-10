"use client"

import "../../styles/users.css";
import getUsersApi from "@/app/api/getUserApi";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";


const Users = () => {
  const [users, setUsers] = useState([]); // State to store users data

  useEffect(() => {
    // Fetch users when the component is mounted
    getUsersApi({ setUsers });
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>DOB</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.dob}</td>
                <td>{item.role}</td>
                {/* <td
                  className={
                    item.status === "Active" ? "status-active" : "status-inactive"
                  }
                >
                  {item.status}
                </td> */}
                <td className="icon-container">
                  <FaEye className="icon view-icon" title="View" />
                  <FaEdit className="icon edit-icon" title="Edit" />
                  <FaTrash className="icon delete-icon" title="Delete" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
