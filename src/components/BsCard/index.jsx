import {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {SuitHeart, SuitHeartFill} from "react-bootstrap-icons";
import {Card, Button} from "react-bootstrap";
import LikeButton from "../LikeButton"

import Ctx from "../../ctx"

const BsCard = ({
    discount,
    likes,
    name,
    pictures,
    price,
    tags,
    _id
}) => {
    const {setBaseData, userId, api} = useContext(Ctx)
    const [isLike, setIsLike] = useState(likes.includes(userId));
    const [likeFlag, setLikeFlag] = useState(false)
    const [isHovered, setIsHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const likeHandler = () => {
        setIsLike(!isLike);
        setLikeFlag(true)
        setBaseData((old) => old.map(el => {
            if (el._id === _id) {
                isLike 
                ? el.likes = el.likes.filter(lk => lk !== userId)
                : el.likes.push(userId);
            }
            return el;
        }))
    }

    useEffect(() => {
        if(likeFlag){
            api.setLike(_id, isLike)
            .then(data => {
                setLikeFlag(false)
                // setBaseData((old) => old.map(el => el._id === data._id ? data : el))
                api.getProducts()
                    .then(newData => {
                        setBaseData(newData.products)
                    })
            })
        }
    }, [isLike])

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const handleButtonMouseEnter = () => {
        setIsButtonHovered(true);
    };
    
    const handleButtonMouseLeave = () => {
        setIsButtonHovered(false);
    };


    return <Card
                className="pt-3 h-100 border"
                id={"pro_" + _id}
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${pictures})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}>
        {userId 
            && <>
                <div style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        zIndex: "1",
                        color: "crimson",
                    }}>
                    <LikeButton likes={likes} _id={_id}/>
                </div>
            </>
        //     <span
        //             className="card-like"
        //             onClick={likeHandler}
        //             onMouseEnter={handleMouseEnter}
        //             onMouseLeave={handleMouseLeave}
        //             >
        //     {isLike ? <SuitHeartFill color={isHovered ? "black" : "red"} /> :
        //                 <SuitHeart color={isHovered ? "black" : "red"} />}
        // </span>
        }
        <Card.Img
            // variant="top"
            src={pictures}
            alt={name}
            className="align-self-center w-auto border "
            height="100"
        
        />
        <Card.Body className="d-flex flex-column">
            <Card.Title as="h4">{price} ₽</Card.Title>
            <Card.Text className="text-secondary fs-5 flex-grow-1 " >{name}</Card.Text>
            <Button className="w-100"
                style={{
                    background: isButtonHovered ? "#FFE44D" : "#fffaa0",
                    border: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    wordSpacing: "0.2em",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "0px 0px 4px rgba(0, 0, 0, 0.1), 0px 0px 2px rgba(0, 0, 0, 0.5)",
                    zIndex: "1",
                }}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
            >
                Купить
            </Button>
        </Card.Body>
        <Link to={`/product/${_id}`} className="card-link"></Link>
    </Card>
}

export default BsCard;