import type { ActionResult } from "@sveltejs/kit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  type UserCredential,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";

async function login(
  email: string | undefined,
  password: string | undefined,
  rememberMe: boolean,
): Promise<
  ActionResult<{ credential: UserCredential }, Record<string, string>>
> {
  if (!email || !password) {
    return {
      type: "failure",
      status: 400,
      data: { message: "Email or password are missing" },
    };
 }

  const auth = getAuth();

  try {
    await auth.setPersistence(
      rememberMe ? browserLocalPersistence : browserSessionPersistence,
    );
    // TODO: add email enumeration protection
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return { type: "success", status: 200, data: { credential } };
  } catch (error: unknown) {
    let errorMessage = "";
    if (typeof error === "string") {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "Unknown error";
    }
    return { type: "failure", status: 400, data: { message: errorMessage } };
  }
}

async function register(
  email: string | undefined,
  password: string | undefined,
  confirmPassword: string | undefined,
): Promise<
  ActionResult<{ credential: UserCredential }, Record<string, string>>
> {
  // secondary validation
  // TODO: determine if we can remove other validation and rely on this validation only
  // TODO: can use firebase validation
  // https://firebase.google.com/docs/reference/js/auth.md#validatepassword
  if (!email || !password || !confirmPassword) {
    return {
      type: "failure",
      status: 400,
      data: { message: "Email or password are missing" },
    };
  }

  if (password !== confirmPassword) {
    return {
      type: "failure",
      status: 400,
      data: { message: "Passwords do not match" },
    };
  }

  const auth = getAuth();

  try {
    // TODO: add email enumeration protection
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { type: "success", status: 200, data: { credential } };
  } catch (error: unknown) {
    let errorMessage = "";
    if (typeof error === "string") {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "Unknown error";
    }
    return { type: "failure", status: 400, data: { message: errorMessage } };
  }
}

async function resetPassword(
  email: string | undefined,
): Promise<
  ActionResult<Record<string, string>>
> {
  if (!email) {
    return {
      type: "failure",
      status: 400,
      data: { message: "Email or password are missing" },
    };
 }

  const auth = getAuth();

  try {
    // TODO: add email enumeration protection
    // TODO: specify action code settings
    await sendPasswordResetEmail(auth, email);
    return { type: "success", status: 200};
  } catch (error: unknown) {
    let errorMessage = "";
    if (typeof error === "string") {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "Unknown error";
    }
    return { type: "failure", status: 400, data: { message: errorMessage } };
  }
}

export { login, register, resetPassword };
