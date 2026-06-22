// Full-page fixed network topology canvas.
// Lives in App.tsx as a fixed backdrop so it persists through all scroll positions.

type Drift = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'

interface NNode {
  x: number; y: number
  r: number; gR: number        // core radius, glow halo radius
  drift: Drift; dDelay: string  // which drift path + start offset
  pDelay: string; pDur: string  // pulse delay + duration (shared by glow & core)
  cA: number; gA: number        // core alpha, glow alpha at peak
}

// viewBox: 1440 × 900. Nodes biased right (x > 600); a few left accents for depth.
const NODES: NNode[] = [
  // — top cluster —
  { x: 782, y:  92, r:2.5, gR:13, drift:'A', dDelay:'0s',   pDelay:'0s',    pDur:'4.5s', cA:0.72, gA:0.14 },
  { x: 982, y:  70, r:2,   gR:10, drift:'E', dDelay:'-8s',  pDelay:'-1.8s', pDur:'5.5s', cA:0.55, gA:0.10 },
  { x:1255, y: 128, r:1.8, gR: 9, drift:'C', dDelay:'-15s', pDelay:'-3.2s', pDur:'6s',   cA:0.44, gA:0.08 },
  // — upper-mid cluster —
  { x: 852, y: 200, r:3,   gR:15, drift:'B', dDelay:'-11s', pDelay:'-0.8s', pDur:'5s',   cA:0.78, gA:0.16 },
  { x:1102, y: 240, r:2.5, gR:12, drift:'F', dDelay:'-19s', pDelay:'-4.1s', pDur:'5.5s', cA:0.64, gA:0.13 },
  { x:1335, y: 270, r:1.8, gR: 9, drift:'D', dDelay:'-6s',  pDelay:'-2.0s', pDur:'6.5s', cA:0.40, gA:0.08 },
  // — mid cluster —
  { x: 742, y: 360, r:2.5, gR:12, drift:'G', dDelay:'-22s', pDelay:'-3.5s', pDur:'4.8s', cA:0.62, gA:0.12 },
  { x: 952, y: 382, r:3.5, gR:17, drift:'A', dDelay:'-9s',  pDelay:'-1.2s', pDur:'5.2s', cA:0.82, gA:0.18 },
  { x:1182, y: 400, r:2,   gR:10, drift:'E', dDelay:'-17s', pDelay:'-4.8s', pDur:'6s',   cA:0.50, gA:0.10 },
  { x:1400, y: 352, r:1.5, gR: 8, drift:'H', dDelay:'-3s',  pDelay:'-0.5s', pDur:'7.5s', cA:0.32, gA:0.06 },
  // — lower-mid cluster —
  { x: 822, y: 542, r:2.5, gR:12, drift:'B', dDelay:'-13s', pDelay:'-2.8s', pDur:'5s',   cA:0.65, gA:0.13 },
  { x:1062, y: 562, r:3,   gR:14, drift:'F', dDelay:'-20s', pDelay:'-1.5s', pDur:'5.8s', cA:0.72, gA:0.15 },
  { x:1282, y: 592, r:2,   gR:10, drift:'G', dDelay:'-7s',  pDelay:'-3.7s', pDur:'6.2s', cA:0.48, gA:0.09 },
  // — bottom cluster —
  { x: 702, y: 700, r:2,   gR:10, drift:'D', dDelay:'-24s', pDelay:'-2.2s', pDur:'5.5s', cA:0.50, gA:0.10 },
  { x: 922, y: 742, r:2.5, gR:12, drift:'H', dDelay:'-10s', pDelay:'-0.9s', pDur:'4.8s', cA:0.57, gA:0.11 },
  { x:1152, y: 722, r:2,   gR:10, drift:'C', dDelay:'-18s', pDelay:'-3.9s', pDur:'6s',   cA:0.44, gA:0.09 },
  { x:1365, y: 772, r:1.5, gR: 8, drift:'E', dDelay:'-5s',  pDelay:'-1.7s', pDur:'7s',   cA:0.34, gA:0.07 },
  // — left accent nodes (very faint, add depth to left side) —
  { x: 452, y: 250, r:1.5, gR: 7, drift:'C', dDelay:'-16s', pDelay:'-4.5s', pDur:'6.5s', cA:0.20, gA:0.04 },
  { x: 522, y: 500, r:1.5, gR: 7, drift:'G', dDelay:'-26s', pDelay:'-2.6s', pDur:'5.8s', cA:0.16, gA:0.03 },
  { x: 602, y: 122, r:1.5, gR: 7, drift:'F', dDelay:'-21s', pDelay:'-3.1s', pDur:'5.2s', cA:0.18, gA:0.04 },
]

