import {useContext, useEffect, useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import {Button} from "react-bootstrap"
import Ctx from "../ctx"

const Profile = ({user, setUser}) => {
    const navigate = useNavigate()
    const {api} = useContext(Ctx)
    const [userData, setUserData] = useState({})
    const logOut = () => {
        setUser("")
        localStorage.removeItem("userSer")
        navigate("/")
    }

    useEffect(() => {
        api.getAdmin()
            .then(data => {
                setUserData(data)
            })
    }, [])
    return <>
        <h1>Личный кабинет</h1>
        <p>Привет, {userData?.name || "Гость"}!</p>
        <div>{userData?.email}</div>
        {/* <Link to="/add/product">Добавить товар</Link>
        <br/> */}
        <Button variant="warning" as={Link} to="/add/product">Добавить товар</Button>
        <br/>
        <button onClick={logOut}>Выйти из аккаунта</button>
    </>
}
export default Profile