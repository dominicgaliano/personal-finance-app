<script lang="ts">
    import { formatCurrency } from "$lib/formatCurrency";

    export let value: number;
</script>

<div>{formatCurrency(value)}</div>
