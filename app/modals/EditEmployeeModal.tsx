"use client";

import React, { useState, useEffect } from "react";
import { isValidEmail, isDuplicateEmail } from "@/helpers/validation";
import type { UserType } from "@/app/types/user";


type Props = {
    onClose: () => void;
    onEdit:  (id: number, data: { username: string; email: string }) => void;
    initialUsername: string;
    initialEmail: string;
    userId: number;
    existingUsers: UserType[];
};

const EditEmployeeModal = ({ onClose, onEdit, initialUsername, initialEmail, userId, existingUsers }: Props) => {
    const [username, setUsername] = useState(initialUsername);
    const [email, setEmail] = useState(initialEmail);
    const [error, setError] = useState<string | null>(null);
    const [invalidField, setInvalidField] = useState<"email" | "username" | null>(null);

    const handleEdit = () => {

    if (!isValidEmail(email)) {
        setError("Please enter a valid email address.");
        setInvalidField("email");
        return;
    }
    
    if (isDuplicateEmail(email, existingUsers, userId)) {
        setError("This email address is already used.");
        setInvalidField("email");
        return;
    }
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

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${invalidField === "email" ? "is-invalid" : ""}`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {invalidField === "email" && <div className="invalid-feedback">{error}</div>}
                </div>
                
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
                    <button className="btn btn-success" onClick={handleEdit}>Save</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeModal;