import { useState, useContext, useEffect } from "react"
import {Plus, Dash} from "react-bootstrap-icons"
import Ctx from "../../ctx"

const QuantityCounter = ({ data, id, noDelete = false }) => {
    const { basket, setBasket } = useContext(Ctx)
    const prodInBasket = basket.find(el => el.id === id)
    const initialCount = prodInBasket ? prodInBasket.cnt : 0
    const [count, setCount] = useState(initialCount)

    useEffect(() => {
        setCount(initialCount)
    }, [initialCount])

    const increment = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setCount(prevCount => prevCount + 1)
        if (prodInBasket) {
            setBasket(prev => prev.map((el) => {
                if (el.id === id) {
                el.cnt++
                }
                return el
            }))
        } else {
            setBasket(prev => [...prev, {
                id,
                price: data.price,
                discount: data.discount,
                cnt: 1
            }])
        }
    };

    const decrement = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (prodInBasket && count > 1) {
            setCount(prevCount => prevCount - 1)
            setBasket(prev => prev.map((el) => {
                if (el.id === id) {
                    el.cnt--
                }
                return el
            }))
        } else if (count === 1 && !noDelete) {
            setCount(prevCount => prevCount - 1)
            setBasket(prev => prev.filter(el => el.id !== id))
        }
    };

    const countChange = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const newCount = parseInt(event.target.value)
        if (isNaN(newCount) || (newCount <= 0 && !noDelete)) {
            setCount(0)
            setBasket(prev => prev.filter(el => el.id !== id))
        } else {
            if (prodInBasket) {
                setBasket(prev => prev.map((el) => {
                if (el.id === id) {
                    el.cnt = newCount
                }
                return el
                }))
            } else {
                setBasket(prev => [...prev, {
                id,
                price: data.price,
                discount: data.discount,
                cnt: newCount
                }])
            }
            setCount(newCount)
        }
    }

    const decrementClass = count === 0 ? "disabled" : "clickable"

    return (
        <div
            className="d-flex h-100 w-100 align-items-center justify-content-evenly border rounded-pill"
            style={{maxHeight: "40px", maxWidth: "100px"}}
        >
            <Dash
                className={`${decrementClass} fs-4`}
                onClick={decrement}
            />
            <input
                value={count}
                onChange={countChange}
                className="border-0 text-center fs-5"
                style={{ width: '30px' }}
            />
            <Plus
                className="clickable fs-4"
                onClick={increment}
            />
        </div>
    )
}

export default QuantityCounter