import React, { useRef, useEffect, useState } from "react";
import classes from './ToDo.module.scss'
import Button from "./helpers/Button";
import { gsap } from 'gsap';


const ToDo = (props) => {

    const toDoRef = useRef();
    const btnref = React.createRef();

    // const timeline = gsap.timeline({ defaults: { duration: 0.75 } })
    // useEffect(() => {
    //     timeline.fromTo(toDoRef.current, { x: -1500 }, { x: 0, duration: 1, ease: "bounce.out" })
    //     timeline.fromTo(btnref.current, { x: 2000 }, { x: 0 }, "<20%")
    // }, []);

    const allUsers = props.allUsers
    const currentUserId = props.id

    // console.log(filteredUsers);
    const removeHandler = () => {
        const newFilterUsers = allUsers.filter((user) => {
            return user.id !== currentUserId
        })
        props.filteredUsers(newFilterUsers)
    }


    return (
        <React.Fragment>
            <li className={classes.toDo} ref={toDoRef}>
                <p>You need to: {props.activity}</p>
                <p>Date of activity: {props.date}</p>
                <p>Type of activity: {props.type}</p>
            </li>
            <Button ref={btnref} handleClick={removeHandler}>REMOVE</Button>
        </React.Fragment>
    )
}

export default ToDo;