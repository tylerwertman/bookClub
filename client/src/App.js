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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [welcome, setWelcome] = useState()
  const [count, setCount] = useState(0)
  const [user, setUser] = useState()
  const [darkMode, setDarkMode] = useState(false)

  
  // const [mainDivStyle, setMainDivStyle] = useState("row mainDivLight")
  // const [formGroupStyle, setFormGroupStyle] = useState("col-md-6 offset-1")
  const cookieValue = Cookies.get('userToken');
  
  useEffect(() => {
    // console.log(`appjs ue`, count)
    setCount(count+1)
    if(Cookies.get('darkMode')===undefined) Cookies.set('darkMode', false.toString(), { expires: 7 })
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
  const notify = () => toast("🦄You really pay attention to detail!🦄");
  // console.log(`user`, user)
  return (
    <div className={darkMode?"AppDark":"AppLight"}>
      <Nav cookieValue={cookieValue} user={user} setUser={setUser} welcome={welcome} setWelcome={setWelcome} loggedIn={loggedIn} setLoggedIn={setLoggedIn} count={count} setCount={setCount} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard count={count} darkMode={darkMode}/>}/>
        <Route path="/login" element={<LoginForm count={count} setCount={setCount} setWelcome={setWelcome} cookieValue={cookieValue} />}/>
        <Route path="/register" element={<RegisterForm count={count} setCount={setCount}/>}/>
        <Route path="/books/:id" element={<BookDetail welcome={welcome} user={user} darkMode={darkMode}/>}/>
        <Route path="/users/:id" element={<UserDetail welcome={welcome} setWelcome={setWelcome} user={user} count={count} setLoggedIn={setLoggedIn} darkMode={darkMode}/>}/>
        <Route path="/books/:id/edit" element={<EditBook/>}/>
        <Route path="/users/undefined" element={<UserNotFound/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
