import AccountPanel from './components/AccountPanel.js'
import Task from './components/Task.js'
import Navbar from './components/Navbar.js'
import Login from './pages/Login.js'
import Logout from './pages/Logout.js'
import Register from './pages/Register.js'
import {Routes, Route, Link} from 'react-router-dom'
import './assets/css/app.css'
import plus from './assets/images/plus.png'
import Canvas from './components/Canvas.js'
import {useState, useEffect} from 'react'
import UserContext from './utilities/UserContext.js'
import { AlertProvider } from './utilities/AlertContext.js'
import { ToastContainer } from 'react-toastify';
import Typewriter from 'typewriter-effect';


function App(){

  const [taskName, setTaskName] = useState("");
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
 
  const unsetUser = () => {
    localStorage.clear();
  }
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    .then(result => {
      if(!result.ok){
        throw Error('to have access');
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
    fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(result => {
      if(!result.ok){
        throw Error('to have access')
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
            const result = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
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
            setTaskName("")
          } else {
            alert(data.message);
          }

    }catch(err){
      alert(err.message)
    }
    
  }


 

  return(
    <div> 
      <UserContext.Provider value={{user, setUser, unsetUser}}>
        <AlertProvider>
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
                    <>
                    <h1 className="welcome-err">
                      <Typewriter
                      options={{
                        strings:['Welcome to missions.'],
                        autoStart: true,
                        loop: true
                      }}
                      />
                    </h1>
                    <hr className="hr" />
                    <h1 className="welcome-err2"><Link to="/login"><span>Log in</span></Link> {error}</h1>
                    </>
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
        </AlertProvider>
      </UserContext.Provider>
      <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          closeButton={false}
      /> 
  </div>
  )
}

export default App;