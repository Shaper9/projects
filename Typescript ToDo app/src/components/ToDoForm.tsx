import React, { useRef, useState } from 'react';
// @ts-ignore
import Button from './helpers/Button.tsx';
// @ts-ignore
import classes from './ToDoForm.module.scss'
import ErrorMessage from './helpers/ErrorMessage';
import Backdrop from './helpers/Backdrop';
import { gsap } from 'gsap'




const ToDoForm: React.FC<{ newUser: (user: { id?: string, activity: string, date: string, type: string, finished: boolean }) => void }> = (props) => {

    const activityRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null)
    const btnRef = React.createRef<HTMLButtonElement>()

    const newUserHandler = (activity: string, date: string, type: string) => {
        return {
            // iD???
            activity: activity,
            date: date,
            type: type,
            finished: false
        }
    }

    const [isValid, setIsValid] = useState<string | boolean>(true)
    const errorHandler = (error: string) => {
        setIsValid(error);
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (activityRef.current!.value.length === 0 || activityRef.current!.value.length > 15 || dateRef.current!.value == "") {
            activityRef.current!.value = ''
            return setIsValid(false)
        }

        const newUser = newUserHandler(activityRef.current!.value, dateRef.current!.value, typeRef.current!.value)

        // animation
        let tml = gsap.timeline({ defaults: { duration: 0.50 } })
        tml.to(btnRef.current, { scaleX: 2, scaleY: 0.8 })
        tml.to(btnRef.current, { scale: 1, scaleY: 1, ease: "elastic.out(1, 0.2)" })

        activityRef.current!.value = ""
        dateRef.current!.value = ""

        return props.newUser(newUser)
    }

    return (
        <React.Fragment>
            <div className={classes.toDoWrapper}>
                <p className={classes.formTitle}>ToDo maker</p>
                <form className={classes.toDoForm}>
                    <input type="text" name='name' placeholder='Enter your activity here' ref={activityRef} className={classes.input} />
                    <label htmlFor="date" >When do you need to do this activity:</label>
                    <input name='date' type='date' ref={dateRef} className={classes.input} />

                    <label htmlFor="type">What type of activity:</label>
                    <select name="type" id="type" ref={typeRef} className={classes.input}>
                        <option value="Job" >Job</option>
                        <option value="Hobby" >Hobby</option>
                        <option value="Free-time">Free time</option>
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