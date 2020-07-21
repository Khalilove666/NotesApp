import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import {useWindowDimensions} from '../size/windowSize.js';


export const Header = () => {

  const { height, width } = useWindowDimensions();
    return (
        <header className={width > 768 ? "header" : "mob-header"}>
          <Link className={width > 768 ? "btn-home" : "mob-btn-home"} to={'/'}>Home</Link>
          <div className={width > 768 ? "header-nav" : "mob-header-nav"}>
            <Link className="btn-login" to={'/login'}>Log In</Link>
            <Link className="btn-register" to={'/register'}>Register</Link>
          </div>
        </header>
    )
}