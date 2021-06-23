import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyA64oGscHXZOBvrXBsdfJGmqrd5K78edP8",
    authDomain: "lbrchat-e1a15.firebaseapp.com",
    databaseURL: "https://lbrchat-e1a15-default-rtdb.firebaseio.com",
    projectId: "lbrchat-e1a15",
    storageBucket: "lbrchat-e1a15.appspot.com",
    messagingSenderId: "135409511452",
    appId: "1:135409511452:web:84f83a6ce2f1534e7143d9"
}
firebase.initializeApp(firebaseConfig)

 const auth = firebase.auth()
 const database = firebase.database()
 export {firebase, auth, database}