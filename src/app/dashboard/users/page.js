"use client"

import deleteUserApi from "@/app/api/deleteUserApi";
import "../../styles/users.css";
import getUsersApi from "@/app/api/getUserApi";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]); // State to store users data
  const [currentRole, setCurrentRole] = useState(null);

  const deleteHandler = async (id) => {
    console.log(id, 'id.....................')
    const response = await deleteUserApi(id, toast)
    if (response?.success || true) { // optional check
      setTimeout(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }, 1000); // 1 second delay
    }

  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT
      setCurrentRole(payload.role);
    }

    getUsersApi({ setUsers });
  }, []);

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
                  {/* {
                    currentRole !== "user" && (
                      <div onClick={() => deleteHandler(item?._id)}>
                        <FaTrash className="icon delete-icon" title="Delete" />
                      </div>
                    )
                  } */}
                 <div
  onClick={() => {
    if (currentRole !== "user") {
      deleteHandler(item?._id);
    } else {
      toast.error("Unauthorized: You do not have permission to delete users", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }}
  style={{
    cursor: currentRole === "user" ? "not-allowed" : "pointer"
  }}
>
  <FaTrash className="icon delete-icon" title="Delete" />
</div>


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
      <ToastContainer />
    </div>
  );
};

export default Users;
