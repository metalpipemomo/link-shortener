/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    tabWidth: 4,
    singleQuote: true,
    semi: true,
    jsxSingleQuote: true,
    bracketSameLine: true,
    bracketSpacing: true,
    trailingComma: 'es5',
    proseWrap: 'always',
};

module.exports = config;
