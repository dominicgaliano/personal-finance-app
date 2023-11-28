<script lang="ts">
    import { onMount } from "svelte";
    import { initFirebase } from "$lib/client/firebase";
    import authStore from "../stores/authStore";
    // TODO: convert to conditional import
    import AuthStatus from "../components/AuthStatus.svelte";

    onMount(() => {
        const { auth } = initFirebase();
        auth.onAuthStateChanged((user) => {
            authStore.set({
                isLoggedIn: user !== null,
                user: user ?? undefined,
                firebaseControlled: true,
            });
        });
    });
</script>

<slot />

<!-- FIXME: Dev Only Utility -->
{#if import.meta.env.DEV}
    <AuthStatus />
{/if}
