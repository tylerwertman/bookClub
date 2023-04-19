import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = (props) => {
    const {username, userId} = props

    const navigate = useNavigate();

    const [bookList, setBookList] = useState([])
    const [oneBook, setOneBook] = useState({title: "", author: ""})
    const [errors, setErrors] = useState({})



                                    // TO DO LIST
                                    
                                    // privatize /Dashboard
                                    // unfavs
                                    // added by live update
                                    // on login, live update nav username



    useEffect(() => {
        axios.get(`http://localhost:8000/api/books`)
        .then(res=>{
            setBookList(res.data.book)
            console.log(`booklist`, res.data.book)
        })
        .catch(err=>console.log(err))
    
        navigate('/dashboard')
    }, []);
    

    const changeHandler = (e) => {
        setOneBook({
            ...oneBook,
            [e.target.name]: e.target.value,
            addedBy: userId
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/books', oneBook)
        .then(res=>{
            console.log(res.data.book);
            // navigate('/dashboard')
            setBookList([...bookList, res.data.book])
            navigate("/dashboard")
            console.log(bookList)
            setOneBook({
                title: "",
                author: ""
            })
            setErrors({
                title: "",
                author: ""
            })
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
            <h1>Welcome to the dashboard</h1>
            {/* <button className='btn btn-danger' onClick={logout}>Logout</button> */}
            <div className="row">
                <div className="col-md-6" style={{display:'inline'}}>
                    <form className="col-md-6 offset-1" onSubmit={submitHandler}>
                        <h3>Add a new book</h3>
                        {oneBook.title && oneBook.title?.length<2 ? <p className="text-danger">FE: Title must be at least 2 characters</p> : ""}
                        {errors.title ? <p className="text-danger">{errors.title.message}</p>: ""}
                        <div className="form-group">
                            <label className='form-label'>Title</label>
                            <input type="text" className="form-control" name="title" value={oneBook.title} onChange={changeHandler}/>
                        </div>
                        {oneBook.author && oneBook.author?.length<2 ? <p className="text-danger">FE: Author must be at least 2 characters</p> : ""}
                        {errors.author ? <p className="text-danger">{errors.author.message}</p>: ""}
                        <div className="form-group">
                            <label className='form-label'>Author</label>
                            <input type="text" className="form-control" name="author" value={oneBook.author} onChange={changeHandler}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className='btn btn-primary mt-3'>Add Book</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-6" style={{display:'inline'}}>
                    <h3>All Books</h3>
                    {
                        bookList.map((book, index) => {
                            return <div key={index}>
                            <Link to={`/books/${book._id}`}>{book.title}</Link>&nbsp;
                            <p>(added by <Link to={`/users/${userId}`}>{book.addedBy.firstName}</Link>)</p>
                            </div>
                        })

                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard