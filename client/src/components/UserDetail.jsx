import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, useNavigate, Link} from 'react-router-dom'
import withAuth from './WithAuth'

const UserDetail = (props) => {
    const {id} = useParams()
    const {welcome, setWelcome, count, setCount, user, setLoggedIn, booksFavorited, setBooksFavorited, booksAdded, setBooksAdded} = props
    // const [booksFavorited, setBooksFavorited] = useState([])
    const navigate = useNavigate();
    const [oneUser, setOneUser] = useState({})
    // const [favs, setFavs] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
        .then(res=>{
            console.log(res.data.user)
            setOneUser(res.data.user)
            // setBooksFavorited([])
            setBooksFavorited([...booksFavorited])
            setBooksAdded([...res.data.user.booksAdded])
            // booksFavorited.push(res.data.user.booksFavorited)
            console.log(`uDetail booksFavorited`, res.data.user.booksFavorited)
            console.log(oneUser)
            // setFavorites(res.data.book.favoritedBy)
            // console.log(res)
        })
        .catch(err=>console.log(err))
        
    }, [count]);
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
            <h2>User: {user?.firstName} {user?.lastName}</h2>
            <h6>Joined on: {new Date(oneUser?.createdAt).toLocaleString()}</h6>
            <h6>Last updated: {new Date(oneUser?.updatedAt).toLocaleString()}</h6>
            <h4>Favorite Books:</h4>
            {
                oneUser?.booksFavorited?.map((usersFavBooks, i)=>{
                    return <><h6 key={i}><Link to={`/books/${usersFavBooks?._id}`}>{usersFavBooks?.title}</Link></h6></>

                })
            }
            <h4>Added Books:</h4>
            {
                oneUser?.booksAdded?.map((usersAddedBooks, i)=>{
                    return <h6 key={i}><Link to={`/books/${usersAddedBooks?._id}`}>{usersAddedBooks?.title}</Link></h6>

                })
            }
            {welcome === (user?.firstName + " " + user?.lastName) ? <button className='btn btn-dark' onClick={deleteAccount}>Delete Account</button> : null}
        </div>
    )
}

export default withAuth(UserDetail)