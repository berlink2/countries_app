module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'prettier'
	],
	ignorePatterns: ['.next/', 'out/'],
	env: {
		es6: true,
		node: true,
		browser: true,
		jest: true
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'react/react-in-jsx-scope': 'off'
	}
};
