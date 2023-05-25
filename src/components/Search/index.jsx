import { useState, useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom"
import Ctx from "../../ctx"
import "./style.css"

const Search = (user) => {
    console.log("user: ", user)
    const {setSearchResult, baseData, setGoods} = useContext(Ctx)
    
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const [num, setNum] = useState(0)
    
    const changeValue = (e) => {
        navigate("/catalog")
        let val = e.target.value.toLowerCase()
        setText(e.target.value)

    }
    useEffect(() => {
        let str = ''
        if(num && text){
            str = `По запросу ${text} найдено ${num} товаров`
        }
        else if (text){
            str = `По запросу ${text} не найдено товаров`
        }
        else{
            str = ''
        }
        setSearchResult(str)
    }, [num, text])
    useEffect(()=>{
        let result = baseData.filter(el => el.name.toLowerCase().includes(text))
        setGoods(result)
        setNum(result.length)
    }, [text, baseData])
    return <>
        <input className="search" type="search" value={text} onChange={changeValue} disabled={!user.user}/>
    </>
}

export default Search