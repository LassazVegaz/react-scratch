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
		if (Object.hasOwnProperty.call(eleAttrs, attr) && attr !== "children") {
			const attrVal = eleAttrs[attr];
			attrVal && node.setAttribute(attr, attrVal.toString());
		}
	}

	// append children to node
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

	// append node to root element
	root.appendChild(node);
};

// attach given JSX element to given DOM element
export default mount = (jsxElement, root) => {
	const type = jsxElement.type;

	// depending on JSX component type,
	// decompile JSX into DOM
	if (typeof type === "function") {
		decompileCustomJsx(jsxElement, root);
	} else {
		decompileStandardJsx(jsxElement, root);
	}
};
