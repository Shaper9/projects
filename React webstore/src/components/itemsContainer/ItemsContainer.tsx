import React, { useEffect, useState } from 'react';
import classes from './ItemsContainer.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../store/store';
import ItemCard from './itemCard/ItemCard';
import MoonLoader from "react-spinners/MoonLoader";


const ItemsContainer: React.FC = () => {

    const dispatch = useDispatch()
    const products = useSelector((state: any) => state.product.products)
    const [loading, setLoading] = useState(false)
    async function fetchProducts() {
        try {
            setLoading(true)
            const response = await fetch('https://dummyjson.com/products?limit=10')
            const data = await response.json()
            dispatch(productsActions.setProductItems(data.products))
            setLoading(false)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])


    console.log(products);

    return (
        <div className={classes.itemsContainerWrapper}>
            <div className={classes.itemsContainerWall}>
                {loading && <MoonLoader />}
                {products.map((product: any) => <ItemCard key={product.id} imgSrc={product.thumbnail} price={product.price} brand={product.brand} />)}

            </div>
        </div>
    )
}

export default ItemsContainer