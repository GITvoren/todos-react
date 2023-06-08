import {Link, useNavigate, Navigate} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import AlertContext from '../utilities/AlertContext.js'
import UserContext from '../utilities/UserContext.js'


function Register(){

     const [username, setUsername] = useState("");
     const [password1, setPassword1] = useState("");
     const [password2, setPassword2] = useState("");
     const [isPasswordMatched, setIsPasswordMatched] = useState(false);
     const navigate = useNavigate();
     const { notifyerror, notifysuccess } = useContext(AlertContext);
     const { user } = useContext(UserContext);

     const clearInput = () => {
          setUsername("");
          setPassword1("");
          setPassword2("");
     }

     useEffect(() => {
          if(password1 == password2){
               setIsPasswordMatched(true);
          } else{
               setIsPasswordMatched(false);
          }
     },[password1, password2]);
     
     const registerUser = async (e) => {
          e.preventDefault();
          if(username == "") return notifyerror("Please input a username");

          if(isPasswordMatched === false){
               setPassword1("");
               setPassword2("");
               return notifyerror("Password did not match. Try again.");
          }

          

          try{
               const result = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
                    headers:{
                         'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                         username: username,
                         password: password1
                    })
               });

               const data = await result.json();

               if(result.ok){
                    notifysuccess(data);
                    navigate('/login');
               } else{
                    clearInput();
                    notifyerror(data);
               }       

          }catch{
               clearInput();
               notifyerror("Error: Failed to Fetch Data");
          }      
     }

     return(
          
          <div className="log-container">
           {user._id && <Navigate to ="/" />}
               <form className="reg-form">
                    <h1>Register</h1><br />
                    <div>
                         <label>Username</label><br />
                         <input type="text" className="acc-input" value ={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                         <label>Password</label><br />
                         <input type="password" className="acc-input" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                    </div>
                    <div>
                         <label>Confirm Password</label><br />
                         <input type="password" className="acc-input" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    </div>
                    <button onClick={registerUser}>Register</button>
                    <div>
                         <span>Already have an account?</span> <Link to="/login"><span className="log-link">Login</span></Link>
                    </div>
               </form> 
          </div>
     )
}


export default Register;