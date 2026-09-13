import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../services/appwrite";

const Authcontext = createContext();

export function AuthProvider() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentuser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentuser();
  }, []);

  const value = {
    user,
    setUser,
    loading,
  };

  return <Authcontext.Provider value={value}></Authcontext.Provider>;
}

export function useAuth() {
  return useContext(Authcontext);
}
