import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBqn5LMcn8GA2Ald0XiLgnYvY4hVwfpBq8",
    authDomain: "blog-next-3ebf9.firebaseapp.com",
    projectId: "blog-next-3ebf9",
    storageBucket: "blog-next-3ebf9.appspot.com",
    messagingSenderId: "428353141495",
    ppId: "1:428353141495:web:0cf08a6dc8cff965f6b1f2",
    measurementId: "G-DX1R05D8VQ"
}

if  (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

