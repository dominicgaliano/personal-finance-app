import type { ActionResult } from "@sveltejs/kit";
import { getAuth, signInWithEmailAndPassword, type UserCredential } from "firebase/auth";

// async function login(
//   email: string | undefined,
//   password: string | undefined,
// ): Promise<
//   ActionResult<{ credential: UserCredential }, Record<string, string>>
// > {
// }

async function handleSubmit(
  this: HTMLFormElement,
  event: unknown,
): Promise<void> {
  // TODO: handle form submission here
  alert("Not implemented yet");
}

async function handleResetPassword(
  this: HTMLFormElement,
  event: unknown,
): Promise<void> {
  // TODO: handle reset password request here
  alert("Not implemented yet");
}

export { handleSubmit, handleResetPassword };
