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

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth)  return;

    const userRef =  firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        userRef.set({displayName, email, createdAt, ...additionalData});
        
      } catch (error) {
        console.log('Error creating user ', error.message);
      }
    }

    return userRef;

  }

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);
}


  //setting up google authentication
const provider =  new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;