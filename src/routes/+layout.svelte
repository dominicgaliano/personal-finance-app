<script>
    import { onMount } from 'svelte';
    import { initFirebase } from '$lib/client/firebase';

    onMount(initFirebase);
</script>

<slot />
