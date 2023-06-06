import '../assets/css/navbar.css'
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import UserContext from '../utilities/UserContext.js'
 
function Navbar(){
     const { user } = useContext(UserContext);


     return(
          <nav>
               <div className="nav-list">
                    <Link to="/"><h1>missions</h1></Link>
                    <div className="flex-row-nav">
                         {
                              user._id == null
                              ?
                              <>
                                   <Link to="/register">Register</Link>
                                   <Link to="/login">Login</Link>
                              </>
                              :
                                   <Link to="/logout">Logout</Link>
                         }
                        
                    </div>
               </div>
          </nav>
     )
}


export default Navbar;