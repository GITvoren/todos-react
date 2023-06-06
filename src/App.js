import AccountPanel from './components/AccountPanel.js'
import Task from './components/Task.js'
import Navbar from './components/Navbar.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import {Routes, Route} from 'react-router-dom'
import './assets/css/app.css'
import plus from './assets/images/plus.png'
import Canvas from './components/Canvas.js'
import {useState, useEffect} from 'react'
import UserContext from './utilities/UserContext.js'


function App(){

  const [taskName, setTaskName] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('http://localhost:3939/users/details', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    .then(result => result.json())
    .then(data => {

      setUser(data);

    })

  }, [localStorage])

  return(
    <div> 
      <UserContext.Provider value={user}>
        <Navbar />
         <Canvas/>
         <Routes>
          <Route path ="/" element={
            <div className="app">     
                <div className="flex">
                  <h1>{user.username}'s missions</h1>
                    <div className="flex-row">
                      <input type="text" className="add-input" value = {taskName} onChange = {(e) => setTaskName(e.target.value)} />
                      <img src={plus} className="icon" /><button className="task-btn">NEW MISSION</button>
                    </div>
                    <br /><br />
                    <hr className="hr" />
                      <Task />
                </div>
            </div>
             }
         />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
  </div>
  )
}



export default App;