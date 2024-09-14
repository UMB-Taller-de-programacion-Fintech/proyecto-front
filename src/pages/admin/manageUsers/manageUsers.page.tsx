import React, { useEffect, useState } from 'react'
import { Fade } from 'react-awesome-reveal'

import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';
import { BsPencil } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";

import styles from './index.module.scss';
import { Button, Form, InputGroup, Spinner, Table } from 'react-bootstrap';
import UserCreateComponent from '../../../modules/manageUsers/create/user.create.component';
import Swal from 'sweetalert2';
import useAllUsers from 'hooks/useAllUsers.hook';
import InterfaceUser from 'store/app/allUsers/allUsers.redux';
import { IoReload } from "react-icons/io5";

const ManageUsersPage: React.FC = () => {
	const { all_users: users, getAll } = useAllUsers()

	const [userData, setUserData] = useState<Partial<InterfaceUser>>({})
	const [show, setShow] = useState<boolean>(false)


	useEffect(() => {
		if (!show) setUserData({})
	}, [show])


	return (
		<div className={styles.main}>

			{/* start Titulo */}
			<HeaderTurnBackComponent title="Gestiona los usuarios" />
			{/* end Titulo */}


			{/* start Acciones crear ingresar */}
			<div className='d-flex justify-content-between flex-wrap mb-5'>
				<Fade>
					<Button variant="outline-primary" onClick={getAll}>
						Recargar usuarios <IoReload />
					</Button>
				</Fade>

				<Fade>
					<UserCreateComponent setShow={setShow} show={show} userData={userData || {}} />
				</Fade>

			</div>
			{/* end Acciones crear ingresar */}


			{/* start listar los hogares del usuario */}
			<Fade>
				{users?.length ? <Table striped hover borderless>
					<thead>
						<tr>
							<th>ID</th>
							<th>nombre</th>
							<th>apellido</th>
							<th>email</th>
							<th style={{ width: '100px' }} >acciones</th>
						</tr>
					</thead>
					<tbody>
						{users?.map(r => (<tr key={r?._id}>
							<td>{r?._id}</td>
							<td>{r.firstName}</td>
							<td >{r?.lastName}</td>
							<td >{r?.email}</td>
							<td>
								<div className='d-flex justify-content-center gap-3'>
									<FaRegEye style={{ cursor: 'pointer' }} title='Ver' onClick={() => Swal.fire(
										'Usuario ' + r?._id,
										`<p><b>Nombre:</b> ${r?.firstName}</p>
										<p><b>Apelido:</b>  ${r?.lastName || ''}</p>
										<p><b>Correo:</b>  ${r?.email}</p>`
									)} />
									<BsPencil style={{ cursor: 'pointer' }} title='Editar' onClick={() => { setUserData(r); setShow(true) }} />
								</div>
							</td>
						</tr>))}
					</tbody>
				</Table>
					: <Spinner animation="grow" />
				}

			</Fade>
			{/* end listar los hogares del usuario */}
		</div>
	)
}

export default ManageUsersPage
