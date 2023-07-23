let state = undefined;

const useState = (initialState) => {
	if (state === undefined) state = initialState;

	const setState = (newState) => {
		state = newState;
	};

	return [state, setState];
};

export default useState;
