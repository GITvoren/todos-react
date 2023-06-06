import AccountPanel from './components/AccountPanel.js'
import Task from './components/Task.js'
import Navbar from './components/Navbar.js'
import Login from './pages/Login.js'
import Logout from './pages/Logout.js'
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
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("")

  const unsetUser = () => {
    localStorage.clear();
  }
  
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

  },[localStorage])

  useEffect(() => {
    fetch('http://localhost:3939/tasks', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(result => {
      if(!result.ok){
        throw Error('Must Log in to view Missions')
      }
      return result.json() 
    })
    .then(data => {
      setTasks(data.map(task => <Task key={task._id} props={task} />))
    })
    .catch(err => {
      setError(err.message)
    })
  }, [])

  return(
    <div> 
      <UserContext.Provider value={{user, setUser, unsetUser}}>
        <Navbar />
         <Canvas/>
         <Routes>
          <Route path ="/" element={
            <div className="app">
                <div className="flex">
                {
                user._id && 
                  <>
                  <h1>{user.username} 's missions</h1>
                    <div className="flex-row">
                      <input type="text" className="add-input" value = {taskName} onChange = {(e) => setTaskName(e.target.value)} />
                      <img src={plus} className="icon" /><button className="task-btn">NEW MISSION</button>
                    </div>
                    </>
                  } 
                    <br /><br />
                    <hr className="hr" />
                    {
                    user._id == null
                    ?
                    <h1>{error}</h1>
                    :
                    <h1>{tasks}</h1>
                    }
                </div>
            </div>
             }
         />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </UserContext.Provider>
  </div>
  )
}



export default App;