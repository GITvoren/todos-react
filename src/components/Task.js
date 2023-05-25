import trash from '../assets/images/trash.png'
import edit from '../assets/images/edit.png'
import check from '../assets/images/check.png'

function Task(){
     return(
          <div className="task">
               <p>task descas asdasdasdasdasdas</p>
               <div className="flex-row">
                    <img src={check} className="icon"/><button className="task-btn">COMPLETE</button>
                    <img src={edit} className="icon"/><button className="task-btn">EDIT</button>
                    <img src={trash} className="icon"/><button className="task-btn">DELETE</button>
              </div>
          </div>
     )
}


export default Task;