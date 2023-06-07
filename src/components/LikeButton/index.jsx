import React, { useState, useContext, useEffect } from "react"
import { SuitHeart, SuitHeartFill } from "react-bootstrap-icons"
import "./style.css"

import Ctx from "../../ctx"

const LikeButton = ({ likes, _id, textRight=false }) => {
    const { setBaseData, api, userId } = useContext(Ctx)
    const [isLike, setIsLike] = useState(likes.includes(userId))
    // const [likeFlag, setLikeFlag] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // const likeHandler = () => {
    //     setIsLike(!isLike)
    //     setLikeFlag(true)
    //     setBaseData((old) =>
    //     old.map((el) => {
    //         if (el._id === _id) {
    //         isLike
    //             ? (el.likes = el.likes.filter((lk) => lk !== userId))
    //             : el.likes.push(userId)
    //         }
    //         return el
    //     })
    //     )
    // }
    const likeHandler = (newState) => {
        setIsLike(newState)
        api.setLike(_id, newState).then((data) => {
            // setLikeFlag(false);
            api.getProducts().then((newData) => {
                setBaseData(newData.products)
            })
        })
        }
    }, [isLike])

    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <span
            onClick={() => {likeHandler(!isLike)}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{zIndex: "1", cursor: "pointer", position: "relative"}}
        >
            {isLike ? (
                <SuitHeartFill color={isHovered ? "black" : "red"} />
            ) : (
                <SuitHeart color={isHovered ? "black" : "red"} />
            )}
            {textRight && 
                <span className={`ms-2 ${isHovered ? 'hovered-text' : ''}`}>
                    {textRight}
                </span>}
        </span>
    )
}

export default LikeButton