"use client";

import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import AddEmployeeModal from "./modals/AddEmployeeModal";
import AppContext from "../context/appContext";
import UsersTable from "../component/UsersTable";
import { paginate } from "../helpers/paginate";
import { search } from "../helpers/search";
import Pagination from "../component/Pagination";
import Alert from "../component/Alert";

export default function HomeClient() {
  const [showAlert, setShowAlert] = useState(false);
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
    setShowAlert(true);

    // Automatically hide after 10 seconds
    setTimeout(() => setShowAlert(false), 10000);
    };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 3;
  

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
          {showAlert && (
            <Alert
              message="User added successfully!"
              type="success"
              onClose={() => setShowAlert(false)}
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

          <UsersTable users = {paginatedUsers} />
          <Pagination usersCount = {searchQuery.length > 0 ? searchedResult.length : myUsers.length} currentPage = {currentPage} pageSize = {pageSize} onPageChange = {setCurrentPage} />
          
          </AppContext.Provider>
        </main>
      </div>
    </div>
    </>
  );
}

 