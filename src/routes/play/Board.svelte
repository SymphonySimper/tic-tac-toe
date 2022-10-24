<script lang="ts">
	import Cell from "./Cell.svelte";
	import { boxes } from "$store/game";
</script>

<div class="table" />
{#each $boxes as box, index}
	<Cell value={box} {index} />
{/each}

<style>
	.table {
		display: grid;
		grid-template-columns: repeat(3, 4rem);
		grid-template-rows: repeat(3, 4rem);
		gap: 1rem;
	}
</style>
