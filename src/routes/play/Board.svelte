<script lang="ts">
	import Cell from "./Cell.svelte";
	import { boxes } from "$store/game";
</script>

<div class="table">
	{#each $boxes as box, index}
		<Cell
			value={box}
			{index}
			on:playerClick
		/>
	{/each}
</div>

<style>
	.table {
		--size: 4rem;
		display: grid;
		grid-template-columns: repeat(3, var(--size));
		grid-template-rows: repeat(3, var(--size));
		gap: 1rem;
	}
</style>
