
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import Header from './components/Header';
import Home from "./components/Home";
import Profile from "./components/Profile";
import { AuthProvider, useAuth } from './customHooks/useAuth';
import image from './images/authentication.svg';
import googleSignInButton from './images/google-signin.png';


function App() {
  const [option, setOption] = useState('register');

  console.log("auth hook",useAuth)
  const { user, signOut, signIn, signUp, error, googleSignIn} = useAuth() || {};
  console.log(option)
  const [formData, setFormData] = useState({ email: null, password: null });


  const onChangeHandler = (e) => {
    const key = e.target.name
    setFormData({ ...formData, [key]: e.target.value })
  }

  // console.log("user from app.js", user);

  return (

    <Router>
      <AuthProvider>
      <Header  />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <div className="container">

            <div className="row align-items-center" style={{ height: '100vh' }}>

              <>
                {/* Image */}
                <div className="col-md-7 pe-5">
                  <img src={image} className="img-fluid" alt="Authentication" />
                </div>

                <div className="col-md-5">
                  {
                    error && <p className="text-danger">{error}</p>
                  }
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
                          <button type="button" onClick={ () => signUp(formData.email ,formData.password )} className="btn btn-primary">Register</button>
                          :
                          <button type="button" onClick={() => signIn(formData.email, formData.password)} className="btn btn-primary">Login</button>
                      }
                      <div className="d-flex justify-content-center align-items-center mt-4 text-secondary">
                        <span className="me-2">Or, </span>
                        <img onClick={googleSignIn} style={{ width: 200, cursor: 'pointer' }} src={googleSignInButton} alt="" />
                      </div>

                    </div>
                  </form>
                </div>
              </>

            </div>
          </div>
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
