<script lang="ts">
    import authStore from "../stores/authStore";
    import { onDestroy } from "svelte";
    import type { authStoreState } from "../stores/authStore.d";

    let authStatus: authStoreState;
    const unsubscribe = authStore.subscribe((value) => (authStatus = value));

    onDestroy(unsubscribe);
</script>

<div class="fixed-box">
    {#if authStatus.isLoggedIn}
        Authenticated as <span class="font-bold">{$authStore}</span>
    {:else}
        No one is authenticated
    {/if}
</div>

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
    .font-bold {
        font-weight: bold;
    }
</style>
