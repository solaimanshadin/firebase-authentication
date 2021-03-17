import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import Header from './components/Header';
import Home from "./components/Home";
import Profile from "./components/Profile";
import { firebaseConfig } from './firebase.config';
import image from './images/authentication.svg';
import googleSignInButton from './images/google-signin.png';


firebase.initializeApp(firebaseConfig);

function App() {
  const [option, setOption] = useState('register');

  console.log(option)
  const [formData, setFormData] = useState({ email: null, password: null });
  const [user, setUser] = useState();

  const onChangeHandler = (e) => {
    const key = e.target.name
    setFormData({ ...formData, [key]: e.target.value })
  }

  const signUp = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }


  const signIn = (e) => {
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setUser(user.email)
        console.log("success", user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error", errorMessage);
      });

  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <div className="container">

            <div className="row align-items-center" style={{ height: '100vh' }}>
              {
                user && <h1 className="text-center">Welcome {user}</h1>
              }
              {
                !user &&
                <>
                  {/* Image */}
                  <div className="col-md-7 pe-5">
                    <img src={image} className="img-fluid" alt="Authentication" />
                  </div>

                  <div className="col-md-5">
                    <div className="tab bg-light p-2 rounded mb-3 row">
                      <button onClick={() => setOption('register')} className={`btn ${option === 'register' ? 'btn-primary' : 'btn-light'}  col`}>Register</button>
                      <button onClick={() => setOption('login')} className={`btn ${option === 'login' ? 'btn-primary' : 'btn-light'}  col`}>Login</button>
                    </div>
                    <form className="form my-4">
                      <div className="mb-3">
                        <input name="email" onChange={(e) => onChangeHandler(e)} type="email" placeholder="Email" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <input name="password" onChange={(e) => onChangeHandler(e)} type="password" placeholder="Password" className="form-control" />
                      </div>
                      <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">Remember me</label>
                      </div>
                      <div className="mb-3 d-grid">
                        {
                          option === 'register' ?
                            <button type="submit" onClick={signUp} className="btn btn-primary">Register</button>
                            :
                            <button type="submit" onClick={signIn} className="btn btn-primary">Login</button>
                        }
                        <div className="d-flex justify-content-center align-items-center mt-4 text-secondary">
                          <span className="me-2">Or, </span>
                          <img style={{width:200, cursor: 'pointer'}}  src={googleSignInButton} alt=""/>
                        </div>
                        
                      </div>
                    </form>
                  </div>
                </>
              }

            </div>
          </div>
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
