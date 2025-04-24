"use client"

import "../../styles/users.css";
import deleteUserApi from "@/app/api/deleteUserApi";
import getUsersApi from "@/app/api/getUserApi";
import ChatPopup from "@/app/components/ChatPopup";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "@/redux/features/dashboardSlice";
import { useRouter } from "next/navigation";



const Users = () => {
  const [users, setUsers] = useState([]); // State to store users data
  const [currentRole, setCurrentRole] = useState(null);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [userData, setUserData] = useState('')
  const dispatch = useDispatch();
  const router = useRouter();

  const deleteHandler = async (id) => {
    console.log(id, 'id.....................')
    const response = await deleteUserApi(id, toast)
    if (response?.success || true) { // optional check
      setTimeout(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }, 1000); // 1 second delay
    }

  }
  const editHandler = async (id) => {
    console.log(id, 'id.....................')
    const viewData = users.filter((item) => item._id === id);
    dispatch(setView(viewData))
    router.push('/dashboard/user-details');
    

  }
  const handleChatClick = (selectedUser) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser); // update logged-in user
      setActiveChatUser(selectedUser); // update selected chat user
      console.log("Logged in as:", parsedUser.email);
      console.log("Chatting with:", selectedUser.email);
    } else {
      console.warn("No user found in localStorage.");
    }
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT
      setCurrentRole(payload.role);
    }

    getUsersApi({ setUsers });
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);
  

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
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
                <td>{item.email}</td>
                <td>{item.role}</td>
                {/* <td
                  className={
                    item.status === "Active" ? "status-active" : "status-inactive"
                  }
                >
                  {item.status}
                </td> */}
                <td className="icon-container">
                <div
                    onClick={() => {
                      if (currentRole !== "user") {
                        editHandler(item?._id);

                      } else {
                        toast.error("Unauthorized: You do not have permission to view users", {
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
                    <FaEye className="icon view-icon" title="View" />
                  </div>
                  {/* <FaEye className="icon view-icon" title="View" /> */}
                  <FaEdit className="icon edit-icon" title="Chat" onClick={() => handleChatClick(item)}/>
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
      {activeChatUser && (
        <ChatPopup
          user={activeChatUser}
          userData={userData}
          onClose={() => setActiveChatUser(null)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Users;
