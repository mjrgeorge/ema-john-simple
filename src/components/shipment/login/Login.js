import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../../firebase.config";
import { UserContext } from '../../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

function Login() {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    password : '',
    photo : '',
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = ()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res=>{
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo : '',
        error : '',
        success: '',
      }
      setUser(signedOutUser);
    })
    .catch(err =>{

    })
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
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        const newUserInfo = {...user};
        newUserInfo.error = "";
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(error=> {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        const newUserInfo = {...user};
        newUserInfo.error = "";
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log('Sign In User Info', res.user);
      })
      .catch(error=> {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
  }

  const updateUserName = name=>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('User Name updated successfully');
    }).catch(function(error) {
      console.log(error);
    });
  }

  const handleFBLogin = ()=>{
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  return (
    <div style={{textAlign: 'center'}}>
      {user.isSignedIn
      ? <button onClick={handleSignOut}>Sign Out</button>
      : <button onClick={handleSignIn}>Sign In</button>}
      <br/>
      <button onClick = {handleFBLogin}>Sign In Using Facebook</button>
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
      </form>
      <p style= {{color: "red"}}> {user.error} </p>
      {user.success&&<p style= {{color: "green"}}>User {newUser? 'Created' : 'Logged In'} Successfully</p>}
    </div>
  );
}

export default Login;
