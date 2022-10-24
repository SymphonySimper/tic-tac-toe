<script lang="ts">
	export let value: string;
	export let index: number;

	function handleClick() {
		console.log(index + " clicked");
	}
</script>

<button class:filled={value !== "+"} on:click={handleClick}>
	{value}
</button>

<style>
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
		padding: 0rem;
	}

	button:hover {
		background-color: var(--color-bg);
		border: 2px solid var(--color-sec);
	}

	.filled {
		color: var(--color-fg);
		background-color: var(--color-bg);
		border: 1px solid #111;
		cursor: not-allowed;
	}
</style>
