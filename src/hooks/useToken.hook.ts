import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppSelector,useAppDispatch } from "store";
import tokenAction from 'store/auth/token/token.action';
import userAction from 'store/auth/user/user.action';
import { ROUTES } from 'resources/routes-constants';
import permissionAction from 'store/auth/permissions/permission.action';

function useToken() {
  const token = useAppSelector(state => state?.user?.token?.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(tokenAction.drop());
    dispatch(userAction.delete_all());
    dispatch(permissionAction.delete_all());
    navigate(ROUTES.LOGIN);
  }


  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convertir a segundos
      if (decodedToken && decodedToken?.exp &&  decodedToken?.exp < currentTime) logout()
    }
  }, [token]);

  return {
    logout,
    token
  };
}

export default useToken;