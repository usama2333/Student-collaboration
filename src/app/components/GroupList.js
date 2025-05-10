'use client';
import '../styles/grouplist.css';
import React, { useEffect, useRef, useState } from 'react';
import { getGroups, deleteGroup } from '../api/groupApi';  // Assuming deleteGroup is implemented in your API
import { FaTrash, FaEdit } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group'; // For animation
import { ToastContainer, toast } from "react-toastify";

export default function GroupList({ onGroupSelect }) {
    const [groups, setGroups] = useState([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState(null);
    const nodeRef = useRef(null);

    useEffect(() => {
        const loadGroups = async () => {
            const res = await getGroups();
            setGroups(res);
        };
        loadGroups();
    }, []);

    // This is used to show the confirmation popup
    const handleDeleteGroup = (groupId) => {
        setGroupToDelete(groupId);
        setShowDeletePopup(true);  // Show the confirmation popup
    };

    // Confirm deletion of the group
    const confirmDelete = async () => {
        try {
            await deleteGroup(groupToDelete,toast); // Make API call to delete the group
            setGroups(groups.filter(group => group._id !== groupToDelete)); // Remove the group from the list
            setShowDeletePopup(false); // Hide the popup
        } catch (error) {
            console.error('Error deleting group', error);
        }
    };

    // Cancel deletion and close the popup
    const cancelDelete = () => {
        setShowDeletePopup(false); // Hide the popup without deleting
    };

    return (
        <div className="group-list-container">
            <h2>Groups</h2>
            <ul className="group-list">
                {groups.map(group => (
                    <li key={group._id} className="group-item">
                        <div className="group-name">{group.name}</div>
                        <div className="group-actions">
                            <button className="select-button" onClick={() => onGroupSelect(group)}>Select</button>
                            <button className="edit-button" onClick={() => handleEditGroup(group._id)}>
                                <FaEdit className="edit-icon" />
                            </button>
                            <button className="delete-button" onClick={() => handleDeleteGroup(group._id)}>
                                <FaTrash className="delete-icon" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Confirmation Popup */}
            <CSSTransition
                in={showDeletePopup}
                timeout={300}
                classNames="popup"
                nodeRef={nodeRef} // Use the nodeRef prop
                unmountOnExit
            >
                <div ref={nodeRef} className="popup-container">
                    <p>Are you sure you want to delete this group?</p>
                    <button onClick={cancelDelete}>Cancel</button>
                    <button onClick={confirmDelete}>Confirm</button>
                </div>
            </CSSTransition>
            <ToastContainer />
        </div>
    );
}
