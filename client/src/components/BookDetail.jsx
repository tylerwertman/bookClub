import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

const BookDetail = (props) => {
    const {user} = props
    const {id} = useParams()
    const navigate = useNavigate();
    const [oneBook, setOneBook] = useState({})
    const [favorites, setFavorites] = useState([])
    const [hideFav, setHideFav] = useState("btn btn-success")
    const [hideUnfav, setHideUnfav] = useState("btn btn-warning hide")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            setOneBook(res.data.book)
            console.log(res.data.book)
        })
        .catch(err=>console.log(err))
    
    }, []);

    const removeBook = () => {
        axios.delete(`http://localhost:8000/api/books/${id}`)
        .then(res=>navigate("/dashboard"))
        .catch(err=>console.log(err))
    }
    const editBook = (e) => {
        navigate(`/books/${id}/edit`)
    }

    const favoriteBook = () => {
        axios.get(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            // console.log(res.data.book.favoritedBy)
            setFavorites([...res.data.book.favoritedBy, user])
            console.log(favorites)
        })
        .catch(err=>console.log(err))

        axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: favorites})
        .then(res=>{
            // console.log(res.data.book)
        })
        .catch(err=>console.log(err))
        setHideFav("hide")
        setHideUnfav("btn btn-warning")
    }
    const unfavoriteBook = () => {
        axios.get(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            console.log(res.data.book.favoritedBy)
            setFavorites([...res.data.book.favoritedBy])
            console.log(favorites)
        })
        .catch(err=>console.log(err))

        // axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: user})
        // .then(res=>{
        //     console.log(res.data.book)
        // })
        // .catch(err=>console.log(err))
        setHideUnfav("hide")
        setHideFav("btn btn-success")
    }
    return (
        <div>
            <div className='mt-5'>
            <h2>Book Title: {oneBook.title}</h2>
            <h3>Book Author: {oneBook.author}</h3>
            <h4>Added on: {new Date(oneBook.createdAt).toLocaleString()} by {oneBook.addedBy}</h4>
            <h4>Last Updated on: {new Date(oneBook.updatedAt).toLocaleString()}</h4>
            <h4>Favorited By: {oneBook.favoritedBy}</h4>
            {/* {
                favoritedBy.map((fav, index) => {
                    return <span key={index}>{fav}, </span>
                })
            } */}
            <br/>
            <button className='btn btn-info' onClick={editBook}>Edit Book</button>&nbsp;
            <button className='btn btn-danger' onClick={removeBook}>Delete Book</button>&nbsp;
            <button className={hideFav} onClick={favoriteBook}>Favorite Book</button>
            <button className={hideUnfav} onClick={unfavoriteBook}>Unfavorite Book</button>
        </div>
        </div>
    )
}

export default BookDetail