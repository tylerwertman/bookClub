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

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const cookieValue = Cookies.get('userToken');
  const [user, setUser] = useState("Guest")


  useEffect(() => {
    if(cookieValue){
      console.log(jwtdecode(cookieValue))
        setUser(jwtdecode(cookieValue).firstName + jwtdecode(cookieValue).lastName)
        setLoggedIn(true)
    }else{
      setUser("Guest")
    }
    // console.log(cookieValue)
}, [user]);
  return (
    <div className="App">
      <Nav user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn}/>}/>
        <Route path="/register" element={<RegisterForm setLoggedIn={setLoggedIn}/>}/>
        <Route path="/books/:id" element={<BookDetail user={user}/>}/>
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