import trash from '../assets/images/trash.png'
import edit from '../assets/images/edit.png'
import check from '../assets/images/check.png'
import {useState} from 'react';
import complete from '../assets/images/complete.png'

function Task(){

     const [toggleComplete, setToggleComplete] = useState(false)

     

     return(
          <div className="task">
               <img className={toggleComplete? "show logo" : "dont-show logo"} src={complete}></img>
               <p className={toggleComplete? "completed-task" : ""}>task descas asdasdasdasdasdas</p>
               <div className="flex-row">
                    <img src={check} onClick={() => setToggleComplete(!toggleComplete)} className="icon"/><button className="task-btn" onClick={() => setToggleComplete(!toggleComplete)}>COMPLETE</button>
                    <img src={edit} className="icon"/><button className="task-btn">EDIT</button>
                    <img src={trash} className="icon"/><button className="task-btn">DELETE</button>
              </div>
          </div>
     )
}


export default Task;