"use client";

import { useId } from "react";
import type { SceneVariant } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Hand-built vector "photography" — every placeholder image on the    */
/*  site is one of these scenes. No stock imagery, no external assets.  */
/* ------------------------------------------------------------------ */

const C = {
  lagoon: "#0FB5AE",
  lagoonD: "#05928F",
  lagoonDD: "#077473",
  lagoonDDD: "#0A5C5C",
  lagoonL: "#5FE6DB",
  lagoonLL: "#9BF3E9",
  coral: "#FF6B57",
  coralD: "#EF4529",
  coralL: "#FFA08C",
  coralLL: "#FFC7BA",
  sun: "#FFC53D",
  sunD: "#F9A90B",
  sunL: "#FFE188",
  sunDD: "#DD8103",
  sand: "#FFF8EE",
  sand2: "#F8EAD6",
  sand3: "#ECD8BE",
  ink: "#06171D",
  ink2: "#0B232C",
} as const;

type Props = {
  variant?: SceneVariant;
  className?: string;
  /** slightly shifts decorative elements so repeated scenes don't look cloned */
  seed?: number;
  animated?: boolean;
};

export function Scene({
  variant = "terrace",
  className,
  seed = 0,
  animated = true,
}: Props) {
  const uid = useId().replace(/[:]/g, "");
  const g = (n: string) => `${uid}-${n}`;
  const shift = (seed % 5) * 6;

  return (
    <svg
      viewBox="0 0 400 300"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={g("sky")} x1="0" y1="0" x2="0" y2="1">
          {skyStops(variant)}
        </linearGradient>
        <linearGradient id={g("sea")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.lagoonL} />
          <stop offset="55%" stopColor={C.lagoon} />
          <stop offset="100%" stopColor={C.lagoonDDD} />
        </linearGradient>
        <linearGradient id={g("hill")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.lagoon} />
          <stop offset="100%" stopColor={C.lagoonDDD} />
        </linearGradient>
        <linearGradient id={g("warm")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.sunL} />
          <stop offset="100%" stopColor={C.coral} />
        </linearGradient>
        <radialGradient id={g("glow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.sunL} stopOpacity="0.95" />
          <stop offset="70%" stopColor={C.sun} stopOpacity="0.25" />
          <stop offset="100%" stopColor={C.sun} stopOpacity="0" />
        </radialGradient>
        <clipPath id={g("clip")}>
          <rect x="0" y="0" width="400" height="300" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${g("clip")})`}>
        <rect width="400" height="300" fill={`url(#${g("sky")})`} />
        {renderVariant(variant, g, shift, animated)}
        {/* soft vignette so text overlays stay readable */}
        <rect
          width="400"
          height="300"
          fill={C.ink}
          opacity="0.05"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */

function skyStops(v: SceneVariant) {
  switch (v) {
    case "volcano":
      return (
        <>
          <stop offset="0%" stopColor="#2B1B4A" />
          <stop offset="45%" stopColor={C.coral} />
          <stop offset="100%" stopColor={C.sun} />
        </>
      );
    case "cliff":
    case "beach":
      return (
        <>
          <stop offset="0%" stopColor={C.sunL} />
          <stop offset="45%" stopColor="#FFD9A8" />
          <stop offset="100%" stopColor={C.coralLL} />
        </>
      );
    case "waterfall":
      return (
        <>
          <stop offset="0%" stopColor={C.lagoonLL} />
          <stop offset="100%" stopColor="#E9FBF4" />
        </>
      );
    case "temple":
      return (
        <>
          <stop offset="0%" stopColor="#0A2E3A" />
          <stop offset="60%" stopColor={C.lagoonDD} />
          <stop offset="100%" stopColor={C.sun} />
        </>
      );
    case "boat":
      return (
        <>
          <stop offset="0%" stopColor="#BFF2EE" />
          <stop offset="60%" stopColor={C.sunL} />
          <stop offset="100%" stopColor={C.coralL} />
        </>
      );
    case "village":
      return (
        <>
          <stop offset="0%" stopColor="#123A46" />
          <stop offset="70%" stopColor={C.lagoonDD} />
          <stop offset="100%" stopColor={C.coralD} />
        </>
      );
    default:
      return (
        <>
          <stop offset="0%" stopColor="#CFF6F1" />
          <stop offset="55%" stopColor={C.sunL} />
          <stop offset="100%" stopColor="#FFF0D2" />
        </>
      );
  }
}

function renderVariant(
  v: SceneVariant,
  g: (n: string) => string,
  s: number,
  anim: boolean
) {
  switch (v) {
    case "temple":
      return <Temple g={g} s={s} anim={anim} />;
    case "beach":
      return <Beach g={g} s={s} anim={anim} />;
    case "volcano":
      return <Volcano g={g} s={s} anim={anim} />;
    case "waterfall":
      return <Waterfall g={g} s={s} anim={anim} />;
    case "boat":
      return <Boat g={g} s={s} anim={anim} />;
    case "cliff":
      return <Cliff g={g} s={s} anim={anim} />;
    case "village":
      return <Village g={g} s={s} anim={anim} />;
    default:
      return <Terrace g={g} s={s} anim={anim} />;
  }
}

type VP = { g: (n: string) => string; s: number; anim: boolean };

/* ---------------- shared bits ---------------- */

function Sun({ x, y, r, g }: { x: number; y: number; r: number; g: (n: string) => string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 3.4} fill={`url(#${g("glow")})`} />
      <circle cx={x} cy={y} r={r} fill={C.sunL} />
      <circle cx={x} cy={y} r={r * 0.72} fill="#FFF6DC" opacity="0.75" />
    </g>
  );
}

function Birds({ x, y, anim }: { x: number; y: number; anim: boolean }) {
  return (
    <g stroke={C.ink2} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55">
      <path d={`M${x} ${y} q6 -6 12 0 q6 -6 12 0`}>
        {anim && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 14 -6; 0 0"
            dur="9s"
            repeatCount="indefinite"
          />
        )}
      </path>
      <path d={`M${x + 34} ${y + 16} q4.5 -4.5 9 0 q4.5 -4.5 9 0`} strokeWidth="1.6">
        {anim && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -10 8; 0 0"
            dur="11s"
            repeatCount="indefinite"
          />
        )}
      </path>
    </g>
  );
}

function Clouds({ y, anim, opacity = 0.6 }: { y: number; anim: boolean; opacity?: number }) {
  return (
    <g fill="#FFFFFF" opacity={opacity}>
      <g>
        <ellipse cx="70" cy={y} rx="34" ry="13" />
        <ellipse cx="96" cy={y - 7} rx="24" ry="12" />
        {anim && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-30 0; 40 0; -30 0"
            dur="26s"
            repeatCount="indefinite"
          />
        )}
      </g>
      <g opacity="0.75">
        <ellipse cx="300" cy={y + 26} rx="42" ry="14" />
        <ellipse cx="272" cy={y + 19} rx="26" ry="12" />
        {anim && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="25 0; -35 0; 25 0"
            dur="34s"
            repeatCount="indefinite"
          />
        )}
      </g>
    </g>
  );
}

