import React from 'react';
import classes from './ItemCard.module.scss'

const ItemCard: React.FC<{ imgSrc: string, price: number, brand: string, key: number }> = (props) => {
    return (
        <li className={classes.cardWrapper}>
            <img src={props.imgSrc} alt="productImg" />
            <div className={classes.cardContent}>
                <p>{props.price}$</p>
                <button className={`${classes.iconBtn} ${classes.addBtn}`}>
                    <div className={classes.addIcon}></div>
                    <div className={classes.btnTxt}>Buy</div>
                </button>
                <h3>{props.brand}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti molestias quam, sint optio voluptatem eos.</p>
            </div>
        </li>
    )
}

export default ItemCard;