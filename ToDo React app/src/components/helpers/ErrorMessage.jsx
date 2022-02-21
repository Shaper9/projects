import React, { useRef, useLayoutEffect } from "react";
import Button from "./Button";
import classes from './ErrorMessage.module.scss'
import { gsap } from 'gsap';


const ErrorMessage = (props) => {

    const errorMessageRef = useRef()
    const btnRef = React.createRef()

    useLayoutEffect(() => {
        timeline.fromTo(errorMessageRef.current, { scale: 0 }, { scale: 1, duration: 0.3 })
        timeline.fromTo(btnRef.current, { scale: 0 }, { scale: 1 })
    }, [])


    const mouseEnterHandler = () => {
        gsap.to(btnRef.current, { scaleX: 1.3, scaleY: 1.5, ease: "elastic.out(1, 0.3)" })
    }
    const mouseLeaveHandler = () => {
        gsap.to(btnRef.current, { scaleX: 1, scaleY: 1, ease: "elastic.out(1, 0.2)", duration: 1 })
    }


    const timeline = gsap.timeline({ defaults: { duration: 0.75 } })

    const errorHandler = () => {
        timeline.to(errorMessageRef.current, { y: 80, ease: "bounce.out" })
        timeline.to(errorMessageRef.current, { y: -2000 })
        setTimeout(() => {
            props.errorHandler(true)
        }, 1000);
    }


    return (< div ref={errorMessageRef} className={classes.errorWrapper} >
        <p>Input is invalid <br />
            Please try again</p>
        <Button ref={btnRef} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} handleClick={errorHandler}>OK</Button>
    </div >)
}


export default ErrorMessage;