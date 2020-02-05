import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBDTN49UssuKpQzaum2n_v3n7bIIWbtdXk",
    authDomain: "react-ecommerce-a2fcb.firebaseapp.com",
    databaseURL: "https://react-ecommerce-a2fcb.firebaseio.com",
    projectId: "react-ecommerce-a2fcb",
    storageBucket: "react-ecommerce-a2fcb.appspot.com",
    messagingSenderId: "953470754731",
    appId: "1:953470754731:web:b341346b416d54a9763cee",
    measurementId: "G-H6L2ZWKWKW"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //setting up google authentication
const provider =  new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;