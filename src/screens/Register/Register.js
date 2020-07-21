import React, { useState } from 'react';
import './Register.css';
import firebase from '../../components/firebase.js'

import {Header} from '../../commons';

export const Register = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [repsw, setRepsw] = useState('');

    const [match, setMatch] = useState(false);
    const [pswLength, setPswLength] = useState(false);
    const [empty, setEmpty] = useState(false);

    const [error, setError] = useState('');

    const registerHandler = async () => {
        if(name.trim() === "" || email.trim() === "" || psw.trim() === "" || repsw.trim() === "") {
            setEmpty(true);
        }else if (psw.length < 6) {
            setPswLength(true);
            setEmpty(false);
        } else if(psw !== repsw) {
            setMatch(true);
            setPswLength(false);
        }
        else {
            try {
                setMatch(false);
                await firebase.register(name, email, psw)
                // await firebase.addQuote(quote)
                alert("Succesfully registered!")
                props.history.replace('/login')
            } catch(e) {
                setError(e.message);
                // alert(e.message);
            }
        }
        
        
    }

    return (
        <>
        <Header/>
        <div className={'container'}>
            <h1 className={'title-txt'}>Register</h1>
            {empty ? <p className={'error-msg'}>Fields can't be empty!</p> : null}
            <div className={'form'}>
                <input type={'text'} placeholder={'Name'} value={name} onChange={(e) => setName(e.target.value)}/>
                {error ? <p className={'error-msg'}>{error}</p> : null }
                <input type={'text'} placeholder={'email'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                {pswLength ? <p className={'error-msg'}>password length must be at least 6 characters!</p> : null}
                <input type={'password'} placeholder={'password'} value={psw} onChange={(e) => setPsw(e.target.value)}/>
                {match ? <p className={'error-msg'}>password not match</p> :null}
                <input type={'password'} placeholder={'confirm password'} value={repsw} onChange={(e) => setRepsw(e.target.value)}/>
                <button value={'Sign Up'} onClick={registerHandler}>Sign Up</button>
            </div>
        </div>
        </>
    );
};