import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCsK5qRq8YWUOPQEx7lWnx8stOVvbw59_I",
    authDomain: "discord-clone-live-c4239.firebaseapp.com",
    databaseURL: "https://discord-clone-live-c4239.firebaseio.com",
    projectId: "discord-clone-live-c4239",
    storageBucket: "discord-clone-live-c4239.appspot.com",
    messagingSenderId: "631638670018",
    appId: "1:631638670018:web:f847545658d2d19659195b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db