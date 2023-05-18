import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div className='Home'>
            <h1 style={{ position: "relative", top: "150px" }}>Please <Link to={`/register`}>register</Link> or <Link to={`/login`}>login</Link> to continue</h1>
        </div>
    )
}

export default Home