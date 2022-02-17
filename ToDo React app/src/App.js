import { gsap } from "gsap"
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

  return (
    <React.Fragment>
      <ToDoForm newUser={addNewUserHandler} />
      <ToDoList toDo={dummyToDo} />
    </React.Fragment>

  )
}

export default App;
