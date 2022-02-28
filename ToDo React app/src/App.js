import { gsap } from "gsap"
import classes from './App.module.scss'
import React, { useEffect, useState, useRef } from "react";
import ToDoForm from './components/ToDoForm';
import ToDoList from "./components/ToDoList";



function App() {

  const [dummyToDo, setDummyToDo] = useState(null)
  const pageWrapperRef = useRef()

  useEffect(() => {
    const rawData = window.localStorage.getItem('toDos')
    const data = JSON.parse(rawData) || []
    setDummyToDo(data)

    // Page enterence Animation
    gsap.fromTo(pageWrapperRef.current, { opacity: 0, y: 3000 }, { opacity: 1, y: 0, duration: 0.250 })
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

  const finishedHandler = (user) => {
    dummyToDo.map((toDo) => {
      if (toDo.id === user.id) {
        toDo.finished = true
        return window.localStorage.setItem('toDos', JSON.stringify(dummyToDo)) // Should use useEffect but....
      }
    })
    return setDummyToDo((prevDummyToDo) => {
      return [...prevDummyToDo] // Make page re-render to make changes visible instant, there is other way
    })
  }


  return (

    <div className={classes.pageWrapper} ref={pageWrapperRef}>
      <ToDoForm newUser={addNewUserHandler} />
      <ToDoList toDo={dummyToDo} filteredUsers={usersFilter} filteredId={finishedHandler} />
    </div>

  )
}

export default App;
