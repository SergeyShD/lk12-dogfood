import {useState, useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import {Card, Button} from "react-bootstrap"
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
    const {userId} = useContext(Ctx)
    const [isButtonHovered, setIsButtonHovered] = useState(false)

    const handleButtonMouseEnter = () => {
        setIsButtonHovered(true);
    };
    
    const handleButtonMouseLeave = () => {
        setIsButtonHovered(false);
    };

    return <Card
                id={"pro_" + _id}
                style={{
                    backgroundImage: `
                                    linear-gradient(rgba(255, 255, 255, 0.8),
                                    rgba(255, 255, 255, 0.8)),
                                    url(${pictures})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    paddingTop: "20px",
                    height: "100%",
                    border: "1px solid lightgray",
                }}
            >
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
        }
        <Card.Img
            src={pictures}
            alt={name}
            className="align-self-center w-auto border"
            height="100"
        />
        <Card.Body className="d-flex flex-column">
            <Card.Title as="h4">
                {price} ₽
            </Card.Title>
            <Card.Text className="text-secondary fs-5 flex-grow-1">
                {name}
            </Card.Text>
            <Button
                style={{
                    background: isButtonHovered ? "#FFE44D" : "#fffaa0",
                    border: "none",
                    width: "100%",
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