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

// @ts-ignore
import CustomCursor from "custom-cursor-react"
import 'custom-cursor-react/dist/index.css'


const App: React.FC<{ filteredId: string, updatedToDo: any }> = () => {


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
      newToDo.id = data.name // setting local ID to be = as a firebase ID 
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

  let toDoNeedsToBeUpdated: ToDo | undefined;
  const updateToDoHandler = (updatedToDo: any) => {
    console.log(updatedToDo);

    toDoNeedsToBeUpdated = dummyToDo.find(user => user.id === updatedToDo[0].id)
    toDoNeedsToBeUpdated!.activity = updatedToDo[0].activity
    toDoNeedsToBeUpdated!.date = updatedToDo[0].date
    toDoNeedsToBeUpdated!.type = updatedToDo[0].type
    console.log(dummyToDo);

    let updatedDummyToDos: any = dummyToDo
    for (const key in dummyToDo) {
      if (dummyToDo[key].id === updatedToDo[1]) {

        updatedDummyToDos[key] = toDoNeedsToBeUpdated
        setDummyToDo(updatedDummyToDos)
        setDummyToDo(prevstate => [...prevstate])

        const updatedToDoFunc = (response: string) => {
          console.log(response);
        }

        sendRequest({ url: `https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/people/accounts/${loggedInUser?.id}/todo/${updatedToDo[1]}.json`, method: "PUT", headers: { 'Content-Type': 'application/json' }, body: { activity: toDoNeedsToBeUpdated!.activity, date: toDoNeedsToBeUpdated!.date, type: toDoNeedsToBeUpdated!.type, finished: false } }, updatedToDoFunc)
      }
    }
  }

  const overrideLoaderCSS = css`
  margin-top: 20rem;
  height:5rem;
  width:5rem;
  `;

  return (
    <div className={classes.pageWrapper} ref={pageWrapperRef}>
      <CustomCursor opacity={0.8} fill="black" strokeColor="#FFBC80" strokeWidth={8} dimensions={35} smoothness={{
        movement: 0.9,
        scale: 0.1,
        opacity: 0.2,
      }} />

      {(!isAuthenticated && !isLoading) && <LoginCard />}
      {isAuthenticated && <p className={classes.userUsername}>Welcome back <b>{user?.nickname}</b></p>}
      {isAuthenticated && <LogoutButton className={classes.logoutButton} />}
      {isAuthenticated && <img src={user?.picture} className={classes.userPic} />}

      {isLoading && <PulseLoader css={overrideLoaderCSS} />}
      {(!isLoading && isAuthenticated) && <ToDoForm newUser={addNewUserHandler} />}
      {isAuthenticated && <ToDoList toDo={dummyToDo} filteredUsers={usersFilter} filteredId={finishedHandler} loggedInUser={loggedInUser?.id} updatedToDo={updateToDoHandler} />}

      {/* ROUTES */}
      <Routes>
        {isAuthenticated && <Route path='/komponenta' element={<div>TEST!!!</div>} />}
      </Routes>
    </div>
  )
}

export default App;