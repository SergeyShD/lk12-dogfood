import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Col} from "react-bootstrap";

const Advertising = ({ proGiftAdv }) => {
    return <>
        {proGiftAdv && <Card
            className="d-flex flex-column flex-lg-row p-3 align-items-center"
            style={{
                backgroundImage: `url(${proGiftAdv.background})`,
                backgroundSize: 'cover',
                
            }}>
            <Col xs={12}  lg={8}>
            <Card.Body className="d-flex flex-column p-5">
                <Card.Text
                    className="text-white"
                    style={{
                        fontSize: "46px",
                        fontWeight: "bold",
                        textShadow: "5px 0px 5px rgba(0, 0, 0, 0.2)", 
                        textTransform: "uppercase",
                    }}
                >Подарок за первый заказ!</Card.Text>
                <Card.Text
                    className="text-white"
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        textShadow: "5px 0px 5px rgba(0, 0, 0, 0.2)", 
                    }}
                >{proGiftAdv.name}</Card.Text>
            </Card.Body>
            </Col>
                <Card.Img
                    // variant="bottom" 
                    src={proGiftAdv.pictures}
                    alt={proGiftAdv.name}
                    className="align-self-center w-auto"
                    style = {{
                        height:"200px",
                        width:"200px",
                        padding: "10px",
                        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
                        borderRadius: "10px",
                        maxHeight: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                    }}
                />
            <Link to={`/product/${proGiftAdv.id}`} className="card-link"></Link>
        </Card>
        }
    </>
}

export default Advertising;