import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        active: "no",
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const convertMoviesSnapshotToMap = (movies) => {
  const transformedMovies = movies.docs.map((doc) => {
    const { title, poster, routeName, src_1, src_2, trailer } = doc.data();

    return {
      id: doc.id,
      title,
      poster,
      routeName,
      src_1,
      src_2,
      trailer,
    };
  });

  return transformedMovies.reduce((accumulator, movies) => {
    accumulator[movies.routeName] = movies;
    return accumulator;
  }, {});
};

export const convertSerialsSnapshotToMap = (serials) => {
  const transformedSerials = serials.docs.map((doc) => {
    const {
      title,
      img_src,
      routeName,
      trailer,
      explain,
      genre,
      like,
      disLike,
      casts,
      about,
      country,
      poster,
      year,
      seasons,
    } = doc.data();

    return {
      id: doc.id,
      title,
      img_src,
      routeName,
      trailer,
      explain,
      genre,
      like,
      disLike,
      casts,
      about,
      country,
      poster,
      year,
      seasons,
    };
  });

  return transformedSerials.reduce((accumulator, serials) => {
    accumulator[serials.routeName] = serials;
    return accumulator;
  }, {});
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default app;
