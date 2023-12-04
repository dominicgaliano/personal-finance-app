<script lang="ts">
    import { getAuth, signOut } from "firebase/auth";
    import { goto, invalidateAll } from "$app/navigation";

    const logout = async () => {
        const firebaseAuth = getAuth();
        await signOut(firebaseAuth);
        await fetch("/logout", { method: "POST" });
        await invalidateAll();
        await goto("/login");
    };
</script>

<button on:click={logout}> Log out </button>
