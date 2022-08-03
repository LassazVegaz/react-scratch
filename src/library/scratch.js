const decompileCustomJsx = (jsx, root) => {
	const jsxFunc = jsx.type;
	const jsxProps = jsx.props;
	const decompiled = jsxFunc(jsxProps);
	mount(decompiled, root);
};

const decompileStandardJsx = (jsx, root) => {
	const eleType = jsx.type;
	const eleAttrs = jsx.props;

	const node = document.createElement(eleType);

	// add attributes
	for (const attr in eleAttrs) {
		if (Object.hasOwnProperty.call(eleAttrs, attr) && attr !== "children") {
			const attrVal = eleAttrs[attr];
			attrVal && node.setAttribute(attr, attrVal.toString());
		}
	}

	let children = eleAttrs.children || [];
	if (!Array.isArray(children)) {
		children = [children];
	}
	children = children.filter(Boolean);

	children.forEach((child) => {
		if (typeof child === "string") {
			node.appendChild(document.createTextNode(child));
		} else {
			mount(child, node);
		}
	});

	root.appendChild(node);
};

const mount = (jsxElement, root) => {
	const type = jsxElement.type;

	if (typeof type === "function") {
		decompileCustomJsx(jsxElement, root);
	} else {
		decompileStandardJsx(jsxElement, root);
	}
};

const _createRoot = (rootId) => {
	const root = document.getElementById(rootId);

	return {
		render: (jsxEle) => mount(jsxEle, root),
	};
};

export const ReactScratch = {
	createRoot: _createRoot,
};
