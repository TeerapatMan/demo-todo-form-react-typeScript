import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy9isfNfk4gk4AtX0lxFKCzPTyCy9-gWE",
  authDomain: "fir-react-typescript.firebaseapp.com",
  databaseURL: "https://fir-react-typescript.firebaseio.com",
  projectId: "fir-react-typescript",
  storageBucket: "fir-react-typescript.appspot.com",
  messagingSenderId: "40882090350",
  appId: "1:40882090350:web:68a8707949f5763d80517f",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
