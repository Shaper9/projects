import React from 'react';
import classes from './ItemCard.module.scss'
import { useDispatch } from 'react-redux';
import { cartActions, productsActions } from '../../../store/store.js';


const ItemCard: React.FC<{ imgSrc: string, price: number, brand: string, itemId: number, wholeItem: any, itemIdThatNeedsToBeShown: any }> = (props) => {

    const dispatch = useDispatch()
    // const cart = useSelector((state: any) => state.cart.itemsInCart)
    const addToCartHandler = () => {
        console.log(props.wholeItem);
        dispatch(cartActions.addNewItemToCart(props.wholeItem))
    }

    const cardClickHandler = () => {
        props.itemIdThatNeedsToBeShown(props.itemId)
        dispatch(productsActions.setItemModulIsVisible())
    }


    return (
        <li className={classes.cardWrapper}>
            <img src={props.imgSrc} alt="productImg" onClick={cardClickHandler} />
            <div className={classes.cardContent}>
                <p onClick={cardClickHandler}>{props.price}$</p>
                <button className={`${classes.iconBtn} ${classes.addBtn}`} onClick={addToCartHandler}>
                    <div className={classes.addIcon}></div>
                    <div className={classes.btnTxt}>Add to cart</div>
                </button>
                <h3 onClick={cardClickHandler}>{props.brand}</h3>
                <p onClick={cardClickHandler}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti molestias quam, sint optio voluptatem eos.</p>
            </div>
        </li>
    )
}

export default ItemCard;