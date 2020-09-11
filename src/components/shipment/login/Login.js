import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../../firebase.config";

firebase.initializeApp(firebaseConfig);

function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: ""
  });
  const handleSignIn = ()=> {
    firebase.auth().signInWithPopup(provider)
    .then(res=> {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch(err =>{
      console.log(err)
      console.log(err.message);
    })
  }
  const handleSignOut =()=>{
    firebase.auth().signOut()
    .then(res=>{
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      setUser(signedOutUser);
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
  }

  const handleSubmit = (e) => {
    if(newUser && user.email&&user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(error=> {
        const newUserInfo={...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      })
      if(!newUser&&user.email&&user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res=>{
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log('sign in user info', res.user);
        })
        .catch(function(error){
          const newUserInfo={...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        })
      }
    }
    e.preventDefault();
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function(){
      console.log('User name updated successfully')
    }).catch(function(error){
      console.log(error);
    });
  }

  return (
    <div style= {{textAlign: 'center'}}>
      {
        user.isSignedIn ?
        <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn&& <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser"/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser&& <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name"/>}
        <br/>
        <input type="email" name="email" onBlur={handleBlur} placeholder="Enter Your Email" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required/>
        <br/>
        <input type="submit" value={newUser?'Sign Up':'Sign In'}/>
      </form>
      <p style= {{color: 'red'}}> {user.error} </p>
      {user.success && <p style= {{color: 'green'}}>User {newUser ? 'Created' : 'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;
