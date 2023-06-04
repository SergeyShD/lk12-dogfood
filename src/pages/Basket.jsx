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

    const inc = (id, cnt) => {
        setBasket(prev => prev.map(el => {
            if(el.id === id) {
                // el.cnt++
                el.cnt = cnt ? cnt++ : el.cnt + 1
            }
            return el
        }))
    }
    const dec = (id) => {
        setBasket(prev => prev.map(el => {
            if(el.id === id) {
                el.cnt--
            }
            return el
        }))
    }
    const del = (id) => {
        setBasket(prev => prev.filter(el => el.id !== id))
    }

    return <>
        <Container className="d-block">
            <Row>
                <h1>Корзина</h1>
            </Row>
            <Row>
                <Col xs={8}>
                    <Table>
                        <tbody>
                            {basket.map(el => <tr key={el.id}>
                                {filterData.filter(f => f._id == el.id).map(d => <Fragment key={d._id}>
                                        <td className="align-middle"><img src={d.pictures} alt={d.name} height="38px"/></td>
                                        <td className="align-middle">
                                            <Link to={`/product/${el.id}`}>{d.name}</Link>
                                        </td>
                                    </Fragment>)}
                                    <td className="align-middle">
                                    {/* <ButtonGroup>
                                        <Button
                                            variant="warning" 
                                            disabled={el.cnt === 1}
                                            onClick={() => dec(el.id)}
                                        >-</Button>
                                        <input
                                            value={el.cnt}
                                            onChange={(e) => inc(el.id, e.target.value || 1)}
                                        />
                                        <Button variant="warning" onClick={() => inc(el.id)}>+</Button>
                                    </ButtonGroup> */}
                                    <Col><QuantityCounter id={el.id} data={el} noDelete={true}/></Col>

                                    </td>
                                    
                                    {/* <td className="align-middle">
                                        {el.price * el.cnt} ₽
                                    </td> */}
                                    <td className="align-middle">
                                        {el.discount > 0
                                            ? <>
                                                <span className="text-danger">{Math.ceil(el.price * el.cnt * ((100 - el.discount) / 100))}  ₽</span>
                                                <del className="ms-2 small text-secondary d-inline-block">{el.price * el.cnt} ₽</del>
                                            </>
                                        : <span >{el.price * el.cnt} ₽</span>}
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
                                <td>
                                    {sumDiscount === sum 
                                        ? <span className="">{sum} ₽</span>
                                        : <>
                                            <span className="text-danger">{Math.ceil(sumDiscount)}  ₽</span>
                                            <del className="ms-2 small text-secondary d-inline-block">{sum}  ₽</del>
                                        </>
                                    }
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </Col>
                <Col>
                                  
                </Col>
            </Row>
        </Container>
    </>
}

export default Basket