import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from './ui/loading-spinner';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Don't render anything while checking authentication status
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  // Only redirect if not authenticated and not loading
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
