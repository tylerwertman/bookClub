import React from 'react'
import Nav from './Nav'
const Home = (props) => {
    const {loggedIn, setLoggedIn} = props
    return (
        <div>
            <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <h1 style={{position: "relative", top: "150px"}}>Please register and login to continue</h1>
        </div>
    )
}

export default Home