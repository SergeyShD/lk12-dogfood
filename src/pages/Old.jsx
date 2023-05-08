import {Link} from "react-router-dom"
import Card from "../components/Card/Card"
import Promo from "../components/Promo/Promo"

const promoData = ["=)", "^_^", "O_o", "x_x", "=(", ";(", "0l0"];

const OldPage = ({searchText, goods}) => {
    return <>
        <h1>Старые данные</h1>
        <nav>
            <Link to="/catalog">Стр 2</Link>
            <Link to="/">Стр 1</Link>
            <Link to="/old">Стр 3</Link>
        </nav>
        <div>
            {/* <h1>First Page</h1> */}
            <div className="container">
            {searchText && <p className="search-result">{searchText}</p>}
                {goods.map((pro, i) => (
                    <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />
                ))}
                {/* {promoData.map(el => <Promo key={el} text={el}/>)} */}
            </div>
        </div>
    </>
}

export default OldPage