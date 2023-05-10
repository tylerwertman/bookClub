import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import jwtdecode from 'jwt-decode'
import Cookies from 'js-cookie'
import NightModeToggle from './NightModeToggle'

const Nav = (props) => {
    const { cookieValue, user, setUser, welcome, setWelcome, loggedIn, setLoggedIn, setCount, count, booksFavorited, setBooksFavorited, favoritedBy, setFavoritedBy, setBooksAdded, darkModeStyle, setDarkModeStyle, darkMode, setDarkMode } = props

    const navigate = useNavigate()
    const darkModeValue = Cookies.get('darkMode')

    useEffect(() => {
        if (cookieValue) {
            setWelcome(jwtdecode(cookieValue).firstName + " " + jwtdecode(cookieValue).lastName)
        }
        // const storedDarkMode = Cookies.get('nightMode') === 'true';
    }, [count])

    useEffect(() => {
        const storedDarkMode = Cookies.get('darkMode');
        console.log(`storedDM`, storedDarkMode)
        setDarkMode(storedDarkMode)
        if (!storedDarkMode) {
            document.body.style.background = 'rgb(33, 37, 41)';
            setDarkModeStyle({
                nav: "navDark",
                mainDiv: "row mainDivDark",
                formGroup: "col-md-6 offset-1 bg-dark text-light",
                btnClass: "btn btn-light",
                btnText: "☀️",
                app: "AppDark",
                b2r: "btn btn-danger",
                state: false
            })
        } else {
            document.body.style.background = 'white';
            setDarkModeStyle({
                nav: "navLight",
                mainDiv: "row mainDivLight",
                formGroup: "col-md-6 offset-1",
                btnClass: "btn btn-dark",
                btnText: "🌙",
                app: "AppLight",
                b2r: "btn btn-dark",
                state: true
            })
        }
    }, [darkMode.state])
    const clearBooks = () => {
        axios.delete(`http://localhost:8000/api/books/`)
            .then(res => {
                setCount(count + 1)
                setBooksFavorited([])
                setBooksAdded([])
                setFavoritedBy([])
                console.log(`favoritedBy`, favoritedBy, `booksFavorited`, booksFavorited)
                // console.log(user._id)
                axios.put(`http://localhost:8000/api/users/${user._id}`, { booksFavorited: [], booksAdded: [] })
                    .then(res => {
                        // console.log(`success clearing favs in user on clearBooks`, `favorites`, booksFavorited)
                        // setBooksFavorited([...booksFavorited])
                        navigate("/dashboard")
                    })
                    .catch(err => console.log(`errer clearing favs in user on clearBooks`, `favorites`, booksFavorited))
            })

            .catch(err => console.log(err))
    }

    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
            .then(res => {
                // console.log(res.data)
                navigate('/')
                setWelcome("Guest")
                setLoggedIn(false)
                setUser()
                setFavoritedBy([])
            })
            .catch(err => console.log(err))
        console.log("logging out")
    }

    const navHome = () => {
        if (loggedIn) {
            navigate("/dashboard")
            // console.log("logged in so nav to dash")
        } else {
            navigate("/")
            // console.log("logged out so nav to /")
        }
    }

    const colorToggle = () => {
        const updatedDarkMode = !darkMode;
        setDarkMode(updatedDarkMode);
        Cookies.set('darkMode', updatedDarkMode.toString(), { expires: 7 });

        if (!updatedDarkMode) {
            document.body.style.background = 'rgb(33, 37, 41)';
            setDarkModeStyle({
                b2r: 'btn btn-danger',
            });
        } else {
            document.body.style.background = 'white';
            setDarkModeStyle({
                b2r: 'btn btn-dark',
            });
        }
    }

return (
    <nav className={darkMode?"navLight":"navDark"}>
        <div>
            <h1 style={{ display: 'inline' }} onClick={(navHome)}>Book Club</h1>
            {
                welcome !== "Guest" ?
                    <><h4 style={{ display: 'inline' }}>Welcome, </h4><Link to={`/users/${user?._id}`} onClick={() => { setCount(count + 1) }}>{welcome}</Link></> :
                    <h4 style={{ display: 'inline' }}>Welcome, Guest</h4>
            }
        </div>
        <div>
            <button className='btn btn-dark' onClick={clearBooks}>Clear Books</button>&nbsp;&nbsp;

            {
                (welcome !== "Guest") ?
                    // (loggedIn) ?
                    <><button className='btn btn-danger' onClick={logout}>Logout</button>&nbsp;&nbsp;</>
                    :
                    <><Link to="/login">Login</Link>&nbsp;<Link to="/register">Register</Link>&nbsp;&nbsp;</>
            }
            <button className={darkMode?"btn btn-dark":"btn btn-primary"} onClick={colorToggle}>{darkMode?"🌙":"☀️"}</button>
            {/* <NightModeToggle onChange={colorToggle}/> */}
        </div>
    </nav>
)
}
export default Nav