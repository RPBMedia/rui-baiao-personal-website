// Full-page canvas network.
// Nodes drift via 3-layer sine waves; 8 of the 22 also orbit their base position,
// so the lines connecting them continuously sweep and rotate — neural-network / mainframe feel.

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
  r: number; gBase: number
  x: number; y: number
  ax: number[]; fx: number[]; px: number[]
  ay: number[]; fy: number[]; py: number[]
  gAmp: number; gFreq: number; gPhase: number
  oR: number; oF: number; oP: number  // orbit radius (px), frequency (rad/s), phase
}

// [bx, by, radius, glowBase, orbitRadius, orbitFreq, orbitPhase]
// orbitRadius=0 → pure drift, no rotation
const DEFS: [number, number, number, number, number, number, number][] = [
  [0.55, 0.08, 2.5, 0.70,  0,      0,     0    ],  // drift only
  [0.68, 0.05, 2.0, 0.55, 35,  0.22,  0.00 ],  // orbital ↻
  [0.88, 0.10, 1.8, 0.42,  0,      0,     0    ],  // drift only
  [0.59, 0.22, 3.0, 0.78,  0,      0,     0    ],  // drift only — hub A
  [0.76, 0.27, 2.5, 0.63, 48,  0.17,  1.05 ],  // orbital ↻
  [0.93, 0.30, 1.8, 0.38,  0,      0,     0    ],  // drift only
  [0.52, 0.42, 2.5, 0.62, 42,  0.24,  2.20 ],  // orbital ↻
  [0.66, 0.44, 3.5, 0.82,  0,      0,     0    ],  // drift only — hub B (largest)
  [0.82, 0.45, 2.0, 0.50,  0,      0,     0    ],  // drift only
  [0.97, 0.39, 1.5, 0.32, 28, -0.19,  0.55 ],  // orbital ↺ (counter-rotate)
  [0.57, 0.62, 2.5, 0.65,  0,      0,     0    ],  // drift only
  [0.74, 0.65, 3.0, 0.72, 52,  0.14,  3.20 ],  // orbital ↻ large + slow
  [0.89, 0.68, 2.0, 0.48,  0,      0,     0    ],  // drift only
  [0.49, 0.78, 2.0, 0.52, 36,  0.27,  1.70 ],  // orbital ↻
  [0.64, 0.83, 2.5, 0.57,  0,      0,     0    ],  // drift only
  [0.80, 0.82, 2.0, 0.44, 30, -0.21,  4.50 ],  // orbital ↺
  [0.95, 0.87, 1.5, 0.34,  0,      0,     0    ],  // drift only
  [0.31, 0.28, 1.5, 0.20, 22,  0.29,  0.85 ],  // orbital ↻ (left accent)
  [0.36, 0.56, 1.5, 0.16,  0,      0,     0    ],  // drift only
  [0.42, 0.14, 1.5, 0.18,  0,      0,     0    ],  // drift only
  [0.28, 0.68, 1.5, 0.14,  0,      0,     0    ],  // drift only
  [0.44, 0.88, 1.5, 0.15,  0,      0,     0    ],  // drift only
]

const A = [14, 7, 4]
const F = [0.038, 0.067, 0.029]

const NODES: Node[] = DEFS.map(([bx, by, r, gBase, oR, oF, oP], i) => {
  const rnd = prng(i * 137 + 1)
  return {
    bx, by, r, gBase, x: 0, y: 0,
    ax: A.map(a => a * (0.6 + rnd() * 0.8)),
    fx: F.map(f => f * (0.7 + rnd() * 0.6)),
    px: [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28],
    ay: A.map(a => a * (0.5 + rnd() * 0.9)),
    fy: F.map(f => f * (0.8 + rnd() * 0.5)),
    py: [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28],
    gAmp: 0.22 * (0.4 + rnd()),
    gFreq: 0.28 + rnd() * 0.32,
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

      // 1. Update positions: 3-layer sine drift + optional circular orbit.
      //    oR=0 → orbit term contributes 0, so non-orbital nodes are unaffected.
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

      // 2. Very faint dashed orbit trace — ghosts the circular path behind each
      //    orbital node, giving the sci-fi mainframe / electron-shell look.
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

      // 3. Edges — appear and dissolve as nodes drift in and out of range.
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

      // 4. Nodes: radial glow halo + core dot, both breathing in size and opacity.
      for (const n of NODES) {
        const pulse = 0.5 + 0.5 * Math.sin(t * n.gFreq + n.gPhase)
        const g = n.gBase + n.gAmp * pulse
        const r = n.r * (0.65 + 0.70 * pulse)

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
