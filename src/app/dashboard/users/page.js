"use client";

import "../../styles/users.css";
import deleteUserApi from "@/app/api/deleteUserApi";
import getUsersApi from "@/app/api/getUserApi";
import ChatPopup from "@/app/components/ChatPopup";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setView } from "@/redux/features/dashboardSlice";
import { useRouter } from "next/navigation";
import { FiUserX } from "react-icons/fi";
import ConfirmModal from "@/app/components/ConfirmModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentRole, setCurrentRole] = useState(null);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [userData, setUserData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const deleteHandler = async (id) => {
    const response = await deleteUserApi(id, toast);
    if (response?.success || true) {
      setTimeout(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }, 1000);
    }
  };

  const editHandler = async (id) => {
    const viewData = users.filter((item) => item._id === id);
    dispatch(setView(viewData));
    router.push("/dashboard/user-details");
  };

  const handleChatClick = (selectedUser) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      setActiveChatUser(selectedUser);
    } else {
      console.warn("No user found in localStorage.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setCurrentRole(payload.role);
    }

    getUsersApi({
      setUsers: (data) => {
        const sorted = data.sort((a, b) => b._id.localeCompare(a._id));
        setUsers(sorted);
      },
    });
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.department, user.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <div className="input-search-div">
         <input
        type="text"
        placeholder="🔍 Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      </div>
     

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
          {filteredUsers.length > 0 ? (
            filteredUsers.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <div className="icon-container">
                    <div
                      onClick={() => {
                        if (currentRole !== "user") {
                          editHandler(item?._id);
                        } else {
                          toast.error(
                            "Unauthorized: You do not have permission to view users",
                            {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              theme: "light",
                            }
                          );
                        }
                      }}
                      style={{
                        cursor:
                          currentRole === "user" ? "not-allowed" : "pointer",
                      }}
                    >
                      <FaEye className="icon view-icon" title="View" />
                    </div>

                    <FaEdit
                      className="icon edit-icon"
                      title="Chat"
                      onClick={() => handleChatClick(item)}
                    />

                    <div
                      onClick={() => {
                        if (currentRole !== "user") {
                          setSelectedUserId(item?._id);
                          setShowModal(true);
                        } else {
                          toast.error(
                            "Unauthorized: You do not have permission to delete users",
                            {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              theme: "light",
                            }
                          );
                        }
                      }}
                      style={{
                        cursor:
                          currentRole === "user" ? "not-allowed" : "pointer",
                      }}
                    >
                      <FaTrash className="icon delete-icon" title="Delete" />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="empty-state">
                  <FiUserX size={48} />
                  <p>No users found</p>
                </div>
              </td>
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

      <ConfirmModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedUserId(null);
        }}
        onConfirm={() => {
          deleteHandler(selectedUserId);
          setShowModal(false);
          setSelectedUserId(null);
        }}
      />

      <ToastContainer />
    </div>
  );
};

export default Users;
