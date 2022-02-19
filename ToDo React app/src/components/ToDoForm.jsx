import React, { useRef, useState } from 'react';
import Button from './helpers/Button';
import classes from './ToDoForm.module.scss'
import { gsap } from 'gsap'

const ToDoForm = (props) => {


    const activityRef = useRef();
    const dateRef = useRef();
    const typeRef = useRef()
    const btnRef = React.createRef()

    const newUserHandler = (activity, date, type) => {
        return {
            id: (Math.random()).toString(),
            activity: activity,
            date: date,
            type: type
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const newUser = newUserHandler(activityRef.current.value, dateRef.current.value, typeRef.current.value)

        // animation
        let tml = gsap.timeline({ defaults: { duration: 0.50 } })
        tml.to(btnRef.current, { scaleX: 2, scaleY: 0.8 })
        tml.to(btnRef.current, { scale: 1, scaleY: 1, ease: "elastic.out(1, 0.2)" })


        return props.newUser(newUser)
    }

    return (
        <React.Fragment>
            <div className={classes.toDoWrapper}>
                <p className={classes.formTitle}>To do list</p>
                <form className={classes.toDoForm}>
                    <input type="text" name='name' placeholder='Enter your activity here' ref={activityRef} />
                    <label htmlFor="date" >When do you need to do this activity:</label>
                    <input type="text" name='date' type='date' ref={dateRef} />

                    <label htmlFor="type">What type of activity:</label>
                    <select name="type" id="type" ref={typeRef}>
                        <option value="Job" name='Job'>Job</option>
                        <option value="Hobby" name='Hobby'>Hobby</option>
                        <option value="Free-time" name='Free-Time'>Free time</option>
                    </select>
                    <Button handleClick={submitHandler} className={classes.btn} ref={btnRef}>SUBMIT</Button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default ToDoForm;