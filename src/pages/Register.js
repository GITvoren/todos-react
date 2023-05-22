import {Link} from 'react-router-dom';


function Register(){
     return(
          <div className="log-container">
               <form className="reg-form">
                    <h1>Register</h1><br />
                    <div>
                         <label>Username</label><br />
                         <input type="text" className="acc-input" />
                    </div>
                    <div>
                         <label>Password</label><br />
                         <input type="password" className="acc-input" />
                    </div>
                    <div>
                         <label>Confirm Password</label><br />
                         <input type="password" className="acc-input" />
                    </div>
                    <button>Register</button>
                    <div>
                         <span>Already have an account?</span> <Link to="/login"><span className="log-link">Login</span></Link>
                    </div>
               </form>
          </div>
     )
}


export default Register;