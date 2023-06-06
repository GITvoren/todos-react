import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';


function Register(){

     const [username, setUsername] = useState("");
     const [password1, setPassword1] = useState("");
     const [password2, setPassword2] = useState("");
     const [isPasswordMatched, setIsPasswordMatched] = useState(false);
     const navigate = useNavigate();

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
          if(username == "") return alert("Please input a username");

          if(isPasswordMatched === false){
               setPassword1("");
               setPassword2("");
               return alert("Password did not match. Try again.");
          }

          

          try{
               const result = await fetch('http://localhost:3939/users/register', {
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
                    alert(data+ " greenalert");
                    navigate('/login');
               } else{
                    clearInput();
                    alert(data + " redalert");
               }       

          }catch{
               clearInput();
               alert("Error: Failed to Fetch Data");
          }      
     }

     return(
          <div className="log-container">
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