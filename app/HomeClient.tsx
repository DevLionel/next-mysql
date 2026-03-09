"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import AddEmployeeModal from "./modals/AddEmployeeModal";
import DeleteEmployeeModal from "./modals/DeleteEmployeeModal";
import EditEmployeeModal from "./modals/EditEmployeeModal";
import AppContext from "../context/appContext";
import UsersTable from "../component/UsersTable";
import { paginate } from "../helpers/paginate";
import { search } from "../helpers/search";
import Pagination from "../component/Pagination";
import Alert from "../component/Alert";

interface User {
  id: number;
  username: string;
  email: string;
}

export default function HomeClient() {
  const [showAddEmployeeAlert, setShowAddEmployeeAlert] = useState<boolean>(false);
  const [showEditEmployeeAlert, setShowEditEmployeeAlert] = useState<boolean>(false);
  const [showDeleteEmployeeAlert, setShowDeleteEmployeeAlert] = useState<boolean>(false);

  const [myUsers, setMyUsers] = useState<User[]>([]);
  const [checkedUserIds, setCheckedUserIds] = useState<number[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // fetch users
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data: User[]) => setMyUsers(data));
  }, []);

  const handleSaveEmployee = async (data: { username: string; email: string }) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    const newUser: User = responseData.newUser;

    if (!newUser?.id || !newUser?.username || !newUser?.email) {
      console.error("Invalid user object:", newUser);
      return;
    }

    setMyUsers((prev) => [...prev, newUser]);

    setShowAddEmployeeAlert(true);
    setTimeout(() => setShowAddEmployeeAlert(false), 10000);
  };

  let searchedResult: User[] = [];
  let paginatedUsers: User[] = [];

  if (searchQuery.length > 0) {
    searchedResult = search(myUsers, searchQuery);
    paginatedUsers = paginate(searchedResult, currentPage, pageSize);
  } else {
    paginatedUsers = paginate(myUsers, currentPage, pageSize);
  }

  const handleEditUser = async (
    userId: number,
    data: { username: string; email: string }
  ) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    const editUser: User = responseData.result;

    if (!editUser?.id || !editUser?.username || !editUser?.email) {
      console.error("Invalid user object:", editUser);
      return;
    }

    setMyUsers((prev) =>
      prev.map((u) => (u.id === editUser.id ? editUser : u))
    );

    setShowEditEmployeeAlert(true);
    setTimeout(() => setShowEditEmployeeAlert(false), 10000);
  };

  const handleDeleteUser = async (userId: number) => {
    await fetch(`/api/users/${userId}`, { method: "DELETE" });

    setMyUsers((prev) => prev.filter((user) => user.id !== userId));

    setIsDeleteModalOpen(false);

    setShowDeleteEmployeeAlert(true);
    setTimeout(() => setShowDeleteEmployeeAlert(false), 10000);
  };

  return (
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

            {showEditEmployeeAlert && (
              <Alert
                message="User edited successfully!"
                type="success"
                onClose={() => setShowEditEmployeeAlert(false)}
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
              checkedUserIds={checkedUserIds}
              setCheckedUserIds={setCheckedUserIds}
              myUsers={myUsers}
              handleDeleteUser={handleDeleteUser}
            />

            {isModalOpen && (
              <AddEmployeeModal
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEmployee}
              />
            )}

            {isEditModalOpen && userToEdit && (
              <EditEmployeeModal
                initialUsername={userToEdit.username}
                initialEmail={userToEdit.email}
                userId={userToEdit.id}
                onClose={() => {
                  setUserToEdit(null);
                  setIsEditModalOpen(false);
                }}
                onEdit={handleEditUser}
              />
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
              users={paginatedUsers}
              onDeleteClick={(user: User) => {
                setUserToDelete(user);
                setIsDeleteModalOpen(true);
              }}
              onEditClick={(user: User) => {
                setUserToEdit(user);
                setIsEditModalOpen(true);
              }}
              checkedUserIds={checkedUserIds}
              setCheckedUserIds={setCheckedUserIds}
            />

            <Pagination
              usersCount={
                searchQuery.length > 0 ? searchedResult.length : myUsers.length
              }
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </AppContext.Provider>
        </main>
      </div>
    </div>
  );
}