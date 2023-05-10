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
import UserNotFound from './components/UserNotFound'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [welcome, setWelcome] = useState()
  const [count, setCount] = useState(0)
  const [user, setUser] = useState()
  const [favoritedBy, setFavoritedBy] = useState([])
  const [booksFavorited, setBooksFavorited] = useState([])
  const [booksAdded, setBooksAdded] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  
  // const [mainDivStyle, setMainDivStyle] = useState("row mainDivLight")
  // const [formGroupStyle, setFormGroupStyle] = useState("col-md-6 offset-1")
  const cookieValue = Cookies.get('userToken');
  
  useEffect(() => {
    // console.log(`appjs ue`, count)
    setCount(count+1)
    // console.log(`appjs ue2`, count)
    if(cookieValue){
      setWelcome(jwtdecode(cookieValue).firstName + " " + jwtdecode(cookieValue).lastName)
      setUser(jwtdecode(cookieValue))
      // console.log(jwtdecode(cookieValue))
      setLoggedIn(true)
    }else{
      setWelcome("Guest")
    }
  }, []);
  // console.log(`user`, user)
  return (
    <div className={darkMode?"AppLight":"AppDark"}>
      <Nav cookieValue={cookieValue} user={user} setUser={setUser} welcome={welcome} setWelcome={setWelcome} loggedIn={loggedIn} setLoggedIn={setLoggedIn} count={count} setCount={setCount} booksFavorited={booksFavorited} setBooksFavorited={setBooksFavorited} favoritedBy={favoritedBy} setFavoritedBy={setFavoritedBy} setBooksAdded={setBooksAdded} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard cookieValue={cookieValue} user={user} count={count} setCount={setCount} favoritedBy={favoritedBy} setFavoritedBy={setFavoritedBy} booksFavorited={booksFavorited} setBooksFavorited={setBooksFavorited} booksAdded={booksAdded} setBooksAdded={setBooksAdded} darkMode={darkMode}/>}/>
        <Route path="/login" element={<LoginForm count={count} setCount={setCount} setWelcome={setWelcome} cookieValue={cookieValue} setFavoritedBy={setFavoritedBy} />}/>
        <Route path="/register" element={<RegisterForm count={count} setCount={setCount}/>}/>
        <Route path="/books/:id" element={<BookDetail welcome={welcome} user={user} cookieValue={cookieValue} count={count} setCount={setCount} favoritedBy={favoritedBy} setFavoritedBy={setFavoritedBy} booksFavorited={booksFavorited} setBooksFavorited={setBooksFavorited} booksAdded={booksAdded} setBooksAdded={setBooksAdded} darkMode={darkMode}/>}/>
        <Route path="/users/:id" element={<UserDetail welcome={welcome} setWelcome={setWelcome} user={user} count={count} setCount={setCount} setLoggedIn={setLoggedIn} booksFavorited={booksFavorited} setBooksFavorited={setBooksFavorited} booksAdded={booksAdded} setBooksAdded={setBooksAdded} darkMode={darkMode}/>}/>
        <Route path="/books/:id/edit" element={<EditBook/>}/>
        <Route path="/users/undefined" element={<UserNotFound/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
