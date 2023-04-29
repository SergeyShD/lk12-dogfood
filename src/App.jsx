import {useState, useEffect} from "react"

import testData from "./assents/data.json";
import Card from "./components/Card/Card";
import Promo from "./components/Promo/Promo";
import { Header, Footer } from "./components/General";
import Modal from "./components/Modal"
const promoData = ["=)", "^_^", "O_o", "x_x", "=(", ";(", "0l0"];

// console.log(testData);

const App = () => {
    // const user = localStorage.getItem("userSer")
    const [user, setUser] = useState(localStorage.getItem("userSer"))
    const [userId, setUserId] = useState(localStorage.getItem("userSer-id"))
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [goods, setGoods] = useState(testData)
    const [searchResult, setSearchResult] = useState("")
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        if(user){
            setUserId(localStorage.getItem("userSer-id"))
            setToken(localStorage.getItem("token"))
        }
        else{
            localStorage.removeItem("userSer-id")
            localStorage.removeItem("token")
            setUserId(null)
            setToken(null)
        }
    }, [user])
    useEffect(()=>{
        console.log("token", token)
    }, [token])
    return (
        <>
            <Header
                user={user}
                upd={setUser}
                searchArr = {testData}
                setGoods={setGoods}
                setSearchResult={setSearchResult}
                setModalOpen={setModalOpen}
            />
            <div>
                {/* <h1>First Page</h1> */}
                <div className="container">
                {searchResult && <p className="search-result">{searchResult}</p>}
                    {goods.map((pro, i) => (
                        <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />
                    ))}
                    {/* {promoData.map(el => <Promo key={el} text={el}/>)} */}
                </div>
            </div>
            <Footer/>
            <Modal
                isActive={modalOpen}
                setIsActive={setModalOpen}
                setUser={setUser}
            />
        </>
    )
}

export default App;