import React, { useState, useContext, useEffect } from "react";
import { SuitHeart, SuitHeartFill } from "react-bootstrap-icons";
import Ctx from "../../ctx";

const LikeButton = ({ likes, _id }) => {
    const { setBaseData, api, userId } = useContext(Ctx);
    const [isLike, setIsLike] = useState(likes.includes(userId));
    const [likeFlag, setLikeFlag] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const likeHandler = () => {
        setIsLike(!isLike);
        setLikeFlag(true);
        setBaseData((old) =>
        old.map((el) => {
            if (el._id === _id) {
            isLike
                ? (el.likes = el.likes.filter((lk) => lk !== userId))
                : el.likes.push(userId);
            }
            return el;
        })
        );
    };

    useEffect(() => {
        if (likeFlag) {
        api.setLike(_id, isLike).then((data) => {
            setLikeFlag(false);
            api.getProducts().then((newData) => {
            setBaseData(newData.products);
            });
        });
        }
    }, [isLike]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <span
        
        onClick={likeHandler}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        {isLike ? (
            <SuitHeartFill color={isHovered ? "black" : "red"} />
        ) : (
            <SuitHeart color={isHovered ? "black" : "red"} />
        )}
        </span>
    );
};

export default LikeButton;