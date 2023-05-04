import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate, Link} from 'react-router-dom'
import withAuth from './WithAuth'

const BookDetail = (props) => {
    const {welcome, user, favoritedBy, setFavoritedBy, booksFavorited, setBooksFavorited, count, setCount} = props
    const {id} = useParams()
    const navigate = useNavigate();
    const [oneBook, setOneBook] = useState({})
    const [filteredFavs, setFilteredFavs] = useState([])
    const hideFav = "btn btn-success"
    const hideUnfav = "btn btn-danger"
    const bookFavByContainsLoggedInUser = favoritedBy.some(bookObj => bookObj._id === user._id);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            setOneBook(res.data.book)
            setFavoritedBy([...res.data.book.favoritedBy])
            console.log(`bDetail favoritedBy`, res.data.book.favoritedBy)
            // console.log(`useeffect booksFavorited res`, res.data.book)
            // console.log(`useeffect favs`, favoritedBy)
            
            // setFavorites(res.data.book.favoritedBy)
            // console.log(res.data.book.addedBy)
            // console.log(res.data.book)
            // console.log(username)

            // console.log(favoritedBy)
        })
        .catch(err=>console.log(err))
    
    }, [count]);

    const removeBook = () => {
        axios.delete(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            navigate("/dashboard")
            //remove book from all user's favs
            //remove book from creating user's addedBy
    })
        .catch(err=>console.log(err))
        
    }
    const editBook = (e) => {
        navigate(`/books/${id}/edit`)
    }

    const favoriteBook = () => {
        // console.log(oneBook)
        // console.log(user)
        console.log(oneBook)
            if(!bookFavByContainsLoggedInUser){
                
                //update favBy and put favBy to books object
                favoritedBy?.push(user?._id)
                axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: favoritedBy})
                .then(res=>{
                    console.log(`user added to book obj`, `favoritedBy`, favoritedBy)
                    navigate(`/books/${id}`)
                    setCount(count+1)
            })
                .catch(err=>console.log(`user to book obj put error`, `favoritedBy`, favoritedBy))
                
                // update booksFaved and put booksFaved to user object
                booksFavorited.push(oneBook.title)
                axios.put(`http://localhost:8000/api/users/${user?._id}`, {booksFavorited: "booksFavorited"})
                .then(res=>{
                    console.log(`book added to user obj`, `favorites`, booksFavorited)
                    setBooksFavorited([])
                })
                .catch(err=>console.log(`book to user put error`, `booksFavorited`, booksFavorited))
            }
        }


    const unfavoriteBook = () => {
        // remove user from list of book's favs and push filtered favoritedBy array to book obj
        const filteredFavBy = oneBook?.favoritedBy?.filter(userObj => userObj._id!==user?._id)
        axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: filteredFavBy})
        .then(res=>{
            console.log(`UNfav success? updated book obj to`, filteredFavBy)
            navigate(`/books/${id}`)
            setCount(count+1)

        })
        .catch(err=>console.log(`UNfav put error book obj`, `favoritedBy`, favoritedBy, `filteredFavs`, filteredFavBy))

        const filteredFavBooks = user?.booksFavorited?.filter(book => {return book!==oneBook.title})
        axios.put(`http://localhost:8000/api/users/${id}`, {booksFavorited: filteredFavBooks})
        .then(res=>{
            console.log(`UNfav success? user obj`, `favoritedBy`, favoritedBy, `filteredFavs`, filteredFavs)
            navigate(`/books/${id}`)
        })
        .catch(err=>console.log(`UNfav put error user obj`, `favoritedBy`, favoritedBy, `filteredFavs`, filteredFavs))
        // console.log(`unfavorite fn 2`, `favoritedBy`, favoritedBy, `filteredFavs`, filteredFavs)
    }

    return (
        <div>
            <div className='mt-5'>
                <br/>
                <button className="btn btn-primary" onClick={()=>(navigate('/dashboard'))}>Home</button>&nbsp;&nbsp;
                { // fav/unfav
                
                    bookFavByContainsLoggedInUser ? <><button className={hideUnfav} onClick={()=>unfavoriteBook(favoritedBy.id)}>Unfavorite Book</button>&nbsp;&nbsp;</> : <><button className={hideFav} onClick={favoriteBook}>Favorite Book</button>&nbsp;&nbsp;</>
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
                <h4 style={{display:"inline"}}>Added by: </h4> {oneBook?.addedBy?.firstName ? <h4 style={{display:"inline"}}><Link to={`/users/${user?._id}`}>{oneBook?.addedBy?.firstName} {oneBook?.addedBy?.lastName}</Link></h4> : <h4 style={{display:"inline"}}>Deleted User</h4>}
                <h6>Added on: {new Date(oneBook?.createdAt).toLocaleString()}</h6>
                <h6>Last Updated on: {new Date(oneBook?.updatedAt).toLocaleString()}</h6>
                <h4>Favorited By:</h4>
                {
                    favoritedBy?.map((booksFavedBy, i) => {
                        return <h5 key={i}><Link to={`/users/${user?._id}`}>{booksFavedBy.firstName} {booksFavedBy.lastName}</Link></h5>
                    })
                }
            </div>
        </div>
    )
}

export default withAuth(BookDetail)