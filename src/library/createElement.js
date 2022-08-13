const React = {
	createElement: (type, config, ...children) => {
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
	},
};
