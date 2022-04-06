import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap"
import LoginButton from './auth0/LoginButton';
// @ts-ignore
import classes from "./LoginCard.module.scss"


const LoginCard: React.FC = () => {


    const cardContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.fromTo(cardContainerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
    }, [])

    return (
        <div className={classes.loginWrapper}>
            <div className={classes.card__container} ref={cardContainerRef}>
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