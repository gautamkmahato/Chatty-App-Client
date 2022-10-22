import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userAuthContext } from '../context/userAuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {login, user} = useContext(userAuthContext);

  const navigate = useNavigate(); 

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
        await login(email, password);
        navigate('/');
    } catch(err){
        setError(err.message);
    }
  }

  return (
    <>
      <div className='login-form'>
        <h3 className='heading-1'>Login</h3>
        {user ? <div class="alert alert-danger" role="alert">Already logged in</div> : <></>}
        {error ? <div class="alert alert-danger" role="alert">{error}</div> : <></>}
        {user ? <h6 className='heading-6'>USER: {user.email}</h6> : <></>}
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" value={email} onChange={(e) =>{setEmail(e.target.value)}} class="form-control" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary login-btn">Login</button>
        </form>

        <p className='para-1'>or</p>
        <button type="button" class="login-with-google-btn" >Sign in with Google</button>

      </div>
        
    </>
  )
}

export default Login





