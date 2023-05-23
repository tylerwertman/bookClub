import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterForm = (props) => {
    const { setLoggedIn, count, setCount } = props

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })


    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        console.log("registered successfully, redirecting to dashboard")
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/register', userInfo, { withCredentials: true })
            .then(res => {
                // console.log(res);
                setCount(count + 1)
                navigate('/dashboard')
                setLoggedIn(true)
                window.location.reload()

            })
            .catch(err => {
                console.log(`submit errer`, err)
                setErrors({
                    firstName: err.response.data.errors.firstName,
                    lastName: err.response.data.errors.lastName,
                    email: err.response.data.errors.email,
                    password: err.response.data.errors.password,
                    confirmPassword: err.response.data.errors.confirmPassword
                })
            })
    }
    return (
        <div>
            <br />
            <div className="col-md-5 mx-auto mt-5">
                <form onSubmit={submitHandler}>
                    <h3>Register</h3>
                    {errors.firstName ? <p className="text-danger">{errors.firstName.message}</p> : null}
                    <div className="form-group">
                        <label className='form-label'>First Name</label>
                        <input type="text" className="form-control" name="firstName" value={userInfo.firstName} onChange={changeHandler} />
                    </div>
                    {errors.lastName ? <p className="text-danger">{errors.lastName.message}</p> : null}
                    <div className="form-group">
                        <label className='form-label'>Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={userInfo.lastName} onChange={changeHandler} />
                    </div>
                    {errors.email ? <p className="text-danger">{errors.email.message}</p> : null}
                    <div className="form-group">
                        <label className='form-label'>Email</label>
                        <input type="email" className="form-control" name="email" value={userInfo.email} onChange={changeHandler} />
                    </div>
                    {errors.password ? <p className="text-danger">{errors.password.message}</p> : null}
                    <div className="form-group">
                        <label className='form-label'>Password</label>
                        <input type="password" className="form-control" name="password" value={userInfo.password} onChange={changeHandler} />
                    </div>
                    {errors.confirmPassword ? <p className="text-danger">{errors.confirmPassword.message}</p> : null}
                    <div className="form-group">
                        <label className='form-label'>Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" value={userInfo.confirmPassword} onChange={changeHandler} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-primary mt-3'>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm