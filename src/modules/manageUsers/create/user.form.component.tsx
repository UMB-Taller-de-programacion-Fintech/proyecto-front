import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Interface } from "store/app/allUsers";


export default function UserFormComponent({ userData, setUserData, clientDefault }: { userData: Interface, setUserData(data: any): void, clientDefault?: boolean }) {


  useEffect(() => {
    if (clientDefault && userData?.email) setUserData({ ...userData, password: userData?.email })
  }, [userData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"> Nombre*</InputGroup.Text>
        <Form.Control
          name="firstName"
          value={userData?.firstName}
          placeholder="Nombre"
          aria-label="firstName"
          aria-describedby="firstName"
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"> Apellido*</InputGroup.Text>
        <Form.Control
          name="lastName"
          value={userData?.lastName}
          placeholder="3192345678"
          aria-label="lastName"
          aria-describedby="lastName"
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"> Correo*</InputGroup.Text>
        <Form.Control
          name="email"
          value={userData?.email}
          placeholder="ejemplo@ejemplo.com"
          aria-label="email"
          aria-describedby="email"
          onChange={handleChange}
        />
      </InputGroup>

      {!clientDefault ?
        <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"> Contraseña* </InputGroup.Text>
        <Form.Control
          type="password"
          name="password"
          placeholder="******"
          aria-label="password"
          aria-describedby="password"
          onChange={handleChange}
        />
      </InputGroup>
      </>
        :  "La contraseña del cliente sera el correo"}
    </>
  );
}