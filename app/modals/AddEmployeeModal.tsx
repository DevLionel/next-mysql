"use client";

import React from "react";

type Props = {
    onClose: () => void;
};

const AddEmployeeModal = ({ onClose }: Props) => {
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
            />
            
            <input
                type="text"
                placeholder="Email"
                className="form-control mb-2"
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
                <button className="btn btn-primary">Save</button>
                <button className="btn btn-secondary" onClick={onClose}>
                Cancel
                </button>
            </div>
        </div>
        </div>
    );
};  

export default AddEmployeeModal;