import {useContext} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import Ctx from "../../ctx";

const Advertising = ({
    giftName
}) => {
    const {goods} = useContext(Ctx);
    
    const advert = goods.filter(el => el.name === giftName)[0]

    return <>
        {advert && <Card className="d-flex flex-row p-3 align-items-center" >
            <Card.Body className="d-flex flex-column ">
                <Card.Text className="fs-2">Подарок за первый заказ!</Card.Text>
                <Card.Text className="text-secondary fs-7">{advert.name}</Card.Text>
            </Card.Body>
            <Card.Body style={{height:"200px"}}>
                <Card.Img
                    // variant="bottom" 
                    src={advert.pictures}
                    alt={advert.name}
                    className="align-self-center w-auto h-100"
                />
            </Card.Body>
            <Link to={`/product/${advert._id}`} className="card-link"></Link>
        </Card>}
    </>
}

export default Advertising;