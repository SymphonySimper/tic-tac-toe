<script lang="ts">
	function handleClick() {
		window.location.href = "/play";
	}
</script>

<div>
	<h1>Tic Tac Toe!</h1>
	<button on:click={handleClick}>Play Game</button>
</div>

<style>
	div {
		width: 100vw;
		height: 100vh;
		display: grid;
		justify-content: center;
		align-content: center;
		justify-items: center;
	}
</style>
