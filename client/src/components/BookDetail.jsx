import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import withAuth from './WithAuth'

const BookDetail = (props) => {
    const {welcome, user, favoritedBy, setFavoritedBy, booksFavorited, setBooksFavorited} = props
    const {id} = useParams()
    const navigate = useNavigate();
    const [oneBook, setOneBook] = useState({})
    const [filteredFavs, setFilteredFavs] = useState([])
    const hideFav = "btn btn-success"
    const hideUnfav = "btn btn-danger"


    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            setOneBook(res.data.book)
            setFavoritedBy([...res.data.book.favoritedBy])
            // console.log(`bDetail favoritedBy`, res.data.book.favoritedBy)
            // console.log(`useeffect booksFavorited res`, res.data.book)
            // console.log(`useeffect favs`, favoritedBy)
            
            // setFavorites(res.data.book.favoritedBy)
            // console.log(res.data.book.addedBy)
            // console.log(res.data.book)
            // console.log(username)

            // console.log(favoritedBy)
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
        console.log(user)
        if(!favoritedBy?.includes(welcome)){
            // console.log(`favorite fn 1`, favoritedBy)
            favoritedBy?.push(welcome)

            //put to books object
            axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: favoritedBy})
            .then(res=>{
                console.log(`book fav success?`, `favoritedBy`, favoritedBy)
                navigate(`/books/${id}`)
        })
            .catch(err=>console.log(`fav put error`, `favoritedBy`, favoritedBy))
            console.log(`book favorite fn 2`, favoritedBy)
            
            // put to user object
            axios.put(`http://localhost:8000/api/users/${user?._id}`, {booksFavorited: booksFavorited})
            .then(res=>{
                console.log(`user fav success?`, `favorites`, booksFavorited)
            })
            .catch(err=>console.log(`fav put error`, `favorites`, booksFavorited))
        }
        }


    const unfavoriteBook = () => {
        const filteredFavs = favoritedBy.filter(user => {return user!==welcome})
        console.log(`unfav filtered`, filteredFavs)
        setFavoritedBy(filteredFavs)
        // console.log(`unfavorite fn 1`, `favoritedBy`, favorites, `filteredFavs`, filteredFavs)
        axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: filteredFavs})
        .then(res=>{
            console.log(`UNfav success?`, `favoritedBy`, favoritedBy, `filteredFavs`, filteredFavs)
            navigate(`/books/${id}`)
        })
        .catch(err=>console.log(`UNfav put error`, `favoritedBy`, favoritedBy, `filteredFavs`, filteredFavs))
        // console.log(`unfavorite fn 2`, `favoritedBy`, favoritedBy, `filteredFavs`, filteredFavs)
    }

    return (
        <div>
            <div className='mt-5'>
                <br/>
                <button className="btn btn-primary" onClick={()=>(navigate('/dashboard'))}>Home</button>&nbsp;&nbsp;
                { // fav/unfav
                    favoritedBy?.includes(welcome) ? <><button className={hideUnfav} onClick={()=>unfavoriteBook(favoritedBy.id)}>Unfavorite Book</button>&nbsp;&nbsp;</> : <><button className={hideFav} onClick={favoriteBook}>Favorite Book</button>&nbsp;&nbsp;</>
                }
                { // edit
                    (welcome === (oneBook?.addedBy?.firstName + " " + oneBook?.addedBy?.lastName)) ? <><button className='btn btn-warning' onClick={editBook}>Edit Book</button>&nbsp;&nbsp;</> : null
                }
                { // delete
                    (welcome === (oneBook?.addedBy?.firstName + " " + oneBook?.addedBy?.lastName)) ? <><button className='btn btn-dark' onClick={removeBook}>Delete Book</button>&nbsp;&nbsp;</> : null
                }

                <br/>                
                <h2>Book Title: {oneBook?.title}</h2>
                <h3>Book Author: {oneBook?.author}</h3>
                <h4 style={{display:"inline"}}>Added by: </h4> {oneBook?.addedBy?.firstName ? <h4 style={{display:"inline"}}>{oneBook?.addedBy?.firstName} {oneBook?.addedBy?.lastName}</h4> : <h4 style={{display:"inline"}}>Deleted User</h4>}
                <h6>Added on: {new Date(oneBook?.createdAt).toLocaleString()}</h6>
                <h6>Last Updated on: {new Date(oneBook?.updatedAt).toLocaleString()}</h6>
                <h4>Favorited By:</h4>
                {
                    favoritedBy?.map((booksFavedBy, i) => {
                        return <h5 key={i}>{booksFavedBy}</h5>
                    })
                }
            </div>
        </div>
    )
}

export default withAuth(BookDetail)