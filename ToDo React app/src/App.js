import { gsap } from "gsap"
import classes from './App.module.scss'
import React, { useEffect, useState } from "react";
import ToDoForm from './components/ToDoForm';
import ToDoList from "./components/ToDoList";



function App() {

  const [dummyToDo, setDummyToDo] = useState(null)

  useEffect(() => {
    const rawData = window.localStorage.getItem('toDos')
    const data = JSON.parse(rawData) || []
    setDummyToDo(data)
  }, []);

  useEffect(() => {
    window.localStorage.setItem('toDos', JSON.stringify(dummyToDo))
  }, [dummyToDo])

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
