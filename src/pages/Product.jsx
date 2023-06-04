import {useState, useEffect, useContext } from "react"
import {useParams, Link, useNavigate} from "react-router-dom"
import {Trash, Truck, Award} from "react-bootstrap-icons"
import {Container, Row, Col, Table, Card, Button, Form} from "react-bootstrap"
import Rating from "../components/Rating"
import RatingStatic from "../components/RatingStatic"

import Ctx from "../ctx"
import LikeButton from "../components/LikeButton"
import QuantityCounter from "../components/QuantityCounter"

const Product = () => {
	const { id } = useParams()
	const { api, userId, priceCourierDelivery, priceDeliveryToPoint, isMobile, basket, setBasket} = useContext(Ctx)
	const [data, setData] = useState({})
	const [revText, setRevText] = useState("")
	const [revRating, setRevRating] = useState(0)
	const [hideForm, setHideForm] = useState(true)
	const [showAllReviews, setShowAllReviews] = useState(false)
	const [showCntReviews, setshowCntReviews] = useState(isMobile ? 2 : 3)

	const prodInBasket = basket.find(el => el.id === id)
	const [cnt, setCount] = useState(0)
	
	// const navigate = useNavigate();

	const tableInfo = [
		{
			name:"wight",
			text: "Вес"
		},
		{
			name:"author",
			text: "Продавец"
		},
		{
			name: "created_at",
			text: "Дата размещения"
		}
	]

	const handleRatingChange = (newRating) => {
		setRevRating(newRating);
	};

	const dataConvert = (data) => {
		const date = new Date(data)
		const options = { year: "numeric", month: "long", day: "numeric" }
		const formattedDate = date.toLocaleDateString("ru-RU", options)
		const time = date.toLocaleTimeString("ru-RU")

		return [formattedDate, time]
	}

	const addReview = (e) => {
        e.preventDefault()
		api.setReview(data._id, {
			text: revText,
			rating: revRating
		}).then(d => {
			setData(d)
			setRevText("")
			setRevRating(0)
			setHideForm(true)
		})
	}

	const delReview = (id) => {
		api.delReview(data._id, id).then(d => {
			setData(d)
		})
	}

	useEffect(() => {
		api.getSingleProduct(id)
			.then(serverData => {
				setData(serverData)
			})
	}, [])

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
			setshowCntReviews(2)
			} else {
			setshowCntReviews(3)
			}
		}
		window.addEventListener('resize', handleResize)
	}, []);

	const inBasket = basket.filter(el => el.id === id).length > 0

	const addToBasket = !inBasket
        ? (event) => {
            event.preventDefault()
            event.stopPropagation()
			cnt > 1 ? setCount(0) : setCount(1)
            setBasket(prev => [...prev,{
                id,
                price: data.price,
                discount: data.discount,
                cnt: 1
            }])
        }
        : (() => {})

	
	const averageRating = data.name && (
		Math.round(data.reviews.reduce((acc, el) => acc + el.rating, 0) / data.reviews.length * 10) / 10
	)

	return  <Container style={{gridTemplateColumns: "1fr"}}>
		<Row className="g-3">
			<Col xs={4} sm={3} lg={2}>
				<Button
					className="w-100 rounded-pill"
					as={Link}
					to={`/catalog#pro_${id}`}
				>
					Назад
				</Button>
			</Col>
			{data.name
				? <>
					<Col xs={12}>
						<h1>{data.name}</h1>
					</Col>
					<Row className="d-flex align-items-center justify-content-start ">
						<Col xs={5} sm={3} md={2} style={{minWidth: "100px"}}>
							<RatingStatic rating={averageRating}/>
						</Col>
						<Col xs={7} sm={6} md={5}>
							<a href="#reviews"><u>Всего отзывов: {data.reviews.length}</u></a>
						</Col>
					</Row>
					<Col xs={12} md={6} className="d-relative p-4">
						{data.discount !== 0 && <>
							<div className="
									ps-2
									pe-2
									m-2
									position-absolute
									rounded-pill
									sale
									bg-danger
									text-white
									border-none
								"
							>
								Sale {data.discount}%
							</div>
						</>}
						<img src={data.pictures} alt={data.name} className="w-100"/>
					</Col>
					<Col>
						<Row className="mb-2">
							<Col 
								xs={12}
								className={`${data.discount !== 0 
									? "text-secondary fs-5 text-decoration-line-through"
									: "text-dark fw-bold fs-1"}`}
							>
								{data.price} ₽
							</Col>
							{data.discount !== 0 && <>
								<Col xs={12} 
									className={`${data.discount 
										? "text-danger"
										: "text-secondary"} fw-bold fs-1`}
								>
									{Math.ceil(data.price * (100 - data.discount) / 100)} ₽
								</Col>
							</>}
						</Row>
						<Row className="justify-content-between">
							<Col xs={4} sm={4} lg={3} className="d-flex align-items-center">
								<QuantityCounter id={id} data={data}/>
							</Col>
							<Col xs={8} sm={8} lg={9}>
								<Button 
									className="w-100 h-100 rounded-pill position-relative"
									onClick={addToBasket}
								>
									{!prodInBasket
										? "Добавить в корзину"
										: <>
											Перейти в корзину
											<Link to={`/basket`} className="card-link"></Link>
										</>}
								</Button>
							</Col>
						</Row>
						<Row className="mb-4 mt-4">
							<Col xs={12}>
								<LikeButton
									likes={data.likes}
									_id={data._id}
									textRight={"В избранное"}
									className="ms-2"
								/>
							</Col>
						</Row>
						<Card className="mb-4 p-3 d-flex flex-row ">
							<Card.Body>
								<Truck className="d-flex justify-content-center align-items-center fs-2"/>
							</Card.Body>
							<Card.Body className="w-100">
								<Card.Title className="mb-3 ">
									Доставка по всему Миру!
								</Card.Title>
								<Card.Subtitle className="mb-3 text-muted">
									Доставка курьером - от {priceCourierDelivery}
								</Card.Subtitle>
								<Card.Subtitle className="text-muted">
									Доставка в пункт выдачи - от {priceDeliveryToPoint}
								</Card.Subtitle>
							</Card.Body>
						</Card>
						<Card className="mb-4 p-3 d-flex flex-row">
							<Card.Body>
								<Award className="d-flex justify-content-center align-items-center fs-2"/>
							</Card.Body>
							<Card.Body className="w-100">
								<Card.Title className="mb-3">
									Гарантия качества
								</Card.Title>
								<Card.Subtitle className="text-muted" style={{ lineHeight: "1.5" }}>
									Если Вам не понравилось качество нашей продукции, мы вернем деньги, 
									либо сделаем все возможное, чтобы удовлетворить ваши нужды.
								</Card.Subtitle>
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
									<th className="fw-normal text-secondary small w-25">{el.text}</th>
									<td>{el.name === "author"
										? <>
											<span className="me-3">
												{data[el.name].name} ({data[el.name].email})
											</span>
										</>
										: (el.name === "created_at"
											? <>
												<span className="me-3">
													{dataConvert(data.created_at)[0]} в {dataConvert(data.created_at)[1]}
												</span>
											</>
											: data[el.name])
									}</td>
								</tr>)}
							</tbody>
						</Table>
					</Col>
					<h2 id="reviews">Отзывы</h2>
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
						<Row className="xs-12 d-flex align-items-stretch pb-4">
							{hideForm && (
								<Col>
									<Button
										variant="outline-info"
										className="fs-7 border rounded-pill h-100"
										onClick={() => setHideForm(false)}
									>
										Написать отзыв
									</Button>
								</Col>
							)}
							<Col className="d-flex justify-content-end">
								{showAllReviews ? (
								<>
									<Button 
										className="fs-7 border rounded-pill"
										onClick={() => setShowAllReviews(false)}>Скрыть все отзывы</Button>
								</>
								) : (
								<>
									{data.reviews.length > 3 && <Button 
										className="fs-7 border rounded-pill"
										onClick={() => setShowAllReviews(true)}>Показать все отзывы
									</Button>}
								</>
								)}
							</Col>
						</Row>
						<Row className="g-3">
							{data.reviews.slice(0, showAllReviews
								? data.reviews.length
								: showCntReviews).map(el => <Col xs={6} sm={6} md={4} key={el._id}>
									<Card className="h-100">
										<Card.Body className="position-relative">
											<Row className="d-flex align-items-center justify-content-start">
												<Col xs={4} sm={3} lg={2}>
													<Card.Img
														xs={12} md={3}
														src={el.author.avatar}
														style={{
															width: "40px",
															height: "40px",
															borderRadius: "50%"
														}}/>
												</Col>
												<Col xs={12} sm={8} lg={10}>
													<Card.Text>
														{el.author.name}
													</Card.Text>
												</Col>
											</Row>
											<Row>
												<Card.Text className="small text-muted">
													{dataConvert(el.updated_at)[0]} в {dataConvert(el.updated_at)[1]}
												</Card.Text>
											</Row>
											<Card.Title>
												<RatingStatic rating={el.rating}/>
											</Card.Title>
											<Card.Text className="fs-6 text-secondary">
												{el.text}
											</Card.Text>
                                            {el.author._id === userId && <>
												<span className="text-danger
																position-absolute
																end-0 bottom-0
																pe-3 pb-2"
												>
													<Trash
														onClick={()=>delReview(el._id)}
														className="h-50 w-50 trash cursor-pointer"
													/>
												</span>
											</>}
                                        </Card.Body>
									</Card>
								</Col>
							)}
						</Row>
						
					</Col>
					: hideForm && <Col>
						<Button variant="outline-info" onClick={() => setHideForm(false)}>
							Написать отзыв
						</Button>
					</Col>
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