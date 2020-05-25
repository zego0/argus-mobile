import firebase from "firebase";
import 'firebase/firestore';


export const App0 = firebase.initializeApp({
    apiKey: "AIzaSyDm5IxVz_06MLl3u-7Kq32sZ5NfWQWn5k8",
    authDomain: "argus-vision.firebaseapp.com",
    databaseURL: "https://argus-vision.firebaseio.com",
    projectId: "argus-vision",
    storageBucket: "argus-vision.appspot.com",
    messagingSenderId: "617770790711"
 });

export const db = firebase.firestore()
export default firebase
