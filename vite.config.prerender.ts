import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * A separate config for the build-time render, kept apart from the real one so
 * the site's own build is untouched.
 *
 * `ssr: true` tells Vite to build for Node: it externalises nothing we need and,
 * critically, turns the `import './index.css'` chain into a no-op rather than
 * trying to hand a stylesheet to `node`. The CSS still ships through the normal
 * client build — this pass only produces markup.
 *
 * `emptyOutDir: false` and a separate outDir matter: this runs AFTER the client
 * build, and wiping dist/ would delete the very index.html we are about to
 * inject into, along with every hashed asset.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    outDir: 'dist-prerender',
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: {
      input: 'src/entry-prerender.tsx',
      output: { entryFileNames: 'entry-prerender.mjs', format: 'esm' },
    },
  },
})
