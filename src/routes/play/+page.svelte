<script lang="ts">
	import { player, boxes, isFinished, wonIndex } from "$store/game";
	import Board from "./Board.svelte";

	let moves: number = 0;
	let tie = false;

	function handleReset() {
		boxes.reset();
		player.reset();
		isFinished.reset();
		tie = false;
		moves = 0;
		wonIndex.reset();
	}

	function handlePlayerClick(e: CustomEvent) {
		try {
			boxes.set(e.detail.index, $player);
		} catch (err) {
			console.error(err);
		}
	}

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

	function isTie(arr: number[]) {
		let givenArr = [
			$boxes[arr[0]],
			$boxes[arr[1]],
			$boxes[arr[2]],
		].toString();
		let comb1 = `${$player},${$player},+`;
		let comb2 = `${$player},+,${$player}`;
		let comb3 = `+,${$player},${$player}`;

		if (givenArr === comb1 || givenArr === comb2 || givenArr === comb3) {
			tie = false;
			return;
		}

		tie = true;
	}

	function gameStatus() {
		if (moves > 4) {
			if (isEqual([0, 4, 8]) || isEqual([2, 4, 6])) {
				isFinished.end();
			} else {
				let lastIndex: number = 0;
				for (let i = 0; i < 3; i++) {
					if (moves >= 7) {
						isTie([lastIndex, lastIndex + 1, lastIndex + 2]);
						isTie([i, i + 3, i + 6]);
					}
					if (
						isEqual([lastIndex, lastIndex + 1, lastIndex + 2]) ||
						isEqual([i, i + 3, i + 6])
					) {
						isFinished.end();
						break;
					}
					lastIndex = lastIndex + 3;
				}
				if (moves >= 7) {
					isTie([0, 4, 8]);
					isTie([2, 4, 6]);
					if (tie) {
						isFinished.end();
						console.log("Match is a tie");
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
		<h1>
			{#if $isFinished}
				{#if !tie}
					Player {$player} Won! in {Math.floor(moves / 2)} moves.
				{:else}
					It's a tie!
				{/if}
			{:else}
				Player {$player}'s turn
			{/if}
		</h1>
	</div>
	<Board on:playerClick={(e) => handlePlayerClick(e)} />
	<button on:click={handleReset}>
		{#if $isFinished}
			Play Again
		{:else}
			Reset
		{/if}
	</button>
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
