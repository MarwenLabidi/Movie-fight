import {
	defineConfig
} from 'vite'
import {
	minifyHtml
} from 'vite-plugin-html'

import {
	VitePWA
} from 'vite-plugin-pwa'


export default defineConfig({
	build: {
		minify: 'esbuild',
		target: "esnext"
	},
	plugins: [
		minifyHtml(),
		VitePWA({
			includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
			manifest: {
				name: 'Movie-Fight',
				short_name: 'Movie-Fight',
				description: 'compare movies',
				theme_color: '#ffffff',
				icons: [{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					}
				]
			},
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'sw.js'
		}),
		
	],
	registerType: 'autoUpdate',
})