import AccountPanel from './components/AccountPanel.js'
import Navbar from './components/Navbar.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import {Routes, Route} from 'react-router-dom'
import './assets/css/app.css'
import trash from './assets/images/trash.png'
import edit from './assets/images/edit.png'
import check from './assets/images/check.png'
import plus from './assets/images/plus.png'
import Canvas from './components/Canvas.js'


function App(){
  /* console.log(crypto.randomUUID()) */
  return(
    <div> 
        <Navbar />
         <Canvas/>
         <AccountPanel />
         <Routes>
          <Route path ="/" element={
            <div className="app">     
                <div className="flex">
                  <h1>&#123;todos&#125;</h1>
                    <div className="flex-row">
                      <input type="text" className="add-input" />
                      <img src={plus} className="icon" />
                    </div>
                    <br /><br />
                    <hr className="hr" />
                    <div className="task-list">
                        <p>task descas asdas asd asadsa asd</p>
                        <div className="flex-row">
                          <img src={check} className="icon"/>
                          <img src={edit} className="icon"/>
                          <img src={trash} className="icon"/>
                        </div>
                    </div>
                  </div>
                </div>
             }
         />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
         </Routes>
  </div>
  )
}


export default App;