import { useState, useContext, useEffect } from "react";
import { Plus, Dash } from "react-bootstrap-icons";
import { Toast } from "react-bootstrap";
import Ctx from "../../ctx";

const QuantityCounter = ({ data, id, noDelete = false }) => {
    const { basket, setBasket, baseData, getWordEnding } = useContext(Ctx)
    const prodInBasket = basket.find((el) => el.id === id)

    const ids = basket.map((b) => b.id)
    const cntInWarehouse = baseData.filter((el) => ids.includes(el._id))[0]?.stock

    const initialCount = prodInBasket ? prodInBasket.cnt : 0
    const [count, setCount] = useState(initialCount)
    const [showNotification, setShowNotification] = useState(false)

    useEffect(() => {
        setCount(initialCount)
    }, [initialCount])

    const increment = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (prodInBasket && prodInBasket.cnt) {
        setBasket((prev) =>
            prev.map((el) => {
                if(el.cnt<cntInWarehouse){
                    setShowNotification(true);
                }
            if (el.id === id && el.cnt < cntInWarehouse) {
                setCount((prevCount) => prevCount + 1)
                el.cnt++
            }
            return el;
            })
        );
        } else {
        
        setCount((prevCount) => prevCount + 1)
        setBasket((prev) => [
            ...prev,
            {
            id,
            price: data.price,
            discount: data.discount,
            cnt: 1,
            },
        ]);
        }
    };

    const decrement = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (prodInBasket && count > 1) {
            setCount((prevCount) => prevCount - 1);
            setBasket((prev) =>
                prev.map((el) => {
                if (el.id === id) {
                    el.cnt--
                }
                return el
                })
        )
        } else if (count === 1 && !noDelete) {
            setCount((prevCount) => prevCount - 1)
            setBasket((prev) => prev.filter((el) => el.id !== id))
        }
    };

    const countChange = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const newCount = parseInt(event.target.value)
        if (isNaN(newCount) || (newCount <= 0 && !noDelete)) {
            setCount(0);
            setBasket((prev) => prev.filter((el) => el.id !== id))
        } else if (newCount >= cntInWarehouse) {
            setBasket((prev) =>
                prev.map((el) => {
                if (el.id === id) {
                    el.cnt = cntInWarehouse
                }
                return el
                })
            )
            setShowNotification(true)
        } else {
            if (prodInBasket) {
                setBasket((prev) =>
                    prev.map((el) => {
                        if (el.id === id) {
                        el.cnt = newCount;
                        }
                        return el;
                    })
                )
            } else {
                setBasket((prev) => [
                    ...prev,
                    {
                        id,
                        price: data.price,
                        discount: data.discount,
                        cnt: newCount,
                    },
                ])
        }
        setCount(newCount)
        }
    };

    const decrementClass = count === 0 ? "disabled" : "clickable"
    const incrementClass = count >= cntInWarehouse ? "disabled" : "clickable"

    const handleNotificationClose = () => {
        setShowNotification(false)
    }

    return <>
        <div
            className="d-flex h-100 w-100 align-items-center justify-content-evenly border rounded-pill position-relative"
            style={{ maxHeight: "40px", maxWidth: "100px" }}
        >
            <Dash className={`${decrementClass} fs-4`} onClick={decrement}/>
            <input
                value={count}
                onChange={countChange}
                className="border-0 text-center fs-5"
                style={{ width: "30px" }}
            />
            <Plus className={`${incrementClass} fs-4`} onClick={increment}/>
            <Toast 
                show={showNotification} 
                onClose={handleNotificationClose}
                delay={1800}
                autohide
                style={{
                    position: "absolute",
                    bottom: "120%",
                    left: "90%",
                    zIndex: 1,
                    width: "140px",
                    maxWidth: "none",
                    border: "none"
                }}
            >
                <Toast.Body className="text-center fw-bold text-danger">
                    В наличии всего {cntInWarehouse} {getWordEnding(cntInWarehouse, "товар")} !
                </Toast.Body>
            </Toast>
        </div>
    </>
}

export default QuantityCounter