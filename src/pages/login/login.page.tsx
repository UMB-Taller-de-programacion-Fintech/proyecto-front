import React, { useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'firebasea/firebase_credentials';


import loginService from 'services/auth/login.service';
import tokenAction from 'store/auth/token/token.action';
import { useAppDispatch } from 'store';
import userAction from 'store/auth/user/user.action';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'resources/routes-constants';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc'; // Importa el logo de Google

import styles from './index.module.scss';
import LoaderGoogleComponent from '../../components/loaders/loaderV2/loaderGoogle.component';
import permissionAction from 'store/auth/permissions/permission.action';
import { Fade } from 'react-awesome-reveal';
import { AlertLink, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputComponent from '../../components/inputForm/input.component';



const LoginPage: React.FC = () => {

	const [users, setUsers] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getUsers = async () => {
			setLoading(true);
			const response = await loginService.getUsers(1);
			setUsers(response);
			setLoading(false);
		}
		getUsers();
	}, [])

	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className={styles.main}>

			<ul>
				{users.map((user: any, index: number) => (
					<li key={index}>{user.firstName} {user.lastName} {user.email}</li>
				))}
			</ul>

			<Fade cascade duration={500} className='d-flex justify-content-center align-items-center' direction='up'>
				{isLogin ? <LoginComponent goToRegister={() => setIsLogin(false)} /> : <RegisterComponent goToLogin={() => setIsLogin(true)} />}
			</Fade>
		</div>
	)
}

const useHookLogin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const postLogin = (response: any, ignoreError?: boolean) => {
		if (response?.error && !ignoreError) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: response?.error,
			});
		}

		if (response?.access_token) {
			const user = response?.user;
			const token = response?.access_token;
			if (user && token) {
				dispatch(userAction.set(user))
				dispatch(tokenAction.set(token))
				dispatch(permissionAction.set(response?.permissions))
				navigate(ROUTES.PRINCIPAL_PAGE_ROUTE);
				return;
			}
		}
	}

	return {
		postLogin
	}
}


const LoginComponent: React.FC<{ goToRegister: () => void }> = (props: { goToRegister: () => void }) => {
	const { postLogin } = useHookLogin()

	const [loading, setLoading] = useState(false);
	const [validated, setValidated] = useState(false);

	//Formulario
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	const handleLoginWithGoogle = async () => {
		setLoading(true);
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);

		const email = result?.user?.email;
		if (email) {
			const resposne = await loginService.loginWithGoogle(email);
			postLogin(resposne)
		}

		setLoading(false);
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const form = event.currentTarget;
		if (form.checkValidity()) {
			setLoading(true);
			const resposne = await loginService.login(email, password);
			postLogin(resposne)
			setLoading(false);

			setValidated(true);
		}
	};

	if (loading) return <div className={styles.container}><LoaderGoogleComponent /></div>

	return (<div className={styles.container}>
		<h1 className={styles.h1}>Inicia sesión con tu correo y contraseña</h1>

		<Form className="d-flex justify-content-center flex-wrap gap-3" onSubmit={handleSubmit} validated={validated}>

			<InputComponent required label="Correo" set={setEmail} value={email} type="email" />
			<InputComponent required label="Contraseña" set={setPassword} value={password} type="password" minLength={3} />

			<Button variant="primary" type="submit" className={styles.button}>Iniciar sesión</Button>
		</Form>

		<AlertLink onClick={() => props.goToRegister()}>Da clic aquí para registrarte</AlertLink>
	</div>)
}

const RegisterComponent: React.FC<{ goToLogin: () => void }> = (props: { goToLogin: () => void }) => {
	const { postLogin } = useHookLogin()

	const [validated, setValidated] = useState(false);
	const [loading, setLoading] = useState(false);

	//Formulario
	const [firstName, setFirstname] = useState('');
	const [email, setEmail] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');




	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity()) {
			setLoading(true);
			const resposne = await loginService.register({ firstName, email, lastName, password });
			postLogin(resposne)

			setLoading(false);
			setValidated(true);
		}
	};


	if (loading) return <div className={styles.container}><LoaderGoogleComponent /></div>

	return (<div className={styles.container}>
		<h1 className={styles.h1}> Ingresa los datos de tu nueva cuenta </h1>

		<Form className="d-flex justify-content-center flex-wrap gap-3" onSubmit={handleSubmit} validated={validated}>

			<InputComponent required label="Nombre" set={setFirstname} value={firstName} type="string" />
			<InputComponent required label="Apellido" set={setLastName} value={lastName} type="string" />
			<InputComponent required label="Correo" set={setEmail} value={email} type="email" />
			<InputComponent required label="Contraseña" set={setPassword} value={password} type="password" minLength={4} />

			<Button variant="primary" type="submit" className={styles.button}> Registrarme </Button>
		</Form>


		<AlertLink onClick={() => props.goToLogin()}>Da clic aquí para iniciar sesión</AlertLink>
	</div>)
}

export default LoginPage
