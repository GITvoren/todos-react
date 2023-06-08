import { createContext } from 'react';
import { toast } from 'react-toastify';

const AlertContext = createContext();

export function AlertProvider({children}){

     const notifyerror = (error) => {
          return toast.error(error, {
               position: "top-center",
               autoClose: 4000,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
               });
     }

     const notifysuccess = (success) => {
          return toast.success(success, {
               position: "top-center",
               autoClose: 1000,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
               });
     }

     return(
          <AlertContext.Provider value={{notifyerror, notifysuccess}}>
               {children}
          </AlertContext.Provider>
     )
}

export default AlertContext;