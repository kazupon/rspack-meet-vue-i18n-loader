const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')
// const { webpack: VueI18nPlugin } = require('@intlify/unplugin-vue-i18n').unplugin

/** @type {import('@rspack/cli').Configuration} */
const config = {
	context: __dirname,
	entry: {
		main: "./src/main.js"
	},
	builtins: {
		html: [
			{
				template: "./index.html"
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		// VueI18nPlugin({
		// 	include: [path.resolve(__dirname, './src/locales/**')]
		// })
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					experimentalInlineMatchResource: true
				}
			},
			{
				test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
				type: 'javascript/auto',
				// Use `Rule.include` to specify the files of locale messages to be pre-compiled
				include: [
				  path.resolve(__dirname, './src/locales'),
				],
				use: [
				  {
					loader: "@intlify/vue-i18n-loader",
					options: {
					  // Whether pre-compile number and boolean literal as message functions that return the string value, default `false`
					  // forceStringify: true
					}
				  }
				]
			},
			{
				type: 'javascript/auto',
				resourceQuery: /blockType=i18n/,
				loader: "@intlify/vue-i18n-loader"
			},
			{
				test: /\.svg/,
				type: "asset/resource"
			}
		]
	}
}

module.exports = config
