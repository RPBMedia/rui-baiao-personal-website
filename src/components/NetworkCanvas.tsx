// Full-page fixed canvas network — nodes drift via multi-layer sine waves,
// connections form and dissolve dynamically as nodes move.

import { useEffect, useRef } from 'react'

// Deterministic pseudo-random (Lehmer LCG) — consistent per-node motion variety
function prng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

interface Node {
  bx: number; by: number     // base position as fraction of viewport
  r: number;  gBase: number  // core radius, base glow opacity
  x: number;  y: number      // current pixel position (mutated per frame)
  // Drift: 3 independent sine waves per axis → quasi-aperiodic organic motion
  ax: number[]; fx: number[]; px: number[]
  ay: number[]; fy: number[]; py: number[]
  // Glow pulse
  gAmp: number; gFreq: number; gPhase: number
}

// [bx, by, radius, glowBase]
const DEFS: [number, number, number, number][] = [
  // Right-side primary nodes (behind hero photo + across page)
  [0.55, 0.08, 2.5, 0.70], [0.68, 0.05, 2.0, 0.55], [0.88, 0.10, 1.8, 0.42],
  [0.59, 0.22, 3.0, 0.78], [0.76, 0.27, 2.5, 0.63], [0.93, 0.30, 1.8, 0.38],
  [0.52, 0.42, 2.5, 0.62], [0.66, 0.44, 3.5, 0.82], [0.82, 0.45, 2.0, 0.50],
  [0.97, 0.39, 1.5, 0.32],
  [0.57, 0.62, 2.5, 0.65], [0.74, 0.65, 3.0, 0.72], [0.89, 0.68, 2.0, 0.48],
  [0.49, 0.78, 2.0, 0.52], [0.64, 0.83, 2.5, 0.57], [0.80, 0.82, 2.0, 0.44],
  [0.95, 0.87, 1.5, 0.34],
  // Left-side accent nodes — very faint, add depth behind text
  [0.31, 0.28, 1.5, 0.20], [0.36, 0.56, 1.5, 0.16], [0.42, 0.14, 1.5, 0.18],
  [0.28, 0.68, 1.5, 0.14], [0.44, 0.88, 1.5, 0.15],
]

// 3-tier amplitude + frequency basis for the sine-wave drift
const A = [14, 7, 4]             // pixel amplitudes (±)
const F = [0.038, 0.067, 0.029]  // angular frequencies (rad/s) — very slow

// Nodes created once at module load; x/y mutated in place each frame
const NODES: Node[] = DEFS.map(([bx, by, r, gBase], i) => {
  const rnd = prng(i * 137 + 1)
  return {
    bx, by, r, gBase, x: 0, y: 0,
    ax: A.map(a => a * (0.6 + rnd() * 0.8)),
    fx: F.map(f => f * (0.7 + rnd() * 0.6)),
    px: [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28],
    ay: A.map(a => a * (0.5 + rnd() * 0.9)),
    fy: F.map(f => f * (0.8 + rnd() * 0.5)),
    py: [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28],
    gAmp:   0.22 * (0.4 + rnd()),
    gFreq:  0.28 + rnd() * 0.32,
    gPhase: rnd() * 6.28,
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
      // Cap at 2× DPR to avoid overdraw on high-density screens
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      if (!t0) t0 = now
      const t = (now - t0) / 1000  // elapsed seconds

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      // 1. Update each node's current position via 3-layer sine drift.
      //    Different amplitudes, frequencies, and phases per node
      //    → all nodes drift independently, motion appears non-looping.
      for (const n of NODES) {
        n.x = n.bx * W
          + n.ax[0] * Math.sin(t * n.fx[0] + n.px[0])
          + n.ax[1] * Math.sin(t * n.fx[1] + n.px[1])
          + n.ax[2] * Math.cos(t * n.fx[2] + n.px[2])
        n.y = n.by * H
          + n.ay[0] * Math.sin(t * n.fy[0] + n.py[0])
          + n.ay[1] * Math.cos(t * n.fy[1] + n.py[1])
          + n.ay[2] * Math.sin(t * n.fy[2] + n.py[2])
      }

      // 2. Draw edges between nearby nodes.
      //    Linear opacity falloff: visible at 16% near the threshold, fading to 0
      //    at MAX_D. Previous p² formula gave <3% at typical distances — invisible.
      const MAX_D = Math.max(160, Math.min(W * 0.26, H * 0.35, 320))
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
          ctx.strokeStyle = rgba(p * 0.18)
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // 3. Draw each node: soft radial glow halo + core dot that grows/shrinks.
      //    Both opacity and radius are driven by the same sine pulse so the node
      //    visibly breathes — brightening as it expands, dimming as it contracts.
      for (const n of NODES) {
        const pulse = 0.5 + 0.5 * Math.sin(t * n.gFreq + n.gPhase)
        const g = n.gBase + n.gAmp * pulse
        const r = n.r * (0.65 + 0.70 * pulse)   // radius cycles ±35% of base

        const gr = r * 7
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gr)
        grad.addColorStop(0,   rgba(g * 0.35))
        grad.addColorStop(0.4, rgba(g * 0.12))
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
