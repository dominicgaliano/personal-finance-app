<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { auth } from "../stores/auth";

    export let redirectPath: string;

    onMount(() => {
        if (!$auth) {
            goto(redirectPath || "/");
        }
    });
</script>
