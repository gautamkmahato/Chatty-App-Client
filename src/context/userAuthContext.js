import React, { createContext, useEffect, useState } from 'react';
import { browserSessionPersistence, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../configs/firebaseConfig';


const userAuthContext = createContext();


function UserAuthContextProvider({children}){
    const [user, setUser] = useState("");
    const [accessToken, setaccessToken] = useState('');

    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }
    async function login(email, password){
        await setPersistence(auth, browserSessionPersistence);
        return signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            console.log(currentUser)
            setUser(currentUser);
            setaccessToken(currentUser.accessToken)
        });
        unsubscribe();
    },[user]);
    return(
        <userAuthContext.Provider value={{signUp, login, user, setUser, accessToken}}>
            {children}
        </userAuthContext.Provider>
    )
}

export {userAuthContext, UserAuthContextProvider};
