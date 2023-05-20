import { useContext, useEffect, useState} from "react";
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
			{baseData.filter(el => el.likes.includes(userId)).map((pro, i) => (
				// {name, price, likes, _id} => name={pro.name} price={pro.price} _id={pro._id} likes={pro.likes}
				<Col key={i} xs={12} sm={6} md={4} lg={3}>
					<BsCard img={pro.pictures} {...pro} user={userId}/>
				</Col>
			))}
		</Row>
	</Container>
}

export default Favorites
