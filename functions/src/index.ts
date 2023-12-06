import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const MAX_RETRY_ATTEMPTS = 3;

initializeApp();
const firestore = getFirestore();

export const newUserSignup = functions.auth.user().onCreate((user) => {
  console.log("user created", user.email, user.uid);
  // return firestore.collection("users").doc(user.uid).set({
  //   uid: user.uid,
  //   email: user.email,
  //   // TODO: implement these after MVP
  //   // displayName: user.displayName,
  //   // photoURL: user.photoURL,
  // });

  const writer = firestore.bulkWriter();
  writer.set(firestore.collection("users").doc(user.uid), {
    uid: user.uid,
    email: user.email,
    // TODO: implement these after MVP
    // displayName: user.displayName,
    // photoURL: user.photoURL,
  });

  writer.create(
    firestore.collection("data").doc(user.uid).collection("transactions").doc(),
    {
      amount: 1.0,
      category: "Income",
      date: new Date(),
      description: "Demo Transaction",
      isExpense: false,
    },
  );

  return writer.close();
});

// // TEMPORARY, WILL CONVERT TO BATCHED TRANSACTION
// export const newUserSignupTemp = functions.auth.user().onCreate((user) => {
//   console.log("user demo transaction created", user.email, user.uid);
//   return firestore
//     .collection("data")
//     .doc(user.uid)
//     .collection("transactions")
//     .add({
//       amount: 1.0,
//       category: "Income",
//       date: new Date(),
//       description: "Demo Transaction",
//       isExpense: false,
//     });
// });

export const userDeleted = functions.auth.user().onDelete((user) => {
  const doc = firestore.collection("users").doc(user.uid);
  return doc.delete();
});

export const userDeletedTemp = functions.auth.user().onDelete((user) => {
  const docRef = firestore.collection("data").doc(user.uid);
  const bulkWriter = firestore.bulkWriter();
  bulkWriter.onWriteError((error) => {
    if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
      return true;
    } else {
      console.log("Failed write at document: ", error.documentRef.path);
      return false;
    }
  });
  return firestore.recursiveDelete(docRef, bulkWriter);
});
