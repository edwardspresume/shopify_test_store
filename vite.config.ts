import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { enhancedImages } from '@sveltejs/enhanced-img';
import { kitRoutes } from 'vite-plugin-kit-routes';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), kitRoutes()]
});
