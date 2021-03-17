
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../firebase.config';
import React , { useState, createContext, useContext } from 'react';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const value = useAuth()
    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}



export const useAuth = () => {
    
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const googleSignIn = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
  
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
  
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          setUser(user)
          console.log("success", user);
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorMessage = error.message;
          setError(errorMessage)
          // ...
        });
  
    }
    const signUp = (email, password) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
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
  
  
    const signIn = (email, password) => {
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          setUser(user)
          console.log("success", user);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setError(errorMessage)
          console.log("error", errorMessage);
        });
  
    }
  
    const signOut = () => {
      firebase.auth().signOut().then(() => {
        setUser(null);
  
        console.log("Sign out");
      }).catch((error) => {
        // An error happened.
        console.log("Error khaisi");
      });
      
    }
  
    return {
      user,
      signOut,
      signIn,
      signUp,
      error,
      googleSignIn
    }
  }
  