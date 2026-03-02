"use client";

import React, { useState } from "react";

type Props = {
    onClose: () => void;
    onSave: (data: { username: string; email: string }) => void;
};

const AddEmployeeModal = ({ onClose, onSave }: Props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSave = () => {
        if (!username || !email) {
            alert("Please fill in all fields");
            return;
        }

        // Send data to parent or API
        onSave({ username, email });

        // Optional: reset fields
        setUsername("");
        setEmail("");

        onClose();
    };


    return (
        <div className="modal-backdrop-custom" onClick={onClose}>
        <div 
            className="modal-content-custom"
            onClick={(e) => e.stopPropagation()}
        >
            <h4 style={{ marginBottom: "16px", fontWeight: 600 }}>Add Employee</h4>

            <input
                type="text"
                placeholder="Username"
                className="form-control mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            
            <input
                type="text"
                placeholder="Email"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                <button className="btn btn-secondary" onClick={onClose}>
                Cancel
                </button>
            </div>
        </div>
        </div>
    );
};  

export default AddEmployeeModal;