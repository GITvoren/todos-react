import trash from '../assets/images/trash.png'
import edit from '../assets/images/edit.png'
import check from '../assets/images/check.png'
import {useState, useContext, useEffect} from 'react'
import complete from '../assets/images/complete.png'
import ok from '../assets/images/ok.png'
import x from '../assets/images/x.png'
/* import UserContext from '../utilities/UserContext.js' */



function Task({props}){
     const {description, _id} = props
     const [toggleComplete, setToggleComplete] = useState(false)
     const [isEditing, setIsEditing] = useState(false)
     const [newDescription, setNewDescription] = useState(description)

    /*  const {user} = useContext(UserContext) */

    
    
     
    const handleDeleteTask = async () => {
          try{
               const result = await fetch(`http://localhost:3939/tasks/${_id}`, {
                    method: 'DELETE'
               });
  
               if(result.status === 200){
                    alert("Successfully delete task green alert")
               }else {
                    alert("Something went wrong")
               }
               
          }catch(err){
               alert(err.message)
          }
    }

    const handleUpdateTask = async (e) => {
      e.preventDefault();

          try{
               const result = await fetch(`http://localhost:3939/tasks/${_id}`, {
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    method: 'PATCH',
                    body: JSON.stringify({
                         description: newDescription
                    })
               });

               if(result.ok){
                    alert("Successfully updated task")
                    setIsEditing(!isEditing)
               }  else {
                    alert("Something went wrong")
               }

          }catch(err){
               alert(err.message)
          }
    }


     return(
          <div className="task">
               {
                    isEditing
                    ?
                    <div className="edit-flex">
                         <input type="text" className="edit-input" value={newDescription} onChange={(e)=> setNewDescription(e.target.value)} />
                              <div className="flex-row">
                                   <img src={x} onClick={() => setIsEditing(!isEditing)} className="icon" /><button className="edit-btns" onClick={() => setIsEditing(!isEditing)}>CANCEL</button>
                                   <img src={ok} className="icon" onClick={handleUpdateTask} /><button className="edit-btns" onClick={handleUpdateTask} >OK</button>
                              </div>
                    </div>
                    :
                    <>
                    <div className="overflow-div">
                         <img className={toggleComplete? "show logo" : "dont-show logo"} src={complete}></img>
                         <p className={toggleComplete? "completed-task" : ""}>{description}</p>
                    </div>
                    <div className="flex-row">
                         <img src={check} onClick={() => setToggleComplete(!toggleComplete)} className="icon"/><button className="task-btn" onClick={() => setToggleComplete(!toggleComplete)}>COMPLETE</button>
                         <img src={edit} onClick={() => setIsEditing(!isEditing)} className="icon"/><button className="task-btn" onClick={() => setIsEditing(!isEditing)}>EDIT</button>
                         <img src={trash} className="icon" onClick={handleDeleteTask} /><button onClick={handleDeleteTask} className="task-btn">DELETE</button>
                    </div>
                    </>
               }
          </div>
     )
}


export default Task;