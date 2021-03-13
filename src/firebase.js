import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyDO9ZznlL48v0zUM0cx19BYs9bJjs4pABQ",
    authDomain: "bt3103-week-6-5629d.firebaseapp.com",
    projectId: "bt3103-week-6-5629d",
    storageBucket: "bt3103-week-6-5629d.appspot.com",
    messagingSenderId: "142156819107",
    appId: "1:142156819107:web:086ad33169fe6e32dc6d16",
    measurementId: "G-269SMPQZWB"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;