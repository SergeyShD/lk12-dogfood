import {useNavigate, Link} from "react-router-dom"
import {Button} from "react-bootstrap"
const Profile = ({user, setUser}) => {
    const navigate = useNavigate()
    const logOut = () => {
        setUser("")
        localStorage.removeItem("userSer")
        navigate("/")
    }
    return <>
        <h1>Личный кабинет</h1>
        <p>Привет, {user}!</p>
        {/* <Link to="/add/product">Добавить товар</Link>
        <br/> */}
        <Button variant="warning" as={Link} to="/add/product">Добавить товар</Button>
        <br/>
        <button onClick={logOut}>Выйти из аккаунта</button>
    </>
}
export default Profile