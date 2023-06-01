import { useContext, useState } from "react";
import { Container, Row, Col, Card, Table  } from "react-bootstrap";
import { X, Trash } from "react-bootstrap-icons";
import Ctx from "../../ctx";
import Api from "../../Api"

const ModalMyProduct = () => {
    const { goods, userId, api, setBaseData } = useContext(Ctx);
    const [inputValue, setInputValue] = useState("");
    const [hoveredElement, setHoveredElement] = useState([false,]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleMouseOver = (event, id) => {
        event.stopPropagation();
        setHoveredElement([id, true]);
        console.log("Наведение на элемент с _id:", id);
    };
    
    const handleMouseOut = (event, id) => {
        event.stopPropagation();
        setHoveredElement([id, false]);
        console.log("Убрал внимание с элемента с _id:", id);
    };

    const filteredGoods = inputValue.length > 0
        ? goods.filter((el) => el.name.toLowerCase().includes(inputValue) && el.author._id === userId)
        : goods.filter((el) => el.author._id === userId);

    const dataConvert = (data) => {
        const date = new Date(data)
        
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("ru-RU", options);
        const time = date.toLocaleTimeString("ru-RU");
        return `${formattedDate} в ${time}`
    }
    
    const delHandler = (id) => {
        console.log("Удалено:", id)
		api.delSingleProduct(id)
			.then(data => {
				setBaseData(prev => prev.filter(el => el._id !== id));
			})
	}

    return (
        <>
        <Container className="d-block p-4 position-relative border rounded">
            <X className="position-absolute top-0 end-0 m-2 fs-3" />
            <Row className="d-flex align-items-center">
            <Col xs={4}>
                <h1>Мои товары</h1>
            </Col>
            <Col xs={6}>
                <input
                className="w-100 border rounded"
                value={inputValue}
                onChange={handleInputChange}
                />
            </Col>
            </Row>
            {filteredGoods.map((el) => (
                <Row
                    key={el._id}
                    className="pt-2 pb-2"
                    onMouseOver={(event) => handleMouseOver(event, el._id)}
                    onMouseOut={(event) => handleMouseOut(event, el._id)}
                >
                        <Col xs={2}>
                            <img
                                src={el.pictures}
                                className="h-100 w-100"
                                
                            />
                        </Col>
                        <Col
                            xs={9}
                            className="d-flex align-items-center fs-4"
                        >
                            {el.name}
                        </Col>
                        <Col xs={1} className="d-flex align-items-center">
                            <Trash className="h-100 w-100" onClick={() => delHandler(el._id)}/>
                        </Col>
                        {hoveredElement[1] && (el._id === hoveredElement[0]) ? <Col xs={12}>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Создано</td>
                                        <td>{dataConvert(el.created_at)}</td>
                                    </tr>
                                    {(el.created_at !== el.updated_at) && <>
                                    <tr>
                                        <td>Обновлено</td>
                                        <td>{dataConvert(el.updated_at)}</td>
                                    </tr>
                                    </>}
                                    <tr>
                                        <td>Описание</td>
                                        <td>{el.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Скидка</td>
                                        <td>{el.discount} %</td>
                                    </tr>
                                    <tr>
                                        <td>Цена</td>
                                        <td>{el.price} ₽</td>
                                    </tr>
                                    <tr>
                                        <td>Вес</td>
                                        <td>{el.weight}</td>
                                    </tr>
                                    <tr>
                                        <td>Кол-во лайков</td>
                                        <td>{el.likes.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Кол-во комментариев</td>
                                        <td>{el.reviews.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Теги</td>
                                        <td>
                                            {el.tags.map((tag, index) => (
                                            <span key={index}>{tag}</span>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        : <></>}
                </Row>
            ))}
        </Container>
        {console.log(hoveredElement[0])}
        </>
    );
};

export default ModalMyProduct;