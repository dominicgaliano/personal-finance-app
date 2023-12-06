<script lang="ts">
    import { auth } from "../stores/auth";
</script>

<div class="fixed-box">
    {#if $auth}
        Authenticated as <span class="font-bold text-black">{$auth.email}</span>
    {:else}
        No one is authenticated
    {/if}
    <div>
        TEMP:
        {JSON.stringify($auth)}
    </div>
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
