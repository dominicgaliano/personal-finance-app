<script lang="ts">
    import { goto } from "$app/navigation";
</script>

<button
    on:click={() => {
        goto("/delete-account");
    }}
>
    DELETE ACCOUNT
</button>

<style>
    button {
        background-color: #ff0000;
        border: none;
        border-radius: 0.25rem;
        color: #ffffff;
        cursor: pointer;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.5rem 1rem;
        text-transform: uppercase;
    }
</style>
