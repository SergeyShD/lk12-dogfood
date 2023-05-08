import {useState, useEffect} from "react"
import { useParams, Link } from "react-router-dom"

const Product = () => {
    const {id} = useParams()
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://api.react-learning.ru/products/${id}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(serverData => {
            console.log(id, serverData)
            setData(serverData)
        })
    }, [])
    return <>
        <Link to={`/catalog#pro_${id}`}>Назад</Link>
        {data.name
            ? <>
                <h1>{data.name}</h1>
                <img src={data.pictures} alt={data.name}/>
            </>
            : <div className="info" style={{textAlign:"center"}}>
                Товара {id} не существует<br/>или<br/>он еще не загружен
            </div>
        }
    </>
}
export default Product