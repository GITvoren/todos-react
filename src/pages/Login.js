import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';


function Login(){
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const navigate = useNavigate();


     const loginUser = async (e) => {
          e.preventDefault();
          try{
               const result = await fetch('http://localhost:3939/users/login', {
               headers: {
                    'Content-Type': 'application/json'
               },
               method: 'POST',
               body: JSON.stringify({
                    username: username,
                    password: password
               })    
          })
               
               const data = await result.json();
               
               if(result.ok){
                    localStorage.setItem('token', data);
                    alert("Logged In Successfully"+ " green")
                    navigate('/')
                    navigate(0)
               }else{
                    alert(data+ " red")
               }
          }catch{
               alert("Error: Failed to Fetch Data")
          }
     }

     return(
          <div className="log-container">
               <form className="log-form">
                    <h1>Login</h1>

                    <br />
                    <div>
                         <label>Username</label><br />
                         <input type="text" className="acc-input" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                         <label>Password</label><br />
                         <input type="password" className="acc-input" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button onClick={loginUser}>Login</button>
                    <div>
                         <span>No account yet?</span> <Link to="/register"><span className="log-link">Register</span></Link>
                    </div>
               </form>
          </div>
     )
}


export default Login;