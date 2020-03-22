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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  //here because want to prevent a situation where while looping through the array and setting the data in firestore
  //And lets say for instance something happens like loss of internet connectivity and the creation of the data from the array stops have way.
  //We would be using a firebase batch to do the writing of the data
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); //this will enable us to generate a unique key for each document
    batch.set(newDocRef, obj);
  });

  return  await batch.commit(); //batch.commit() returns a promise if the commit is successful then it resolves to a void


}

export const convertCollectionsSnapshotToMap = (collections) => {
   const transformedCollecion = collections.docs.map(doc => {
    const {title, items} = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      items,
      title
    }
   })
   return transformedCollecion.reduce((accumulator, collection) => {
     accumulator[collection.title.toLowerCase()] = collection;
     return accumulator;

   }, {})

}



export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject); 
  })
}

  //setting up google authentication
export const googleProvider =  new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;