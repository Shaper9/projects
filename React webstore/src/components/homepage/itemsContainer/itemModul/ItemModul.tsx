import React from 'react'
import classes from "./ItemModul.module.scss"
import Backdrop from './Backdrop';
import closeIcon from '../../../../img/icon-close.svg'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { productsActions, cartActions } from '../../../store/store.js';


// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import { Pagination } from "swiper";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import Button from '../../../helpers/Button';



const ItemModul: React.FC<{ itemIdThatNeedsToBeShown: number | string }> = (props) => {

    const allItems = useSelector((state: any) => state.product.products)
    const dispatch = useDispatch()
    const itemThatNeedsToBeShown = allItems.filter((item: any) => item.id === props.itemIdThatNeedsToBeShown)
    console.log(itemThatNeedsToBeShown);

    const backdropClickHandler = () => {
        dispatch(productsActions.setItemModulIsVisible())
    }
    const closeIconClickHandler = () => {
        dispatch(productsActions.setItemModulIsVisible())
    }

    const buttonHandler = () => {
        dispatch(cartActions.addNewItemToCart(props.itemIdThatNeedsToBeShown))
    }



    return (
        <React.Fragment>
            <div onClick={backdropClickHandler}><Backdrop /></div>
            <div className={classes.itemCard}>
                <img src={closeIcon} alt="closeIcon" className={classes.closeIcon} onClick={closeIconClickHandler} />
                <Swiper
                    navigation={true}
                    slidesPerView={3}
                    spaceBetween={100}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    className={classes.mySwiper}
                >
                    {itemThatNeedsToBeShown[0].images.map((img: any) =>
                        <SwiperSlide><img src={img} alt="imgurl" /></SwiperSlide>
                    )}
                </Swiper>

                <div className={classes.itemModulDetails}>
                    <div className={classes.itemDescriptionWrapper}>
                        <h1>
                            {itemThatNeedsToBeShown[0].title}
                        </h1>
                        <p className={classes.itemDescription}>
                            {itemThatNeedsToBeShown[0].description}
                        </p>
                    </div>
                    <div className={classes.itemStatsWrapper}>
                        <p>
                            In stock left: <b>{itemThatNeedsToBeShown[0].stock}</b>
                        </p>
                        <p>
                            Rating: <b>{itemThatNeedsToBeShown[0].rating}</b>
                        </p>
                        <Button className={classes.toCartButton} onClick={buttonHandler}>Add to cart</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}


export default ItemModul