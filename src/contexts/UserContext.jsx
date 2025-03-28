import React, { createContext, useContext, useState, useCallback } from 'react';
import { getUsers, updateUser, deleteUser } from '@/lib/api';
import { toast } from "sonner";

const defaultPagination = {
  page: 1,
  per_page: 6,
  total: 0,
  total_pages: 1,
};

const UserContext = createContext(undefined);

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(defaultPagination);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getUsers(page);
      setUsers(response.data);
      setPagination({
        page: response.page,
        per_page: response.per_page,
        total: response.total,
        total_pages: response.total_pages,
      });
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to fetch users.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserById = async (id, userData) => {
    setLoading(true);
    
    try {
      await updateUser(id, userData);
      
      // Update local state to reflect changes
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === id ? { ...user, ...userData } : user
        )
      );
      
      toast.success("User updated successfully");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to update user.";
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUserById = async (id) => {
    setLoading(true);
    
    try {
      await deleteUser(id);
      
      // Remove user from local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      
      toast.success("User deleted successfully");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to delete user.";
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || user.email.toLowerCase().includes(query);
  });

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        pagination,
        fetchUsers,
        updateUserById,
        deleteUserById,
        searchQuery,
        setSearchQuery,
        filteredUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
