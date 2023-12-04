import { applyAction } from "$app/forms";
import { deleteAccount } from "$lib/client/authUtils";

async function handleSubmit(
  this: HTMLFormElement,
  event: unknown,
): Promise<void> {
  const formData = new FormData(this);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // delete user
    const deleteResponse = await deleteAccount(email, password);

    if (deleteResponse.type !== "success") {
      applyAction(deleteResponse);
      return;
    }

    // logout
    await fetch("/logout", {
      method: "POST",
    });
    applyAction({ type: "redirect", status: 202, location:"/login" });
  } catch (error) {
    // TODO: add HTTP error number
    applyAction({ type: "error", error: error });
  }
}

export { handleSubmit };
