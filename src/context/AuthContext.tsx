import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextType {
  user: any | null;
  logout: () => void;
  setUser: (data: any) => void;
  updatePartialUser: any;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = (): void => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (data: any) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };
  const updatePartialUser = (data: Partial<typeof user>) => {
    setUser((prevUser: any) => {
      const updatedUser = { ...prevUser, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser: updateUser, updatePartialUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
