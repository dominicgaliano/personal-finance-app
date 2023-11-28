<script>
    import { goto } from "$app/navigation";
    import authStore from "../stores/authStore";

    authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
        if (!isLoggedIn && firebaseControlled) {
            await goto("/login");
        }
    });
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
