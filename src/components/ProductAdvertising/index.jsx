import {useContext} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import Ctx from "../../ctx";

const ProductAdvertising = ({
    proAdv
}) => {
    // const {goods} = useContext(Ctx);
    // console.log(goods)
    // const advert = goods.filter(el => el.name === nameAdv)[0]
    // console.log(advert)

    return <>
        {proAdv && <>
            <Card
                className="d-flex flex-column flex-md-row p-3 h-100"
                id={"pro_" + proAdv.id}
                style={{
                    backgroundImage: `url(${proAdv.background})`,
                    backgroundSize: 'cover'
                }}>
                <Card.Img
                    // variant="top"
                    src={proAdv.pictures}
                    alt={proAdv.name}
                    className="w-auto align-self-center"
                    height="100"
                    style = {{
                        padding: "10px",
                        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
                        maxHeight: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                    }}
                />
                <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
                    <Card.Text
                        className="text-white fs-5"
                        style={{
                            fontWeight: "bold",
                            textShadow: "5px 0px 5px rgba(0, 0, 0, 0.5)", 
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            wordSpacing: "0.2em",
                        }}>{proAdv.name}</Card.Text>
                    <Card.Text
                        className="text-white fs-5"
                        style={{
                            fontWeight: "bold",
                            textShadow: "5px 0px 5px rgba(0, 0, 0, 0.5)", 
                            
                        }}>{proAdv.caption}</Card.Text>
                </Card.Body>
                <Link to={`/product/${proAdv.id}`} className="card-link"></Link>
            </Card>
        </>}
    </>
}

export default ProductAdvertising;