import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <br/><br/><br/>
            <h1>Uh Oh! No page is found at this URL!</h1>
            <Link to={`/dashboard/`}>Go Home!</Link>
        </div>
    )
}

export default NotFound