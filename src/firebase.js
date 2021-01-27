import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDo-354r407qIx52VH7hqnXL3S1R_LD7Ts",
    authDomain: "e-commerce-697c4.firebaseapp.com",
    databaseURL: "https://e-commerce-697c4-default-rtdb.firebaseio.com",
    projectId: "e-commerce-697c4",
    storageBucket: "e-commerce-697c4.appspot.com",
    messagingSenderId: "300331957580",
    appId: "1:300331957580:web:def105896d8e1c5d09a3e9",
    measurementId: "G-ZP0DFGV3YW"
  };
// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export const getImageFromStore = async (divId, bucket, image) => {
  let gsReference = firebase.storage().refFromURL(bucket)

  gsReference.child(image).getDownloadURL().then(function(url) {
    // Inserted into an <img> element:
    let img = document.getElementById(divId);
    img.src = url;
  }).catch(function(error) {

    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
  
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;

      default:
    }
  });
} 

export const categories = async (skew) => {
  let category = firestore.doc(`categories/LjDayMEFWras6WWmdWJ7`)
  let categories;
  await category
    .get()
    .then(function(doc) {
      if (doc.exists) {
        if (skew) {
          categories = doc.data()[skew]
        } else {
          categories = doc.data()
        }
      } else {
        console.log('No such document')
      }
  })
  return categories
}

export const productInfo = async (skew) => {
  let products = firestore.doc(`products/e6KdQuiqvS6t9fAj0hZT`)
  let productInfo;
  await products
    .get()
    .then(function(doc) {
      if (doc.exists) {
        if (skew) {
          productInfo = doc.data()[skew]
        } else {
          productInfo = doc.data()
        }
      } else {
        console.log('No such document')
      }
  })
  return productInfo
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase
