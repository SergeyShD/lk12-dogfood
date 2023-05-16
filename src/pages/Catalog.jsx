// import Card from "../components/Card/Card"
import { useContext } from "react";
import {Container, Row, Col} from "react-bootstrap";
import BsCard from "../components/BsCard";
import Ctx from "../ctx"

const Catalog = ({goods, userId}) => {
    // return <div className="container">
    //     <h1 style={{matgin: 0, gridColumnEnd:"span 3"}}>Каталог</h1>
    //     {/* {searchText && <p className="search-result">{searchText}</p>} */}
    //     {goods.map((pro, i) => (
    //         <Card key={i} img={pro.pictures} {...pro} setBaseData={setBaseData} user={userId}/>
    //     ))}
    //     {/* {promoData.map(el => <Promo key={el} text={el}/>)} */}

    // </div>
	const {searchResult, setBaseData} = useContext(Ctx)
    return <Container className="d-block">
		<Row className="g-4">
			{searchResult && <Col xs={12} className="search-result">
				{searchResult}
			</Col>}
			<Col xs={12}>
				<h1 style={{margin: 0, gridColumnEnd: "span 3"}}>Каталог</h1>
			</Col>
			{goods.map((pro, i) => (
				// {name, price, likes, _id} => name={pro.name} price={pro.price} _id={pro._id} likes={pro.likes}
				<Col key={i} xs={12} sm={6} md={4} lg={3}>
					<BsCard img={pro.pictures} {...pro} user={userId}/>
				</Col>
			))}
		</Row>
	</Container>
}

export default Catalog
