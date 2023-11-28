<script lang="ts">
  import { goto } from "$app/navigation";
  import authStore from "../stores/authStore";

  export let redirectPath: string;

  authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
    if (!isLoggedIn && firebaseControlled) {
      await goto(redirectPath || "/login");
    }
  });
</script>

