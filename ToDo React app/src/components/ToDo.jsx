import React from "react";
import classes from './ToDo.module.scss'

const ToDo = (props) => {


    return (
        <li className={classes.toDo}>
            <p>You need to: {props.activity}</p>
            <p>Date of activity: {props.date}</p>
            <p>Type of activity: {props.type}</p>
        </li>
    )
}

export default ToDo;