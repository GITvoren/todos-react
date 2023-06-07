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
  const [error, setError] = useState("");
  const [empty, setEmpty] = useState(true);

  const unsetUser = () => {
    localStorage.clear();
  }
  
  useEffect(() => {
    fetch('http://localhost:3939/users/details', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    .then(result => {
      if(!result.ok){
        throw Error('Must Log in to view Missions');
      }
      return result.json();
    })
    .then(data => {

      setUser(data);

    })
    .catch(err => {
      setError(err.message)
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
      return result.json();
    })
    .then(data => {
      setTasks(data)
    })
    .catch(err => {
      setError(err.message)
    })
  }, [tasks])

  const handleAddTask = async (e) => {
      e.preventDefault();

    try{
            const result = await fetch('http://localhost:3939/tasks', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'POST',
            body: JSON.stringify({
              description: taskName
            })
          })

          const data = await result.json();

          if(result.ok){
            alert(data.message + " green");
            setTaskName("")
          } else {
            alert(data.message + " red");
          }

    }catch(err){
      alert(err.message)
    }
    
  }

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
                    
                      <form onSubmit={handleAddTask}>
                      <div className="flex-row">
                        <input type="text" className="add-input" value = {taskName} onChange = {(e) => setTaskName(e.target.value)} />
                        <img src={plus} className="icon" type="submit" onClick={handleAddTask} /><button className="task-btn" type="submit" >NEW MISSION</button>
                      </div>
                      </form> 
                
                    </>
                  } 
                    <br /><br />
                    <hr className="hr" />
                    {
                    user._id == null
                    ?
                    <h1>{error}</h1>
                    :
                    <h1>{tasks.map((task => <Task key={task._id} props={task} />))}</h1>
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