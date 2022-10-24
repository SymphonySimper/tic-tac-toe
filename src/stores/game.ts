import { writable } from 'svelte/store';

function createBoxes() {
	let { subscribe, set, update } = writable([] as string[]);

	return {
		subscribe,
		reset: () => set([...Array(9).fill("+")]),
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
