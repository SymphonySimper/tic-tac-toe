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
		change: (val: string) => update(() => val),
		reset: () => set("X")
	}
}

const player = createPlayer();

function createFinished() {
	let { subscribe, set, update } = writable(false);

	return {
		subscribe,
		end: () => update(() => true),
		reset: () => set(false)
	}

}

const isFinished = createFinished();

function createWonIndex() {
	let { subscribe, set, update } = writable([] as number[]);
	return {
		subscribe,
		set: (indexes: number[]) => update(() => [...indexes]),
		reset: () => set([])
	}
}
const wonIndex = createWonIndex();

export { boxes, player, isFinished, wonIndex };
