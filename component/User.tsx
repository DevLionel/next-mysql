"use client";

import React from "react";
import type { UserType } from "@/app/types/user";
import useAppContext from "@/context/useAppContext";

type UserProps = {
  user: UserType;
  isChecked: boolean;
  setCheckedUserIds: React.Dispatch<React.SetStateAction<number[]>>;
  onEditClick: (user: UserType) => void; // still pass edit click for modal
  onDeleteClick: (user: UserType) => void; 
};

export default function User({ user, isChecked, setCheckedUserIds, onEditClick, onDeleteClick }: UserProps) {
  const { users, setUsers } = useAppContext(); // ✅ access users directly from context

  // Toggle checkbox for this user
  const handleCheckboxChange = () => {
    if (isChecked) {
      setCheckedUserIds((prev) => prev.filter((id) => id !== user.id));
    } else {
      setCheckedUserIds((prev) => [...prev, user.id]);
    }
  };

  // Delete user directly via context
  const handleDelete = () => {
    setUsers(users.filter((u) => u.id !== user.id));
  };

  return (
    <tr>
      <td>
        <span className="custom-checkbox">
          <input
            type="checkbox"
            id={`checkbox_${user.id}`}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`checkbox_${user.id}`} />
        </span>
      </td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        <a
          className="edit"
          style={{ cursor: "pointer" }}
          onClick={() => onEditClick(user)}
        >
          <i className="material-icons" title="Edit">
            &#xE254;
          </i>
        </a>
        <a
          className="delete"
          style={{ cursor: "pointer" }}
          onClick={() => onDeleteClick(user)}
        >
          <i className="material-icons" title="Delete">
          &#xE872;
          </i>
        </a>
      </td>
    </tr>
  );
}