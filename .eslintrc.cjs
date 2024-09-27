module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh'],
	rules: {
		'react/jsx-no-target-blank': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'no-unused-vars': 'warn',
		'react-refresh/only-export-components': 'off',
		'react/prop-types': 'off',
		'no-undef': 'off',
		'no-inner-declarations': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'no-async-promise-executor': 'off',
		'react/react-in-jsx-scope': 'off',
		'no-mixed-spaces-and-tabs': 'off',
	},
};