function Palm({ x, y, scale = 1, flip = false, anim }: { x: number; y: number; scale?: number; flip?: boolean; anim: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      {/* inner group carries the CSS animation so it can't clobber the
          positioning transform on the parent */}
      <g
        style={
          anim
            ? { transformOrigin: "0px 0px", animation: "vbt-sway 6s ease-in-out infinite" }
            : undefined
        }
      >
        <path d="M0 0 C -4 -30 -6 -60 -2 -88" stroke={C.ink2} strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.9" />
        <g fill={C.lagoonDDD}>
          <path d="M-2 -88 C -30 -104 -52 -100 -66 -86 C -46 -92 -22 -92 -2 -82 Z" />
          <path d="M-2 -88 C 24 -108 50 -104 64 -90 C 44 -96 20 -94 -2 -82 Z" />
          <path d="M-2 -88 C -22 -116 -14 -136 2 -146 C -2 -128 -1 -108 -2 -84 Z" />
          <path d="M-2 -88 C 16 -112 40 -118 58 -114 C 36 -110 16 -100 -2 -82 Z" opacity="0.85" />
          <path d="M-2 -88 C -26 -92 -48 -80 -58 -64 C -40 -76 -20 -80 -2 -80 Z" opacity="0.8" />
        </g>
        <circle cx="-8" cy="-84" r="4" fill={C.sunD} />
        <circle cx="2" cy="-80" r="4" fill={C.sunD} />
      </g>
    </g>
  );
}

