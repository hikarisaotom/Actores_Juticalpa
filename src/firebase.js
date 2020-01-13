import firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth'

let firebaseConfig = {
  apiKey: "AIzaSyC1qbIesH2aXgbb_uJbsHVxUz_jV58G300",
  authDomain: "plataforma-actores-juticalpa.firebaseapp.com",
  databaseURL: "https://plataforma-actores-juticalpa.firebaseio.com",
  projectId: "plataforma-actores-juticalpa",
  storageBucket: "plataforma-actores-juticalpa.appspot.com",
  messagingSenderId: "518485770856",
  appId: "1:518485770856:web:44dfaa39c76f790ee871dd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const database = firebase.firestore();
const firestore = firebase.firestore();
firebase.firestore().enablePersistence({synchronizeTabs:true})
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully


export {
  database as database,
  firebase as firebase,
  firestore as firestore
}