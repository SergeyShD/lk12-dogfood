import {useState, useEffect, createContext} from "react"
import {Routes, Route, Link} from "react-router-dom"

// import testData from "./assents/data.json";

import { Header, Footer } from "./components/General"
import Modal from "./components/Modal"

import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Profile from "./pages/Profile"
import Product from "./pages/Product"
import AddProduct from "./pages/AddProduct"
import Favorites from "./pages/Favorites"
import BottomPanel from './components/BottomPanel'
import Basket from "./pages/Basket"

import Ctx from "./ctx"
import Api from "./Api"

const userNameLS = "userName"
const userIdLS = "userId"
const userTokenLS = "userToken"

const App = () => {
    let basketStore = localStorage.getItem("basket")
    if (basketStore && basketStore[0] === "["){
        basketStore = JSON.parse(basketStore)
    } else {
        basketStore = []
    }
    const [user, setUser] = useState(localStorage.getItem(userNameLS))
    const [userId, setUserId] = useState(localStorage.getItem(userIdLS))
    const [token, setToken] = useState(localStorage.getItem(userTokenLS))
    const [api, setApi] = useState(new Api(token))
    const [basket, setBasket] = useState(basketStore)
    
    const [baseData, setBaseData] = useState([])
    const [goods, setGoods] = useState(baseData)
    const [searchResult, setSearchResult] = useState("")
    const [modalOpen, setModalOpen] = useState(false)

    const isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)

    const priceCourierDelivery = "399 ₽"
    const priceDeliveryToPoint = "199 ₽"

    useEffect(() => {
        if(user){
            setUserId(localStorage.getItem(userIdLS))
            setToken(localStorage.getItem(userTokenLS))
        }
        else{
            localStorage.removeItem(userIdLS)
            localStorage.removeItem(userTokenLS)
            setUserId(null)
            setToken(null)
        }
    }, [user])
    useEffect(()=>{
        setApi(new Api(token))
    }, [token])

    useEffect(() => {
        if (token){
            api.getProducts()
                .then(data => {
                    setBaseData(data.products)
                })
        } else {
            setBaseData([])
        }
    }, [api])

    useEffect(()=>{
    }, [baseData])

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket))
    })

    return (
        <Ctx.Provider value={{
            user,
            searchResult,
            setSearchResult,
            setBaseData,
            baseData,
            goods,
            setGoods,
            userId,
            token,
            api,
            priceCourierDelivery,
            priceDeliveryToPoint,
            isMobile,
            basket,
            setBasket,
            userNameLS,
            userIdLS,
            userTokenLS
        }}>
            <Header
                user={user}
                upd={setUser}
                searchArr = {baseData}
                setGoods={setGoods}
                setModalOpen={setModalOpen}
            />
            <main>
                <Routes>
                    <Route path="/" element={<Home user={user} setActive={setModalOpen}/>}/>
                    {user && <>
                        <Route path="/catalog" element={
                            <Catalog
                                goods={goods}
                                userId={userId}
                            />}/>
                        
                        <Route path="/profile" element={<Profile user={user} setUser={setUser}/>}/>
                        <Route path="/product/:id" element={<Product/>}/>
                        <Route path="/add/product" element={<AddProduct/>}/>
                        <Route path="/favorites" element={<Favorites/>}/>
                        <Route path="/basket" element={<Basket/>}/>
                    </>}
                </Routes>
                
            </main>
            <Footer/>
            <Modal
                isActive={modalOpen}
                setIsActive={setModalOpen}
                setUser={setUser}
            />
            {user && (isMobile && <BottomPanel/>)}
        </Ctx.Provider>
    )
}

export default App