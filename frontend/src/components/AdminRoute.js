import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const AdminRoute = () => {
  const { state } = useContext(StoreContext);
  const { userInfo } = state;

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' />;
};

export default AdminRoute;