import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

const EditBook = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [oneBook, setOneBook] = useState({})
    const [errors, setErrors] = useState({})



    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}`)
            .then(res=>{
                // console.log(res.data.book)
                setOneBook(res.data.book)
            })
            .catch(err=>console.log(err))
    }, []);

    
    const editBook = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/books/${id}`, oneBook)
            .then(res=>{
                navigate("/dashboard")
            })
            .catch(err=>{
                setErrors({
                    name: err.response.data.error.errors.title,
                    number: err.response.data.error.errors.author
                })
                console.log(errors)
            })
        
    }

    const handleChange = (e) =>{
        setOneBook({
            ...oneBook,
            [e.target.name]: e.target.value
        })
    }
    

    
    return (
        <div>
            <h1>Edit a Book</h1>
            <form action="" className='col-md-6 offset-3' onSubmit={editBook}>
                {oneBook.title?.length<2 ? <p className="text-danger">FE: Title must be at least 2 characters</p> : ""}
                {errors.title ? <p className="text-danger">{errors.title.message}</p>: ""}
                <div className="formgroup">
                    <label htmlFor="name">Book Name: </label>
                    <input type="text" className="form-control" name="title" id="title" value={oneBook.title} onChange={handleChange}/>
                </div>
                {oneBook.author?.length<2 ? <p className="text-danger">FE: Author must be at least 2 characters</p> : ""}
                {errors.author ? <p className="text-danger">{errors.author.message}</p>: ""}
                <div className="formgroup">
                    <label htmlFor="name">Book Author: </label>
                    <input type="text" className="form-control" name="author" id="author" value={oneBook.author} onChange={handleChange}/>
                </div>
                <button className='btn btn-info mt-3'>Edit Book</button>
            </form>
        </div>
    )
}

export default EditBook