function Waves({ y, anim }: { y: number; anim: boolean }) {
  return (
    <g opacity="0.5" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round">
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${20 + i * 30} ${y + i * 16} q10 -6 20 0 q10 6 20 0`}>
          {anim && (
            <animate
              attributeName="opacity"
              values="0.2;0.9;0.2"
              dur={`${3 + i}s`}
              repeatCount="indefinite"
            />
          )}
        </path>
      ))}
      {[0, 1, 2].map((i) => (
        <path key={`r${i}`} d={`M${250 + i * 34} ${y + 6 + i * 14} q10 -6 20 0 q10 6 20 0`} opacity="0.7">
          {anim && (
            <animate
              attributeName="opacity"
              values="0.7;0.15;0.7"
              dur={`${4 + i}s`}
              repeatCount="indefinite"
            />
          )}
        </path>
      ))}
    </g>
  );
}

/* ---------------- variants ---------------- */

function Terrace({ g, s, anim }: VP) {
  return (
    <>
      <Sun x={318 - s} y={62} r={24} g={g} />
      <Clouds y={54} anim={anim} opacity={0.5} />
      {/* distant ridge */}
      <path d="M0 132 L58 104 L112 128 L168 96 L232 130 L292 102 L352 128 L400 108 L400 300 L0 300 Z" fill={C.lagoonDDD} opacity="0.35" />
      {/* stacked paddies */}
      {[
        { y: 150, c: C.lagoonL },
        { y: 176, c: "#7FEBDD" },
        { y: 202, c: C.lagoon },
        { y: 228, c: C.lagoonD },
        { y: 256, c: C.lagoonDD },
        { y: 284, c: C.lagoonDDD },
      ].map((row, i) => (
        <path
          key={i}
          d={`M-10 ${row.y} C 80 ${row.y - 18 - (i % 2) * 6}, 200 ${row.y + 16}, 410 ${row.y - 8} L410 300 L-10 300 Z`}
          fill={row.c}
        />
      ))}
      {/* terrace edge highlights */}
      {[150, 176, 202, 228, 256].map((y, i) => (
        <path
          key={`e${i}`}
          d={`M-10 ${y} C 80 ${y - 18 - (i % 2) * 6}, 200 ${y + 16}, 410 ${y - 8}`}
          stroke="#FFFFFF"
          strokeOpacity="0.45"
          strokeWidth="2"
          fill="none"
        />
      ))}
      {/* farmer with conical hat */}
      <g transform={`translate(${262 + s} 196)`}>
        <path d="M-14 0 L14 0 L0 -12 Z" fill={C.sun} />
        <rect x="-4" y="0" width="8" height="18" rx="3" fill={C.coralD} />
      </g>
      <Palm x={52} y={252} scale={0.62} anim={anim} />
      <Birds x={110} y={70} anim={anim} />
    </>
  );
}

function Temple({ g, s, anim }: VP) {
  const tier = (x: number, w: number, y: number, h: number, fill: string) => (
    <rect x={x} y={y} width={w} height={h} rx="2" fill={fill} />
  );
  return (
    <>
      <Sun x={200} y={128} r={30} g={g} />
      <Clouds y={46} anim={anim} opacity={0.28} />
      {/* mist bands */}
      <rect y="150" width="400" height="10" fill="#FFFFFF" opacity="0.18" />
      <rect y="172" width="400" height="6" fill="#FFFFFF" opacity="0.12" />
      {/* split gate — candi bentar */}
      {[0, 1].map((side) => {
        const dir = side === 0 ? -1 : 1;
        const base = 200 + dir * 46;
        return (
          <g key={side} transform={`translate(${base} 0) scale(${dir} 1)`}>
            {tier(-2, 46, 96, 24, C.ink2)}
            {tier(0, 42, 120, 26, "#123A46")}
            {tier(2, 38, 146, 28, C.ink2)}
            {tier(4, 34, 174, 30, "#123A46")}
            {tier(6, 30, 204, 34, C.ink2)}
            <rect x="-4" y="238" width="54" height="14" rx="3" fill="#0A2E3A" />
            {/* carved ornaments */}
            {[104, 130, 156, 184, 214].map((y, i) => (
              <rect key={i} x={4 + i * 2} y={y} width={34 - i * 2} height="3" fill={C.sunD} opacity="0.55" />
            ))}
          </g>
        );
      })}
      {/* steps */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={168 - i * 14} y={252 + i * 12} width={64 + i * 28} height="12" rx="2" fill={i % 2 ? "#0A2E3A" : C.ink2} />
      ))}
      {/* offering flames */}
      {[172, 228].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={244} rx="5" ry="9" fill={C.sun}>
            {anim && (
              <animate attributeName="ry" values="9;12;9" dur={`${1.6 + i * 0.4}s`} repeatCount="indefinite" />
            )}
          </ellipse>
          <ellipse cx={x} cy={246} rx="2.5" ry="5" fill="#FFF6DC" />
        </g>
      ))}
      <Palm x={44 - s} y={272} scale={0.75} anim={anim} />
      <Palm x={366 + s} y={278} scale={0.68} flip anim={anim} />
      <Birds x={80} y={62} anim={anim} />
    </>
  );
}

function Beach({ g, s, anim }: VP) {
  return (
    <>
      <Sun x={300 + s} y={78} r={26} g={g} />
      <Clouds y={50} anim={anim} opacity={0.55} />
      <path d="M0 148 L70 128 L130 146 L190 124 L250 148 L320 130 L400 150 L400 300 L0 300 Z" fill={C.lagoonDDD} opacity="0.3" />
      <rect y="160" width="400" height="86" fill={`url(#${g("sea")})`} />
      <Waves y={178} anim={anim} />
      {/* shoreline foam */}
      <path d="M0 240 C 60 232, 120 250, 190 242 C 260 234, 330 252, 400 244 L400 300 L0 300 Z" fill={C.sand2} />
      <path d="M0 240 C 60 232, 120 250, 190 242 C 260 234, 330 252, 400 244" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M0 258 C 70 250, 130 268, 200 260 C 270 252, 340 270, 400 262 L400 300 L0 300 Z" fill={C.sand3} opacity="0.7" />
      {/* parasol */}
      <g transform={`translate(${292 + s} 262)`}>
        <rect x="-2" y="-40" width="4" height="42" rx="2" fill={C.ink2} />
        <path d="M-38 -38 A38 38 0 0 1 38 -38 Z" fill={C.coral} />
        <path d="M-38 -38 A38 38 0 0 1 -13 -38 Z" fill={C.sun} />
        <path d="M13 -38 A38 38 0 0 1 38 -38 Z" fill={C.sun} />
      </g>
      {/* surfboard */}
      <g transform={`translate(${104 - s} 268) rotate(-14)`}>
        <ellipse cx="0" cy="0" rx="30" ry="8" fill={C.sand} />
        <ellipse cx="0" cy="0" rx="30" ry="8" fill="none" stroke={C.coralD} strokeWidth="2" />
        <path d="M-24 0 H24" stroke={C.lagoon} strokeWidth="3" />
      </g>
      <Palm x={40} y={286} scale={0.9} anim={anim} />
      <Birds x={150} y={56} anim={anim} />
    </>
  );
}

function Volcano({ g, s, anim }: VP) {
  return (
    <>
      <Sun x={200} y={168} r={22} g={g} />
      {/* sun rays */}
      <g opacity="0.35">
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x="198" y="60" width="4" height="110" fill={C.sunL} transform={`rotate(${i * 40} 200 168)`} />
        ))}
      </g>
      {/* cloud sea */}
      <ellipse cx="200" cy="252" rx="260" ry="34" fill="#FFFFFF" opacity="0.75" />
      <ellipse cx="90" cy="242" rx="90" ry="20" fill="#FFFFFF" opacity="0.55" />
      <ellipse cx="320" cy="246" rx="100" ry="22" fill="#FFFFFF" opacity="0.5" />
      {/* far peak */}
      <path d="M20 236 L110 128 L200 236 Z" fill={C.ink2} opacity="0.55" />
      {/* main volcano */}
      <path d="M120 250 L228 96 L336 250 Z" fill="#12333F" />
      <path d="M228 96 L336 250 L268 250 Z" fill="#0A2229" />
      {/* crater glow + smoke */}
      <ellipse cx="228" cy="100" rx="16" ry="6" fill={C.coralD} opacity="0.9" />
      <g opacity="0.55">
        <ellipse cx="228" cy="76" rx="14" ry="10" fill="#FFFFFF">
          {anim && <animate attributeName="cy" values="76;54;76" dur="7s" repeatCount="indefinite" />}
        </ellipse>
        <ellipse cx="240" cy="58" rx="10" ry="8" fill="#FFFFFF" opacity="0.7">
          {anim && <animate attributeName="cy" values="58;34;58" dur="9s" repeatCount="indefinite" />}
        </ellipse>
      </g>
      {/* lava streaks */}
      <path d="M228 104 L214 160 L222 200" stroke={C.coral} strokeWidth="3" fill="none" opacity="0.65" strokeLinecap="round" />
      <path d="M228 104 L246 152 L238 190" stroke={C.sun} strokeWidth="2" fill="none" opacity="0.55" strokeLinecap="round" />
      {/* trekker silhouettes */}
      <g fill={C.ink} transform={`translate(${300 + s} 246)`}>
        <circle cx="0" cy="-16" r="4" />
        <path d="M-4 -12 L4 -12 L6 0 L-6 0 Z" />
        <path d="M-6 0 L-8 10 M6 0 L8 10" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g fill={C.ink} transform={`translate(${318 + s} 250) scale(0.85)`}>
        <circle cx="0" cy="-16" r="4" />
        <path d="M-4 -12 L4 -12 L6 0 L-6 0 Z" />
      </g>
      {/* stars */}
      {[[40, 30], [78, 18], [340, 26], [366, 48], [128, 22]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="#FFFFFF" opacity="0.8">
          {anim && (
            <animate attributeName="opacity" values="0.15;1;0.15" dur={`${2.4 + i * 0.5}s`} repeatCount="indefinite" />
          )}
        </circle>
      ))}
    </>
  );
}

function Waterfall({ g, s, anim }: VP) {
  return (
    <>
      <Clouds y={40} anim={anim} opacity={0.35} />
      {/* jungle walls */}
      <path d="M0 0 L124 0 L146 90 L120 170 L136 300 L0 300 Z" fill={C.lagoonDDD} />
      <path d="M400 0 L276 0 L252 88 L280 168 L262 300 L400 300 Z" fill="#0A5C5C" />
      <path d="M0 0 L96 0 L112 96 L86 300 L0 300 Z" fill="#083F44" opacity="0.8" />
      <path d="M400 0 L306 0 L292 100 L316 300 L400 300 Z" fill="#083F44" opacity="0.7" />
      {/* foliage blobs */}
      {[[24, 60], [66, 118], [30, 190], [372, 70], [336, 132], [364, 210]].map(([x, y], i) => (
        <circle key={i} cx={x + (i % 2 ? s : -s)} cy={y} r={26 - (i % 3) * 4} fill={i % 2 ? C.lagoon : C.lagoonL} opacity="0.5" />
      ))}
      {/* falling water */}
      <path d="M162 22 L238 22 L226 214 L174 214 Z" fill="#EAFDFA" opacity="0.95" />
      <path d="M176 22 L196 22 L190 214 L180 214 Z" fill="#FFFFFF" opacity="0.85" />
      <path d="M208 22 L224 22 L216 214 L206 214 Z" fill="#FFFFFF" opacity="0.6" />
      {anim &&
        [0, 1, 2].map((i) => (
          <rect key={i} x={182 + i * 14} y={30} width="3" height="40" rx="2" fill="#FFFFFF" opacity="0.7">
            <animate attributeName="y" values="20;190" dur={`${1.1 + i * 0.25}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0" dur={`${1.1 + i * 0.25}s`} repeatCount="indefinite" />
          </rect>
        ))}
      {/* plunge pool */}
      <ellipse cx="200" cy="228" rx="118" ry="30" fill={C.lagoonL} />
      <ellipse cx="200" cy="232" rx="96" ry="23" fill={C.lagoon} />
      <ellipse cx="200" cy="222" rx="46" ry="13" fill="#FFFFFF" opacity="0.75">
        {anim && <animate attributeName="rx" values="40;56;40" dur="3.4s" repeatCount="indefinite" />}
      </ellipse>
      <rect y="246" width="400" height="54" fill={C.lagoonD} />
      <ellipse cx="200" cy="248" rx="140" ry="18" fill={C.lagoon} opacity="0.7" />
      {/* rocks */}
      <ellipse cx="98" cy="252" rx="34" ry="14" fill="#2C4A52" />
      <ellipse cx="312" cy="258" rx="40" ry="16" fill="#223E46" />
    </>
  );
}

function Boat({ g, s, anim }: VP) {
  return (
    <>
      <Sun x={92 - s} y={72} r={28} g={g} />
      <Clouds y={44} anim={anim} opacity={0.5} />
      <path d="M0 142 L80 120 L160 140 L240 116 L320 138 L400 122 L400 300 L0 300 Z" fill={C.lagoonDDD} opacity="0.28" />
      <rect y="150" width="400" height="150" fill={`url(#${g("sea")})`} />
      {/* sun path shimmer */}
      <g opacity="0.55" fill={C.sunL}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={70 - i * 4 - s} y={162 + i * 18} width={44 + i * 10} height="5" rx="3">
            {anim && (
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
            )}
          </rect>
        ))}
      </g>
      {/* jukung outrigger */}
      <g transform={`translate(${250 + s} 204)`}>
      <g style={anim ? { animation: "vbt-float 5s ease-in-out infinite" } : undefined}>
        <path d="M-58 0 C -46 16, 46 16, 58 0 Z" fill={C.coralD} />
        <path d="M-58 0 C -46 8, 46 8, 58 0 Z" fill={C.coral} />
        <rect x="-2" y="-56" width="4" height="56" rx="2" fill={C.ink2} />
        <path d="M2 -54 L40 -6 L2 -6 Z" fill={C.sand} />
        <path d="M-2 -48 L-30 -8 L-2 -8 Z" fill={C.sunL} />
        {/* outrigger arms */}
        <path d="M-40 2 L-64 16 M40 2 L64 16" stroke="#7A4A22" strokeWidth="3" strokeLinecap="round" />
        <path d="M-74 18 C -58 12, 58 12, 74 18" stroke="#7A4A22" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      </g>
      <Waves y={244} anim={anim} />
      <Palm x={366} y={296} scale={0.8} flip anim={anim} />
      <Birds x={188} y={58} anim={anim} />
    </>
  );
}

function Cliff({ g, s, anim }: VP) {
  return (
    <>
      <Sun x={318} y={92} r={30} g={g} />
      <Clouds y={52} anim={anim} opacity={0.45} />
      <rect y="176" width="400" height="124" fill={`url(#${g("sea")})`} />
      <Waves y={196} anim={anim} />
      {/* headland */}
      <path d="M-10 176 C 40 150, 60 120, 110 118 C 150 116, 168 148, 196 176 L196 300 L-10 300 Z" fill="#0C3A44" />
      <path d="M-10 176 C 40 150, 60 120, 110 118 C 150 116, 168 148, 196 176 L196 200 L-10 210 Z" fill={C.lagoonDDD} />
      {/* grass cap */}
      <path d="M8 168 C 44 144, 68 122, 112 120 C 146 119, 164 142, 186 168 C 140 152, 60 152, 8 168 Z" fill={C.lagoon} />
      {/* sea arch */}
      <path d="M258 176 L258 128 C 258 112, 302 112, 302 128 L302 176 L288 176 L288 138 C 288 130, 272 130, 272 138 L272 176 Z" fill="#0C3A44" />
      <path d="M302 176 L302 132 C 316 138, 340 152, 360 176 Z" fill="#0A2E38" />
      {/* clifftop temple */}
      <g transform={`translate(${104 + s} 118)`}>
        <path d="M-16 0 L16 0 L12 -10 L-12 -10 Z" fill={C.ink2} />
        <path d="M-12 -10 L12 -10 L8 -20 L-8 -20 Z" fill="#123A46" />
        <path d="M-8 -20 L8 -20 L0 -34 Z" fill={C.ink2} />
        <rect x="-1.5" y="-42" width="3" height="9" fill={C.sunD} />
      </g>
      {/* foam at cliff base */}
      <ellipse cx="196" cy="212" rx="34" ry="8" fill="#FFFFFF" opacity="0.7">
        {anim && <animate attributeName="rx" values="28;42;28" dur="4s" repeatCount="indefinite" />}
      </ellipse>
      <Birds x={220} y={72} anim={anim} />
    </>
  );
}

function Village({ g, s, anim }: VP) {
  const roof = (x: number, y: number, w: number, h: number, fill: string) => (
    <path d={`M${x} ${y} L${x + w / 2} ${y - h} L${x + w} ${y} Z`} fill={fill} />
  );
  return (
    <>
      {/* moon */}
      <circle cx={318 - s} cy="66" r="22" fill={C.sunL} opacity="0.95" />
      <circle cx={310 - s} cy="60" r="20" fill="#123A46" opacity="0.9" />
      {[[52, 40], [96, 26], [150, 52], [214, 30], [268, 60], [364, 38]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="#FFFFFF">
          {anim && (
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2 + i * 0.6}s`} repeatCount="indefinite" />
          )}
        </circle>
      ))}
      {/* tree line */}
      <path d="M0 176 C 40 150, 80 168, 120 148 C 160 128, 200 166, 240 150 C 280 134, 330 168, 400 146 L400 300 L0 300 Z" fill="#062E38" />
      {/* houses with alang-alang roofs */}
      <g>
        <rect x="52" y="196" width="70" height="48" rx="3" fill="#123A46" />
        {roof(42, 196, 90, 34, "#5A3A22")}
        <rect x="70" y="216" width="16" height="28" fill={C.sun} opacity="0.9" />
        <rect x="96" y="214" width="14" height="14" fill={C.sunL} opacity="0.8" />
      </g>
      <g>
        <rect x="168" y="182" width="84" height="62" rx="3" fill="#0E323D" />
        {roof(156, 182, 108, 40, "#6B4526")}
        <rect x="196" y="206" width="20" height="38" fill={C.coral} opacity="0.9" />
        <rect x="226" y="202" width="16" height="16" fill={C.sunL} opacity="0.85" />
      </g>
      <g>
        <rect x="288" y="200" width="64" height="44" rx="3" fill="#123A46" />
        {roof(278, 200, 84, 30, "#5A3A22")}
        <rect x="306" y="218" width="14" height="26" fill={C.sun} opacity="0.85" />
      </g>
      {/* ground */}
      <rect y="244" width="400" height="56" fill="#08222A" />
      <path d="M0 258 C 100 250, 300 268, 400 256" stroke={C.lagoonDD} strokeWidth="3" fill="none" opacity="0.6" />
      {/* lanterns */}
      {[[140, 168], [268, 158], [40, 172]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y - 26} x2={x} y2={y - 10} stroke="#5A3A22" strokeWidth="1.5" />
          <ellipse cx={x} cy={y} rx="8" ry="11" fill={C.coral} opacity="0.95" />
          <ellipse cx={x} cy={y} rx="4" ry="6" fill={C.sunL} />
          {anim && (
            <animateTransform attributeName="transform" type="rotate" values={`-4 ${x} ${y - 26}; 4 ${x} ${y - 26}; -4 ${x} ${y - 26}`} dur={`${3 + i}s`} repeatCount="indefinite" />
          )}
        </g>
      ))}
      <Palm x={376} y={252} scale={0.6} flip anim={anim} />
    </>
  );
}
