<script lang="ts">
    import { onMount } from "svelte";
    import { initFirebase } from "$lib/client/firebase";
    import { auth as authStore } from "../stores/auth";
    import { onAuthStateChanged } from "firebase/auth";

    onMount(() => {
        const { auth } = initFirebase();
        onAuthStateChanged(auth, authStore.set);
    });
</script>

<slot />

<!-- FIXME: Dev Only Utility -->
{#if import.meta.env.DEV}
    <div class="fixed-box">
        PLACEHOLDER 
    </div>
{/if}

<style>
  .fixed-box {
    position: fixed;
    bottom: 1%; 
    left: 1%;
    background-color: #3498db;
    color: #fff;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
</style>
