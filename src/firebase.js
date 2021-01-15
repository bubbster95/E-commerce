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


// export const storage = firebase.storage()

export const getImageFromStore = async (image, divId) => {
  let gsReference = firebase.storage().refFromURL('gs://e-commerce-697c4.appspot.com')

  gsReference.child(image).getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
  
    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    // xhr.onload = function(event) {
    //   var blob = xhr.response;
    // };
    xhr.open('GET', url);
    xhr.send();
  
    // Or inserted into an <img> element:
    var img = document.getElementById(divId);
    img.src = url;
  }).catch(function(error) {

    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
  
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
  
      case 'storage/canceled':
        // User canceled the upload
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;

      default:
    }
  });
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

// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase
