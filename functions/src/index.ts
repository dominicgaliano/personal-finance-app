import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const newUserSignup = functions.auth.user().onCreate((user) => {
  console.log("user created", user.email, user.uid);
  return admin.firestore().collection("users").doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    // TODO: implement these after MVP
    // displayName: user.displayName,
    // photoURL: user.photoURL,
  });
});

export const userDeleted = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});
