import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const UserDetail = (props) => {
    const {id} = useParams()
    const {username, userId} = props

    const [oneUser, setOneUser] = useState({})
    const [favs, setFavs] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
        .then(res=>{
            setOneUser(res.data.user)
            // console.log(res.data.user.booksFavorited)
            // setFavorites(res.data.book.favoritedBy)
            // console.log(res)
            console.log(res.data.user)
        })
        .catch(err=>console.log(err))
    
    }, []);
    return (
        <div className='mt-5'>
            <h2>Username: {username}</h2>
            <h4>Joined on: {new Date(oneUser?.createdAt).toLocaleString()}</h4>
            <h4>Last updated: {new Date(oneUser?.updatedAt).toLocaleString()}</h4>
            <h4>Favorite Books:</h4>
            <h4>Added Books:</h4>
        </div>
    )
}

export default UserDetail