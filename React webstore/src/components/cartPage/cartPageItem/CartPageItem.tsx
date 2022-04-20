import React from 'react';
import classes from './CartPageItem.module.scss'

interface props {
    itemTitle: string,
    itemBrand: string,
    itemCategory: string,
    itemId: number,
    itemPrice: number,
    itemRating: number,
    itemImg: string,
    itemIdThatNeedsToBeRemoved: (id: number) => void
}

const CartPageItem: React.FC<props> = (props) => {

    const removeHandler = () => {
        props.itemIdThatNeedsToBeRemoved(props.itemId)
    }

    return (
        <li className={classes.itemWrapper}>
            <div className={classes.itemImg}>
                <img src={props.itemImg} alt="productimg" />
            </div>
            <div className={classes.itemDetails}>
                <h2>{props.itemTitle}</h2>
                <p>Item ID: {props.itemId}</p>
                <p>Category: {props.itemCategory}</p>
                <p>Items Rating: {props.itemRating}</p>
                <button onClick={removeHandler}>REMOVE</button>
            </div>
            <span >
                ${props.itemPrice}
            </span>
        </li>
    )
}

export default CartPageItem;