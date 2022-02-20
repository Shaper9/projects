import React from 'react';
import ToDo from './ToDo';
import classes from './ToDoList.module.scss'

const ToDoList = (props) => {
    return (
        <div className={classes.toDoListWrapper}>
            {props.toDo && props.toDo.map(toDo => <ToDo key={toDo.id} activity={toDo.activity} date={toDo.date} type={toDo.type} id={toDo.id} allUsers={props.toDo} filteredUsers={props.filteredUsers} ></ToDo>)}
        </div>
    )
}

export default ToDoList;