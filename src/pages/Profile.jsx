import {useContext, useEffect, useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import {Button, Container, Row, Col, Figure} from "react-bootstrap"
import Ctx from "../ctx"
import ModalMyProduct from "../components/ModalMyProduct"
import UpdatedInput from "../components/UpdatedInput"

const Profile = ({setUser}) => {
	const navigate = useNavigate()
	const { api, userId, user, basket, userNameLS } = useContext(Ctx)
	const [userData, setUserData] = useState({})
	const [inpName, setInpName] = useState(false)
	const [inpAbout, setInpAbout] = useState(false)
	const [inpAvatar, setInpAvatar] = useState(false)
	const [handleClick, setHandleClick] = useState(false)

	const updUser = (name, val) => {
		let body = {
			name:userData.name,
			about: userData.about
		}

		if (name === "avatar") {
			body = {avatar: userData.avatar}
		}
		body[name] = val
		api.updAdmin(body, name === "avatar").then(data => {
			setUserData(data)
			localStorage.setItem(userNameLS, data.name);
		})
		
	}

	const isButtonClick = () => {
		setHandleClick(true)
	}

	const logOut = () => {
		setUser("")
		localStorage.removeItem(user)
		localStorage.removeItem(basket)
		navigate("/")
	}
	useEffect(() => {
		api.getAdmin()
			.then(data => {
				setUserData(data)
			})
	}, [])

	
	return <>
		<Container style={{gridTemplateColumns: "1fr"}}>
			{userId && <>
				<Row className="d-flex align-items-center">
					<Col>
						<h1>Личный кабинет</h1>
					</Col>
					<Col className="d-flex justify-content-end">
						<Button
							variant="danger"
							className="border rounded-pill"
							onClick={logOut}>Выйти из аккаунта
						</Button>
					</Col>
				</Row>
				<Row className="pt-5">
					<Col xs={12} sm={6}>
							<Row className="pb-2">
								<UpdatedInput
									val={userData.name}
									isActive={inpName}
									changeActive={setInpName}
									upd={updUser}
									name="name"
								/>
							</Row>
							<Row className="pb-2 fs-5">
								<Col>{userData.email}</Col>
							</Row>
							<Row>
								<UpdatedInput
									val={userData.about}
									isActive={inpAbout}
									changeActive={setInpAbout}
									upd={updUser}
									name="about"
								/>
							</Row>
							
					</Col>
					<Col xs={12} sm={6}>
						<UpdatedInput
							val={userData.avatar}
							isActive={inpAvatar}
							changeActive={setInpAvatar}
							upd={updUser}
							name="avatar"
						/>
						<Row className="mt-3">
							<Figure className="d-flex align-items-center justify-content-center">
								<Figure.Image
									
									src={userData.avatar}
									alt={userData.email}
								/>
							</Figure>
						</Row>
					</Col>
				</Row>
				<Row className="g-3">
					<Col xs={12} md={6}>
						<Button
							className="w-100 h-100 border rounded-pill"
							as={Link} 
							to="/add/product"
						>
							Добавить товар
						</Button>
					</Col>
					<Col xs={12} md={6}>
						<Button
							className="w-100 h-100 border rounded-pill"
							onClick={isButtonClick}
						>
							Мои товары
						</Button>
					</Col>
				</Row>
			</>}
		</Container>
		{handleClick && <ModalMyProduct setHandleClick={setHandleClick}/>}
	</>
}
export default Profile;