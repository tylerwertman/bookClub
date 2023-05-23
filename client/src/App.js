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
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [welcome, setWelcome] = useState()
  const [count, setCount] = useState(0)
  const [user, setUser] = useState()
  const [darkMode, setDarkMode] = useState(false)

  const cookieValue = Cookies.get('userToken');
  
  useEffect(() => {
    setCount(count+1)
    if(Cookies.get('darkMode')===undefined) Cookies.set('darkMode', false.toString(), { expires: 7 })
    if(cookieValue){
      setWelcome(jwtdecode(cookieValue).firstName + " " + jwtdecode(cookieValue).lastName)
      setUser(jwtdecode(cookieValue))
      setLoggedIn(true)
    }else{
      setWelcome("Guest")
    }
    // eslint-disable-next-line
  }, []);
  
  const notify = () => toast("🦄You found an easter egg!🦄");

  return (
    <div className={darkMode?"AppDark":"AppLight"}>
      <Nav cookieValue={cookieValue} user={user} setUser={setUser} welcome={welcome} setWelcome={setWelcome} loggedIn={loggedIn} setLoggedIn={setLoggedIn} count={count} setCount={setCount} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <button style={{position:"fixed", top:"0"}}onClick={notify}>Notify!</button>
      <ToastContainer transition={Slide}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard count={count} setCount={setCount} user={user} darkMode={darkMode} welcome={welcome}/>}/>
        <Route path="/login" element={<LoginForm count={count} setCount={setCount} setWelcome={setWelcome} cookieValue={cookieValue} />}/>
        <Route path="/register" element={<RegisterForm count={count} setCount={setCount} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/books/:id" element={<BookDetail welcome={welcome} user={user} darkMode={darkMode}/>}/>
        <Route path="/users/:id" element={<UserDetail welcome={welcome} setWelcome={setWelcome} user={user} count={count} setLoggedIn={setLoggedIn} darkMode={darkMode}/>}/>
        <Route path="/books/:id/edit" element={<EditBook/>}/>
        <Route path="/users/undefined" element={<UserNotFound/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer darkMode={darkMode}/>
      <button style={{position:"fixed", bottom:"0"}}onClick={notify}>Notify!</button>
    </div>
  );
}

export default App;
