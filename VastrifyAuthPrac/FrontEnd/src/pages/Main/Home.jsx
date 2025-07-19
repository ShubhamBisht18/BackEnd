import React from "react";
import { useAuth } from "../../context/AuthPracContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.name || "User"}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
