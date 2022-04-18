import React from 'react';
import classes from './ItemCard.module.scss'
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/store';
import ItemModul from '../itemModul/ItemModul';

const ItemCard: React.FC<{ imgSrc: string, price: number, brand: string, key: number, wholeItem: any }> = (props) => {

    const dispatch = useDispatch()
    // const cart = useSelector((state: any) => state.cart.itemsInCart)
    const addToCartHandler = () => {
        console.log(props.wholeItem);
        dispatch(cartActions.addNewItemToCart(props.wholeItem))
    }


    return (
        <li className={classes.cardWrapper}>
            <ItemModul />
            <img src={props.imgSrc} alt="productImg" />
            <div className={classes.cardContent}>
                <p>{props.price}$</p>
                <button className={`${classes.iconBtn} ${classes.addBtn}`} onClick={addToCartHandler}>
                    <div className={classes.addIcon}></div>
                    <div className={classes.btnTxt}>Add to cart</div>
                </button>
                <h3>{props.brand}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti molestias quam, sint optio voluptatem eos.</p>
            </div>
        </li>
    )
}

export default ItemCard;