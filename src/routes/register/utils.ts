import { applyAction, deserialize } from "$app/forms";
import { invalidateAll } from "$app/navigation";
import { register } from "$lib/client/authUtils";

async function handleSubmit(
  this: HTMLFormElement,
  event: unknown,
): Promise<void> {
  const formData = new FormData(this);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  try {
    // register user
    const registerResponse = await register(email, password, confirmPassword);

    if (registerResponse.type !== "success") {
      applyAction(registerResponse);
      return;
    }

    const { data } = registerResponse;

    if (!data?.credential) {
      throw new Error("No credential returned");
    }

    const user = data.credential.user;
    formData.set("token", await user.getIdToken());

    // respond to form
   
    const response = await fetch(this.action, {
      method: "POST",
      body: formData,
    });

    const result = deserialize(await response.text());
    if (result.type === "success") {
      await invalidateAll();
    }
    
    applyAction(result);

  } catch (error) {
    // TODO: add HTTP error number
    applyAction({ type: "error", error: error });
  }
}

export { handleSubmit };
