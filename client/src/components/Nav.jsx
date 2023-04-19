import React, {useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Nav = (props) => {
    const {username, setUsername, loggedIn, setLoggedIn} = props
    const navigate = useNavigate()
    
    useEffect(() => {
        navigate("/dashboard")
    }, []);

    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res=>{
                console.log(res)
                navigate('/')
                setUsername("Guest")
                setLoggedIn(false)
            })
            .catch(err=>console.log(err))
        console.log("logging out")
        console.log(username)
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
            {/* <p>Cookie value: {cookieValue}</p> */}
            <h1 style={{display:'inline'}} onClick={(navHome)}>Book Club</h1>
            {/* <h1 style={{display:'inline'}}>Book Club</h1>&nbsp; */}
            <h4 style={{display:'inline'}}>Welcome, {username}</h4>
            </div>
            <div>
                {
                (username!=="Guest") ?
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