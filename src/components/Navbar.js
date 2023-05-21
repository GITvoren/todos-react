import '../assets/css/navbar.css'
import { Link } from 'react-router-dom'


function Navbar(){
     return(
          <div className="nav">
               <h1>To Do's</h1>

               <div className="nav-list">
                    <ul>
                         <li><Link>Today</Link></li>
                         <li><Link>Tomorrow</Link></li>
                         <li><Link>7 days</Link></li>
                         <li><Link>Important</Link></li>
                         <li><Link>All Tasks</Link></li>
                    </ul>
                    <h2>Add new Task</h2>
               </div>      
          </div>
     )
}

export default Navbar;