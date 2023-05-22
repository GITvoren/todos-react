import {Link} from 'react-router-dom';


function Login(){
     return(
          <div className="log-container">
               <form className="log-form">
                    <h1>Login</h1>

                    <br />
                    <div>
                         <label>Username</label><br />
                         <input type="text" className="acc-input"/>
                    </div>
                    <div>
                         <label>Password</label><br />
                         <input type="password" className="acc-input" />
                    </div>
                    <button>Login</button>
                    <div>
                         <span>No account yet?</span> <Link to="/register"><span className="log-link">Register</span></Link>
                    </div>
               </form>
          </div>
     )
}


export default Login;