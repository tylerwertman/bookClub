import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from './Nav'

const LoginForm = (props) => {
    const {loggedIn, setLoggedIn} = props

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })
    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/login', userInfo, {withCredentials: true})
        .then(res=>{
            console.log(res);
            navigate('/dashboard')
            setLoggedIn(true)
        })
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <Nav/>
            <div className="col-md-5 mx-auto mt-5">
                <form onSubmit={submitHandler}>
                    <h3 className='mt-3'>Login</h3>
                    <div className="form-group">
                        <label className='form-label'>Email</label>
                        <input type="email" className="form-control" name="email" value={userInfo.email} onChange={changeHandler}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Password</label>
                        <input type="password" className="form-control" name="password" value={userInfo.password} onChange={changeHandler}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-primary mt-3'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm