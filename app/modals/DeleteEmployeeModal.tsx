"use client";

import React from "react";

type Props = {
    onClose: () => void;
    onDelete: () => void;
    username: string; // Optional: show the username to be deleted
};

const DeleteEmployeeModal = ({ onClose, onDelete, username }: Props) => {

    const handleDelete = () => {
        // Call the parent's delete function
        onDelete();
        onClose();
    };

    return (
        <div className="modal-backdrop-custom" onClick={onClose}>
            <div 
                className="modal-content-custom"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 style={{ marginBottom: "16px", fontWeight: 600 }}>Delete Employee</h4>
                
                <p>Are you sure you want to delete <strong>{username}</strong>?</p>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteEmployeeModal;