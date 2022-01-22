import React, { useContext, useEffect, useState } from "react";
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCardButton.module.css'
import CartContext from "../../store/cart-context";


const HeaderCardButton = props => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)

    const { items } = cartCtx

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    // Use effect koristimo za bump effel, tj. da dodamo klasu classes.bump
    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return
        } else {
            setBtnIsHighlighted(true);
        }

        setTimeout(() => { setBtnIsHighlighted(false) }, 200)

    }, [items]) /* ovaj use effect ce se odraditi samo kad se items iz contexta promeni  */


    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCardButton;