import { applyAction } from "$app/forms";
import { resetPassword } from "$lib/client/authUtils";

async function handleSubmit(
  this: HTMLFormElement,
  event: unknown,
): Promise<void> {
  const formData = new FormData(this);

  const email = formData.get("email") as string;

  try {
    // send password reset request
    const resetPasswordResponse = await resetPassword(email);

    if (resetPasswordResponse.type !== "success") {
      applyAction(resetPasswordResponse);
      return;
    }

    applyAction({...resetPasswordResponse, data: {success: true}});
  } catch (error) {
    // TODO: add HTTP error number
    applyAction({ type: "error", error: error });
  }
}

export { handleSubmit };
