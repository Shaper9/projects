import React from 'react';
import ToDo from './ToDo';

const ToDoList = (props) => {
    return (
        <React.Fragment>
            {props.toDo.map(toDo => <ToDo key={toDo.id} activity={toDo.activity} date={toDo.date} type={toDo.type} id={toDo.id} allUsers={props.toDo} filteredUsers={props.filteredUsers} ></ToDo>)}
        </React.Fragment>
    )
}

export default ToDoList;