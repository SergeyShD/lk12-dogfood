import {Container, Row, Col, Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import {List} from "react-bootstrap-icons"
import Slider from "../components/Slider"
import Banner from "../components/Banner"
import Advertising from "../components/Advertising"
import ProductAdvertising from "../components/ProductAdvertising"

const giftAdvertising = {
    name:"Корм для собак мелких пород курица с овощами",
    pictures: "https://4lapy.ru/resize/480x480/upload/iblock/96a/96aed6f32b8fad486ce940106239f08f.jpg",
    caption: "Подарок за первый заказ!",
    background: "https://i.postimg.cc/y8w2vkSj/2.jpg",
    id: 12345
}
const advertising1 = {
    name:"Premium Fresh Meat Adult сухой корм для собак всех пород",
    pictures: "https://4lapy.ru/resize/480x480/upload/iblock/e4f/e4ff56cfd7bb7d14f354d8ee16552c5d.jpg",
    caption: "-30% на сухой корм для собак",
    background: "https://i.postimg.cc/bwX9Dpj4/8.jpg",
    id: 123456
}
const advertising2 = {
    name:"Для собак миниатюрных пород косточки из индейки",
    pictures: "https://4lapy.ru/resize/480x480/upload/iblock/224/224d501e057071bd458fce40d58b45d5.jpg",
    caption: "100% натуральные",
    background: "https://i.postimg.cc/HsnQPjTq/5.jpg",
    id: 1234567
}

const Home = ({user, setActive}) => {
    return <>
        <Container fluid style={{backgroundColor: "#FFE44D"}}>
            <Container className="d-block">
                {!user && <Row>
                    <Col >
                        <span className="info-link" onClick={() => {setActive(true)}}>
                            Авторизуйтесь, чтобы получить доступ к сайту
                        </span>
                    </Col>
                </Row>}
                <Row>
                    <Col xs={12}  lg={6}>
                        <Banner/>
                    </Col>
                </Row>
                {user && <Row>
                    <Col xs={12}  lg={6}>
                        <Link to="/catalog">
                            <Button className="
                                    d-flex
                                    rounded-pill
                                    border-0
                                    text-black
                                    justify-content-center
                                    align-items-center
                                    text-center
                                    button-catalog
                            ">
                                <List className="me-2"/>
                                Каталог товаров
                            </Button>
                        </Link>
                    </Col>
                </Row>}
            </Container>
        </Container>
        <Container className="d-block">
            <Row className="g-4">    
                <Col xs={12}>
                    <Advertising proGiftAdv={giftAdvertising}/>
                </Col>
                {user && <Col xs={12}>
                    <Slider desktop={3} mobile={2}/>
                </Col>}
                <Col xs={12}  lg={6}>
                    <ProductAdvertising proAdv={advertising1}/>
                </Col>
                <Col xs={12}  lg={6}>
                    <ProductAdvertising proAdv={advertising2}/>
                </Col>
                <Col xs={12}>
                    <Advertising proGiftAdv={giftAdvertising}/>
                </Col>
            </Row>
        </Container>
    </>
}

export default Home