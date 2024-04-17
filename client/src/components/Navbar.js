import React, {useContext} from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"

export const Navbar = ()=>{
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    return (
        <nav>
            <div className="nav-wrapper grey darken-1">
                <span className="brand-logo ">Кофейня</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create_course">Создать курс</NavLink></li>
                    <li><NavLink to="/courses">Курсы</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Exit</a></li>
                </ul>
            </div>
        </nav>
    )
}