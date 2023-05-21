import {useContext} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom"
import { Journals } from "react-bootstrap-icons"
import Slider from "../components/Slider"
import Banner from ".././components/Banner"
import Advertising from "../components/Advertising"
import Ctx from "../ctx";

const Home = ({user, setActive}) => {
    const {goods} = useContext(Ctx);
    const advert = goods.filter(el => el.name === "Куриная кругля")[0]
    console.log(advert)

    return <Container className="d-block">
        <Row>
            <Col>
                <Banner/>
            </Col>
            {user && <Col>
                <Link to="/catalog">
                    <Journals style={{marginRight:"10px"}}/>
                    Каталог товаров
                </Link>
            </Col>}
            {!user && <Col>
                <span className="info-link" onClick={() => setActive(true)}>Авторизуйтесь</span>
                , чтобы получить доступ к сайту
            </Col>}
            <Col xs={12}>
                {advert && <Advertising _id={advert._id} name={advert.name} pictures={advert.pictures}/>}
            </Col>
            <Col xs={12}>
                <Slider desktop={3} mobile={2}/>
            </Col>
        </Row>
    </Container>
}

export default Home
