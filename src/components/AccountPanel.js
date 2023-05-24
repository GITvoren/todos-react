import '../assets/css/accountpanel.css'
import {useState, useRef} from 'react'


function AccountPanel(){

     const [toggled, setToggled] = useState(false)
     const ref = useRef(null);
     const ref2 = useRef(null);

     const toggle = () => {
          const logForm = ref.current
          const regForm = ref2.current
          
          if(!toggled){
               logForm.classList.toggle('hidden')
               regForm.classList.toggle('show')
          } else{
               
               regForm.classList.toggle('hidden')
               logForm.classList.toggle('show')
          }

     }


     return(
          <div className="acc-panel show">
               <h1>&#123;todos&#125;</h1>
               <form className="log-form" ref={ref}>
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
                         <span>No account yet?</span> <span onClick ={toggle} className="log-link">Register</span>
                    </div>
               </form>

               <form className="reg-form hidden" ref={ref2}>
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
                         <span>Already have an account?</span> <span onClick = {toggle} className="log-link">Login</span>
                    </div>
               </form>
          </div>
     )
}

export default AccountPanel;