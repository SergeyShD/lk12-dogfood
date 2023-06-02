import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const Advertising = ({ proGiftAdv }) => {
    return <>
        {proGiftAdv && <Card
            className="d-flex flex-column flex-lg-row p-3 align-items-center"
            style={{
                backgroundImage: `url(${proGiftAdv.background})`,
                backgroundSize: 'cover',
            }}>
            <Card.Body className="d-flex flex-column p-5">
                <Card.Text
                    style={{
                        color: "white",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        textShadow: "5px 0px 5px rgba(0, 0, 0, 0.2)", 
                        textTransform: "uppercase",
                    }}
                >
                    Подарок за первый заказ!
                </Card.Text>
                <Card.Text
                    style={{
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        textShadow: "5px 0px 5px rgba(0, 0, 0, 0.2)", 
                    }}
                >
                    {proGiftAdv.name}
                </Card.Text>
            </Card.Body>
            <Card.Img
                src={proGiftAdv.pictures}
                alt={proGiftAdv.name}
                style={{
                    alignSelf: "center",
                    width: "auto",
                    height: "200px",
                    maxWidth: "200px",
                    padding: "10px",
                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    objectFit: "cover",
                }}
            />
            <Link to={`/product/${proGiftAdv.id}`} className="card-link"></Link>
        </Card>
        }
    </>
}

export default Advertising