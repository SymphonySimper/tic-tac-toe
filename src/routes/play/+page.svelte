<script>
	import { player, boxes } from "$store/game";
	import Board from "./Board.svelte";

	function handleReset() {
		boxes.reset();
		player.reset();
	}
</script>

<div class="container">
	<div>
		<h1>Let's Play</h1>
		<h3>Player {$player}'s turn</h3>
	</div>
	<Board />
	<button on:click={handleReset}>Reset</button>
</div>

<style>
	.container {
		display: grid;
		justify-content: center;
		align-content: center;
		justify-items: center;
		gap: 2rem;
		width: 100vw;
		height: 100vh;
	}
</style>
