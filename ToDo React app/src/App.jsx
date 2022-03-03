import { gsap } from "gsap"
import classes from './App.module.scss'
import React, { useEffect, useState, useRef, useContext } from "react";
import ToDoForm from './components/ToDoForm';
import ToDoList from "./components/ToDoList";
import AuthContext from './components/context/AuthContext'



function App() {

  const [dummyToDo, setDummyToDo] = useState(null)
  const pageWrapperRef = useRef()

  useEffect(() => {
    const rawData = window.localStorage.getItem('toDos')
    const data = JSON.parse(rawData) || []
    setDummyToDo(data)

    // Page enterence Animation
    gsap.fromTo(pageWrapperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.500 })
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

  const ctx = useContext(AuthContext)

  // Fun fact fetch
  const [funFact, setFunFact] = useState("no data");
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      console.log("render asinhrone funkcije");
      try {
        const rawData = await fetch('https://api.aakhilv.me/fun/facts')
        if (!rawData.ok) {
          throw new Error(' HTTP error ')
        }
        const usableFact = await rawData.json();
        setFunFact(usableFact)
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  console.log(funFact);




  return (
    <div className={classes.pageWrapper} ref={pageWrapperRef}>
      <ToDoForm newUser={addNewUserHandler} />
      <ToDoList toDo={dummyToDo} filteredUsers={usersFilter} filteredId={finishedHandler} />
      {isLoading && <div>LOADING FUN FACT</div>}
      <div>{funFact.data}</div>
      <button onClick={ctx.isLoggedInHandler}></button>
      {ctx.isLoggedIn && <div>radi</div>}
    </div>
  )
}

export default App;
