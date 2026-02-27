"use client";

import { useState, useEffect, useContext } from "react";
import Navbar from "../component/Navbar";
import AddEmployeeModal from "./modals/AddEmployeeModal";
import AppContext from "../context/appContext";
import UsersTable from "../component/UsersTable";
import { paginate } from "../helpers/paginate";
import { search } from "../helpers/search";
import Pagination from "../component/Pagination";


export default function HomeClient() {
  const [myUsers, setMyUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
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
      
        <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <AddEmployeeModal onClose={() => setIsModalOpen(false)} />
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

 