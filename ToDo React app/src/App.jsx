import { gsap } from "gsap"
import classes from './App.module.scss'
import React, { useEffect, useState, useRef, useContext, useCallback } from "react";
import ToDoForm from './components/ToDoForm';
import ToDoList from "./components/ToDoList";

import AuthContext from './components/context/AuthContext'
import useFetch from "./components/hooks/use-fetch";

import { Routes, Route } from 'react-router-dom'
import Pages from "./components/pages/Pages";



function App() {

  const [dummyToDo, setDummyToDo] = useState(null)
  const pageWrapperRef = useRef()

  useEffect(() => {
    const getDataFunc = (data) => {
      // console.log(data);
      const fetchedTodos = []
      for (const key in data) {
        fetchedTodos.push(data[key])
        // console.log(Object.keys(data));
        data[key].id = key
      }
      setDummyToDo(fetchedTodos)

      // console.log(Object.keys(data));
    }
    sendRequest({ url: 'https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/todo.json' }, getDataFunc)



    // Page enterence Animation
    gsap.fromTo(pageWrapperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.500 })
  }, []);


  const [postHook, setPostHook] = useState("no data")
  const addNewUserHandler = (newToDo) => {
    setDummyToDo((prevDummyToDo) => {
      return [...prevDummyToDo, newToDo]
    })

    // Post request for new todo

    const funcPostData = (data) => {
      setPostHook(data)
      newToDo.id = data.name // setting firebase ID 
    }
    sendRequest({ url: 'https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/todo.json', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: newToDo }, funcPostData)
  }

  const usersFilter = (users) => {
    setDummyToDo(users)
  }

  const finishedHandler = (finishedUser) => {
    const updateDataFunc = (data) => {
      console.log(data);
    }
    dummyToDo.map((toDo) => {
      if (toDo.id === finishedUser.id) {
        sendRequest({ url: `https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/todo/${finishedUser.id}.json`, method: "PUT", headers: { 'Content-Type': 'application/json' }, body: { activity: finishedUser.activity, date: finishedUser.date, id: finishedUser.id, type: finishedUser.type, finished: true } }, updateDataFunc)
      }
    })

    dummyToDo.map((todo) => {
      if (todo.id === finishedUser.id) {
        return todo.finished = true
      }
    })

    // ID return reposnse
    setDummyToDo(prevDummyToDo => {
      return [...prevDummyToDo]
    })
  }

  const ctx = useContext(AuthContext)

  // *************************************************** CUSTOM HOOK ***************************************************************
  const { isLoading: isFetchLoading, error, sendRequest } = useFetch()  // vadimo ceo return iz custom hooka
  // *******************************************************************************************************************************

  return (
    <div className={classes.pageWrapper} ref={pageWrapperRef}>
      <ToDoForm newUser={addNewUserHandler} />
      <ToDoList toDo={dummyToDo} filteredUsers={usersFilter} filteredId={finishedHandler} />
      <button onClick={ctx.isLoggedInHandler}>context test</button>
      {ctx.isLoggedIn && <div>radi</div>}

      <Pages />
    </div>
  )
}

export default App;
