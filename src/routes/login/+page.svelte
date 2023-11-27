<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { auth } from '../../stores/auth';
    
    onMount(() => {
        return auth.subscribe()
    });
</script>

<h1>Login</h1>
