import React, { useEffect, useState } from 'react';
import classes from './ItemsContainer.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../store/store';
import ItemCard from './itemCard/ItemCard';
import MoonLoader from "react-spinners/MoonLoader";
import PageSwitcher from './pageSwitcher/PageSwitcher';

const ItemsContainer: React.FC<{ activePage?: number }> = () => {

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

    const changeActivePageHandler = (activePage: number) => {
        async function fetchProducts(activePage = 0) {
            try {
                setLoading(true)
                const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${activePage}0`)
                const data = await response.json()
                dispatch(productsActions.setProductItems(data.products))
                setLoading(false)
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        }

        if (activePage === 1) {
            fetchProducts()
        } else if (activePage === 2) {
            fetchProducts(2)
        } else if (activePage === 3) {
            fetchProducts(3)
        } else if (activePage === 4) {
            fetchProducts(4)
        }
    }



    return (
        <div className={classes.itemsContainerWrapper}>
            <div className={classes.itemsContainerWall}>
                {loading && <div className={classes.spinnerWrapper}>
                    <MoonLoader />
                </div>}
                {!loading && products.map((product: any) => <ItemCard key={product.id} imgSrc={product.thumbnail} price={product.price} brand={product.brand} wholeItem={product} />)}
            </div>
            <PageSwitcher activePage={changeActivePageHandler} />
        </div>
    )
}

export default ItemsContainer