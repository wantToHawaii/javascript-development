module.exports = {
	presets: ['@babel/preset-env'],
	plugins: [
		['@babel/plugin-transform-arrow-functions', { spec: true }]
	],
	inputSourceMap: true,
	sourceMaps: true
};
