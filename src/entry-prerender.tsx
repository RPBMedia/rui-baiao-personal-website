import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Render the page to static HTML at build time.
 *
 * WHY: the site shipped as a Vite SPA shell — 2108 bytes containing a single
 * empty <div id="root">. Every project, every link and every word of copy only
 * existed after JavaScript ran, so a crawler fetching the page saw nothing at
 * all. That costs the site its own name in search, and it means the outbound
 * links (CareerForger among them) were invisible as links.
 *
 * Deliberately NOT StrictMode here. StrictMode double-invokes render in
 * development to surface side effects; on the server it changes nothing useful
 * and only doubles the work. `main.tsx` keeps it for the client, where it earns
 * its place.
 *
 * `useEffect` never runs during renderToString, so every browser-only hook in
 * this app — the scroll listener in Nav, the idle-callback in useDeferredFx, the
 * body-scroll lock in ContactModal — is simply skipped, exactly as it is on the
 * client's first paint. NetworkCanvas is gated behind `fxReady` (false on first
 * render) so it is absent from the static HTML too, which is correct: it is
 * decorative and deliberately mounted only after the browser goes idle.
 */
export function render(): string {
  return renderToString(<App />)
}
