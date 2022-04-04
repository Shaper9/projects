import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: React.FC<{ className: any }> = (props) => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()} className={props.className}>Log In</button>;
};

export default LoginButton;