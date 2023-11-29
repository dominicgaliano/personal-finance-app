import admin from "firebase-admin";
import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

// TODO: make this an absolute path
// TODO: figure out how to use env variable
import serviceAccount from "../../../key.json";

const initializeFirebase = () => {
  if (!admin.apps.length) {
    if (import.meta.env.VITE_FIREBASE_USE_EMULATOR === "true") {
      console.log('run')
      process.env["FIREBASE_AUTH_EMULATOR_HOST"] = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST;
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
};

export async function decodeToken(
  token: string,
): Promise<DecodedIdToken | null> {
  if (!token) {
    return null;
  }

  try {
    initializeFirebase();

    return await admin.auth().verifyIdToken(token);
  } catch (err) {
    console.error("An error occurred validating token", (err as Error).message);
    return null;
  }
}
