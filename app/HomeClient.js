"use client";

import { useState, useEffect } from "react";
import Layout from "../component/Layout";
import AppContext from "../context/appContext";

export default function HomeClient() {
  const [myUsers, setMyUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setMyUsers(data));
  }, []);

  return (
    <main>
      <AppContext.Provider
        value={{
          users: myUsers,
          setMyUsers: setMyUsers,
        }}
      >
        <Layout />
      </AppContext.Provider>
    </main>
  );
}