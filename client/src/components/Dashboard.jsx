import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import jwtdecode from 'jwt-decode'
import withAuth from './WithAuth'

// TO DO LIST
// unfav is removing all favs
// on ANOTHER user's page, the user links dont work

const Dashboard = (props) => {
    const {cookieValue, user, count, setCount, favoritedBy, setFavoritedBy, booksFavorited, setBooksFavorited, booksAdded, setBooksAdded, colorToggleStyle, darkMode} = props
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([])
    const [oneBook, setOneBook] = useState({title: "", author: ""})
    const [errors, setErrors] = useState({})


    useEffect(() => {
        axios.get(`http://localhost:8000/api/books`)
        .then(res=>{
            setBookList(res.data.book)
        })
        .catch(err=>console.log(err))
    }, [count]);
    
    const changeHandler = (e) => {
        setOneBook({
            ...oneBook,
            [e.target.name]: e.target.value,
            addedBy: user?._id
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // if(favoritedBy.includes(jwtdecode(cookieValue)._id)){
        //     console.log(`inside if`)
        //     favoritedBy.push(jwtdecode(cookieValue)._id)
        // }
        axios.post('http://localhost:8000/api/books', oneBook)
        .then(res=>{
            // console.log(oneBook.addedBy)
            // console.log(res.data.book);
            // navigate('/dashboard')
            setBookList([...bookList, res.data.book])
            // setFavoritedBy([])
            // setBooksFavorited([])
            // setBooksAdded([])
            // after posting book to DB, set the favoritedBy, booksFavorited, & booksAdded to put those to the book and user objects
            // booksFavorited.pop()
            booksFavorited.push(res.data.book._id)
            booksAdded.push(res.data.book._id)
            console.log(`all 3 onSubmit`, favoritedBy, booksFavorited, booksAdded)

            // console.log(res.data.book._id)


            //axios put to favs array in books object
            axios.put(`http://localhost:8000/api/books/${res.data.book?._id}`, {favoritedBy: [(jwtdecode(cookieValue)._id)]})
            .then(res=>{
                // console.log(`success putting user to favs in book obj`)
                navigate(`/books/${res.data.book._id}`)              //option to direct to new book's detail page on creation
            })
            .catch(err=>console.log(`fav put error`, `favoritedBy`, favoritedBy))


            // axios put to favs array in user object
            axios.put(`http://localhost:8000/api/users/${user?._id}`, {booksFavorited: booksFavorited})
            .then(res=>{
                // console.log(`success putting to favs in user`, `favorites`, booksFavorited)
                // setBooksFavorited([...booksFavorited])
            })
            .catch(err=>console.log(`errer putting to favs in user obj`, `favorites`, booksFavorited))
        

            // axios put to added array in user object
            axios.put(`http://localhost:8000/api/users/${user?._id}`, {booksAdded: booksAdded})
            .then(res=>{
                // console.log(`success putting to added in user`, `added`, booksAdded)
                // setBooksFavorited([...booksFavorited])
            })
            .catch(err=>console.log(`errer putting to favs in user obj`, `favorites`, booksFavorited))

            setOneBook({
                title: "",
                author: ""
            })
            setErrors({
                title: "",
                author: ""
            })
            favoritedBy.pop()
            // booksFavorited.pop()
            // booksAdded.pop()
            console.log("new favBy", favoritedBy)
            // window.location.reload()
            setCount(count+1)
            // console.log(`dash submit`, count)
        })
        .catch(err=>{
            console.log(`submit errer`, err)
            setErrors({
                title: err.response.data.error.errors.title,
                author: err.response.data.error.errors.author
            })
            console.log(errors)
        })

    }
    return (
        <div>
            <br/><br/><br/>
            {/* <h1>Welcome to the dashboard</h1> */}
            {/* <button className='btn btn-danger' onClick={logout}>Logout</button> */}
            <div className={darkMode?"row mainDivLight":"row mainDivDark"}>
                <div className="col-md-6" style={{display:'inline'}}>
                    <form className={darkMode?"col-md-6 offset-1":"col-md-6 offset-1 bg-dark text-light"} onSubmit={submitHandler}>
                        <h3>Add a new book</h3>
                        {oneBook.title && oneBook.title?.length<2 ? <p className="text-danger">FE: Title must be at least 2 characters</p> : ""}
                        {errors.title ? <p className="text-danger">{errors.title.message}</p>: ""}
                        <div className="form-group col-10 mx-auto">
                            <label className='form-label'>Title</label>
                            <input type="text" className="form-control" name="title" value={oneBook.title} onChange={changeHandler}/>
                        </div>
                        {oneBook.author && oneBook.author?.length<2 ? <p className="text-danger">FE: Author must be at least 2 characters</p> : ""}
                        {errors.author ? <p className="text-danger">{errors.author.message}</p>: ""}
                        <div className="form-group col-10 mx-auto">
                            <label className='form-label'>Author</label>
                            <input type="text" className="form-control" name="author" value={oneBook.author} onChange={changeHandler}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className='btn btn-primary mt-3 mb-3'>Add Book</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-6" style={{display:'inline'}}>
                    <h3>All Books</h3>
                    {
                        bookList.map((book, index) => {
                            return <div key={index}>
                                <><Link to={`/books/${book?._id}`}>{book?.title}</Link> by {book?.author}</>
                                {bookList[index]?.addedBy?._id ? <p>(added by <Link to={`/users/${bookList[index]?.addedBy?._id}`}>{book?.addedBy?.firstName} {book?.addedBy?.lastName}</Link>)</p> : <p>(added by Deleted User)</p>}
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default withAuth(Dashboard)
// export default Dashboard