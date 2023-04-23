import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

const UserDetail = (props) => {
    const {id} = useParams()
    const {welcome, setWelcome, count, setCount, user, setLoggedIn} = props
    const [booksFavorited, setBooksFavorited] = useState([])
    const navigate = useNavigate();
    const [oneUser, setOneUser] = useState({})
    // const [favs, setFavs] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
        .then(res=>{
            console.log(res.data.user)
            setOneUser(res.data.user)
            setBooksFavorited([...res.data.user.booksFavorited])
            booksFavorited.push(res.data.user.booksFavorited)
            console.log(`uDetail booksFavorited`, res.data.user.booksFavorited)
            console.log(oneUser)
            // setFavorites(res.data.book.favoritedBy)
            // console.log(res)
        })
        .catch(err=>console.log(err))
        
    }, []);
    // console.log(oneUser.booksFavorited[0])

    const deleteAccount = () => {
            axios.delete(`http://localhost:8000/api/users/${id}`)
            .then(res=>{
                navigate("/")
                setWelcome("Guest")
                setCount(count+1)
                axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res=>{
                // console.log(res.data)
                navigate('/')
                setWelcome("Guest")
                setLoggedIn(false)
            })
            .catch(err=>console.log(err))
        console.log("logging out")
            })
            .catch(err=>console.log(err))
        
    }
    return (
        <div className='mt-5'>
            <h2>Username: {user?.firstName} {user?.lastName}</h2>
            <h4>Joined on: {new Date(oneUser?.createdAt).toLocaleString()}</h4>
            <h4>Last updated: {new Date(oneUser?.updatedAt).toLocaleString()}</h4>
            <h4>Favorite Books:</h4>
            {
                oneUser?.booksFavorited?.map((favs, i)=>{
                    return <h5 key={i}>{favs}</h5>

                })
            }
            <h4>Added Books:</h4>
            {

            }
            {welcome === (user?.firstName + " " + user?.lastName) ? <button className='btn btn-dark' onClick={deleteAccount}>Delete Account</button> : null}
        </div>
    )
}

export default UserDetail