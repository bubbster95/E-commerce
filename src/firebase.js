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

const storage = firebase.storage();

// Adds images to firebase 
export const addImageToStore = async (image, newName) => {
  let uploadTask = storage.ref(`${newName}`).put(image)
  uploadTask.on(
    "state_changed",
    snapshot => {},
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("")
        .child(newName)
        .getDownloadURL()
        .then(url => {
          console.log(url);
        })
    }
  )
}

export const addRemoveCollection = async (newCollection, selector, pleaseDelete) => {
  if (selector === 'category') {
    let category = firestore.doc(`categories/eFvTcJ1ZELsGSb2AK6Fp`);
    if (pleaseDelete) {
      let categoryName = newCollection.title.toLowerCase()
      let thisCategory = firestore.collection('categories').doc(`eFvTcJ1ZELsGSb2AK6Fp`)
      // delete the document
      thisCategory.update({
        [categoryName]: firebase.firestore.FieldValue.delete()
      })
    } else {
      category.update(newCollection);
    }
  } else {
    let product = firestore.doc(`products/Kmz9ievzdZKNjem6Q4mp`);
    product.update(newCollection);
  }
}

// Pulls image refrence from fibase then sets it as a BG style to a uniq div
export const getBGImageFromStore = async (divId, image, thumb) => {
  let gsReference = firebase.storage().refFromURL(`gs://${config.storageBucket}`)
  gsReference.child(image).getDownloadURL().then(function(url) {
    // Inserted into a <Div> element:
    let img = document.getElementById(divId);
    img.style.backgroundImage = `url(${url}`;
    
    // Adds a thumbnail if specified
    if (thumb) {
      let thumbNail = document.getElementById(thumb) 
      thumbNail.style.backgroundImage = `url(${url}`;
    }
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

export const collectByTags = async (tag) => {
  let collection = firestore.collection('products')
  let info;
  await collection
  .where('tags', "array-contains-any", tag)
  .get()
  .then( document => {
    // If there are items with the selected tag; group them into info.
    if (!document.empty) {
      info = Object.keys(document.docs).map(doc => {
        return document.docs[doc].data()
      })
    } else {
      console.log('No such document')
    }
  })
  return info
}

// returns the info object for one product or all products
export const collectionInfo = async (selector, sku) => {
  let collection;
  let info;
  if (selector === 'product') {
    collection = firestore.collection(`products`)
    await collection
    .where('sku', '==',  sku)
    .get()
    .then(document => {
      if (document) {
        info = document.docs[0].data()
      } else {
        console.log('No such document', sku)
      }
  })
  } else {
    collection = firestore.doc(`categories/LjDayMEFWras6WWmdWJ7`)
    await collection
      .get()
      .then(function(doc) {
        if (doc.exists) {
          info = doc.data()
        } else {
          console.log('No such document')
        }
    })
  }
  return info
}

// creates profile data for each user
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
