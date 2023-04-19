import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

const BookDetail = (props) => {
    const {username, userId, favs, setFavs} = props
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
            setFavorites(res.data.book.favoritedBy)
            console.log(`booksFavorited res`, res.data.book)
            console.log(`favorites array`, favorites)
            if(res.data.book.favoritedBy.includes(userId)){
                setHideFav(`btn btn-success hide`)
                setHideUnfav(`btn btn-warning`)
            }
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
        if(!favorites?.includes(username)){
            favorites?.push(username)
            console.log(favorites)
            axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: favorites})
            .then(res=>console.log(`fav success`, oneBook))
            .catch(err=>console.log(`fav put error`))
        }
        setHideFav("hide")
        setHideUnfav("btn btn-warning")
    }

    const unfavoriteBook = (deleteI) => {
        
        if(favorites?.includes(username)){
            const filteredFavs = favorites.filter((list, i) => {
                return i !== deleteI
            })
            for (let i=0; i<favorites?.length; i++){
                favorites?.pop()
                console.log(`favorites after pop loop`, favorites)
            }
            favorites?.push(filteredFavs)
            axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: filteredFavs})
            .then(res=>console.log(`unfav success`, oneBook))
            .catch(err=>console.log(`unfav put error`))
        }
        setHideUnfav("hide")
        setHideFav("btn btn-success")
    }

    // Newer, broken fav unfav

    // const favoriteBook = () => {
    //     // console.log(oneBook)
    //     if(!favorites?.includes(username)){
    //         console.log(`inside fav IF`, oneBook)
    //         favorites?.push(username)
    //         axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: favorites})
    //         .then(res=>console.log(`fav success`))
    //         .catch(err=>console.log(`fav put error`))
    //     }
    //     // console.log(oneBook)
    //     setHideFav("hide")
    //     setHideUnfav("btn btn-warning")
    // }

    // const unfavoriteBook = (deleteI) => {
    //     for (let i=0; i<favorites?.length; i++){
    //         favorites.pop()
    //     }
    //     if(!favorites?.includes(username)){
    //         console.log(`inside unfav if`, oneBook)
    //         const filteredFavs = favorites?.filter((list, i) => {
    //             return i !== deleteI
    //         })
    //         favorites?.push(filteredFavs)
    //         axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: favorites})
    //         .then(res=>console.log(`unfav success`))
    //         .catch(err=>console.log(`unfav put error`))
    //     }
    //     // console.log(oneBook)
    //     setHideUnfav("hide")
    //     setHideFav("btn btn-success")
    // }

    return (
        <div>
            <div className='mt-5'>
                <br/>
                {/* {
                    oneBook.favoritedBy.includes(username) ? <><button className={hideUnfav} onClick={unfavoriteBook}>Unfavorite Book</button>&nbsp;</> : <><button className={hideFav} onClick={favoriteBook}>Favorite Book</button>&nbsp;</>
                } */}
                <button className={hideFav} onClick={favoriteBook}>Favorite Book</button>
                <button className={hideUnfav} onClick={unfavoriteBook}>Unfavorite Book</button>&nbsp;&nbsp;
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
                <h4>Added on: {new Date(oneBook.createdAt).toLocaleString()}</h4>
                <h4>Last Updated on: {new Date(oneBook.updatedAt).toLocaleString()}</h4>
                <h4>Favorited By:</h4>
                {
                    favorites?.favoritedBy?.map((fav, index) => {
                        return <h4 key={index}>{favorites[index].firstName} </h4>
                    })
                }
            </div>
        </div>
    )
}

export default BookDetail