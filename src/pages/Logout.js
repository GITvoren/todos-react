import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../utilities/UserContext.js';

function Logout(){
     const {unsetUser} = useContext(UserContext);
     const navigate = useNavigate();

     useEffect(() => {

          unsetUser();
          navigate('/');
          navigate(0);

     }, [])

     return
}

export default Logout;