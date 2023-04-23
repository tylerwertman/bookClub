import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwtdecode from 'jwt-decode'


const LoginForm = (props) => {

    const {count, setCount} = props
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
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
            // console.log(res);
            setCount(count+1)
            navigate('/dashboard')
            
            window.location.reload()
        })
        .catch(err=>{
            console.log(`login errer`, err)
            setErrors({
                msg: err.response.data.msg
            })
            console.log(errors)
        })
    }
    return (
        <div>
            <br/>
            <div className="col-md-5 mx-auto mt-5">
                <form onSubmit={submitHandler}>
                    <h3 className='mt-3'>Login</h3>
                    {errors.msg ? <p className="text-danger">{errors.msg}</p>: ""}
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