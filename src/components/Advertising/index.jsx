import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";

const Advertising = ({
    name,
    pictures,
    _id
}) => {
    return <>
        <Card className="pt-3 h-100" id={"pro_" + _id}>
            <Card.Body className="d-flex flex-column">
                <Card.Text className="text-secondary fs-5 flex-grow-1">Подарок за первый заказ</Card.Text>
                <Card.Text className="text-secondary fs-5 flex-grow-1">{name}</Card.Text>
            </Card.Body>
            <Card.Img variant="top" src={pictures} alt={name} className="align-self-center w-auto" height="100"/>
            <Link to={`/product/${_id}`} className="card-link"></Link>
        </Card>
    </>
}

export default Advertising;