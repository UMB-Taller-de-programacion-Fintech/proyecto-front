import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppSelector,useAppDispatch } from "store";
import tokenAction from 'store/auth/token/token.action';
import userAction from 'store/auth/user/user.action';
import { ROUTES } from 'resources/routes-constants';
import rolAction from 'store/app/rol/rol.action';
import permissionAction from 'store/auth/permissions/permission.action';
import reservationAction from 'store/app/reservation/reservation.action';
import allUsersAction from 'store/app/allUsers/allUsers.action';
import headquarterAction from 'store/app/headquarter/headquarter.action';
import treatmentAction from 'store/app/treatment/treatment.action';
import clientAction from 'store/app/client/client.action';

function useToken() {
  const token = useAppSelector(state => state?.user?.token?.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(tokenAction.drop());
    dispatch(userAction.delete_all());
    dispatch(rolAction.delete_all());
    dispatch(permissionAction.delete_all());
    dispatch(allUsersAction.delete_all());
    dispatch(reservationAction.delete_all());
    dispatch(headquarterAction.delete_all());
    dispatch(treatmentAction.delete_all());
    dispatch(clientAction.delete_all());
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