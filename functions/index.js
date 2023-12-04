import functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

export const newUserSignup = functions.auth.user().onCreate((user) => {
  // console.log("user created", user.email, user.uid);
  return admin.firestore.collection("users").doc(user.uid).set({
    email: user.email,
  });
});

export const userDeleted = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore.collection("users").doc(user.uid);
  return doc.delete();
});
