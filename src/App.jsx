import testData from "./assents/data.json";
import Card from "./components/Card/Card";
import Promo from "./components/Promo/Promo";
import { Header, Footer } from "./components/General";

const promoData = ["=)", "^_^", "O_o", "x_x", "=(", ";(", "0l0"];

// console.log(testData);

const App = () => {
    
    return (
        <>
            <Header/>
            <div>
                <h1>First Page</h1>
                <div className="container">
                    {testData.map((pro, i) => (
                        <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />
                    ))}
                    {promoData.map(el => <Promo key={el} text={el}/>)}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default App;