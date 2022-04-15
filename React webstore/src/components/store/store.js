import { createSlice, configureStore } from '@reduxjs/toolkit'

const productsInitialState = { products: [] }
const productsSlice = createSlice({
    name: 'product',
    initialState: productsInitialState,
    reducers: {
        setProductItems(state, action) {
            state.products = action.payload
        }
    }
}
)


const store = configureStore({ reducer: { product: productsSlice.reducer } })
export const productsActions = productsSlice.actions


export default store
