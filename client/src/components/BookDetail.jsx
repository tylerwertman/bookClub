import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

const BookDetail = (props) => {
    const {username, userId} = props
    const {id} = useParams()
    const navigate = useNavigate();
    const [oneBook, setOneBook] = useState({})
    const [favorites, setFavorites] = useState([])
    const [filteredFavs, setFilteredFavs] = useState([])
    const hideFav = "btn btn-success"
    const hideUnfav = "btn btn-warning"


    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            setOneBook(res.data.book)
            setFavorites([...res.data.book.favoritedBy])
            console.log(`useeffect booksFavorited res`, res.data.book)
            console.log(`useeffect favs`, favorites)
            
            // setFavorites(res.data.book.favoritedBy)
            // console.log(res.data.book.addedBy)
            // console.log(res.data.book)
            // console.log(username)

            // console.log(favorites)
        })
        // .then(console.log(oneBook))
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
        // console.log(oneBook)
        if(!favorites.includes(username)){
            console.log(`favorite fn 1`, favorites)
            favorites.push(username)
            axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: favorites})
            .then(res=>{
                console.log(`fav success?`, oneBook, favorites)
                navigate(`/books/${id}`)
        })
            .catch(err=>console.log(`fav put error`, oneBook, favorites))
            console.log(`favorite fn 2`, favorites)
        }

    }


    const unfavoriteBook = (favId) => {
        setFilteredFavs(favorites.filter(favorite => favId !== favorite.username))
        // const filteredUsers = users.filter(user => user.age >= ageFilter);
        setFavorites(filteredFavs)
        console.log(`unfavorite fn 1`, favorites)
        console.log(`filteredFavs`, filteredFavs)
        axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: filteredFavs})
        .then(res=>{
            console.log(`UNfav success?`, oneBook, favorites, filteredFavs)
            navigate(`/books/${id}`)
        })
        .catch(err=>console.log(`UNfav put error`, oneBook, favorites, filteredFavs))
        console.log(`unfavorite fn 2`, favorites, filteredFavs)

    }

    return (
        <div>
            <div className='mt-5'>
                <br/>
                {
                    favorites.includes(username) ? <><button className={hideUnfav} onClick={()=>unfavoriteBook(favorites.id)}>Unfavorite Book</button>&nbsp;</> : <><button className={hideFav} onClick={favoriteBook}>Favorite Book</button>&nbsp;</>
                }
                {/* <button className={hideFav} onClick={favoriteBook}>Favorite Book</button> */}
                {/* <button className={hideUnfav} onClick={()=>unfavoriteBook(favorites.id)}>Unfavorite Book</button>&nbsp;&nbsp; */}
                {
                    (username === (oneBook?.addedBy?.firstName + " " + oneBook?.addedBy?.lastName)) ? <><button className='btn btn-danger' onClick={removeBook}>Delete Book</button>&nbsp;&nbsp;</> : null
                }
                
                {
                    (username === (oneBook?.addedBy?.firstName + " " + oneBook?.addedBy?.lastName)) ? <><button className='btn btn-info' onClick={editBook}>Edit Book</button>&nbsp;&nbsp;</> : null
                }
                <br/>                
                <h2>Book Title: {oneBook.title}</h2>
                <h3>Book Author: {oneBook.author}</h3>
                <h4>Added by: {oneBook?.addedBy?.firstName} {oneBook?.addedBy?.lastName}</h4>
                <h6>Added on: {new Date(oneBook.createdAt).toLocaleString()}</h6>
                <h6>Last Updated on: {new Date(oneBook.updatedAt).toLocaleString()}</h6>
                <h4>Favorited By:</h4>
                {
                    favorites?.map((fav, index) => {
                        return <h5 key={index}>{favorites[index]}<br/> </h5>
                    })
                }
            </div>
        </div>
    )
}

export default BookDetail