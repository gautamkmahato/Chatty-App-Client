import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userAuthContext } from '../context/userAuthContext';

const ProtectedRoute = ({children, ...rest}) => {
    const {user} = useContext(userAuthContext);
    const [data, setData] = useState('');

    const navigate = useNavigate()
    
    useEffect(() =>{
      const setUserFromSession = () =>{
        const userData = sessionStorage.getItem("firebase:authUser:AIzaSyB9ysVFNNwgBak_vSv4vouegu9spCW86x4:[DEFAULT]")
        setData(userData);
      }
      setUserFromSession();
    })
    
    return user || data ? children : navigate("/login")
    
}

export default ProtectedRoute