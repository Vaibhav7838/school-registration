import React, { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rememberedEmail, setRememberedEmail] = useState(null);
  
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    const savedAuth = localStorage.getItem('currentUser');
    const savedEmail = localStorage.getItem('rememberedEmail');
    
    setUsers(savedUsers ? JSON.parse(savedUsers) : []);
    if (savedAuth) {
      const user = JSON.parse(savedAuth);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
    if (savedEmail) {
      setRememberedEmail(savedEmail);
    }
    setLoading(false);
  }, []);

  const registerUser = (userData) => {
    if (!userData.email || !userData.firstName || !userData.password) {
      throw new Error('Missing required fields');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }

    const emailExists = users.some(user => user.email === userData.email);
    if (emailExists) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Date.now(),
      firstName: userData.firstName,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString()
    };
    
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
    
    return newUser;
  };

  const loginUser = (email, password, rememberMe) => {
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not registered. Please create an account first.');
    }

    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
      setRememberedEmail(email);
    } else {
      localStorage.removeItem('rememberedEmail');
      setRememberedEmail(null);
    }

    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  };

  const updateNumber = (number) => {
    if (!currentUser) {
      throw new Error('No user is logged in.');
    }
    if (!number) {
      throw new Error('Mobile number is required.');
    }
  
    const updatedUser = { ...currentUser, number };
    setCurrentUser(updatedUser);
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === currentUser.id ? updatedUser : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const value = {
    users,
    currentUser,
    isAuthenticated,
    loading,
    rememberedEmail,
    registerUser,
    loginUser,
    logoutUser,
    updateNumber,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};