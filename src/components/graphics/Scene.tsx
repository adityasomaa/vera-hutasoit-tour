import type { SceneVariant } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Flat vector artwork. Every placeholder image on the site is one of  */
/*  these. Layered silhouettes, one hue family, a single warm accent.   */
/*  No gradients, no glows, no animation.                              */
/* ------------------------------------------------------------------ */

const C = {
  paper: "#F4EDE2",
  t1: "#DCECE9",
  t2: "#AFD5CF",
  t3: "#79B4AD",
  t4: "#4C8C87",
  t5: "#31625F",
  ink: "#22343B",
  sun: "#E3B45F",
  coral: "#CF6A50",
} as const;

type Props = {
  variant?: SceneVariant;
  className?: string;
  /** nudges decorative elements so repeated scenes are not identical */
  seed?: number;
};

export function Scene({ variant = "terrace", className, seed = 0 }: Props) {
  const s = (seed % 4) * 7;

  return (
    <svg
      viewBox="0 0 400 300"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <rect width="400" height="300" fill={C.paper} />
      {render(variant, s)}
    </svg>
  );
}

function render(v: SceneVariant, s: number) {
  switch (v) {
    case "temple":
      return <Temple s={s} />;
    case "beach":
      return <Beach s={s} />;
    case "volcano":
      return <Volcano s={s} />;
    case "waterfall":
      return <Waterfall s={s} />;
    case "boat":
      return <Boat s={s} />;
    case "cliff":
      return <Cliff s={s} />;
    case "village":
      return <Village s={s} />;
    default:
      return <Terrace s={s} />;
  }
}

/* ---------------- shared pieces ---------------- */

function Sun({ x, y, r = 26 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill={C.sun} />;
}

function Palm({ x, y, scale = 1, flip = false }: { x: number; y: number; scale?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M0 0 C -3 -26 -5 -52 -2 -76" stroke={C.ink} strokeWidth="5" fill="none" strokeLinecap="round" />
      <g fill={C.t5}>
        <path d="M-2 -76 C -26 -90 -46 -86 -58 -74 C -40 -80 -20 -80 -2 -71 Z" />
        <path d="M-2 -76 C 20 -94 44 -90 56 -78 C 38 -84 18 -82 -2 -71 Z" />
        <path d="M-2 -76 C -19 -100 -12 -118 2 -126 C -1 -110 -1 -93 -2 -73 Z" />
      </g>
    </g>
  );
}

/* ---------------- variants ---------------- */

function Terrace({ s }: { s: number }) {
  const rows = [
    { y: 150, c: C.t1 },
    { y: 176, c: C.t2 },
    { y: 202, c: C.t3 },
    { y: 230, c: C.t4 },
    { y: 260, c: C.t5 },
  ];
  return (
    <>
      <Sun x={310 - s} y={70} r={28} />
      <path d="M0 138 L70 108 L132 134 L196 100 L262 132 L330 104 L400 130 L400 300 L0 300 Z" fill={C.t2} opacity="0.55" />
      {rows.map((r, i) => (
        <path
          key={i}
          d={`M-10 ${r.y} C 90 ${r.y - 16}, 220 ${r.y + 14}, 410 ${r.y - 6} L410 300 L-10 300 Z`}
          fill={r.c}
        />
      ))}
      <Palm x={52} y={252} scale={0.6} />
    </>
  );
}

function Temple({ s }: { s: number }) {
  const tier = (x: number, w: number, y: number, h: number, f: string) => (
    <rect x={x} y={y} width={w} height={h} rx="1.5" fill={f} />
  );
  return (
    <>
      <Sun x={200} y={126} r={34} />
      <rect y="196" width="400" height="104" fill={C.t2} />
      {[0, 1].map((side) => {
        const dir = side === 0 ? -1 : 1;
        return (
          <g key={side} transform={`translate(${200 + dir * 44} 0) scale(${dir} 1)`}>
            {tier(-2, 44, 98, 22, C.ink)}
            {tier(0, 40, 120, 24, C.t5)}
            {tier(2, 36, 144, 26, C.ink)}
            {tier(4, 32, 170, 28, C.t5)}
            {tier(6, 28, 198, 30, C.ink)}
          </g>
        );
      })}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={172 - i * 16} y={228 + i * 14} width={56 + i * 32} height="14" rx="2" fill={i % 2 ? C.t5 : C.ink} />
      ))}
      <Palm x={44 - s} y={274} scale={0.7} />
      <Palm x={362 + s} y={280} scale={0.62} flip />
    </>
  );
}

function Beach({ s }: { s: number }) {
  return (
    <>
      <Sun x={300 + s} y={78} r={30} />
      <path d="M0 140 L80 116 L150 138 L220 112 L300 136 L400 116 L400 300 L0 300 Z" fill={C.t2} opacity="0.5" />
      <rect y="158" width="400" height="72" fill={C.t3} />
      <rect y="196" width="400" height="34" fill={C.t4} />
      <path d="M0 228 C 70 220, 130 238, 200 230 C 270 222, 340 240, 400 232 L400 300 L0 300 Z" fill={C.t1} />
      <path d="M0 252 C 80 244, 140 262, 210 254 C 280 246, 340 262, 400 254 L400 300 L0 300 Z" fill={C.paper} />
      <g transform={`translate(${294 + s} 258)`}>
        <rect x="-1.5" y="-38" width="3" height="40" rx="1.5" fill={C.ink} />
        <path d="M-34 -36 A34 34 0 0 1 34 -36 Z" fill={C.coral} />
        <path d="M-11 -36 A34 34 0 0 1 11 -36 Z" fill={C.sun} />
      </g>
      <Palm x={44} y={282} scale={0.85} />
    </>
  );
}

function Volcano({ s }: { s: number }) {
  return (
    <>
      <Sun x={200} y={156} r={24} />
      <ellipse cx="200" cy="248" rx="250" ry="30" fill={C.t1} />
      <ellipse cx="86" cy="238" rx="86" ry="18" fill={C.t1} />
      <ellipse cx="320" cy="242" rx="94" ry="20" fill={C.t1} />
      <path d="M24 234 L112 126 L200 234 Z" fill={C.t3} />
      <path d="M118 248 L228 92 L338 248 Z" fill={C.t5} />
      <path d="M228 92 L338 248 L268 248 Z" fill={C.ink} />
      <ellipse cx="228" cy="96" rx="15" ry="5" fill={C.coral} />
      <g fill={C.ink} transform={`translate(${300 + s} 244)`}>
        <circle cx="0" cy="-14" r="3.5" />
        <path d="M-3.5 -10 L3.5 -10 L5 0 L-5 0 Z" />
      </g>
      <rect y="248" width="400" height="52" fill={C.t2} />
    </>
  );
}

function Waterfall({ s }: { s: number }) {
  return (
    <>
      <path d="M0 0 L128 0 L146 96 L128 300 L0 300 Z" fill={C.t5} />
      <path d="M400 0 L272 0 L254 96 L272 300 L400 300 Z" fill={C.t4} />
      <path d="M0 0 L92 0 L104 100 L86 300 L0 300 Z" fill={C.ink} opacity="0.85" />
      <path d="M400 0 L308 0 L296 104 L314 300 L400 300 Z" fill={C.ink} opacity="0.7" />
      {[[30, 66], [70, 128], [36, 198], [370, 76], [334, 140], [364, 214]].map(([x, y], i) => (
        <circle key={i} cx={x + (i % 2 ? s : -s)} cy={y} r={22 - (i % 3) * 4} fill={C.t3} opacity="0.65" />
      ))}
      <path d="M166 20 L234 20 L224 212 L176 212 Z" fill={C.t1} />
      <path d="M180 20 L198 20 L192 212 L184 212 Z" fill={C.paper} />
      <ellipse cx="200" cy="226" rx="112" ry="28" fill={C.t2} />
      <ellipse cx="200" cy="230" rx="90" ry="21" fill={C.t3} />
      <rect y="244" width="400" height="56" fill={C.t4} />
      <ellipse cx="96" cy="250" rx="32" ry="12" fill={C.ink} opacity="0.5" />
      <ellipse cx="312" cy="256" rx="38" ry="14" fill={C.ink} opacity="0.4" />
    </>
  );
}

function Boat({ s }: { s: number }) {
  return (
    <>
      <Sun x={96 - s} y={80} r={32} />
      <path d="M0 136 L86 114 L166 134 L246 110 L326 132 L400 116 L400 300 L0 300 Z" fill={C.t2} opacity="0.5" />
      <rect y="150" width="400" height="150" fill={C.t3} />
      <rect y="206" width="400" height="94" fill={C.t4} />
      <g transform={`translate(${252 + s} 198)`}>
        <path d="M-54 0 C -42 14, 42 14, 54 0 Z" fill={C.ink} />
        <rect x="-1.5" y="-52" width="3" height="52" rx="1.5" fill={C.ink} />
        <path d="M2 -50 L36 -6 L2 -6 Z" fill={C.paper} />
        <path d="M-2 -44 L-28 -8 L-2 -8 Z" fill={C.sun} />
        <path d="M-38 2 L-60 14 M38 2 L60 14" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <Palm x={368} y={294} scale={0.72} flip />
    </>
  );
}

function Cliff({ s }: { s: number }) {
  return (
    <>
      <Sun x={316} y={88} r={32} />
      <rect y="170" width="400" height="130" fill={C.t3} />
      <rect y="220" width="400" height="80" fill={C.t4} />
      <path d="M-10 170 C 40 144, 62 116, 112 114 C 152 112, 170 144, 198 170 L198 300 L-10 300 Z" fill={C.t5} />
      <path d="M8 162 C 44 138, 70 118, 114 116 C 148 115, 166 138, 188 162 C 140 148, 60 148, 8 162 Z" fill={C.t3} />
      <path d="M258 170 L258 124 C 258 110, 302 110, 302 124 L302 170 L288 170 L288 134 C 288 127, 272 127, 272 134 L272 170 Z" fill={C.ink} />
      <path d="M302 170 L302 128 C 316 134, 340 148, 360 170 Z" fill={C.ink} opacity="0.75" />
      <g transform={`translate(${106 + s} 114)`}>
        <path d="M-15 0 L15 0 L11 -9 L-11 -9 Z" fill={C.ink} />
        <path d="M-11 -9 L11 -9 L7 -18 L-7 -18 Z" fill={C.t5} />
        <path d="M-7 -18 L7 -18 L0 -31 Z" fill={C.ink} />
      </g>
      <ellipse cx="196" cy="204" rx="30" ry="7" fill={C.t1} />
    </>
  );
}

function Village({ s }: { s: number }) {
  const roof = (x: number, y: number, w: number, h: number, f: string) => (
    <path d={`M${x} ${y} L${x + w / 2} ${y - h} L${x + w} ${y} Z`} fill={f} />
  );
  return (
    <>
      <Sun x={312 - s} y={72} r={26} />
      <path d="M0 172 C 44 148, 84 166, 126 146 C 168 126, 206 164, 246 148 C 286 132, 334 166, 400 144 L400 300 L0 300 Z" fill={C.t4} />
      <g>
        <rect x="54" y="192" width="68" height="48" rx="2" fill={C.t5} />
        {roof(44, 192, 88, 32, C.ink)}
        <rect x="72" y="212" width="15" height="28" fill={C.sun} />
      </g>
      <g>
        <rect x="168" y="178" width="82" height="62" rx="2" fill={C.ink} />
        {roof(156, 178, 106, 38, C.t5)}
        <rect x="196" y="202" width="19" height="38" fill={C.sun} />
      </g>
      <g>
        <rect x="288" y="196" width="62" height="44" rx="2" fill={C.t5} />
        {roof(278, 196, 82, 28, C.ink)}
        <rect x="306" y="214" width="13" height="26" fill={C.sun} />
      </g>
      <rect y="240" width="400" height="60" fill={C.t2} />
      <Palm x={376} y={250} scale={0.55} flip />
    </>
  );
}
