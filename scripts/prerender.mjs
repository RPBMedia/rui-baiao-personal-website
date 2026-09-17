/**
 * Inject the build-time render into dist/index.html.
 *
 * Runs after `vite build` (client) and after the SSR build that produces
 * dist-prerender/entry-prerender.mjs.
 *
 * The contract is narrow on purpose: find the EMPTY root div the SPA shell
 * ships, and put the rendered markup inside it. Nothing else about index.html
 * changes — the module script still loads, React still hydrates, and the page
 * behaves exactly as it does today. The only difference is that a crawler (or a
 * reader with a slow connection) now gets the content in the first response
 * instead of an empty box.
 *
 * It fails loudly rather than shipping a broken page: if the root div is not
 * found, or the render is suspiciously small, the build stops. A silently
 * half-injected index.html would be worse than the shell we started with.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const INDEX = path.join(ROOT, 'dist', 'index.html')
const ENTRY = path.join(ROOT, 'dist-prerender', 'entry-prerender.mjs')

if (!fs.existsSync(INDEX)) throw new Error(`No dist/index.html — run the client build first.`)
if (!fs.existsSync(ENTRY)) throw new Error(`No ${ENTRY} — run the prerender build first.`)

const { render } = await import(pathToFileURL(ENTRY).href)
const html = render()

// A render this small means something went wrong upstream — an error boundary,
// a bad import, an empty App. Better to fail the build than publish a shell
// that merely looks fixed.
if (!html || html.length < 2000) {
  throw new Error(`Rendered markup is only ${html?.length ?? 0} bytes — refusing to inject.`)
}

const source = fs.readFileSync(INDEX, 'utf8')
const EMPTY_ROOT = '<div id="root"></div>'
if (!source.includes(EMPTY_ROOT)) {
  throw new Error(`Could not find an empty ${EMPTY_ROOT} in dist/index.html — inspect before retrying.`)
}

const out = source.replace(EMPTY_ROOT, `<div id="root">${html}</div>`)
fs.writeFileSync(INDEX, out)

const before = Buffer.byteLength(source)
const after = Buffer.byteLength(out)
console.log(`prerendered dist/index.html: ${before} -> ${after} bytes (+${after - before})`)

// The whole point of the exercise, asserted rather than assumed.
const links = (out.match(/href="https?:\/\/[^"]+"/g) ?? []).length
console.log(`outbound links now in the served HTML: ${links}`)
if (!out.includes('careerforger')) {
  console.warn('WARNING: careerforger.app is not in the rendered HTML — check Portfolio rendering.')
}
