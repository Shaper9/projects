import React, { useEffect, useState } from 'react';
import classes from './ItemsContainer.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../../store/store.js';
import ItemCard from './itemCard/ItemCard';
import ItemModul from './itemModul/ItemModul';
import MoonLoader from "react-spinners/MoonLoader";
import PageSwitcher from './pageSwitcher/PageSwitcher';

const ItemsContainer: React.FC<{ activePage?: number }> = () => {

    const dispatch = useDispatch()
    const products = useSelector((state: any) => state.product.products)
    const isModulVisible = useSelector((state: any) => state.product.itemModulIsVisible)
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

    const [itemThatNeedsToBeShown, setItemThatNeedsToBeShown] = useState<number | string>('')
    const itemIdThatNeedsToBeShownHandler = (itemId: number) => {
        setItemThatNeedsToBeShown(itemId)
    }

    return (
        <div className={classes.itemsContainerWrapper}>
            {isModulVisible && <ItemModul itemIdThatNeedsToBeShown={itemThatNeedsToBeShown} />}
            <div className={classes.itemsContainerWall}>
                {loading && <div className={classes.spinnerWrapper}>
                    <MoonLoader />
                </div>}
                {!loading && products.map((product: any) => <ItemCard key={product.id} imgSrc={product.thumbnail} price={product.price} brand={product.brand} wholeItem={product} itemId={product.id} itemIdThatNeedsToBeShown={itemIdThatNeedsToBeShownHandler} />)}
            </div>
            <PageSwitcher activePage={changeActivePageHandler} />
        </div>
    )
}

export default ItemsContainer