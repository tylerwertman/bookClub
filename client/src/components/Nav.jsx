import React, {useEffect, useRef} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Nav = (props) => {
    const {welcome, setWelcome, loggedIn, setLoggedIn, userId, setUserId, count, setCount} = props
    const navigate = useNavigate()
    // const userRef = useRef()
    
    useEffect(() => {
        // setCount(count+1)
        setWelcome(welcome)
        console.log(`nav ue`, count)
        setCount(count+1)
    }, [])
    
    // console.log(user?.current)
    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res=>{
                console.log(res)
                navigate('/')
                setWelcome("Guest")
                setLoggedIn(false)
            })
            .catch(err=>console.log(err))
        console.log("logging out")
        // console.log(user)
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
            <h4 key={count} style={{display:'inline'}}>Welcome, {welcome}</h4>
            </div>
            <div>
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