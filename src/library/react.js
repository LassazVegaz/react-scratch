import { transformAttrName } from "./utils";

const React = (() => {
	let reRender = null;

	// this will be used to store state of each component
	let hooksData = [];

	// this will incremented for each useState call. But this also should be set -1 when re-rendering
	let hooksDataIndexes = 0;

	// decompile custom JSX into DOM
	const decompileCustomJsx = (jsx, root) => {
		const jsxFunc = jsx.type;
		const jsxProps = jsx.props;
		const decompiled = jsxFunc(jsxProps);
		mount(decompiled, root);
	};

	// decompile standard JSX into DOM
	const decompileStandardJsx = (jsx, root) => {
		const eleType = jsx.type;
		const eleAttrs = jsx.props;

		// create DOM element of JSX component
		const node = document.createElement(eleType);

		// add attributes to node
		for (const attr in eleAttrs) {
			if (
				Object.hasOwnProperty.call(eleAttrs, attr) &&
				attr !== "children" &&
				attr !== "__source" &&
				attr !== "__self"
			) {
				const attrVal = eleAttrs[attr];
				const attrName = transformAttrName(attr);
				if (typeof attrVal === "function") {
					const eventName = attrName.slice(2);
					node.addEventListener(eventName, attrVal);
				} else node.setAttribute(attrName, attrVal);
			}
		}

		// append children to node
		let children = eleAttrs.children || [];
		if (!Array.isArray(children)) {
			children = [children];
		}
		children = children.filter((c) => c !== null || c !== undefined);

		children.forEach((child) => {
			if (typeof child === "string" || typeof child === "number") {
				node.appendChild(document.createTextNode(child.toString()));
			} else {
				mount(child, node);
			}
		});

		// append node to root element
		root.appendChild(node);
	};

	// attach given JSX element to given DOM element
	const mount = (jsxElement, root) => {
		const type = jsxElement.type;

		// depending on JSX component type,
		// decompile JSX into DOM
		if (typeof type === "function") {
			decompileCustomJsx(jsxElement, root);
		} else {
			decompileStandardJsx(jsxElement, root);
		}
	};

	function createElement(type, config, ...children) {
		const props = {};

		const key = config?.key;
		const ref = config?.ref;
		const self = config?.__self;
		const source = config?.__source;

		if (config != null) {
			for (const key in config) {
				if (Object.hasOwnProperty.call(config, key)) {
					props[key] = config[key];
				}
			}
		}

		if (children) props.children = children;

		return {
			type,
			key,
			ref,
			source,
			self,
			props,
		};
	}

	// get a handler to root element
	function createRoot(rootId) {
		const root = document.getElementById(rootId);

		return {
			render: (jsxEle) => {
				reRender = () => {
					hooksDataIndexes = 0; // reseting the indexes before re-rendering
					root.innerHTML = "";
					mount(jsxEle, root);
				};
				reRender();
			},
		};
	}

	const useState = (initialState) => {
		// get this useState call's index
		const index = hooksDataIndexes++;

		// check if the index already has memory
		if (hooksData[index] === undefined) hooksData[index] = initialState;

		// setState will be called later. we need capture current index of the state memory array
		// so we can alter that memory when setState is called
		// when re-rendering, stored state will be returned
		const setState = (newState) => {
			// alter the stored state memory with the captured index
			hooksData[index] = newState;
			reRender();
		};

		return [hooksData[index], setState];
	};

	const useEffect = (fn, deps = []) => {
		// get the index for this hook call
		const index = hooksDataIndexes++;

		// assume there are changes in the begining. This can be first run
		let hasChanges = true;

		// get exisitng hook data
		const existingDeps = hooksData[index];

		// if there are no existing hook data, this is the first run
		if (existingDeps !== undefined) {
			// if length of existing dependancies is 0, there are no changes
			// otherwise check if any of the exisitng deps are changed
			hasChanges =
				existingDeps.length !== 0 &&
				existingDeps.some((d, i) => d !== deps[i]);
		}

		// store the new deps
		hooksData[index] = deps;

		// call the useState function if there are changes
		if (hasChanges) fn();
	};

	return {
		createElement,
		createRoot,
		useState,
		useEffect,
	};
})();

export default React;
