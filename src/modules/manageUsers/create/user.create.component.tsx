import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './index.module.scss';
import { useAppDispatch } from "store";
import LoaderGoogleComponent from '../../../components/loaders/loaderV2/loaderGoogle.component';
import { FiUserPlus } from "react-icons/fi";
import UserService from "services/app/user.service";
import UserFormComponent from "./user.form.component";
import allUsersAction from "store/app/allUsers/allUsers.action";
import { Interface } from "store/app/allUsers";


function UserCreateComponent(props: {userData?: Partial<Interface>, setShow: (show: boolean) => void, show: boolean, clientDefault?: boolean }) {
  const userService = new UserService();
  const dispatch = useAppDispatch();
  const {show, setShow} = props


  const [userData, setUserData] = useState<any>(Object.keys(props?.userData || {})?.length ? props.userData : { status: true});

  useEffect(() => {
    setUserData(props?.userData || {})
  }, [props?.userData])
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    if (userData?._id) {
      const response = await userService.edit(userData);
      if (response?._id) {
        dispatch(allUsersAction.update(response));
      }
    } else {
      const new_user = {...userData, status: true}
      const response = await userService.create(new_user);
      if (response?.id) {
        dispatch(allUsersAction.add(response));
      }
    }
    setShow(false);
    setIsLoading(false);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} size="sm">
        Crear usuario <FiUserPlus className={styles.svg} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="xl"
        style={{ padding: '0rem !important' }}
      >

        <HeaderComponent incremental={userData?.incremental} />

        {isLoading ? <LoaderGoogleComponent /> : <>
          <Modal.Body className="pb-4"><UserFormComponent userData={userData} setUserData={setUserData} clientDefault={props?.clientDefault} /></Modal.Body>
          <FooterComponent handleClose={handleClose} handleSave={handleSave} userData={userData} />
        </>}
      </Modal>
    </>
  );
}

function HeaderComponent({ incremental }: { incremental: string }) {
  return <Modal.Header closeButton>
    <Modal.Title>{incremental ? 'Editar usuario ' + incremental : 'Crear usuario'}</Modal.Title>
  </Modal.Header>
}

function FooterComponent({ handleClose, handleSave, userData }: { handleClose: () => void, handleSave: () => void, userData: Interface }) {
  return <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      cancelar
    </Button>
    <Button variant="primary" disabled={!userData.email || !userData.firstName || !userData.lastName} onClick={handleSave}>
      {userData?._id ? 'Guardar' : 'Crear'}
    </Button>
  </Modal.Footer>
}

export default UserCreateComponent;