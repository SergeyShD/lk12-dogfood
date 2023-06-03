import {useState, useContext } from "react"
import {Link} from "react-router-dom"
import {Card, Button} from "react-bootstrap"
import LikeButton from "../LikeButton"


import Ctx from "../../ctx"
import "./style.css"

const BsCard = ({
    discount,
    likes,
    name,
    pictures,
    price,
    tags,
    _id
}) => {
    const {userId, basket, setBasket} = useContext(Ctx)
    const inBasket = basket.filter(el => _id === el.id).length > 0

    const addToBasket = !inBasket
        ? (event) => {
            event.preventDefault()
            event.stopPropagation()
            setBasket(prev => [...prev,{
                id: _id,
                price,
                discount,
                cnt: 1
            }])
        }
        : (() => {})

    return <>
        <div id={"pro_" + _id} className="product-container">
            {userId && (
                <div className="like-button">
                    <LikeButton likes={likes} _id={_id}/>
                </div>
            )}
            <div className="image-container">
                <img src={pictures} alt={name}/>
                <Link to={`/product/${_id}`} className="card-link"></Link>
            </div>
            <div>
                <h4 className="price">{price} ₽</h4>
                <p className="name">{name}</p>
                <button
                    className={`${!inBasket ? "button-buy" : "button-toCard"} position-relative`}
                    onClick={addToBasket}
                >
                    {!inBasket
                            ? "Купить"
                            : <>
                                Перейти в корзину
                                <Link to={`/basket`} className="card-link"></Link>
                            </>}
                </button>
                
            </div>
        </div>
    </>
}

export default BsCard;

{/* <Card id={"pro_" + _id}>
            {userId && (
                <div className="like-button">
                    <LikeButton likes={likes} _id={_id} />
                </div>
            )}
            <Card.Body>
                <Card.Img src={pictures} alt={name}/>
            </Card.Body>
            <Card.Body>
                <Card.Title as="h4">{price} ₽</Card.Title>
                <Card.Text>{name}</Card.Text>
                <Link to={`/product/${_id}`} className="card-link"></Link>
            </Card.Body>
            <Card.Body>
                <Button disabled={inBasket} onClick={addToBasket}>
                        Купить
                </Button>
            </Card.Body>
        </Card> */}