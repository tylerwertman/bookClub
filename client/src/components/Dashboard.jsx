import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import jwtdecode from 'jwt-decode'
import withAuth from './WithAuth'
import { toast } from 'react-toastify';


const Dashboard = (props) => {
    const { count, setCount, user, welcome, darkMode } = props
    const [bookList, setBookList] = useState([])
    const [oneBook, setOneBook] = useState({ title: "", author: "" })
    const [errors, setErrors] = useState({})
    const toastAdded = () => toast.success(`➕ You added ${oneBook.title}`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light"
    });
    const toastFav = (id) => toast.success(`💚 You favorited ${id}`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode?"dark":"light"
        });
    const toastUnfav = (id) => toast.error(`🚫 You unfavorited ${id}`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode?"dark":"light"
        });
    const toastDelete = (id) => toast.error(`🗑 You deleted ${id}`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode?"dark":"light"
        });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/books`)
            .then(res => {
                setBookList(res.data.book)
            })
            .catch(err => console.log(err))
    }, [count]);

    const changeHandler = (e) => {
        setOneBook({
            ...oneBook,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/books', oneBook, { withCredentials: true })
            .then(res => {
                setBookList([...bookList, res.data.book])
                toastAdded()
                setOneBook({
                    title: "",
                    author: ""
                })
                setErrors({
                    title: "",
                    author: ""
                })
            })
            .catch(err => {
                console.log(`submit errer`, err)
                setErrors({
                    title: err.response.data.error.errors.title,
                    author: err.response.data.error.errors.author
                })
                console.log(errors)
            })
    }

    const favoriteBook = (book) => {
        axios.post(`http://localhost:8000/api/books/${book._id}/favorite`, {}, {withCredentials:true})
        .then(res=>{
            setCount(count+1)
            toastFav(book.title)
        })
        .catch(err=>console.log(`FAV error`, err))
    }

    const unfavoriteBook = (book) => {
        axios.post(`http://localhost:8000/api/books/${book._id}/unfavorite`, {}, {withCredentials:true})
        .then(res=>{
            setCount(count+1)
            toastUnfav(book.title)
        })
        .catch(err=>console.log(`UNfav error`, err))
    }

    const removeBook = (book) => {
        axios.delete(`http://localhost:8000/api/books/${book._id}`)
        .then(res=>{
            setCount(count+1)
            toastDelete(book.title)
    })
        .catch(err=>console.log(err))
        
    }
    return (
        <div>
            <h1 className='mt-5'>Welcome to the Book Club</h1>
            <div className={darkMode ? "mainDivDark" : "mainDivLight"}>
                <div>
                    <h3>Add a new book</h3>
                    <form className={darkMode ? "col-md-4 offset-1 bg-dark mx-auto text-light" : "col-md-4 offset-1 mx-auto"} onSubmit={submitHandler}>
                        {oneBook.title && oneBook.title?.length < 2 ? <p className="text-danger">Title must be at least 2 characters</p> : ""}
                        {errors.title ? <p className="text-danger">{errors.title.message}</p> : ""}
                        <div className="form-group">
                            <label className='form-label'>Title</label>
                            <input type="text" className="form-control" name="title" value={oneBook.title} onChange={changeHandler} />
                        </div>
                        {oneBook.author && oneBook.author?.length < 2 ? <p className="text-danger">Author must be at least 2 characters</p> : ""}
                        {errors.author ? <p className="text-danger">{errors.author.message}</p> : ""}
                        <div className="form-group">
                            <label className='form-label'>Author</label>
                            <input type="text" className="form-control" name="author" value={oneBook.author} onChange={changeHandler} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className='btn btn-success mt-3 mb-3'>Add Book</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h3>All Books</h3>
                    <table className='mx-auto mb-3'>
                        <thead>
                            <tr>
                                <th className={darkMode ? "lightText" : null}>Title</th>
                                <th className={darkMode ? "lightText" : null}>Author</th>
                                <th className={darkMode ? "lightText" : null}>Added By</th>
                                <th className={darkMode ? "lightText" : null}>Date</th>
                                <th className={darkMode ? "lightText" : null}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map((book, index) => {
                                return (
                                    <tr className="mt-4" key={book._id}>
                                        <td className={darkMode ? "lightText" : null}><><Link to={`/books/${book?._id}`}>{book?.title}</Link></></td>
                                        <td className={darkMode ? "lightText" : null}>{book.author}</td>
                                        <td className={darkMode ? "lightText" : null}>{bookList[index]?.addedBy?._id ? <p className='mb-1'><Link to={`/users/${bookList[index]?.addedBy?._id}`}>{book?.addedBy?.firstName} {book?.addedBy?.lastName}</Link></p> : <p>(added by Deleted User)</p>}</td>
                                        <td className={darkMode ? "lightText" : null}>{new Date(book.updatedAt).toLocaleString()}</td>
                                        <td className={darkMode ? "lightText" : null}>
                                        { // fav/unfav
                                            bookList[index].favoritedBy.some(bookObj => bookObj._id === user?._id)
                                            ? <><button className="btn btn-outline-danger" onClick={()=>unfavoriteBook(book)}>🚫</button>&nbsp;&nbsp;</>
                                            : <><button className="btn btn-outline-success" onClick={()=>favoriteBook(book)}>💚</button>&nbsp;&nbsp;</>
                                        }
                                        { // delete if logged in user or 'admin' email user
                                            (welcome === (oneBook?.addedBy?.firstName + " " + oneBook?.addedBy?.lastName) || user?.email === "t@w.com") ? <><button className={darkMode?"btn btn-outline-danger":"btn btn-outline-dark"} onClick={()=>removeBook(book)}>🗑</button>&nbsp;&nbsp;</> : null
                                        }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br/><br/>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Dashboard)
// export default Dashboard