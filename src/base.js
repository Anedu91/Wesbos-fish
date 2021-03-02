import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBItOoRxiQ2k36pB84U4Vla2h3rsnmrFG4",
  authDomain: "catch-of-the-day-11921.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-11921.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//This is a name export
export { firebaseApp };

// This is a default export

export default base;
