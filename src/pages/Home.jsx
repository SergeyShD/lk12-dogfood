import {useContext} from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom"
import { Journals, CaretRight  } from "react-bootstrap-icons"
import Slider from "../components/Slider"
import Banner from "../components/Banner"
import Advertising from "../components/Advertising"
import ProductAdvertising from "../components/ProductAdvertising";
import Ctx from "../ctx";


const Home = ({user, setActive}) => {
    // const {goods} = useContext(Ctx);
    
    // const advert = goods.filter(el => el.name === "Куриная кругля")[0]
    // console.log(advert)

    return <>
        <Container fluid className="p-4" style={{backgroundColor: "yellow"}}>
            <Container className="d-block">
                {!user && <Row>
                    <Col xs={12}>
                        <span className="info-link" onClick={() => setActive(true)}>Авторизуйтесь, чтобы получить доступ к сайту</span>
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
                            <Button style={{
                                    backgroundColor: "white",
                                    border: "none",
                                    borderRadius: "20px",
                                    color: "black"
                                }}>Каталог товаров
                                <CaretRight/>
                            </Button>
                        </Link>
                    </Col>
                </Row>}
            </Container>
        </Container>
        <Container className="d-block" >
            <Row className="g-4">    
                <Col xs={12}>
                    <Advertising giftName="Уши говяжьи для собак"/>
                </Col>
                {/* <Col xs={12}>
                    <Slider desktop={3} mobile={2}/>
                </Col> */}
                {user && <Col xs={12}>
                    <Slider desktop={3} mobile={2} />
                </Col>}
                <Col xs={12}  lg={6}>
                    <ProductAdvertising nameAdv={"Желудки утиные сушено-вяленые"} caption={"от 10 до 30 кг."}/>
                </Col>
                <Col xs={12}  lg={6}>
                    <ProductAdvertising nameAdv={"Мелкая говяжья сушено-вяленая жилка"} caption={"100% натуральные"}/>
                </Col>
                <Col xs={12}>
                    <Advertising giftName="Уши говяжьи для собак"/>
                </Col>
            </Row>
        </Container>
    </>
}

export default Home