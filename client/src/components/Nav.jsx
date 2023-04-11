import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Nav = (props) => {
    const {loggedIn, setLoggedIn} = props

    const navigate = useNavigate()

    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res=>{
                console.log(res)
                navigate('/')
                setLoggedIn(false)
            })
            .catch(err=>console.log(err))
        console.log("logging out")
    }
    return (
        <nav>
            <div>
            <h1 style={{display:'inline'}}>Book Club</h1>&nbsp;
            <h4 style={{display:'inline'}}>Welcome, User</h4>
            </div>
            <div>
                {
                loggedIn ?
                <button className='btn btn-danger' onClick={logout}>Logout</button>
                :
                <><Link to="/login">Login</Link>&nbsp;<Link to="/register">Register</Link></>
                }
                    
            </div>
        </nav>
    )
}

export default Nav