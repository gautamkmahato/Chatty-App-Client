import React, { useContext } from 'react'
import { userAuthContext } from '../context/userAuthContext';

const Home = () => {
    const {user} = useContext(userAuthContext);
    console.log(user)

    return (
      <div>
          <h1>Home</h1>
          {user ? <h3>{user.email}</h3> : <></>}
      </div>
    )
}

export default Home;