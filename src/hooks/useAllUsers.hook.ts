import React, { useEffect, useState } from 'react';
import UserService from 'services/app/user.service';
import { useAppDispatch, useAppSelector } from "store";
import allUsersAction from 'store/app/allUsers/allUsers.action';


function useAllUsers() {

  const [isLoading, setIsLoading] = useState(false);
  const userService = new UserService();
  const dispatch = useAppDispatch();

  const all_users = useAppSelector(state => state?.all_users?.all_users);

  useEffect(() => {
    if (!all_users?.length) {
      getAll()
    }
  }, [all_users])


  const getAll = async() => {
    setIsLoading(true)

    userService.getAll().then(response => {
      dispatch(allUsersAction.set_many(response))
      setIsLoading(false)
    })
  }


  return {
    isLoading,
    getAll,
    all_users
  };
}

export default useAllUsers;