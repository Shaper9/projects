import { gsap } from "gsap"
// @ts-ignore
import classes from './App.module.scss'
import React, { useEffect, useState, useRef } from "react";
import ToDoForm from './components/ToDoForm';
import ToDoList from "./components/ToDoList";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { Routes, Route } from 'react-router-dom'

import useFetch from "./components/hooks/use-fetch";

import LoginCard from "./components/LoginCard";
import LogoutButton from "./components/auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";


const App: React.FC<{ filteredId: string }> = () => {


  const { user, isAuthenticated, isLoading } = useAuth0()

  interface ToDo {
    id?: string;
    activity: string;
    date: string;
    type: string;
    finished: boolean
  }

  const [dummyToDo, setDummyToDo] = useState<ToDo[]>([])
  const pageWrapperRef = useRef<HTMLDivElement>(null)

  interface loggedInUserObject {
    email: string;
    id: string;
    password: string;
    todo: any
  }

  let ovoJeLoggedUser: loggedInUserObject;


  const gotData = async () => {
    await sendRequest({ url: "https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/people/accounts.json" }, gotDataFunc)

    await sendRequest({ url: `https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/people/accounts/${ovoJeLoggedUser?.id}/todo.json` }, gotLoggedTodos)
  }

  const [loggedInUser, setLoggedInUser] = useState<loggedInUserObject | null>(null)
  const gotDataFunc = (data: any) => {
    const allUsers = []
    for (const key in data) {
      allUsers.push(data[key])
      data[key].id = key
    }

    ovoJeLoggedUser = allUsers.find((findUser: any) => findUser.email == user?.email)
    if (ovoJeLoggedUser === undefined) {
      // @ts-ignore
      ovoJeLoggedUser = { email: user?.email }
      sendRequest({ url: `https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/people/accounts.json`, method: 'POST', headers: { 'Content-Type': 'application/json' }, body: { email: user?.email } }, addedNewUserFetchFunc)



    } else {
      setLoggedInUser(ovoJeLoggedUser)
    }
  }

  const addedNewUserFetchFunc = (data: any) => {
    ovoJeLoggedUser.id = data.name
    setLoggedInUser(ovoJeLoggedUser)
  }

  let fetchedTodos: any = []
  const gotLoggedTodos = (data: any) => {
    for (const key in data) {
      fetchedTodos.push(data[key])
      data[key].id = key
    }

    setDummyToDo(fetchedTodos)
  }
  useEffect(() => {

    gotData()

    // Page enterence Animation
    gsap.fromTo(pageWrapperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.500 })
  }, [isAuthenticated]);



  const addNewUserHandler = (newToDo: ToDo) => {
    setDummyToDo((prevDummyToDo: ToDo[]) => {
      return [...prevDummyToDo, newToDo]
    })


    // Post request for new todo

    const funcPostData = (data: { name: string }) => {
      // setPostHook(data)
      newToDo.id = data.name // setting firebase ID 
    }

    sendRequest({ url: `https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/people/accounts/${loggedInUser?.id}/todo.json`, method: 'POST', headers: { 'Content-Type': 'application/json' }, body: newToDo }, funcPostData)
  }




  const usersFilter = (users: ToDo[]) => {
    setDummyToDo(users)
  }

  const finishedHandler = (finishedUser: ToDo) => {
    const updateDataFunc = (data: ToDo) => {
      console.log(data);
    }
    dummyToDo?.map((toDo) => {
      if (toDo.id === finishedUser.id) {
        sendRequest({ url: `https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/people/accounts/${loggedInUser?.id}/todo/${finishedUser.id}.json`, method: "PUT", headers: { 'Content-Type': 'application/json' }, body: { activity: finishedUser.activity, date: finishedUser.date, type: finishedUser.type, finished: true } }, updateDataFunc)
      }
    })

    dummyToDo?.map((todo) => {
      if (todo.id === finishedUser.id) {
        return todo.finished = true
      }
    })

    // ID return reposnse
    setDummyToDo((prevDummyToDo: ToDo[]) => {
      return [...prevDummyToDo]
    })
  }

  // *************************************************** CUSTOM HOOK ***************************************************************
  // @ts-ignore
  const { isLoading: isFetchLoading, error, sendRequest } = useFetch()
  // *******************************************************************************************************************************

  const override = css`
  margin-top: 20rem;
  height:5rem;
  width:5rem;
  `;

  return (
    <div className={classes.pageWrapper} ref={pageWrapperRef}>
      {(!isAuthenticated && !isLoading) && <LoginCard />}
      {isAuthenticated && <p className={classes.userUsername}>Welcome back <b>{user?.nickname}</b></p>}
      {isAuthenticated && <LogoutButton className={classes.logoutButton} />}

      {isLoading && <PulseLoader css={override} />}
      {(!isLoading && isAuthenticated) && <ToDoForm newUser={addNewUserHandler} />}
      {isAuthenticated && <ToDoList toDo={dummyToDo} filteredUsers={usersFilter} filteredId={finishedHandler} loggedInUser={loggedInUser?.id} />}

      {/* ROUTES */}
      <Routes>
        {isAuthenticated && <Route path='/komponenta' element={<div>TEST!!!</div>} />}
      </Routes>
    </div>
  )
}

export default App;