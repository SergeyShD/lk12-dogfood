import {useState, useEffect, useContext } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Basket2, Plus, Truck, Award} from "react-bootstrap-icons"
import {Container, Row, Col, Table, Card, Button, Form} from "react-bootstrap";
import Rating from "../components/Rating"
import Api from "../Api"
import Ctx from "../ctx"
import LikeButton from "../components/LikeButton"

const Product = () => {
	const { id } = useParams()
	const { api, userId, setBaseData, priceCourierDelivery, priceDeliveryToPoint} = useContext(Ctx);
	const [data, setData] = useState({});
	const [revText, setRevText] = useState("");
	const [revRating, setRevRating] = useState(0);
	const [hideForm, setHideForm] = useState(true);
	const navigate = useNavigate();

	const tableInfo = [
		{
			name:"wight",
			text: "Вес"
		},
		{
			name:"author",
			text: "Продавец"
		},
		// {
		// 	name:"description",
		// 	text: "Описание товара"
		// },
		{
			name: "created_at",
			text: "Дата размещения"
		}
	]

	const handleRatingChange = (newRating) => {
		setRevRating(newRating);
	};

	// console.log(data.created_at)
	const dataConvert = (data) => {
		const date = new Date(data)
		
		const options = { year: "numeric", month: "long", day: "numeric" };
		const formattedDate = date.toLocaleDateString("ru-RU", options);
		const time = date.toLocaleTimeString("ru-RU");
		return [formattedDate, time]
	}

	const addReview = (e) => {
        e.preventDefault()
		api.setReview(data._id, {
			text: revText,
			rating: revRating
		}).then(d => {
			setData(d);
			setRevText("");
			setRevRating(0);
			setHideForm(true);
		})
	}

	const delReview = (id) => {
		api.delReview(data._id, id).then(d => {
			setData(d);
		})
	}

	useEffect(() => {
		api.getSingleProduct(id)
			.then(serverData => {
				setData(serverData);
			})
	}, [])

	const delHandler = () => {
		api.delSingleProduct(id)
			.then(data => {
				setBaseData(prev => prev.filter(el => el._id !== id));
				navigate("/catalog");
			})
	}

	const [count, setCount] = useState(0);

	const increment  = () => {
		setCount(count + 1);
	};

	const decrement  = () => {
		if(count>0){
			setCount(count - 1);
		}
	};

	const сountChange = (event) => {
		const newCount = parseInt(event.target.value);
		setCount(newCount);
	};

	return  <Container style={{gridTemplateColumns: "1fr"}}>
		<Row className="g-3">
		<Link to={`/catalog#pro_${id}`}>Назад</Link>
			{data.name
				? <>
					<Col xs={12}>
						<div>
							{data.author._id === userId && <Basket2 onClick={delHandler}/>}
						</div>
						<h1>{data.name}</h1>
					</Col>
					<Col xs={12} md={6}>
						<img src={data.pictures} alt={data.name} className="w-100"/>
					</Col>
					<Col >
						<Row className="mb-2">
							<Col xs={12} md={6} className={`${data.discount ? "text-danger" : "text-secondary"} fw-bold fs-1`}>
								{Math.ceil(data.price * (100 - data.discount) / 100)} ₽
							</Col>
						</Row>
						<Row className="mb-2 mt-2">
							<Col xs={3} className="d-flex align-items-center justify-content-between border rounded-pill">
								<span className="clickable" onClick={decrement}>-</span>
								<input value={count} className="col-4 border-0 text-center" onChange={сountChange}/>
								<span className="clickable" onClick={increment}>+</span>
							</Col>
							<Col xs={9}>
								<Button className="w-100 h-100 rounded-pill">В корзину</Button>
							</Col>
						</Row>
						<Row className="mb-4 mt-4">
							<Col xs={12}>
								<LikeButton likes={data.likes} _id={data._id} textRight={"В избранное"} className="ms-2"/>
							</Col>
						</Row>
						<Card className="mb-4 p-3 d-flex flex-row ">
							<Card.Body>
								<Truck style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "28px"}}/>
							</Card.Body>
							<Card.Body className="w-100">
								<Card.Title className="mb-3 ">Доставка по всему Миру!</Card.Title>
								<Card.Subtitle className="mb-3 text-muted">Доставка курьером - от {priceCourierDelivery}</Card.Subtitle>
								<Card.Subtitle className="text-muted">Доставка в пункт выдачи - от {priceDeliveryToPoint}</Card.Subtitle>
							</Card.Body>
						</Card>
						<Card className="mb-4 p-3 d-flex flex-row">
							<Card.Body>
								<Award style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "28px"}}/>
							</Card.Body>
							<Card.Body className="w-100">
								<Card.Title className="mb-3">Гарантия качества</Card.Title>
								<Card.Subtitle className="text-muted" style={{ lineHeight: "1.5" }}>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды.</Card.Subtitle>
							</Card.Body>
						</Card>
					</Col>
					<Col xs={12}>
						<h2>Описание</h2>
						<p>{data["description"]}</p>
					</Col>
					<Col xs={12}>
						<h2>Характеристики</h2>
						<Table>
							<tbody>
								{tableInfo.map((el, i) => <tr key={i}>
									<th className="fw-normal text-secondary small w-25" >{el.text}</th>
									<td>{el.name === "author"
										? <>
											<span className="me-3">{data[el.name].name} ({data[el.name].email})</span>
										</>
										: (el.name === "created_at"
											? <>
												<span className="me-3">{dataConvert(data.created_at)[0]} в {dataConvert(data.created_at)[1]}</span>
											</>
											: data[el.name])
									}</td>
								</tr>)}
							</tbody>
						</Table>
					</Col>
					<h2>Отзывы</h2>
					{!hideForm && <Col xs={12} >
						<h3>Новый отзыв</h3>
						<Form onSubmit={addReview}>
							<Form.Group className="mb-3">
								<Rating isAnimationEnabled={true} onChange={handleRatingChange}/>
							</Form.Group>
							<Form.Group  className="mb-3">
								<Form.Label htmlFor="text">Комментарий:</Form.Label>
								<Form.Control
									as="textarea"
									type="text"
									id="text"
									value={revText}
									rows={3}
									onChange={(e) => setRevText(e.target.value)}
								/>
							</Form.Group>
							<Button
								type="reset"
								className="me-2"
								onClick={(e) => {
									e.preventDefault();
									setRevText("");
									setRevRating(0);
									setHideForm(true);
								}}
							>Отмена</Button>
							<Button type="submit">Добавить</Button>
						</Form>
					</Col>}
					{data.reviews.length > 0 
					? <Col xs={12}>
						{hideForm && <Col>
							<Button
								variant="outline-info"
								className="fs-7 border rounded-pill mt-3 mb-4"
								onClick={() => setHideForm(false)}
							>
								Написать отзыв
							</Button>
						</Col>}
						<Row className="g-3">
							{data.reviews.map(el => <Col xs={12} sm={6} md={4} key={el._id}>
									<Card className="h-100">
										<Card.Body className="position-relative">
											<Row className="d-flex align-items-center">
												<Col xs={12} md={2}>
													<Card.Img
														src={el.author.avatar} style={{
															width: "50px",
															height: "50px",
															borderRadius: "50%",
															objectFit: "cover",
														}}
													/>
												</Col>
											<Col xs={12} md={10}>
												<Card.Text className="text-primary">
													{el.author.name}
												</Card.Text>
											</Col>
											</Row>
											<Row>
												<Card.Text className="small text-muted">{dataConvert(el.updated_at)[0]} в {dataConvert(el.updated_at)[1]}</Card.Text>
											</Row>
											<Card.Title><Rating rating={el.rating}/></Card.Title>
											<Card.Text className="fs-6 text-secondary">{el.text}</Card.Text>
                                            {el.author._id === userId && <>
												<span className="text-danger position-absolute end-0 bottom-0 pe-3 pb-2">
													<Basket2 onClick={()=>delReview(el._id)}/>
												</span>
											</>}
                                        </Card.Body>
									</Card>
								</Col>
							)}
						</Row>
					</Col>
					: hideForm && <Col><Button variant="outline-info" onClick={() => setHideForm(false)}>Написать отзыв</Button></Col>
					}
				</>
				: <Col xs={12}>
					<div className="info" style={{textAlign: "center"}}>
						Товара {id} не существует<br/>или<br/>он еще не загружен
					</div>
				</Col>
			}
		</Row>
	</Container>
}

export default Product;