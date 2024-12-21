'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  name: string;
  email: string;
  role: string;
  photo?: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User>(null);

  // Kullanıcıyı localStorage'a kaydet
  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };

  // Sayfa yüklemesinde kullanıcıyı localStorage'dan geri yükle
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
