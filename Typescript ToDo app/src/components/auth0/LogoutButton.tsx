import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton: React.FC<{ className: any }> = (props) => {
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ returnTo: window.location.origin })} className={props.className}>
            Log Out
        </button>
    );
};

export default LogoutButton;