"use client";

import React, { useState, useEffect } from "react";

type Props = {
    onClose: () => void;
    onEdit:  (id: number, data: { username: string; email: string }) => void;
    initialUsername: string;
    initialEmail: string;
    userId: number;
};

const EditEmployeeModal = ({ onClose, onEdit, initialUsername, initialEmail, userId }: Props) => {
    const [username, setUsername] = useState(initialUsername);
    const [email, setEmail] = useState(initialEmail);

    const handleEdit = () => {
        // Call the parent's edit function
        onEdit(userId, {username, email });
       
        onClose();
    };

    return (
        <div className="modal-backdrop-custom" onClick={onClose}>
            <div 
                className="modal-content-custom"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 style={{ marginBottom: "16px", fontWeight: 600 }}>Edit Employee</h4>

                <input
                type="text"
                className="form-control mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

                <input
                type="text"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
                    <button className="btn btn-success" onClick={handleEdit}>Save</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeModal;