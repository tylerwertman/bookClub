import './App.css';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm';
import BookDetail from './components/BookDetail'
import Home from './components/Home';
import {Routes, Route} from 'react-router-dom'
import {useState} from 'react'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/register" element={<RegisterForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/books/:id" element={<BookDetail/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;


// how to privatize /Dashboard
// how to pull user into nav, added By
