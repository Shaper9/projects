import React, { useRef, useLayoutEffect } from "react";
// @ts-ignore
import classes from './ToDo.module.scss'
import Button from "./helpers/Button";
import { gsap } from 'gsap';
import useFetch from "./hooks/use-fetch";


interface ToDo {
    id?: string;
    activity: string;
    date: string;
    type: string;
    finished: boolean
}

const ToDo: React.FC<{ key: string, activity: string, date: string, type: string, id: string, allUsers: ToDo[] | undefined, filteredUsers: any, isFinished: boolean, isFinishedHandler: (id: string) => void, loggedInUser: string | undefined }> = (props) => {

    const toDoRef = useRef<HTMLLIElement>(null);
    const btnDelRef = React.createRef<HTMLButtonElement>();
    const btnFiniRef = React.createRef<HTMLButtonElement>();

    const mouseEnterHandleDel = () => {
        gsap.to(btnDelRef.current, { scaleX: 1.3, scaleY: 1.5, ease: "elastic.out(1, 0.3)" })
    }
    const mouseLeaveHandlerDel = () => {
        gsap.to(btnDelRef.current, { scaleX: 1, scaleY: 1, ease: "elastic.out(1, 0.2)", duration: 1 })
    }

    const mouseEnterHandleFini = () => {
        gsap.to(btnFiniRef.current, { scaleX: 1.3, scaleY: 1.5, ease: "elastic.out(1, 0.3)" })
    }

    const mouseLeaveHandlerFini = () => {
        gsap.to(btnFiniRef.current, { scaleX: 1, scaleY: 1, ease: "elastic.out(1, 0.2)", duration: 1 })
    }

    const timeline = gsap.timeline({ defaults: { duration: 0.75 } })
    useLayoutEffect(() => {
        timeline.fromTo(toDoRef.current, { x: -2000 }, { x: 0, duration: 1, ease: "bounce.out", delay: 0.5 })
        timeline.fromTo(btnDelRef.current, { opacity: 0 }, { opacity: 1, delay: 0.3 });
        timeline.fromTo(btnFiniRef.current, { opacity: 0 }, { opacity: 1, delay: 0.3 }, "<1%")

    }, []);

    const allUsers = props.allUsers
    const currentUserId = props.id
    // @ts-ignore
    const { isLoading: isFetchLoading, error, sendRequest } = useFetch()

    // REMOVING USERS
    const removeHandler = () => {
        const delFuncHandler = (data: any) => {
            console.log(data);
        }

        sendRequest({ url: `https://test-bae4b-default-rtdb.europe-west1.firebasedatabase.app/people/accounts/${props.loggedInUser}/todo/${currentUserId}.json`, method: "DELETE", head: {} }, delFuncHandler)

        const filteredUsers = allUsers?.filter(user => {
            return user.id !== currentUserId
        })
        setTimeout(() => {
            props.filteredUsers(filteredUsers)
        }, 500)


        // Animacija
        gsap.to(toDoRef.current, { x: 2000, duration: 0.75 })


    }

    const isFinished = props.isFinished
    function finishedHandler() {
        props.isFinishedHandler(currentUserId)
    }

    return (
        <React.Fragment>
            <li className={`${classes.toDo} ${isFinished && classes.finished} `} ref={toDoRef}>
                <div className={classes.listWrapper}>
                    <p>You need to: <span className={classes.font}>{props.activity}</span> </p>
                    <p>Date of activity: <span className={classes.font}>{props.date}</span></p>
                    <p>Type of activity: <span className={classes.font}>{props.type}</span></p>
                </div>

                <div className={classes.btnWrapper}>
                    <Button className={classes.btn} ref={btnDelRef} handleClick={removeHandler} onMouseEnter={mouseEnterHandleDel} onMouseLeave={mouseLeaveHandlerDel}>DELETE</Button>

                    {!isFinished && <Button className={classes.btn} ref={btnFiniRef} onMouseEnter={mouseEnterHandleFini} onMouseLeave={mouseLeaveHandlerFini} handleClick={finishedHandler}>FINISHED</Button>}
                </div>
            </li>
        </React.Fragment >
    )
}

export default ToDo;