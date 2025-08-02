import { createContext, useEffect, useState } from "react";
import React from "react";
export const userContext = createContext();

export function UserContextProvider({ children }) {
  const [LoginUser, setLoginUser] = useState(null);
  const [ready, setReady] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      if (!response.ok) {
        console.error("Profile fetch failed:", response.status);
        setLoginUser(null);
        setReady(true);
        return;
      }
      
      const user = await response.json();
      console.log("User profile loaded:", user);
      setLoginUser(user);
      setReady(true);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoginUser(null);
      setReady(true);
    }
  };

  useEffect(() => {
    if (!LoginUser) {
      fetchUser();
    }
  }, []);

  return (
    <userContext.Provider value={{ LoginUser, setLoginUser, ready }}>
      <div>{children}</div>
    </userContext.Provider>
  );
}
