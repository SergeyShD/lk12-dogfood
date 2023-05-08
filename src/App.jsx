import {useState, useEffect} from "react"
import {Routes, Route, Link} from "react-router-dom"

import testData from "./assents/data.json";

import { Header, Footer } from "./components/General";
import Modal from "./components/Modal"

import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import OldPage from "./pages/Old";
import Profile from "./pages/Profile"
import Product from "./pages/Product"


// console.log(testData);

const App = () => {
    // const user = localStorage.getItem("userSer")
    const [user, setUser] = useState(localStorage.getItem("userSer"))
    const [userId, setUserId] = useState(localStorage.getItem("userSer-id"))
    const [token, setToken] = useState(localStorage.getItem("token"))

    const [baseData, setBaseData] = useState([])
    const [goods, setGoods] = useState(baseData)
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
        if(token){
            fetch("https://api.react-learning.ru/products", {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setBaseData(data.products)
            })
        }
    }, [token])

    useEffect(()=>{
        setGoods(baseData)
    }, [baseData])
    return (
        <>
            <Header
                user={user}
                upd={setUser}
                searchArr = {baseData}
                setGoods={setGoods}
                setSearchResult={setSearchResult}
                setModalOpen={setModalOpen}
            />
            <main>
                <Routes>
                    <Route path="/" element={<Home user={user} setActive={setModalOpen}/>}/>
                    <Route path="/catalog" element={
                        <Catalog
                            goods={goods}
                            setBaseData={setBaseData}
                            userId={userId}
                        />}/>
                    <Route path="/old" element={
                        <OldPage
                            searchText={searchResult}
                            goods={goods}
                        />}/>
                    <Route path="/profile" element={<Profile user={user} setUser={setUser}/>}/>
                    <Route path="/product/:id" element={<Product/>}/>
                </Routes>
            </main>
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