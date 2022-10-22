import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuthContext } from '../context/userAuthContext';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {signUp} = useContext(userAuthContext);

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            await signUp(email, password);
            navigate('/login')
        } catch(err){
            setError(err.message);
        }
    }

    return (
        <>
            <div className='login-form'>
                <h3 className='heading-1'>Signup</h3>
                {error ? <div class="alert alert-danger" role="alert">{error}</div> : <></>}
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) =>{setEmail(e.target.value)}} class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} class="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary login-btn">Signup</button>
                </form>

                <p className='para-1'>or</p>
                <button type="button" class="login-with-google-btn" >Sign up with Google</button>

            </div>
        </>
    )
}

export default SignUp