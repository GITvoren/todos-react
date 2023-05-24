import '../assets/css/navbar.css'
import {Link} from 'react-router-dom'
 
function Navbar(){
     return(
          <nav>
               <div className="nav-list">
                    <Link to="/"><h1>&#123;todos&#125;</h1></Link>
                    <div className="flex-row-nav">
                         <Link to="/register">Register</Link>
                         <Link to="/login">Login</Link>
                    </div>
               </div>
          </nav>
     )
}


export default Navbar;