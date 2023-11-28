<script lang="ts">
    import { onMount } from "svelte";
    import { initFirebase } from "$lib/client/firebase";
    import { auth as authStore } from "../stores/auth";
    import { onAuthStateChanged } from "firebase/auth";
    // TODO: convert to conditional import
    import AuthStatus from "../components/AuthStatus.svelte";

    onMount(() => {
        const { auth } = initFirebase();
        onAuthStateChanged(auth, authStore.set);
    });
</script>

<slot />

<!-- FIXME: Dev Only Utility -->
{#if import.meta.env.DEV}
    <AuthStatus />
{/if}
