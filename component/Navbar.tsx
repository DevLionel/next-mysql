"use client";

import React from "react";
import useAppContext from "@/context/useAppContext";

type NavbarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onAddClick: () => void;
  checkedUserIds: number[];
  setCheckedUserIds: React.Dispatch<React.SetStateAction<number[]>>;
  onBulkDelete: () => void;
};

export default function Navbar({
  searchQuery,
  setSearchQuery,
  onAddClick,
  checkedUserIds,
  setCheckedUserIds,
}: NavbarProps) {
  const { users, setUsers } = useAppContext(); // ✅ context-driven users

  // Delete selected users (bulk delete)
  const onBulkDelete = () => {
    setUsers(users.filter((u) => !checkedUserIds.includes(u.id)));
    setCheckedUserIds([]); // uncheck all after delete
  };

  return (
    <div className="table-title">
      <div className="row align-items-center">
        <div className="col-sm-4">
          <h2>
            NextJS-MySQL <b>CRUD</b>
          </h2>
        </div>

        <div className="col-md-8 d-flex justify-content-end align-items-center gap-2 flex-wrap">
          {/* Add New Employee */}
          <button className="btn btn-success" onClick={onAddClick}>
            <i className="material-icons">&#xE147;</i> Add New Employee
          </button>

          {/* Bulk Delete */}
          <button
            className="delete_all_data btn btn-danger"
            onClick={onBulkDelete}
            disabled={checkedUserIds.length === 0}
          >
            <i className="material-icons">&#xE15C;</i> Delete
          </button>

          {/* Search Input */}
          <input
            type="text"
            className="form-control"
            style={{ width: "200px", margin: "10px", height: "34px" }}
            placeholder="Search a username..."
            name="search_user"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}