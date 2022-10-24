import { writable } from 'svelte/store';

function createBoxes() {
	function createArray(): string[] {
		return Array(9).fill("+");
	}

	let { subscribe, set, update } = writable(createArray() as string[]);

	return {
		subscribe,
		reset: () => set(createArray() as string[]),
		set: (index: number, val: string) => update(arr => {
			arr[index] = val;
			return [...arr];
		})
	}
}

const boxes = createBoxes();

function createPlayer() {
	let { subscribe, set, update } = writable("X");

	return {
		subscribe,
		change: () => update(player => player === "X" ? "O" : "X"),
		reset: () => set("X")
	}
}

const player = createPlayer();

export { boxes, player };
