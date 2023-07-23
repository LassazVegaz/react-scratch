import mount from "./mount";

export let reRender = null;

// get a handler to root element
const _createRoot = (rootId) => {
	const root = document.getElementById(rootId);

	return {
		render: (jsxEle) => {
			mount(jsxEle, root);
			reRender = () => {
				root.innerHTML = "";
				mount(jsxEle, root);
			};
		},
	};
};

/**
 * React library created from scratch
 */
export const ReactScratch = {
	createRoot: (rootId) => _createRoot(rootId),
};
