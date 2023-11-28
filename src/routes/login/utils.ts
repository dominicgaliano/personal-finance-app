import { applyAction, deserialize } from "$app/forms";
import { invalidateAll } from "$app/navigation";
import { login } from "$lib/client/authUtils";

async function handleSubmit(event: {
  currentTarget: EventTarget & HTMLFormElement;
}): Promise<void> {
  const formData = new FormData(event.currentTarget);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // login user
    const loginResponse = await login(email, password);

    if (loginResponse.type !== "success") {
      applyAction(loginResponse);
      return;
    }

    const { data } = loginResponse;

    if (!data?.credential) {
      throw new Error("No credential returned");
    }

    const user = data.credential.user;
    formData.set("token", await user.getIdToken());

    // respond to form
    const response = await fetch(event.currentTarget.action, {
      method: "POST",
      body: formData,
    });
    const result = deserialize(await response.text());
    if (result.type === "success") {
      await invalidateAll();
    }
  } catch (error) {
    // TODO: add HTTP error number
    applyAction({ type: "error", error: error });
  }
}

async function handleResetPassword(event): Promise<void> {}
export { handleSubmit, handleResetPassword };
