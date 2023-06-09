import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import jwtdecode from 'jwt-decode'
import Cookies from 'js-cookie'

const Nav = (props) => {
    const { cookieValue, user, setUser, welcome, setWelcome, loggedIn, setLoggedIn, count, darkMode, setDarkMode } = props
    const navigate = useNavigate()

    useEffect(() => {
        if (cookieValue) {
            setWelcome(jwtdecode(cookieValue).firstName + " " + jwtdecode(cookieValue).lastName)
        }
        // eslint-disable-next-line
    }, [count])

    useEffect(() => {
        const darkModeCookie = Cookies.get('darkMode');
        // console.log(darkModeCookie, darkMode)
        setDarkMode(darkModeCookie === "true");
        if (darkModeCookie === "true") document.body.style.background = 'rgb(33, 37, 41)';
        else document.body.style.background = 'white';

        // eslint-disable-next-line
    }, [])

    const colorToggle = () => {
        const updatedDarkMode = !darkMode;
        setDarkMode(updatedDarkMode);
        Cookies.set('darkMode', updatedDarkMode.toString(), { expires: 7 });

        if (updatedDarkMode) document.body.style.background = 'rgb(33, 37, 41)';
        else document.body.style.background = 'white';

    }

    //testing purposes clear all books

    // const clearBooks = () => {
    //     axios.delete(`http://localhost:8000/api/books/`)
    //         .then(res => {
    //             setCount(count + 1)
    //             axios.put(`http://localhost:8000/api/users/${user._id}`, { booksFavorited: [], booksAdded: [] })
    //                 .then(res => {
    //                     navigate("/dashboard")
    //                 })
    //                 .catch(err => console.log(`errer clearing favs in user on clearBooks`, err))
    //         })

    //         .catch(err => console.log(err))
    // }

    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
            .then(res => {
                // console.log(res.data)
                navigate('/')
                setWelcome("Guest")
                setLoggedIn(false)
                setUser()
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


    return (
        <nav className={darkMode ? "navDark" : "navLight"}>
            <div>
                <h1 style={{ display: 'inline' }} onClick={(navHome)}>Book Club</h1>
                <br className='MQHide' />
                {
                    welcome !== "Guest" ?
                        <span><h4 style={{ display: 'inline' }}>Welcome, </h4><Link to={`/users/${user?._id}`}>{welcome}</Link></span> :
                        <h4 style={{ display: 'inline' }}>Welcome, Guest</h4>
                }
            </div>
            <div>
                {/* <button className={darkMode?"btn btn-danger":"btn btn-dark"} onClick={clearBooks}>Clear Books</button>&nbsp;&nbsp; */}

                {
                    (welcome !== "Guest") ?
                        // (loggedIn) ?
                        <><button className='btn btn-danger' onClick={logout}>Logout</button>&nbsp;&nbsp;</>
                        :
                        <><Link to="/login">Login</Link>&nbsp;<Link to="/register">Register</Link>&nbsp;&nbsp;</>
                }
                <button className={darkMode ? "btn btn-success" : "btn btn-dark"} onClick={colorToggle}>{darkMode ? "☀️" : "🌙"}</button>
            </div>
        </nav>
    )
}
export default Nav