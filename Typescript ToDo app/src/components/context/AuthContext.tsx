import React, { useState } from "react"

interface AuthContext {
    isLoggedIn: boolean;
    isLoggedInHandler: () => void
}

const AuthContext = React.createContext<AuthContext>({
    isLoggedIn: false,
    isLoggedInHandler: () => { }
})

export const AuthContextProvider: React.FC<{ value: AuthContext }> = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = () => {
        if (isLoggedIn === true) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
        }
    }


    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, isLoggedInHandler: loginHandler }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;