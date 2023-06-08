import trash from '../assets/images/trash.png'
import edit from '../assets/images/edit.png'
import check from '../assets/images/check.png'
import {useState, useContext, useEffect} from 'react'
import complete from '../assets/images/complete.png'
import ok from '../assets/images/ok.png'
import x from '../assets/images/x.png'
/* import UserContext from '../utilities/UserContext.js' */
import AlertContext from '../utilities/AlertContext.js'



function Task({props}){
     const {description, _id, completed} = props
     const [toggleComplete, setToggleComplete] = useState(completed)
     const [isEditing, setIsEditing] = useState(false)
     const [newDescription, setNewDescription] = useState(description)
     const { notifyerror } = useContext(AlertContext)

    /*  const {user} = useContext(UserContext) */ 
    

    const handleCompletedTask = async () => {
          try{
               const result = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${_id}/complete`, {
                    method: 'PATCH'
               })

          }catch(err){
               notifyerror(err.message)
          }
    }
     
    const handleDeleteTask = async () => {
          try{
               const result = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${_id}`, {
                    method: 'DELETE'
               });

               const data = await result.json();
  
               if(result.status === 200){
                    console.log(data)
               }else {
                    notifyerror("Something went wrong")
               }          
          }catch(err){
               notifyerror(err.message)
          }
    }

    const handleUpdateTask = async () => {

          try{
               const result = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${_id}`, {
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    method: 'PATCH',
                    body: JSON.stringify({
                         description: newDescription
                    })
               });

               const data = await result.json()
               if(result.ok){             
                    console.log(data)
                    setIsEditing(!isEditing)
               }  else {
                    notifyerror(data)
               }
               
          }catch(err){
               notifyerror(err.message)
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
                         <img className={completed? "show logo" : "dont-show logo"} src={complete}></img>
                         <p className={completed? "completed-task" : ""}>{description}</p>
                    </div>
                    <div className="flex-row">
                         <img src={check} onClick={handleCompletedTask} className="icon"/><button onClick={handleCompletedTask} className="task-btn" >COMPLETE</button>
                         <img src={edit} onClick={() => setIsEditing(!isEditing)} className="icon"/><button className="task-btn" onClick={() => setIsEditing(!isEditing)}>EDIT</button>
                         <img src={trash} className="icon" onClick={handleDeleteTask} /><button onClick={handleDeleteTask} className="task-btn">DELETE</button>
                    </div>
                    </>
               }
          </div>
     )
}


export default Task;