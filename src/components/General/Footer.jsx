import {Link} from "react-router-dom"
import {Container, Row, Col} from "react-bootstrap";
import { Telegram, Facebook, Instagram} from "react-bootstrap-icons"
// import { isMobile } from "react-device-detect";
import Logo from "./Logo"; 

const links1 = [
    {name: "Каталог", src: "/catalog"},
    {name: "Акции", src: "/"},
    {name: "Новости", src: "/"},
    {name: "Отзывы", src: "/"}
]
const links2 = [
    {name: "Оплата и доставка", src: "/"},
    {name: "Избранное", src: "/favorites"},
    {name: "Корзина", src: "/"},
    {name: "Тестовая страница", src: "/old"}
]
const isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)
// typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)
const Footer = () => <footer>
    {/* <Container className="d-block">
        <Row>
            <Col className="footer__copy" lg={3}>
                <Logo />
                <span>©{new Date().getFullYear()}</span>
            </Col>
            {isMobile() ?
            <Col lg={3} className="d-none" /> :
            <Col lg={3}>
                <ul className="footer__nav">
                    {links1.map(el => <li key={el.name}>
                                        <Link to={el.src}>{el.name}</Link>
                                    </li>)}
                </ul>
            </Col>}
            {isMobile() ?
            <Col lg={3} className="d-none" /> :
            <Col lg={3}>
                <ul className="footer__nav">
                        {links2.map(el => <li key={el.name}>
                                            <Link to={el.src}>{el.name}</Link>
                                        </li>)}
                </ul>
            </Col>}
            <Col lg={3}>
                <h4>Мы на связи</h4>
                <p className="phone-number">
                    <a href="tel:+7-495-123-45-67">+7 (495) 123-45-67</a>
                </p>
                <p className="email">
                    <a href="mailto:dogfood@gmail.com">dogfood@gmail.com</a>
                </p>
                <div className="social-network">
                    <a href="https://telegram.org"><Telegram /></a>
                    <a href="https://www.facebook.com"><Facebook /></a>
                    <a href="https://www.instagram.com"><Instagram /></a>
                </div>
            </Col>
        </Row>
    </Container> */}
    <Container className="d-flex justify-content-center align-items-center">
        <Row>
            {isMobile ? <Col className="d-none" /> : <>
            <Col className="footer__copy p-1 " sm={12} lg={3}>
                <Logo/>
                <span style={{marginTop: "10px"}}>©{new Date().getFullYear()}</span>
            </Col>
            <Col className="p-1" xs={6} lg={3}>
                
                <ul className="footer__nav" style={{justifyContent: "space-around"}}>
                    {links1.map(el => <li key={el.name}>
                                        <Link to = {el.src}>{el.name}</Link>
                                    </li>)}
                </ul>
                
            </Col>
            <Col className="p-1" xs={6} lg={3}>
                <ul className="footer__nav" style={{justifyContent: "space-around"}}>
                        {links2.map(el => <li key={el.name}>
                                            <Link to = {el.src}>{el.name}</Link>
                                        </li>)}
                </ul>
            </Col>
            </>}
            <Col className="p-1" xs={12} lg={3} >
                
                <h4>Мы на связи</h4>
                <p className="phone-number">
                    <a href="tel:+7-495-123-45-67">+7 (495) 123-45-67</a>
                </p>
                <p className="email">
                    <a href="mailto:dogfood@gmail.com">dogfood@gmail.com</a>
                </p>
                <div className="social-network">
                    <a href="https://telegram.org"><Telegram/></a>
                    <a href="https://www.facebook.com"><Facebook/></a>
                    <a href="https://www.instagram.com"><Instagram/></a>
                </div>
            </Col>
        </Row>
    </Container>
</footer>

export default Footer;