// Full-page canvas network.
// 14 nodes with explicit visual hierarchy: 3 bright hubs, mid-tier connectors,
// faint satellites that dramatically pulse in and out.
// Lines drawn with a glow+core double pass for visible luminescence.

import { useEffect, useRef } from 'react'

function prng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

interface Node {
  bx: number; by: number
  r: number; gBase: number; gAmp: number; gM: number
  x: number; y: number
  ax: number[]; fx: number[]; px: number[]
  ay: number[]; fy: number[]; py: number[]
  gFreq: number; gPhase: number
  oR: number; oF: number; oP: number
}

// [bx, by, r, gBase, gAmp, oR, oF, oP, gM]
// gBase: resting brightness · gAmp: pulse depth · gM: glow halo radius = r × gM
// Wide spread in these values creates the visual hierarchy (not all dots look alike).
const DEFS: [number,number,number,number,number,number,number,number,number][] = [
  // ── Primary nodes ────────────────────────────────────────────────────────
  [0.56, 0.08, 2.8, 0.78, 0.16,  0,     0,    0,    8 ],  // 0  bright, upper
  [0.82, 0.07, 1.2, 0.22, 0.42,  0,     0,    0,    5 ],  // 1  dim accent, tiny pulse range
  [0.63, 0.20, 4.5, 0.92, 0.07,  0,     0,    0,   11 ],  // 2  MAIN HUB — dominant, barely pulses
  [0.90, 0.26, 1.4, 0.32, 0.38, 30,  0.34,  0.00,  6 ],  // 3  small orbital ↻
  [0.73, 0.38, 2.0, 0.50, 0.28,  0,     0,    0,    7 ],  // 4  medium connector
  [0.96, 0.38, 1.0, 0.18, 0.48, 22, -0.29,  0.60,  5 ],  // 5  tiny orbital ↺ — dramatic fade
  [0.60, 0.48, 3.8, 0.80, 0.14, 50,  0.20,  2.20, 10 ],  // 6  large orbital hub ↻
  [0.82, 0.56, 1.4, 0.28, 0.42,  0,     0,    0,    6 ],  // 7  small dim, wide pulse
  [0.92, 0.62, 2.2, 0.55, 0.25,  0,     0,    0,    7 ],  // 8  medium
  [0.64, 0.72, 3.0, 0.70, 0.18, 38,  0.25,  3.50,  9 ],  // 9  orbital hub ↻
  [0.85, 0.80, 1.1, 0.20, 0.48,  0,     0,    0,    5 ],  // 10 tiny dim, wide pulse
  [0.50, 0.88, 2.2, 0.55, 0.25, 30, -0.22,  1.70,  8 ],  // 11 orbital ↺
  // ── Left-side depth accents ───────────────────────────────────────────────
  [0.47, 0.16, 1.5, 0.22, 0.40,  0,     0,    0,    6 ],  // 12 connects to upper cluster
  [0.42, 0.54, 1.8, 0.30, 0.35,  0,     0,    0,    6 ],  // 13 connects to hub B
]

// Slightly faster than before: amplitude ↑ a little, frequency ↑ ~20%
const A = [15, 8, 5]
const F = [0.045, 0.080, 0.035]

const NODES: Node[] = DEFS.map(([bx, by, r, gBase, gAmp, oR, oF, oP, gM], i) => {
  const rnd = prng(i * 137 + 1)
  return {
    bx, by, r, gBase, gAmp, gM, x: 0, y: 0,
    ax: A.map(a => a * (0.6 + rnd() * 0.8)),
    fx: F.map(f => f * (0.7 + rnd() * 0.6)),
    px: [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28],
    ay: A.map(a => a * (0.5 + rnd() * 0.9)),
    fy: F.map(f => f * (0.8 + rnd() * 0.5)),
    py: [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28],
    // Wide gFreq range → nodes pulse at visibly different rates
    gFreq:  0.18 + rnd() * 0.55,
    gPhase: rnd() * 6.28,
    oR, oF, oP,
  }
})

const rgba = (a: number) => `rgba(59,159,255,${Math.max(0, a).toFixed(3)})`

export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId = 0
    let t0 = 0

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      if (!t0) t0 = now
      const t = (now - t0) / 1000

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      // 1. Update positions: 3-layer sine drift + optional circular orbit
      for (const n of NODES) {
        n.x = n.bx * W
          + n.ax[0] * Math.sin(t * n.fx[0] + n.px[0])
          + n.ax[1] * Math.sin(t * n.fx[1] + n.px[1])
          + n.ax[2] * Math.cos(t * n.fx[2] + n.px[2])
          + n.oR    * Math.cos(t * n.oF    + n.oP)
        n.y = n.by * H
          + n.ay[0] * Math.sin(t * n.fy[0] + n.py[0])
          + n.ay[1] * Math.cos(t * n.fy[1] + n.py[1])
          + n.ay[2] * Math.sin(t * n.fy[2] + n.py[2])
          + n.oR    * Math.sin(t * n.oF    + n.oP)
      }

      // 2. Orbit trace rings — ghosted dashed circles behind orbital nodes
      ctx.lineWidth = 0.5
      ctx.setLineDash([3, 18])
      for (const n of NODES) {
        if (!n.oR) continue
        ctx.beginPath()
        ctx.arc(n.bx * W, n.by * H, n.oR, 0, 6.2832)
        ctx.strokeStyle = rgba(0.045)
        ctx.stroke()
      }
      ctx.setLineDash([])

      // 3. Edges — double pass: wide+dim glow, then narrow+bright core.
      //    The two strokes share one path, making the line visibly luminous.
      const MAX_D = Math.max(160, Math.min(W * 0.26, H * 0.40, 340))
      const MAX_D2 = MAX_D * MAX_D

      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const dx = NODES[j].x - NODES[i].x
          const dy = NODES[j].y - NODES[i].y
          const d2 = dx * dx + dy * dy
          if (d2 >= MAX_D2) continue
          const p = 1 - Math.sqrt(d2) / MAX_D

          ctx.beginPath()
          ctx.moveTo(NODES[i].x, NODES[i].y)
          ctx.lineTo(NODES[j].x, NODES[j].y)

          // Glow pass (wide, transparent)
          ctx.lineWidth = 3.0
          ctx.strokeStyle = rgba(p * 0.08)
          ctx.stroke()

          // Core pass (narrow, brighter) — same path, no re-draw needed
          ctx.lineWidth = 0.9
          ctx.strokeStyle = rgba(p * 0.30)
          ctx.stroke()
        }
      }

      // 4. Nodes — each has its own glow size (r × gM) and pulse depth (gAmp)
      for (const n of NODES) {
        const pulse = 0.5 + 0.5 * Math.sin(t * n.gFreq + n.gPhase)
        const g = n.gBase + n.gAmp * pulse
        const r = n.r * (0.65 + 0.70 * pulse)   // radius breathes ±35%
        const gr = r * n.gM                       // halo size varies per node

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gr)
        grad.addColorStop(0,   rgba(g * 0.40))
        grad.addColorStop(0.4, rgba(g * 0.13))
        grad.addColorStop(1,   rgba(0))
        ctx.beginPath()
        ctx.arc(n.x, n.y, gr, 0, 6.2832)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, 6.2832)
        ctx.fillStyle = rgba(g)
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    setup()
    window.addEventListener('resize', setup)
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', setup)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      style={{ display: 'block' }}
      aria-hidden
    />
  )
}
