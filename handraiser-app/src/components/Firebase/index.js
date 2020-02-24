import firebase from 'firebase/app'
import 'firebase/storage'
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDOQzU1GZmWxVm4K4ZPcAJfYlfUc1yKBrU",
    authDomain: "upload-images-937d8.firebaseapp.com",
    databaseURL: "https://upload-images-937d8.firebaseio.com",
    projectId: "upload-images-937d8",
    storageBucket: "upload-images-937d8.appspot.com",
    messagingSenderId: "697287068013",
    appId: "1:697287068013:web:c6bd41c209ae8f10013264",
    measurementId: "G-K54KBCT40X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
    export {
        storage, firebase as default
    }