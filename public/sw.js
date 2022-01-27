import {
	precacheAndRoute,
	cleanupOutdatedCaches
} from 'workbox-precaching'

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)


self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING')
		self.skipWaiting()
})

import {
	clientsClaim
} from 'workbox-core'

self.skipWaiting()
clientsClaim()