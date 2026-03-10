"use client";

import React, { useState } from "react";
import { isValidEmail, isDuplicateEmail } from "@/helpers/validation";
import type { UserType } from "@/app/types/user";

type Props = {
    onClose: () => void;
    onSave: (data: { username: string; email: string }) => void;
    existingUsers: UserType[];
};

const AddEmployeeModal = ({ onClose, onSave, existingUsers }: Props) => {
    const [myUsers, setMyUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [invalidField, setInvalidField] = useState<"email" | "username" | null>(null);

    const handleSave = () => {
        if (!username.trim() || !email.trim()) {
            setError("All fields are required.");
            setInvalidField(!username.trim() ? "username" : "email");
            return;
        }
        
        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            setInvalidField("email");
            return;
        }

         // Check for duplicates
        if (isDuplicateEmail(email, existingUsers)) {
            setError("This email address is already used.");
            setInvalidField("email");
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
                className={`form-control mb-2 ${invalidField === "username" ? "is-invalid" : ""}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            
            <div className="mb-3">
                <input
                    type="email"
                    className={`form-control ${invalidField === "email" ? "is-invalid" : ""}`}
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {invalidField === "email" && <div className="invalid-feedback">{error}</div>}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
                <button className="btn btn-success" onClick={handleSave}>Save</button>
                <button className="btn btn-secondary" onClick={onClose}>
                Cancel
                </button>
            </div>
        </div>
        </div>
    );
};  

export default AddEmployeeModal;