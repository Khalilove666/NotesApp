import React from 'react';
import './Welcome.css';
import {Header} from '../../commons';


export const Welcome = () => {

    return (
        <>
            <Header/>
            <div className={'container'}>
                <h1 className={'welcome-txt'}>Welcome to Notes App</h1>
            </div>
        </>
    );
};