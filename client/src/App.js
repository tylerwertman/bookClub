import './App.css';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm';
import BookDetail from './components/BookDetail'
import Home from './components/Home';
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import EditBook from './components/EditBook';
import Nav from './components/Nav';
import Cookies from 'js-cookie';
import jwtdecode from 'jwt-decode'
import UserDetail from './components/UserDetail';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const cookieValue = Cookies.get('userToken');
  const [username, setUsername] = useState("Guest")
  const [userId, setUserId] = useState()
  const [favs, setFavs] = useState([])

  useEffect(() => {
    if(cookieValue){
      setUsername(jwtdecode(cookieValue).firstName + " " + jwtdecode(cookieValue).lastName)
      setUserId(jwtdecode(cookieValue)._id)
      setFavs(jwtdecode(cookieValue).booksFavorited)
      // console.log(userId)
        // console.log(favs)
        setLoggedIn(true)
    }else{
      setUsername("Guest")
    }
    // console.log(cookieValue)
}, [username]);
  return (
    <div className="App">
      <Nav username={username} setUsername={setUsername} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard username={username} userId={userId}/>}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/register" element={<RegisterForm />}/>
        <Route path="/books/:id" element={<BookDetail username={username} favs={favs} setFavs={setFavs}/>}/>
        <Route path="/users/:id" element={<UserDetail username={username} userId={userId}/>}/>
        <Route path="/books/:id/edit" element={<EditBook/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;

// TO DO LIST
// how to privatize /Dashboard
// how to pull user into added By
// update book list on entry - probably a better way