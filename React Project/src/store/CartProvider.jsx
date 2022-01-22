import React, { useReducer } from 'react';
import CartContext from './cart-context';


const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    switch (action.type) {

        case "ADD":
            const updatedTotalAmount =
                state.totalAmount + action.item.price * action.item.amount;

            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;

            if (existingCartItem) { /*  ovaj if ako item vec postoji */
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {  /*  ovaj selse je ako item ne postoji */
                updatedItems = state.items.concat(action.item);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };

        case "REMOVE":
            const existingCartItemIndex2 = state.items.findIndex((item) => item.id === action.id);
            const existingItem = state.items[existingCartItemIndex2]
            const updatedTotalAmount2 = state.totalAmount - existingItem.price
            let updatedItems2;
            if (existingItem.amount === 1) {  /* ako imamo samo jedan od ovog itema u cartu , izbrisati ga */
                updatedItems2 = state.items.filter(item => item.id !== action.id)
            } else { /*  ako imamo vise od 1 itema u cartu te vrste */
                const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
                updatedItems2 = [...state.items];
                updatedItems2[existingCartItemIndex2] = updatedItem;
            }
            return {
                items: updatedItems2,
                totalAmount: updatedTotalAmount2
            }
    }
    return defaultCartState
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({ type: 'ADD', item: item })
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider;