import './App.css';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm';
import BookDetail from './components/BookDetail'
import Home from './components/Home';
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect, useRef} from 'react'
import EditBook from './components/EditBook';
import Nav from './components/Nav';
import Cookies from 'js-cookie';
import jwtdecode from 'jwt-decode'
import UserDetail from './components/UserDetail';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const cookieValue = Cookies.get('userToken');
  const [welcome, setWelcome] = useState("Guest")
  const [count, setCount] = useState(0)
  const [user, setUser] = useState()
  
  useEffect(() => {
    console.log(`appjs ue`, count)
    setCount(count+1)
    console.log(`appjs ue2`, count)
    if(cookieValue){
      setWelcome(jwtdecode(cookieValue).firstName + " " + jwtdecode(cookieValue).lastName)
      setUser(jwtdecode(cookieValue))
      console.log(`user`, user)
      setLoggedIn(true)
    }else{
      setWelcome("Guest")
    }
  }, []);
  // console.log(user.current)
  return (
    <div className="App">
      <Nav welcome={welcome} setWelcome={setWelcome} loggedIn={loggedIn} setLoggedIn={setLoggedIn} count={count} setCount={setCount}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard user={user} count={count} setCount={setCount}/>}/>
        <Route path="/login" element={<LoginForm count={count} setCount={setCount}/>}/>
        <Route path="/register" element={<RegisterForm />}/>
        <Route path="/books/:id" element={<BookDetail welcome={welcome}/>}/>
        <Route path="/users/:id" element={<UserDetail welcome={welcome}  user={user}/>}/>
        <Route path="/books/:id/edit" element={<EditBook/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
