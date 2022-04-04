import React from 'react';
import LoginButton from './auth0/LoginButton';
// @ts-ignore
import classes from "./LoginCard.module.scss"


const LoginCard: React.FC = () => {

    return (
        <div className={classes.loginWrapper}>
            <div className={classes.card__container}>
                <div className={classes.card}>
                    <div className={classes.card__content}>
                        <h3 className={classes.card__header}>WELCOME</h3>
                        <p className={classes.card__info}>You need to be logged in to continue using this app :(</p>
                        <LoginButton className={classes.card__button} />
                    </div>
                </div>
            </div>
        </div>)
}


export default LoginCard;