import React from 'react';
import {Navigate, Outlet} from 'react-router';

type ProtectedRouteProps = {
  redirectPath?: string;
  isAuthorized: boolean;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({redirectPath = '/login', isAuthorized}) => {
  if (!isAuthorized) {
    return <Navigate to={redirectPath}/>;
  }

  return <Outlet/>;
};
