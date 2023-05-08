import Card from "../components/Card/Card"
const Catalog = ({goods, setBaseData, userId}) => {
    return <div className="container">
        <h1 style={{matgin: 0, gridColumnEnd:"span 3"}}>Каталог</h1>
        {/* {searchText && <p className="search-result">{searchText}</p>} */}
        {goods.map((pro, i) => (
            <Card key={i} img={pro.pictures} {...pro} setBaseData={setBaseData} user={userId}/>
        ))}
        {/* {promoData.map(el => <Promo key={el} text={el}/>)} */}

    </div>
    
}

export default Catalog
