import {useState, useContext, useEffect} from "react"
import {Row, Col, Carousel, Container} from "react-bootstrap"
import BsCard from "../BsCard"
import Ctx from "../../ctx"

import "./style.css"

const Slider = ({desktop = 4, mobile = 1}) => {
    const {baseData} = useContext(Ctx)
    const [gds, setGds] = useState([[]])
    const [cnt, setCnt] = useState(desktop)

    useEffect(() => {
        if (window.innerWidth <= 768){
            setCnt(mobile)
        }
        window.addEventListener("resize", function() {
            if (window.innerWidth <= 768) {
                setCnt(mobile)
            } else {
                setCnt(desktop)
            }
        })
    }, [])

    useEffect(() => {
        if(baseData.length){
        //     setGds(baseeGoods.reduce((acc, el, i)=>{
        //         if (i < 5){
        //         // if (acc.length < 5) {
        //             acc.push(el)
        //         }
        //         return acc
        //     },[]))
        // }
            // setGds(baseData.filter((el, i) => i<5))

            setGds(baseData.reduce((acc, el, i) => {
                if (i % cnt === 0) {
                    acc.push([])
                }
                acc[acc.length - 1].push(el)
                return acc
            }, []))
        }
    },[baseData])

    useEffect(() => {
        console.log(gds)
    },[gds])

    return <Container style={{gridTemplateColumns: "1fr"}}>
        <Carousel controls={false} interval={5000} indicators={false}>
            {gds.map((el, i) => <Carousel.Item key={i}>
                <Row>
                    {el.map(card => <Col xs={12/cnt} key={card._id}>
                        <BsCard {...card} />
                    </Col>)}
                    {/*<Col xs={3}><BsCard {...el} /></Col>*/}
                    {/*<Col xs={3}><BsCard {...el} /></Col>*/}
                    {/*<Col xs={3}><BsCard {...el} /></Col>*/}
                    {/*<Col xs={3}><BsCard {...el} /></Col>*/}
                </Row>
            </Carousel.Item>)}
        </Carousel>
    </Container>
}

export default Slider