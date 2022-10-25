<script lang="ts">
	import { player, boxes, isFinished, wonIndex } from "$store/game";
	import Board from "./Board.svelte";

	let moves: number = 0;
	function handleReset() {
		boxes.reset();
		player.reset();
		isFinished.reset();
		moves = 0;
		wonIndex.reset();
	}

	function gameStatus() {
		function isEqual(arr: number[]): boolean {
			if (
				[$boxes[arr[0]], $boxes[arr[1]], $boxes[arr[2]]].toString() ===
				Array(3).fill($player).toString()
			) {
				wonIndex.set(arr);
				return true;
			}

			return false;
		}

		if (moves > 4) {
			if (isEqual([0, 4, 8]) || isEqual([2, 4, 6])) {
				isFinished.end();
			} else {
				for (let i = 0; i < 3; i++) {
					if (
						isEqual([i, i + 1, i + 2]) ||
						isEqual([i, i + 3, i + 6])
					) {
						isFinished.end();
						break;
					}
				}
			}
		}
		if (!$isFinished) {
			moves += 1;
			if (moves % 2 === 0) {
				player.change("O");
			} else {
				player.change("X");
			}
		}
	}

	$: $boxes && gameStatus();
</script>

<div class="container">
	<div>
		<h1>Let's Play</h1>
		<h3>
			{#if $isFinished}
				Player {$player} Won! in {Math.floor(moves / 2)} moves.
			{:else}
				Player {$player}'s turn
			{/if}
		</h3>
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
		text-align: center;
	}
</style>
