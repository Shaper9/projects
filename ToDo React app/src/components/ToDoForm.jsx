import React, { useRef, useState } from 'react';
import Button from './helpers/Button';

const ToDoForm = (props) => {


    const activityRef = useRef();
    const dateRef = useRef();
    const typeRef = useRef()

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
        return props.newUser(newUser)
    }

    return (
        <React.Fragment>
            <p>To do list</p>
            <form>
                <input type="text" name='name' placeholder='Enter your activity here' ref={activityRef} />
                <label htmlFor="date" >When do you need to do this activity:</label>
                <input type="text" name='date' type='date' ref={dateRef} />

                <label htmlFor="type">What type of activity:</label>
                <select name="type" id="type" ref={typeRef}>
                    <option value="Job" name='Job'>Job</option>
                    <option value="Hobby" name='Hobby'>Hobby</option>
                    <option value="Free-time" name='Free-Time'>Free time</option>
                </select>
                <Button handleSubmit={submitHandler}>SUBMIT</Button>
            </form>
        </React.Fragment>
    )
}

export default ToDoForm;