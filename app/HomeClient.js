"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import AddEmployeeModal from "./modals/AddEmployeeModal";
import DeleteEmployeeModal from "./modals/DeleteEmployeeModal";
import User from "../component/User";
import AppContext from "../context/appContext";
import UsersTable from "../component/UsersTable";
import { paginate } from "../helpers/paginate";
import { search } from "../helpers/search";
import Pagination from "../component/Pagination";
import Alert from "../component/Alert";

export default function HomeClient() {
  const [showAddEmployeeAlert, setShowAddEmployeeAlert] = useState(false);
  const [showDeleteEmployeeAlert, setShowDeleteEmployeeAlert] = useState(false);
  const [myUsers, setMyUsers] = useState([]);
 
  const handleSaveEmployee = async (data) => {
    const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
     });

    const responseData = await response.json();
    const newUser = responseData.newUser;

    if (!newUser?.id || !newUser?.username || !newUser?.email) {
      console.error("Invalid user object:", newUser);
    return;
    }

    setMyUsers((prev) => [...prev, newUser]);

    // Show alert
    setShowAddEmployeeAlert(true);

    // Automatically hide after 10 seconds
    setTimeout(() => setShowAddEmployeeAlert(false), 10000);
    };
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setMyUsers(data));
  }, []);

  let searchedResult;
  let paginatedUsers;
  
    if (searchQuery.length > 0) {
      searchedResult = search(myUsers, searchQuery);
      paginatedUsers = paginate(searchedResult, currentPage, pageSize);
    } 
    else {
      paginatedUsers = paginate(myUsers, currentPage, pageSize);
    }
  
  const handleDeleteUser = async (userId) => {
  // Optional: call API to delete
  await fetch(`/api/users/${userId}`, { method: "DELETE" });

  // Remove from local state
  setMyUsers((prev) => prev.filter((user) => user.id !== userId));

  setIsDeleteModalOpen(false);

  // Show alert
  setShowDeleteEmployeeAlert(true);

  // Automatically hide after 10 seconds
  setTimeout(() => setShowDeleteEmployeeAlert(false), 10000);
};

  return (
    <>
    <div className="container-xl">
      <div className="table-responsive d-flex flex-column">
        <main>
          <AppContext.Provider
            value={{
              users: myUsers,
              setMyUsers: setMyUsers,
            }}
          >
          {showAddEmployeeAlert && (
            <Alert
              message="User added successfully!"
              type="success"
              onClose={() => setShowAddEmployeeAlert(false)}
            />
          )}

          {showDeleteEmployeeAlert && (
            <Alert
              message="User deleted successfully!"
              type="success"
              onClose={() => setShowDeleteEmployeeAlert(false)}
            />
          )}

          <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddClick={() => setIsModalOpen(true)}
          />

          {isModalOpen && (
            <AddEmployeeModal onClose={() => setIsModalOpen(false)} 
            onSave={handleSaveEmployee} />
          )}

          {isDeleteModalOpen && userToDelete && (
            <DeleteEmployeeModal
            username={userToDelete.username}
            onClose={() => {
            setUserToDelete(null);
          }}
          onDelete={() => handleDeleteUser(userToDelete.id)}
          />
          )}

          <UsersTable 
            users = {paginatedUsers}
            onDeleteClick= {(user) => {
              setUserToDelete(user);
              setIsDeleteModalOpen(true);    
            }}
           />
          <Pagination usersCount = {searchQuery.length > 0 ? searchedResult.length : myUsers.length} currentPage = {currentPage} pageSize = {pageSize} onPageChange = {setCurrentPage} />
          </AppContext.Provider>
        </main>
      </div>
    </div>
    </>
  );
}

 