<script lang="ts">
	import Cell from "./Cell.svelte";
	import { boxes, player } from "$store/game";

	function handlePlayerClick(e: CustomEvent) {
		try {
			boxes.set(e.detail.index, $player);
			player.change();
		} catch (err) {
			console.error(err);
		}
	}
</script>

<div class="table">
	{#each $boxes as box, index}
		<Cell
			value={box}
			{index}
			on:playerClick={(e) => handlePlayerClick(e)}
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
