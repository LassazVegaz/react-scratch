import { transformAttrName } from "./utils";

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

export default mount;
