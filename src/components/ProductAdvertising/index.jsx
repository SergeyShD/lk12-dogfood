import {useContext} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import Ctx from "../../ctx";

const ProductAdvertising = ({
    nameAdv,
    caption
}) => {
    const {goods} = useContext(Ctx);
    console.log(goods)
    const advert = goods.filter(el => el.name === nameAdv)[0]
    console.log(advert)

    return <>
        {advert && <>
            <Card className="d-flex flex-column flex-md-row p-3 h-100" id={"pro_" + advert._id}>
                <Card.Img
                    // variant="top"
                    src={advert.pictures}
                    alt={advert.name}
                    className="w-auto align-self-center"
                    height="100"
                />
                <Card.Body className="flex-grow-1">
                    <Card.Text className="text-secondary fs-5">{advert.name}</Card.Text>
                    <Card.Text className="text-secondary fs-5">{caption}</Card.Text>
                </Card.Body>
                <Link to={`/product/${advert._id}`} className="card-link"></Link>
            </Card>
        </>}
    </>
}

export default ProductAdvertising;