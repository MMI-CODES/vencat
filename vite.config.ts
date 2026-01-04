import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		vue(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico'],
			manifest: {
				name: 'Vencat',
				short_name: 'Vencat',
				description: "Emploi du temps plus beau que CELCAT",
				start_url: "/",
				display: "standalone",
				background_color: "#020618",
				theme_color: '#020618',
				icons: [
					{ src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
					{ src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
				]
			}
		})
	],
	resolve: {
		alias: {
		'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
})
