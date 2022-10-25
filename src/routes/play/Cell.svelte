<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import { isFinished, wonIndex } from "$store/game";

	export let value: string;
	export let index: number;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch("playerClick", { index });
	}
	let won = false;

	function getWon() {
		won = $wonIndex.includes(index);
	}

	$: $wonIndex && getWon();
</script>

<button
	on:click={handleClick}
	disabled={(value !== "+" || $isFinished) && !won}
	class:won
>
	{#if !won && $isFinished}
		{#if value === "+"}
			{""}
		{:else}
			<span style="color: var(--color-sec)">{value}</span>
		{/if}
	{:else}
		{value}
	{/if}
</button>

<style>
	.won {
		border-color: green;
		color: var(--color-fg);
		background-color: var(--color-bg);
	}

	button {
		aspect-ratio: 1;
		display: grid;
		justify-content: center;
		align-content: center;
		background-color: var(--color-sec);
		color: var(--color-on-sec);
		border: 1px solid var(--color-sec);
		border-radius: 0.5rem;
		cursor: pointer;
		padding: 0;
		width: inherit;
		height: inherit;
	}

	button:hover {
		background-color: var(--color-bg);
		border: 2px solid var(--color-sec);
	}

	button:disabled {
		color: var(--color-fg);
		background-color: var(--color-bg);
		border: 1px solid #111;
		cursor: not-allowed;
	}
</style>
