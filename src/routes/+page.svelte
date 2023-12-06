<script>
<<<<<<< HEAD
    import DeleteAccountButton from "../components/DeleteAccountButton.svelte";
    import LogoutButton from "../components/LogoutButton.svelte";
    import RedirectGuard from "../components/RedirectGuard.svelte";
</script>

<RedirectGuard redirectPath="/login" />
<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<<<<<<< HEAD
<LogoutButton />
<DeleteAccountButton />
=======

<button on:click={handleClick}>Count: {count}</button>

<p>{count} * 2 = {doubled}</p>
<p>{doubled} * 2 = {quadrupled}</p>

>>>>>>> main
