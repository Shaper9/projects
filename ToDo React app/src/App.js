import { gsap } from "gsap"
import classes from './App.module.scss'
import React, { useState } from "react";
import ToDoForm from './components/ToDoForm';
import ToDoList from "./components/ToDoList";



function App() {

  const [dummyToDo, setDummyToDo] = useState([
    {
      id: (Math.random()).toString(),
      activity: 'Wake up',
      date: '2022-02-12',
      type: 'Free time'

    },
  ])


  const addNewUserHandler = (newUser) => {
    setDummyToDo((prevDummyToDo) => {
      return [...prevDummyToDo, newUser]
    })
  }

  const usersFilter = (users) => {
    setDummyToDo(users)
  }

  return (

    <div className={classes.pageWrapper}>
      <ToDoForm newUser={addNewUserHandler} />
      <ToDoList toDo={dummyToDo} filteredUsers={usersFilter} />
    </div>

  )
}

export default App;
