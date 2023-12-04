<script>
    import DeleteAccountButton from "../components/DeleteAccountButton.svelte";
    import LogoutButton from "../components/LogoutButton.svelte";
    import RedirectGuard from "../components/RedirectGuard.svelte";
</script>

<RedirectGuard redirectPath="/login" />
<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<LogoutButton />
<DeleteAccountButton />
