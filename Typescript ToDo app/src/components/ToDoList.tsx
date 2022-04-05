import React from 'react';
import ToDo from './ToDo';
// @ts-ignore
import classes from './ToDoList.module.scss'

interface ToDoUser {
    id?: string | any;
    activity: string;
    date: string;
    type: string;
    finished: boolean
}

const ToDoList: React.FC<{ toDo: ToDoUser[] | undefined, filteredId: (finishedUser: ToDoUser | any) => void, filteredUsers: (user: ToDoUser[]) => void, loggedInUser: string | undefined, updatedToDo: any }> = (props) => {

    let allUsers = props.toDo

    const finishedHandler = (id: string) => {
        const filteredId = allUsers?.find((toDo) => {
            return toDo.id === id
        })
        props.filteredId(filteredId)
    }


    return (
        <div className={classes.toDoListWrapper}>
            {props.toDo && props.toDo.map(toDo => <ToDo key={toDo.id} activity={toDo.activity} date={toDo.date} type={toDo.type} id={toDo.id} allUsers={props.toDo} filteredUsers={props.filteredUsers} isFinished={toDo.finished} isFinishedHandler={finishedHandler} loggedInUser={props.loggedInUser} updatedToDo={props.updatedToDo}></ToDo>)}
        </div>
    )
}

export default ToDoList;