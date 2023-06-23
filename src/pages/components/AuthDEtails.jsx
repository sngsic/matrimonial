// this is only a reference for session data storage example, add the function useEffect in any page that requires login and modify accordicgly
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth"
import NaviBar from "./NaviBar";

function AuthDetails() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            }
            else {
                setAuthUser(null);
            }
        })
    }, [])

    return (
        <div>
            <NaviBar />
            <div>{authUser ? <p>Signed in as {authUser.email}</p> : <p>/Not signed</p>}</div>
        </div>);
}

export default AuthDetails;