import React from 'react';
import Navbar from '../homepage/navbar/Navbar';
import Footer from '../homepage/footer/Footer';
import classes from './CartPage.module.scss'
import Button from '../helpers/Button';
import CartPageItem from './cartPageItem/CartPageItem';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store/store';


const CartPage: React.FC = () => {

    const dispatch = useDispatch()
    const allItemsInCart = useSelector((state: any) => state.cart.itemsInCart)
    console.log(allItemsInCart);
    let initialSubtotal = 0
    // @ts-ignore
    const subtotalCost = allItemsInCart.map((item: any) => initialSubtotal = initialSubtotal + item.price)

    const checkoutHandler = () => {
        console.log('checkout');
    }

    const removeItemHandler = (id: number) => {
        // console.log(id);
        const itemThatNeedsToBeRemoved = allItemsInCart.find((item: any) => item.id === id)
        dispatch(cartActions.removeItemFromCart(itemThatNeedsToBeRemoved))
    }


    return (
        <>
            <Navbar />
            <div className={classes.cartPageWrapper}>
                <div className={classes.cartPageWall}>
                    <div className={classes.cartItemsWrapper}>
                        <h1>MY CART</h1>
                        <div className={classes.itemsContainer}>
                            <div className={classes.tableTop}>
                                <span>PRODUCT</span>
                                <span>ITEMS PRICE</span>
                            </div>
                            <div className={classes.items}>
                                <ul>
                                    {allItemsInCart?.map((item: any) => <CartPageItem key={item.id} itemTitle={item.title} itemBrand={item.brand} itemCategory={item.category} itemId={item.id} itemPrice={item.price} itemRating={item.rating} itemImg={item.thumbnail} itemIdThatNeedsToBeRemoved={removeItemHandler} />)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={classes.orderDetailsWrapper}>
                        <h2>SUMMARY</h2>
                        <div className={classes.details}>
                            <div className={classes.detailsTitles}>
                                <span>SUBTOTAL:</span>
                                <span>Shipping:</span>
                                <span>Sales Tax:</span>
                            </div>
                            <div className={classes.detailsNumbers}>
                                <span><b>${initialSubtotal}</b></span>
                                <span>TBD</span>
                                <span>TBD</span>
                            </div>
                        </div>
                        <Button className={classes.checkoutButton} onClick={checkoutHandler}>CHECKOUT</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CartPage;