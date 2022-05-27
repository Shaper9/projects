import React from "react";
import HeaderCardButton from "./HeaderCardButton";
import mealsImage from "../../assets/meals.jpg" // moze import slike
import classes from './Header.module.css';

const Header = props => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCardButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='mealsimg' />
            </div>
        </React.Fragment>)
}

export default Header;