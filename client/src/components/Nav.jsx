import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import jwtdecode from 'jwt-decode'


const Nav = (props) => {
    const {cookieValue, user, setUser, welcome, setWelcome, loggedIn, setLoggedIn, setCount, count, booksFavorited, setBooksFavorited, setFavoritedBy} = props

    const navigate = useNavigate()
    
    useEffect(() => {
        if(cookieValue){
            setWelcome(jwtdecode(cookieValue).firstName + " " + jwtdecode(cookieValue).lastName)
        }
    }, [count])
    
    const clearBooks = () => {
        axios.delete(`http://localhost:8000/api/books/`)
        .then(res=>{
            setCount(count+1)
            setBooksFavorited([])
            console.log(user._id)
            axios.put(`http://localhost:8000/api/users/${user._id}`, {booksFavorited: [], booksAdded: []})
            .then(res=>{
                console.log(`success clearing favs in user on clearBooks`, `favorites`, booksFavorited)
                // setBooksFavorited([...booksFavorited])
                navigate("/dashboard")
            })
            .catch(err=>console.log(`errer clearing favs in user on clearBooks`, `favorites`, booksFavorited))
        })
            
        .catch(err=>console.log(err))
    }

    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res=>{
                // console.log(res.data)
                navigate('/')
                setWelcome("Guest")
                setLoggedIn(false)
                setUser()
                setFavoritedBy([])
            })
            .catch(err=>console.log(err))
        console.log("logging out")
    }

    const navHome = () => {
        if(loggedIn){
            navigate("/dashboard")
            console.log("logged in so nav to dash")
        }else{
            navigate("/")
            console.log("logged out so nav to /")
        }
    }
    return (
        <nav>
            <div>
            <h1 style={{display:'inline'}} onClick={(navHome)}>Book Club</h1>
            {
                welcome!=="Guest" ?
                <><h4 style={{display:'inline'}}>Welcome, </h4><Link to={`/users/${user?._id}`} onClick={()=>{setCount(count+1)}}>{welcome}</Link></> :
                <h4 style={{display:'inline'}}>Welcome, Guest</h4>
            }
            </div>
            <div>
                <button className='btn btn-dark' onClick={clearBooks}>Clear Books</button>&nbsp;&nbsp;

                {
                (welcome!=="Guest") ?
                // (loggedIn) ?
                <button className='btn btn-danger' onClick={logout}>Logout</button>
                :
                <><Link to="/login">Login</Link>&nbsp;<Link to="/register">Register</Link></>
                }
            </div>
        </nav>
    )
}
export default Nav