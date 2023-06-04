import {useState, useContext, Fragment} from "react"
import {Container, Table, ButtonGroup, Button, Row, Col, InputGroup} from "react-bootstrap"
import {Link} from "react-router-dom"
import { Trash } from "react-bootstrap-icons"
import Ctx from "../ctx"
import QuantityCounter from "../components/QuantityCounter"

const Basket = ({}) => {
    const {basket, setBasket, baseData} = useContext(Ctx)
    const ids = basket.map(b => b.id)
    const filterData = baseData.filter(el=> ids.includes(el._id))

    const sum = basket.reduce((acc, el) => acc + el.price * el.cnt, 0)
    const sumDiscount = basket.reduce((acc, el) => {
        return acc + (el.price * el.cnt * (100 - el.discount) / 100)
    }, 0)

    // const inc = (id, cnt) => {
    //     setBasket(prev => prev.map(el => {
    //         if(el.id === id) {
    //             // el.cnt++
    //             el.cnt = cnt ? cnt++ : el.cnt + 1
    //         }
    //         return el
    //     }))
    // }
    // const dec = (id) => {
    //     setBasket(prev => prev.map(el => {
    //         if(el.id === id) {
    //             el.cnt--
    //         }
    //         return el
    //     }))
    // }
    const del = (id) => {
        setBasket(prev => prev.filter(el => el.id !== id))
    }

    const getWordEnding = (count, word) => {
        const lastDigit = count % 10
        const lastTwoDigits = count % 100

        switch (true) {
            case (lastTwoDigits >= 11 && lastTwoDigits <= 19):
                return `${word}ов`
            case (lastDigit === 1):
                return `${word}`
            case (lastDigit >= 2 && lastDigit <= 4):
                return `${word}а`
            default:
                return `${word}ов`
        }
    }

    return <>
        <Container className="d-block">
            <Row>
                <h1>Корзина</h1>
            </Row>
            <Row>
                <h3>
                    <strong>
                        {basket.length} {getWordEnding(basket.length, "товар")}
                    </strong>&nbsp;в корзине
                </h3>
            </Row>
            <Row>
                <Col xs={12} lg={8}>
                    <Table>
                        <tbody>
                            {basket.map(el => <tr key={el.id}>
                                {filterData.filter(f => f._id == el.id).map(d => <Fragment key={d._id}>
                                    <td className="align-middle">
                                        <img src={d.pictures} alt={d.name} height="38px"/>
                                    </td>
                                    <td className="align-middle">
                                        <Link to={`/product/${el.id}`}>{d.name}</Link>
                                    </td>
                                </Fragment>)}
                                    <td className="align-middle">
                                        <Col>
                                            <QuantityCounter id={el.id} data={el} noDelete={true}/>
                                        </Col>
                                    </td>
                                    <td className="align-middle">
                                        {el.discount > 0
                                            ? <>
                                                <span className="text-danger">
                                                    {Math.ceil(el.price * el.cnt * ((100 - el.discount) / 100))}  ₽
                                                </span>
                                                <del className="ms-2 small text-secondary d-inline-block">
                                                    {el.price * el.cnt} ₽
                                                </del>
                                            </>
                                            : <>
                                                <span>
                                                    {el.price * el.cnt} ₽
                                                </span>
                                            </>
                                        }
                                    </td>
                                    <td className="align-middle">
                                        <Trash 
                                            className="trash"
                                            onClick={() => del(el.id)}
                                        />
                                    </td>
                            </tr>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className="text-end text-uppercase">
                                    Общая сумма:
                                </td>
                                <td colSpan={2}>
                                    {sumDiscount === sum 
                                        ? <>
                                            <span className="">
                                                {sum} ₽
                                            </span>
                                        </>
                                        : <>
                                            <span className="text-danger">
                                                {Math.ceil(sumDiscount)} ₽
                                            </span>
                                            <del className="ms-2 small text-secondary d-inline-block">
                                                {sum} ₽
                                            </del>
                                        </>
                                    }
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </Col>
                <Col xs={12} lg={4} className="d-flex align-items-start justify-content-center">
                    <Container className="d-block border rounded-4 ps-4 pe-4 pt-3 pb-3" style={{maxWidth: "300px"}}>
                        <Row className="ps-2 fs-4 fw-bold">
                            Ваша корзина
                        </Row>
                        <Row>
                            <Table borderless>
                                <tbody className="align-middle">
                                    <tr>
                                        <td className="text-secondary">Товары ({basket.length})</td>
                                        <td className="text-end">{sum} ₽</td>
                                    </tr>
                                    {(sumDiscount !== sum) && (
                                        <tr>
                                            <td className="text-secondary">Скидка</td>
                                            <td className="text-danger text-end">{Math.ceil(sumDiscount - sum)} ₽</td>
                                        </tr>
                                    )}
                                    <tr style={{ borderTop: "1px solid lightgray" }}>
                                        <td className="fw-bold">Общая стоимость</td>
                                        <td className="text-end fw-bold fs-5">{Math.ceil(sumDiscount)} ₽</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <button className="button-toCard fw-bold pt-2 pb-2 rounded-pill">Оформить заказ</button>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    </>
}

export default Basket