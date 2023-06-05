import { useContext } from "react";
import {Container, Row, Col} from "react-bootstrap";
import BsCard from "../components/BsCard";
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
						<Col key={i} xs={12} sm={6} md={4} lg={3}>
							<BsCard img={pro.pictures} {...pro} user={userId} />
						</Col>
					);
				}
				return null
			})}
		</Row>
	</Container>
}

export default Favorites
