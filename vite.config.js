import {
	defineConfig
} from 'vite'
import {
	minifyHtml
} from 'vite-plugin-html'


export default defineConfig({
	build: {
		minify: 'esbuild',
		target: "esnext"
	},
	plugins: [
		minifyHtml(),
	]
})