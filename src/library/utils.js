const attrTransformations = {
	classname: "class",
};

export const transformAttrName = (attr) => {
	attr = attr.toString().trim().toLowerCase();
	return attrTransformations[attr] ?? attr;
};
