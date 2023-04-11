import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    const [book, setBook] = useState({title: "", author: ""})
    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res=>{
                console.log(res)
                navigate('/')
            })
            .catch(err=>console.log(err))
        console.log("logging out")
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/api/books`)
        .then(res=>{
            setBooks(res.data.book)
            console.log(res.data.book)
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
            console.log(res);
            // navigate('/dashboard')
            setBook({
                title: "",
                author: ""
            })
        })
        .catch(err=>console.log(err))
    }
    const removeFromDom = bookId => {
        setBooks(books.filter(book => book._id !== bookId));
    }
    return (
        <div>
            <h1>Welcome to the dashboard</h1>
            <button className='btn btn-danger' onClick={logout}>Logout</button>
            <div className="row">
                <div className="col-md-6" style={{display:'inline'}}>
                    <form className="col-md-6 offset-1" onSubmit={submitHandler}>
                        <h3>Add a new book</h3>
                        <div className="form-group">
                            <label className='form-label'>Title</label>
                            <input type="text" className="form-control" name="title" value={book.title} onChange={changeHandler}/>
                        </div>
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
                    {/* <Link to={`/products/edit/${book._id}`}>Edit</Link>&nbsp; */}
                    {/* <DeleteBtn product={book} removeFromDom={removeFromDom}/> */}
                    </div>
                })
            }
                </div>
            </div>
        </div>
    )
}

export default Dashboard