// Sparse edge graph between node indices
const EDGES: [number, number][] = [
  [0,1],[1,2],[0,3],[1,4],[2,4],[3,4],[4,5],
  [3,6],[4,7],[7,8],[8,9],[6,7],
  [6,10],[7,11],[8,12],[10,11],[11,12],
  [10,13],[11,14],[12,15],[13,14],[14,15],[15,16],
]

// Fixed-coordinate flow lines (not node-index-driven, so they don't drift)
const FLOWS: { x1:number; y1:number; x2:number; y2:number; dash:string; cls:string }[] = [
  { x1:782, y1: 92, x2:852,  y2:200, dash:'10 120', cls:'nw-flow-A' },
  { x1:742, y1:360, x2:822,  y2:542, dash:'8 192',  cls:'nw-flow-B' },
  { x1:822, y1:542, x2:702,  y2:700, dash:'9 192',  cls:'nw-flow-C' },
]

// Hub nodes that emit a periodic ping ring
const PINGS: { ni: number; cls: string }[] = [
  { ni: 3, cls: 'nw-ping-A' },  // (852, 200)
  { ni: 7, cls: 'nw-ping-B' },  // (952, 382)
  { ni:11, cls: 'nw-ping-C' },  // (1062, 562)
]

const rgba = (a: number) => `rgba(59,159,255,${a.toFixed(2)})`

export default function NetworkCanvas() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
    >
      {/* ── Static structural edges ── */}
      {EDGES.map(([i, j], k) => (
        <line
          key={k}
          x1={NODES[i].x} y1={NODES[i].y}
          x2={NODES[j].x} y2={NODES[j].y}
          stroke={rgba(((NODES[i].cA + NODES[j].cA) / 2) * 0.13)}
          strokeWidth="1"
        />
      ))}

      {/* ── Animated data-flow pulses ── */}
      {FLOWS.map((f, k) => (
        <line
          key={k}
          x1={f.x1} y1={f.y1} x2={f.x2} y2={f.y2}
          stroke={rgba(0.50 - k * 0.06)}
          strokeWidth="1"
          strokeDasharray={f.dash}
          className={f.cls}
        />
      ))}

      {/* ── Ping rings: expanding from hub nodes ── */}
      {PINGS.map(({ ni, cls }, k) => (
        <g key={k} className={cls}>
          <circle
            cx={NODES[ni].x} cy={NODES[ni].y} r={6}
            stroke={rgba(0.55 - k * 0.07)}
            strokeWidth="1"
          />
        </g>
      ))}

      {/* ── Nodes: glow halo + bright core inside a drifting group ── */}
      {NODES.map((n, k) => (
        <g
          key={k}
          className={`nw-drift-${n.drift}`}
          style={{ animationDelay: n.dDelay }}
        >
          {/* Soft glow halo */}
          <circle
            cx={n.x} cy={n.y} r={n.gR}
            fill={rgba(n.gA)}
            className="nw-glow"
            style={{ animationDelay: n.pDelay, animationDuration: n.pDur }}
          />
          {/* Bright core dot */}
          <circle
            cx={n.x} cy={n.y} r={n.r}
            fill={rgba(n.cA)}
            className="nw-core"
            style={{ animationDelay: n.pDelay, animationDuration: n.pDur }}
          />
        </g>
      ))}
    </svg>
  )
}
