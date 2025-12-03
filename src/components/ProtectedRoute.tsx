import React from 'react';
import {Navigate, Outlet} from 'react-router';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {AuthorizationStatus} from '../store/authSlice.ts';
import Spinner from './Spinner';

type ProtectedRouteProps = {
  redirectPath?: string;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({redirectPath = '/login'}) => {
  const authorizedStatus = useSelector((state: RootState) => state.auth.authorizationStatus);

  if (authorizedStatus === AuthorizationStatus.Unknown) {
    return <div><span>Подождите...</span><Spinner/></div>;
  }

  if (authorizedStatus !== AuthorizationStatus.Authorized) {
    return <Navigate to={redirectPath} replace/>;
  }

  return <Outlet/>;
};
