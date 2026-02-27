"use client";

import React from "react";

type NavbarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onAddClick: () => void;
};

const Navbar = ({ searchQuery, setSearchQuery, onAddClick }: NavbarProps) => {
  return (
    <div className="table-title">
      <div className="row align-items-center">
        <div className="col-sm-4">
          <h2>
            NextJS-MySQL <b>CRUD</b>
          </h2>
        </div>



        <div className="col-md-8 d-flex justify-content-end align-items-center gap-2 flex-wrap">
          <button className="btn btn-success" onClick={onAddClick}>
          <i className="material-icons">&#xE147;</i>
            Add New Employee
          </button>

          <button className="delete_all_data btn btn-danger">
            <i className="material-icons">&#xE15C;</i>
             Delete
          </button>

          <input
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            type="text"
            className="form-control"
            style={{ width: "200px", margin: "10px", float: "right", height: "34px" }}
            name="search_user"
            placeholder="Search a username..."
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
