import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();
const defaultFirestore = getFirestore();

export const newUserSignup = functions.auth.user().onCreate((user) => {
  console.log("user created", user.email, user.uid);
  return defaultFirestore.collection("users").doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    // TODO: implement these after MVP
    // displayName: user.displayName,
    // photoURL: user.photoURL,
  });
});

export const userDeleted = functions.auth.user().onDelete((user) => {
  const doc = defaultFirestore.collection("users").doc(user.uid);
  return doc.delete();
});
