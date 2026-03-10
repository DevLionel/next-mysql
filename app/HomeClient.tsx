"use client";

import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import AddEmployeeModal from "./modals/AddEmployeeModal";
import EditEmployeeModal from "./modals/EditEmployeeModal";
import DeleteEmployeeModal from "./modals/DeleteEmployeeModal";
import UsersTable from "../component/UsersTable";
import Pagination from "../component/Pagination";
import Alert from "../component/Alert";
import { paginate } from "../helpers/paginate";
import { search } from "../helpers/search";
import useAppContext from "../context/useAppContext";
import type { UserType } from "@/app/types/user";

export default function HomeClient() {
  const { users, setUsers } = useAppContext();
  const [checkedUserIds, setCheckedUserIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

  // Alerts
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showBulkDeleteAlert, setShowBulkDeleteAlert] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        if (!res.ok) {
          const text = await res.text();
          console.error("Fetch error:", text);
          return;
        }
        const data: UserType[] = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };
    fetchUsers();
  }, [setUsers]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Add user
  const handleSaveEmployee = async (data: { username: string; email: string }) => {
    if (users.some(u => u.email === data.email)) {
      alert("This email address is already used.");
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("POST error:", text);
        alert("Failed to add user");
        return;
      }

      const result = await res.json();
      const newUser: UserType = result.newUser;
      setUsers(prev => [...prev, newUser]);
      setShowAddAlert(true);
      setTimeout(() => setShowAddAlert(false), 5000);
    } catch (err) {
      console.error("POST failed:", err);
      alert("Failed to add user");
    }
  };

  // Edit user
  const handleEditUser = async (userId: number, data: { username: string; email: string }) => {
    if (users.some(u => u.email === data.email && u.id !== userId)) {
      alert("This email address is already used.");
      return;
    }

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("PUT error:", text);
        alert("Failed to edit user");
        return;
      }

      const result = await res.json();
      const updatedUser: UserType = result.result;
      setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
      setShowEditAlert(true);
      setTimeout(() => setShowEditAlert(false), 5000);
    } catch (err) {
      console.error("PUT failed:", err);
      alert("Failed to edit user");
    }
  };

  // Delete user
  const handleDeleteClick = async (user: UserType) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Pagination + search
  const filteredUsers = searchQuery.length > 0 ? search(users, searchQuery) : users;
  const paginatedUsers = paginate(filteredUsers, currentPage, pageSize);

  return (
    <div className="container-xl">
      <div className="table-responsive d-flex flex-column">
        <main>
          {/* Alerts */}
          {showAddAlert && <Alert message="User added successfully!" type="success" onClose={() => setShowAddAlert(false)} />}
          {showEditAlert && <Alert message="User edited successfully!" type="success" onClose={() => setShowEditAlert(false)} />}
          {showDeleteAlert && <Alert message="User deleted successfully!" type="success" onClose={() => setShowDeleteAlert(false)} />}
          {showBulkDeleteAlert && (<Alert message="Selected users deleted successfully!" type="success" onClose={() => setShowBulkDeleteAlert(false)} />)}

          {/* Navbar */}
          <Navbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAddClick={() => setIsAddModalOpen(true)}
            checkedUserIds={checkedUserIds}
            setCheckedUserIds={setCheckedUserIds}
            onBulkDelete={() => {
              setUsers(prev => prev.filter(u => !checkedUserIds.includes(u.id)));
              setCheckedUserIds([]);
              setShowBulkDeleteAlert(true);
              setTimeout(() => setShowBulkDeleteAlert(false), 5000);
            }}
          />

          {/* Modals */}
          {isAddModalOpen && <AddEmployeeModal onClose={() => setIsAddModalOpen(false)} onSave={handleSaveEmployee} existingUsers={users} />}
          {isEditModalOpen && userToEdit && (
            <EditEmployeeModal
              userId={userToEdit.id}
              initialUsername={userToEdit.username}
              initialEmail={userToEdit.email}
              onClose={() => {
                setUserToEdit(null);
                setIsEditModalOpen(false);
              }}
              onEdit={handleEditUser}
              existingUsers={users}
            />
          )}
          {isDeleteModalOpen && userToDelete && (
            <DeleteEmployeeModal
              username={userToDelete.username}
              onClose={() => setUserToDelete(null)}
              onDelete={() => {
                setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
                setIsDeleteModalOpen(false);
                setShowDeleteAlert(true);
                setTimeout(() => setShowDeleteAlert(false), 5000);
              }}
            />
          )}

          {/* Users table */}
          <UsersTable
            users={paginatedUsers}
            checkedUserIds={checkedUserIds}
            setCheckedUserIds={setCheckedUserIds}
            onEditClick={(user) => {
              setUserToEdit(user);
              setIsEditModalOpen(true);
            }}
            onDeleteClick={handleDeleteClick}
          />

          {/* Pagination */}
          <Pagination
            usersCount={filteredUsers.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}