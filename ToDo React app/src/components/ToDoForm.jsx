import React, { useRef, useState } from 'react';
import Button from './helpers/Button';
import classes from './ToDoForm.module.scss'
import ErrorMessage from './helpers/ErrorMessage';
import Backdrop from './helpers/Backdrop';
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
            type: type,
            finished: false
        }
    }

    const [isValid, setIsValid] = useState(true)
    const errorHandler = (error) => {
        setIsValid(error);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (activityRef.current.value.length === 0 || activityRef.current.value.length > 15 || dateRef.current.value == "") {
            activityRef.current.value = ''
            return setIsValid(false)
        }

        const newUser = newUserHandler(activityRef.current.value, dateRef.current.value, typeRef.current.value)

        // animation
        let tml = gsap.timeline({ defaults: { duration: 0.50 } })
        tml.to(btnRef.current, { scaleX: 2, scaleY: 0.8 })
        tml.to(btnRef.current, { scale: 1, scaleY: 1, ease: "elastic.out(1, 0.2)" })

        activityRef.current.value = ""
        dateRef.current.value = ""

        // console.log(newUser);

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
            {/* Error message */}
            {!isValid && <ErrorMessage errorHandler={errorHandler} />}
            {!isValid && <Backdrop />}
        </React.Fragment>
    )
}

export default ToDoForm;