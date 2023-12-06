<script lang="ts">
    import { onMount } from "svelte";
    import { initFirebase } from "$lib/client/firebase";
    // TODO: convert to conditional import
    import AuthStatus from "../components/AuthStatus.svelte";

    onMount(initFirebase);
</script>

<slot />

<!-- FIXME: Dev Only Utility -->
{#if import.meta.env.DEV}
    <AuthStatus />
{/if}
