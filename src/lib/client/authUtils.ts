import type { ActionResult } from "@sveltejs/kit";
import {
  getAuth,
  signInWithEmailAndPassword,
  type UserCredential,
} from "firebase/auth";

async function login(
  email: string | undefined,
  password: string | undefined,
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

export { login };
