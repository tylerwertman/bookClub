import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate, Link} from 'react-router-dom'
import withAuth from './WithAuth'
import jwtdecode from 'jwt-decode'


const BookDetail = (props) => {
    const {welcome, user, cookieValue, favoritedBy, setFavoritedBy, booksFavorited, setBooksFavorited, count, setCount, booksAdded, setBooksAdded} = props
    const {id} = useParams()
    const navigate = useNavigate();
    const [oneBook, setOneBook] = useState({})
    const [filteredFavs, setFilteredFavs] = useState([])
    const bookFavByContainsLoggedInUser = favoritedBy.some(bookObj => bookObj._id === user._id);
    // const bookFavByContainsLoggedInUser = favoritedBy.includes(user?._id);
    // const userBooksFavedContainsCurrentBook = booksFavorited.includes(oneBook?._id);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            setOneBook(res.data.book)
            console.log(`UE favoritedBy`, favoritedBy)
            setFavoritedBy([...res.data.book.favoritedBy])
            console.log(`UE favoritedBy after set`, favoritedBy)
            // setFavoritedBy([])
        })
        .catch(err=>console.log(err))
    
    }, [count]);

    const removeBook = () => {
        axios.delete(`http://localhost:8000/api/books/${id}`)
        .then(res=>{
            navigate("/dashboard")
            //remove book from all user's favs

    })
        .catch(err=>console.log(err))
        
    }
    const editBook = (e) => {
        navigate(`/books/${id}/edit`)
    }

    const favoriteBook = () => {
        // if(!bookFavByContainsLoggedInUser){
            // if(favoritedBy.includes(user?._id)){
            //     const filteredFavBy = favoritedBy?.filter(userObj => {console.log(userObj, user._id);return (userObj._id!==user?._id)})
            //     setFavoritedBy(filteredFavBy)
            //     console.log(`favoritedBy`, favoritedBy)
            // }
                console.log(bookFavByContainsLoggedInUser)
                // console.log(userBooksFavedContainsCurrentBook)


                //update favBy and put favBy to books object
                
                // favoritedBy.pop()
                favoritedBy?.push(user?._id)
                // setCount(count+1)
                console.log(`fav post push`, favoritedBy)
                axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: favoritedBy})
                .then(res=>{
                    // console.log(`user added to book obj`)
                    // navigate(`/books/${id}`)
                    setCount(count+1)
                    // favoritedBy.pop()
                })
                .catch(err=>console.log(`FAV error during PUT to book obj`, err))
                
                
                // update booksFaved and put booksFaved to user object

                // console.log(`booksFavorited on fav`, booksFavorited)
                booksFavorited.push(oneBook._id)
                // console.log(booksFavorited)
                axios.put(`http://localhost:8000/api/users/${user?._id}`, {booksFavorited: booksFavorited})
                .then(res=>{
                    // console.log(`book added to user obj`)
                    // setBooksFavorited([])
                    // booksFavorited.pop()
                    // setCount(count+1)
                })
                .catch(err=>console.log(`FAV error during PUT to user obj`, err))
        // }
    }

    const unfavoriteBook = () => {
        
        if(bookFavByContainsLoggedInUser){
            console.log(bookFavByContainsLoggedInUser)
            // console.log(userBooksFavedContainsCurrentBook)
            
            // remove user from list of book's favs and push filtered favoritedBy array to book obj
            const filteredFavBy = favoritedBy?.filter(userObj => {
                console.log(userObj._id, user._id);
                return (userObj._id!==user?._id)
            })
            console.log(`filteredFavBy`, filteredFavBy)
            setFavoritedBy(filteredFavBy)
            console.log(`filteredFavBy`, filteredFavBy)
            axios.put(`http://localhost:8000/api/books/${id}`, {favoritedBy: filteredFavBy})
            .then(res=>{
                // console.log(`UNfav success? updated book obj`, res)
                navigate(`/books/${id}`)
                // setCount(count+1)
                filteredFavBy.pop()
            })
            .catch(err=>console.log(`UNfav error during PUT to book obj`, err))


            // remove book from list of user's favs and push filtered booksFavorited array to user obj
            const filteredFavBooks = booksFavorited?.filter(bookObj => {
                console.log(bookObj, oneBook._id);
                return (bookObj!==oneBook?._id)
            })
            setBooksFavorited(filteredFavBooks)
            console.log(`filteredFavBooks`, filteredFavBooks)
            axios.put(`http://localhost:8000/api/users/${user?._id}`, {booksFavorited: filteredFavBooks})
            .then(res=>{
                // console.log(`UNfav success? updated user obj`, res)
                navigate(`/books/${id}`)
            })
            .catch(err=>{
                console.log(`UNfav error during PUT to user obj`, err)
                // booksFavorited.pop() // because put req is 404ing
            })
        }
    }

    return (
        <div>
            <div className='mt-5'>
                <br/>
                <button className="btn btn-primary" onClick={()=>(navigate('/dashboard'))}>Home</button>&nbsp;&nbsp;
                { // fav/unfav
                    bookFavByContainsLoggedInUser
                    ? <><button className="btn btn-danger" onClick={()=>unfavoriteBook(favoritedBy.id)}>Unfavorite Book</button>&nbsp;&nbsp;</>
                    : <><button className="btn btn-success" onClick={favoriteBook}>Favorite Book</button>&nbsp;&nbsp;</>
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
                <h4 style={{display:"inline"}}>Added by: </h4> {oneBook?.addedBy?.firstName ? <h4 style={{display:"inline"}}><Link to={`/users/${oneBook?.addedBy?._id}`}>{oneBook?.addedBy?.firstName} {oneBook?.addedBy?.lastName}</Link></h4> : <h4 style={{display:"inline"}}>Deleted User</h4>}
                <h6>Added on: {new Date(oneBook?.createdAt).toLocaleString()}</h6>
                <h6>Last Updated on: {new Date(oneBook?.updatedAt).toLocaleString()}</h6>
                <h4>Favorited By:</h4>
                {
                    favoritedBy?.map((booksFavedBy, i) => {
                        return <h5 key={i}><Link to={`/users/${booksFavedBy?._id}`}>{booksFavedBy.firstName} {booksFavedBy.lastName}</Link></h5>
                    })
                }
            </div>
        </div>
    )
}

export default withAuth(BookDetail)