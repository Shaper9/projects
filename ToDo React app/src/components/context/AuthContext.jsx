import React, { useState } from "react"

const AuthContext = React.createContext({
    isLoggedIn: false,
    isLoggedInHandler: () => { }
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = () => {
        if (isLoggedIn === true) {
            setIsLoggedIn(false)
        }
        if (isLoggedIn === false) {
            setIsLoggedIn(true)
        }
    }


    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, isLoggedInHandler: loginHandler }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;