import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFBSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrameworks, signInWithEmailAndPassword, resetPassword} from './LoginManager';


function Login() {
  document.title = 'Login';
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    password : '',
    photo : '',
  });

  initializeLoginFrameworks();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
const googleSignIn = () => {
  handleGoogleSignIn()
  .then(res => {
    handleResponse(res, true);
  })
};

const fbSignIn = () => {
  handleFBSignIn()
  .then(res => {
    handleResponse(res, true);
  })
};

const signOut = () => {
  handleSignOut()
  .then(res => {
    handleResponse(res, false);
  })
};

const handleResponse = (res, redirect)=>{
  setUser(res);
  setLoggedInUser(res);
  if(redirect){
    history.replace(from);
  }
}

  const handleBlur = (e) =>{
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) =>{
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }

  return (
    <div style={{textAlign: 'center'}}>
      {user.isSignedIn
      ? <button onClick={signOut}>Sign Out</button>
      : <button onClick={googleSignIn}>Sign In</button>}
      <br/>
      <button onClick = {fbSignIn}>Sign In Using Facebook</button>
      {user.isSignedIn &&
      <div>
        <h2>Welcome, {user.name}</h2>
        <h3>{user.email}</h3>
        <img src={user.photo} alt=""/>
      </div>}
      <h1>Our Own Authentication</h1>
      <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)} id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser&&<input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name"/>}
        <br/>
        <input type="email" name="email" onBlur={handleBlur} placeholder="Enter Your Email"/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password"/>
        <br/>
        <input type="submit" value={newUser? "Sign Up": "Sign In"}/>
        <br/>
        <button onClick = {() =>resetPassword(user.email)}>Forget Or Reset Password</button>
      </form>
      <p style= {{color: "red"}}> {user.error} </p>
      {user.success&&<p style= {{color: "green"}}>User {newUser? 'Created' : 'Logged In'} Successfully</p>}
    </div>
  );
}

export default Login;
