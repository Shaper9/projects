import React from 'react';
import ToDo from './ToDo';
import classes from './ToDoList.module.scss'

const ToDoList = (props) => {

    let allUsers = props.toDo

    const finishedHandler = (id) => {
        const filteredId = allUsers.find((toDo) => {
            return toDo.id === id
        })
        props.filteredId(filteredId)
    }


    return (
        <div className={classes.toDoListWrapper}>
            {props.toDo && props.toDo.map(toDo => <ToDo key={toDo.id} activity={toDo.activity} date={toDo.date} type={toDo.type} id={toDo.id} allUsers={props.toDo} filteredUsers={props.filteredUsers} isFinished={toDo.finished} isFinishedHandler={finishedHandler} isFinishedId></ToDo>)}
        </div>
    )
}

export default ToDoList;