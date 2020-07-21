import React, { useState } from 'react';
import './Login.css';
import firebase from '../../components/firebase.js';

import {Header} from '../../commons';

export const Login = (props) => {

    
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [empty, setEmpty] = useState(false);
    const [error, setError] = useState('');

    const loginHandler = async () => {
        if (email.trim() === "" || psw.trim() === "") {
            setEmpty(true);
            setError('');
        } else {
            setEmpty(false);
            try {
                await firebase.login(email, psw);
                props.history.replace('/dashboard');
            } catch(e) {
                setError(e.message);
            }
        }
        
    }
    return (
        <>
        <Header/>
        <div className={'container'}>
            <h1 className={'title-txt'}>Log In</h1>
            {empty ? <p className={'error-msg'}>Please enter your credentials!</p> : null}
            {error ? <p className={'error-msg'}>{error}</p> : null}
            <div className={'form'}>
                <input type={'email'} placeholder={'email'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type={'password'} placeholder={'password'} value={psw} onChange={(e) => setPsw(e.target.value)}/>
                <button type={'submit'} onClick={loginHandler}>Log In</button>
            </div>
        </div>
        </>
    );
};