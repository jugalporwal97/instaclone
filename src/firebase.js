
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    
    apiKey: "AIzaSyD57DG8xJwVT9h1yeqJnv8C3DFlqGWeVPg",
    authDomain: "instaclone-5e896.firebaseapp.com",
    databaseURL: "https://instaclone-5e896.firebaseio.com",
    projectId: "instaclone-5e896",
    storageBucket: "instaclone-5e896.appspot.com",
    messagingSenderId: "95148486532",
    appId: "1:95148486532:web:76c429773b84931472f7d1"

})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {db,auth,storage}