import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

const BookDetail = (props) => {
    const {username, userid, favs, setFavs} = props
    const {id} = useParams()
    const navigate = useNavigate();
    const [oneBook, setOneBook] = useState({})
    const [hideFav, setHideFav] = useState("btn btn-success")
    const [hideUnfav, setHideUnfav] = useState("btn btn-warning")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            setOneBook(res.data.book)
            // setFavorites(res.data.book.favoritedBy)
            console.log(res.data.book.addedBy)
            console.log(res.data.book)
            console.log(username)

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
        // if(!favorites.includes(user)){
        //     setFavorites([...oneBook.favoritedBy, user])
            
        //     axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: [...favorites, username]})
        //     .then(res=>{
        //         console.log(`Added ${user} to favs`)
        //     })
        //     .catch(err=>console.log(err))
        setFavs([...favs, oneBook.title])
        console.log(favs)
        // }

        
        // setHideFav("hide")
        // setHideUnfav("btn btn-warning")
    }

    const unfavoriteBook = () => {
        // if(favorites.includes(user)){
        //     for (let i=0; i<favorites.length; i++){
        //         if(favorites[i]===user){
        //             favorites.slice(i, -1)
        //             console.log(favorites)
        //     }
        //     axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: favorites})
        //     .then(res=>{
        //         console.log(`Removed ${user} from favs`)
        //     })
        //     .catch(err=>console.log(err))
        // }
        // }

        // setHideUnfav("hide")
        // setHideFav("btn btn-success")
    }
    return (
        <div>
            <div className='mt-5'>
                <h2>Book Title: {oneBook.title}</h2>
                <h3>Book Author: {oneBook.author}</h3>
                <h4>Added by: {oneBook?.addedBy?.firstName} {oneBook?.addedBy?.lastName}</h4>
                <h4>Added on: {new Date(oneBook.createdAt).toLocaleString()}</h4>
                <h4>Last Updated on: {new Date(oneBook.updatedAt).toLocaleString()}</h4>
                <h4>Favorited By:</h4>
                {/* {
                    favorites.map((fav, index) => {
                        return <h4 key={index}>{fav} {{fav}===fav ? <button className={hideUnfav} onClick={unfavoriteBook}>Unfavorite Book</button> : null}</h4>
                    })
                } */}
                <br/>
                {/* <button className='btn btn-info' onClick={editBook}>Edit Book</button>&nbsp; */}
                
                <button className='btn btn-danger' onClick={removeBook}>Delete Book</button>&nbsp;
                <button className={hideFav} onClick={favoriteBook}>Favorite Book</button>&nbsp;
                <button className={hideUnfav} onClick={unfavoriteBook}>Unfavorite Book</button>&nbsp;
                {
                    (username === (oneBook?.addedBy?.firstName + " " + oneBook?.addedBy?.lastName)) ? <button className='btn btn-info' onClick={editBook}>Edit Book</button>: null
                }
            </div>
        </div>
    )
}

export default BookDetail