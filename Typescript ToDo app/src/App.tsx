import { gsap } from "gsap"
// @ts-ignore
import classes from './App.module.scss'
import React, { useEffect, useState, useRef, useContext } from "react";
import ToDoForm from './components/ToDoForm';
import ToDoList from "./components/ToDoList";

// @ts-ignore
import AuthContext from './components/context/AuthContext.tsx'
import useFetch from "./components/hooks/use-fetch";


import Pages from "./components/pages/Pages";



const App: React.FC<{ filteredId: string }> = () => {

  interface ToDo {
    id?: string;
    activity: string;
    date: string;
    type: string;
    finished: boolean
  }

  const [dummyToDo, setDummyToDo] = useState<ToDo[]>([])
  const pageWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getDataFunc = (data: ToDo[]) => {
      // console.log(data);
      const fetchedTodos = []
      // data.forEach(item => console.log(item))
      for (const key in data) {
        fetchedTodos.push(data[key])
        data[key].id = key
      }
      setDummyToDo(fetchedTodos)

      // console.log(Object.keys(data));
    }
    sendRequest({ url: 'https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/todo.json' }, getDataFunc)



    // Page enterence Animation
    gsap.fromTo(pageWrapperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.500 })
  }, []);


  // const [postHook, setPostHook] = useState<{ name: string } | string>("no data")
  const addNewUserHandler = (newToDo: ToDo) => {
    setDummyToDo((prevDummyToDo: ToDo[]) => {
      return [...prevDummyToDo, newToDo]
    })

    // Post request for new todo

    const funcPostData = (data: { name: string }) => {

      // setPostHook(data)
      newToDo.id = data.name // setting firebase ID 
    }
    sendRequest({ url: 'https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/todo.json', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: newToDo }, funcPostData)
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
        sendRequest({ url: `https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/todo/${finishedUser.id}.json`, method: "PUT", headers: { 'Content-Type': 'application/json' }, body: { activity: finishedUser.activity, date: finishedUser.date, type: finishedUser.type, finished: true } }, updateDataFunc)
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

  // CONTEXT *************************************************************
  interface AuthContext {
    isLoggedIn: boolean;
    isLoggedInHandler: () => void
  }

  const ctx: AuthContext = useContext(AuthContext)

  // *************************************************** CUSTOM HOOK ***************************************************************
  // @ts-ignore
  const { isLoading: isFetchLoading, error, sendRequest } = useFetch()  // vadimo ceo return iz custom hooka
  // *******************************************************************************************************************************

  return (
    <div className={classes.pageWrapper} ref={pageWrapperRef}>
      <ToDoForm newUser={addNewUserHandler} />
      <ToDoList toDo={dummyToDo} filteredUsers={usersFilter} filteredId={finishedHandler} />
      <button onClick={ctx.isLoggedInHandler}>context test</button>
      {ctx.isLoggedIn && <div>radi</div>}

      {/* ROUTES */}
      <Pages />
    </div>
  )
}

export default App;
