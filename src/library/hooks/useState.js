import { reRender } from "../scratch";

// this will be used to store state of each component
let states = [];

// this will incremented for each useState call. But this also should be set -1 when re-rendering
let indexes = -1;

const useState = (initialState) => {
	// get this useState call's index
	const index = ++indexes;

	// check if the index already has memory
	if (states[index] === undefined) states[index] = initialState;

	// setState will be called later. we need capture current index of the state memory array
	// so we can alter that memory when setState is called
	// when re-rendering, stored state will be returned
	const setState = (newState) => {
		// alter the stored state memory with the captured index
		states[index] = newState;
		indexes = -1; // reseting the indexes before re-rendering
		reRender();
	};

	return [states[index], setState];
};

export default useState;
