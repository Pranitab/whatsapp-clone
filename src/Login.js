import React from 'react';
import { Button } from '@material-ui/core';
import "./Login.css";
import { auth, provider } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

const Login = () => {
    const [user={}, dispatch] = useStateValue();
    console.log(user);
    const signIn =()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
        })
        .catch((error)=>alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/> 
                <div className="login_text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
            </div>
        </div>
    )
}

export default Login
