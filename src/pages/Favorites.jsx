import { useContext } from "react"
import {Container, Row, Col, Button} from "react-bootstrap"
import { EmojiFrown } from "react-bootstrap-icons"
import {Link} from "react-router-dom"
import BsCard from "../components/BsCard"
import Ctx from "../ctx"

const Favorites = () => {
	const {userId, baseData} = useContext(Ctx)

    return <Container className="d-block">
		<Row className="g-4">
			<Col xs={12}>
				<h1 style={{margin: 0, gridColumnEnd: "span 3"}}>Любимые товары</h1>
			</Col>
			{baseData.map((pro, i) => {
				if (pro.likes.includes(userId)) {
					return (
						<Col key={"catalog" + i} xs={12} sm={6} md={4} lg={3}>
							<BsCard img={pro.pictures} {...pro} user={userId}/>
						</Col>
					)
				}
				return null
			})}
			{baseData.filter((el) => el.likes.includes(userId)).length === 0 && <>
				<Col  className="text-center">
                    <span style={{fontSize: "70px"}}>
                        <EmojiFrown/>
                    </span>
                    <h5 className="fw-bold">
                        У вас пока нет любимых товаров
                    </h5>
                    <p className="fs-6 text-secondary">
                        Добавьте любимый товар, нажав кнопку "Лайк" в карточке товара
                    </p>
                    <div className="d-inline-block">
                        <Button
                            className="button-toMain"
                            as={Link}
                            to="/catalog"
                        >
                            В каталог
                        </Button>
                    </div>
                </Col>
			</>}
		</Row>
	</Container>
}

export default Favorites
