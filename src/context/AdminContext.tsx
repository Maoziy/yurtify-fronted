import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext({
  isAdmin: false,
  setIsAdmin: (status: boolean) => {},
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Varsayılan olarak admin değil

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
