<script>
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
