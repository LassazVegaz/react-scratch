import mount from "./mount";

// get a handler to root element
const _createRoot = (rootId) => {
	const root = document.getElementById(rootId);

	return {
		render: (jsxEle) => mount(jsxEle, root),
	};
};

/**
 * React library created from scratch
 */
export const ReactScratch = {
	createRoot: _createRoot,
};
