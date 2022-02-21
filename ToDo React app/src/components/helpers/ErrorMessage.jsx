import React from "react";
import Button from "./Button";
import classes from './ErrorMessage.module.scss'


const ErrorMessage = (props) => {

    const errorHandler = () => {
        props.errorHandler(true)
    }


    return (< div className={classes.errorWrapper} >
        <p>Input is invalid <br />
            Please try again</p>
        <Button handleClick={errorHandler}>OK</Button>
    </div >)
}


export default ErrorMessage;