import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();

    const [books, setBooks] = useState([])
    const [book, setBook] = useState({title: "", author: "", addedBy: ""})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/books`)
        .then(res=>{
            setBooks(res.data.book)
            // console.log(res.data.book)
        })
        .catch(err=>console.log(err))
    
    }, []);
    

    const changeHandler = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/books', book)
        .then(res=>{
            // console.log(res);
            // navigate('/dashboard')
            setBooks([...books, res.data.book])
            console.log(books)
            setBook({
                title: "",
                author: "", 
                addedBy: ""
            })
            setErrors({
                title: "",
                author: ""
            })
            navigate("/dashboard") //didn't work
        })
        .catch(err=>{
            console.log(err)
            setErrors({
                title: err.response.data.error.errors.title,
                author: err.response.data.error.errors.author
            })
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
                        {book.title && book.title?.length<2 ? <p className="text-danger">FE: Title must be at least 2 characters</p> : ""}
                        {errors.title ? <p className="text-danger">{errors.title.message}</p>: ""}
                        <div className="form-group">
                            <label className='form-label'>Title</label>
                            <input type="text" className="form-control" name="title" value={book.title} onChange={changeHandler}/>
                        </div>
                        {book.author && book.author?.length<2 ? <p className="text-danger">FE: Author must be at least 2 characters</p> : ""}
                        {errors.author ? <p className="text-danger">{errors.author.message}</p>: ""}
                        <div className="form-group">
                            <label className='form-label'>Author</label>
                            <input type="text" className="form-control" name="author" value={book.author} onChange={changeHandler}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className='btn btn-primary mt-3'>Add Book</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-6" style={{display:'inline'}}>
                    <h3>All Books</h3>
                    {
                        books.map((book, index) => {
                            return <div key={index}>
                            <Link to={`/books/${book._id}`}>{book.title}</Link>&nbsp;
                            <p>(added by </p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard