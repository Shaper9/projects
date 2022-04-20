import { createSlice, configureStore } from '@reduxjs/toolkit'

const productsInitialState = { products: [], itemModulIsVisible: false }
const productsSlice = createSlice({
    name: 'product',
    initialState: productsInitialState,
    reducers: {
        setProductItems(state, action) {
            state.products = action.payload
        },
        setItemModulIsVisible(state) {
            state.itemModulIsVisible = !state.itemModulIsVisible
        }
    }
}
)

const cartInitialState = { itemsInCart: [], numberOfItemsInCart: 0 }
const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        addNewItemToCart(state, action) {
            state.itemsInCart.push(action.payload)
            state.numberOfItemsInCart = state.numberOfItemsInCart + 1
        },
        removeItemFromCart(state, action) {
            state.itemsInCart = state.itemsInCart.filter(item => item.id != action.payload.id)
            state.numberOfItemsInCart = state.numberOfItemsInCart - 1
        }
    }
})


const store = configureStore({ reducer: { product: productsSlice.reducer, cart: cartSlice.reducer } })
export const productsActions = productsSlice.actions
export const cartActions = cartSlice.actions


export default store
