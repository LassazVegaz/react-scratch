import { reRender } from "../scratch";

let state = undefined;

const useState = (initialState) => {
	if (state === undefined) state = initialState;

	const setState = (newState) => {
		state = newState;
		reRender();
	};

	return [state, setState];
};

export default useState;
