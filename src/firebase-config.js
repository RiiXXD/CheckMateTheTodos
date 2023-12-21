// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "checkmate-52204.firebaseapp.com",
  projectId: "checkmate-52204",
  storageBucket: "checkmate-52204.appspot.com",
  messagingSenderId: "345752138822",
  appId:  `${process.env.REACT_APP_FIREBASE_API_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


// //register someone new to our app
// const registerWithEmailAndPassword = async (name,email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth,email, password);
//     console.log(email);
//     const user = res.user;
//     await addDoc(collection(db, "userData"), {
//       uid: user.uid,
//       name,
//     //   authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// //send a reset link
// // const sendPasswordReset = async (email) => {
// //   try {
// //     await sendPasswordResetEmail(auth, email);
// //     alert("Password reset link sent!");
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //   }
// // };


export { db, auth }