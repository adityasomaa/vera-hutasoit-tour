/**
 * Photography registry.
 *
 * All images are free stock from Pexels, chosen to match the content they sit
 * next to. `tone` records whether the frame is visually dark or light, which
 * the hero slider uses to pick the readable header colour scheme.
 */

export type Tone = "dark" | "light";

export type Photo = {
  /** Pexels photo id — the URL is derived from it */
  id: number;
  tone: Tone;
  /** average colour, used as the placeholder while the image loads */
  bg: string;
  photographer: string;
};

export const pexelsUrl = (id: number, w: number, h?: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}${
    h ? `&h=${h}` : ""
  }`;

const p = (id: number, tone: Tone, bg: string, photographer: string): Photo => ({
  id,
  tone,
  bg,
  photographer,
});

export const PHOTOS = {
  /* ---- hero slider: iconic Bali ---- */
  heroTerrace: p(36856729, "dark", "#606A25", "Tom Fisk"),
  heroKelingking: p(12595741, "dark", "#2A636C", "Chait Goli"),
  heroLempuyang: p(14475016, "light", "#ABAEA5", "Rizk Nas"),
  heroBatur: p(6015942, "dark", "#3E444B", "Alesia Kozik"),
  heroUluwatu: p(30286799, "light", "#8A8782", "Saksham Vikram"),

  /* ---- locations ---- */
  locUbud: p(5151206, "dark", "#72633D", "Maria Marghareta Wibisono"),
  locPenida: p(5819116, "dark", "#6A787B", "Marlon Trottmann"),
  locBatur: p(2499744, "dark", "#737164", "Stijn Dijkstra"),
  locUluwatu: p(36593818, "dark", "#86745E", "Tom Fisk"),
  locWaterfall: p(8332633, "dark", "#616A3B", "Mikhail Nilov"),
  locSidemen: p(35094744, "light", "#7A7B76", "Relaxing Journeys"),

  /* ---- tour covers ---- */
  tourUbudCulture: p(36828568, "dark", "#657640", "Tom Fisk"),
  tourPenidaWest: p(6827322, "light", "#99A59E", "Dario Fernandez Ruz"),
  tourBaturTrek: p(38262769, "dark", "#5A6463", "AGUNG ANOM"),
  tourUbudGroup: p(7723741, "dark", "#51533B", "Mikhail Nilov"),
  tourPenidaGroup: p(30286819, "dark", "#4F7373", "Saksham Vikram"),
  tourKecak: p(35364628, "dark", "#696653", "Ilham Zovanka"),

  /* ---- supporting frames ---- */
  templeGates: p(7565600, "light", "#AEAFAD", "SHVETS production"),
  monkeyForest: p(2712005, "dark", "#454032", "Aleksandar Pasaric"),
  offerings: p(9313851, "dark", "#634E3B", "Alexey Demidov"),
  penidaCliffWalk: p(3544408, "light", "#7E8E78", "Simon Sto FPV"),
  penidaAerial: p(16582229, "dark", "#547177", "Phonsay Phothisomphane"),
  penidaBay: p(30286819, "dark", "#4F7373", "Saksham Vikram"),
  baturDawn: p(5985994, "dark", "#616056", "Dana Englich"),
  baturTrekkers: p(37559058, "light", "#737B7E", "Mia's Photography"),
  baturClouds: p(5769316, "light", "#999AA0", "Julia Volk"),
  jungleFall: p(5993139, "dark", "#444434", "Alesia Kozik"),
  riceTerraceSoft: p(10804637, "light", "#97B496", "Vladimir Konoplev"),
  balineseWoman: p(30678130, "dark", "#73705F", "Arjun Adinata"),
  uluwatuTemple: p(36653750, "dark", "#767269", "Tom Fisk"),
  kecakTorches: p(13945487, "dark", "#2D1B11", "el jusuf"),
  beachBoats: p(5656453, "light", "#628196", "Asian Wanderlust"),
  jukung: p(35833347, "light", "#8D857A", "AGUNG ANOM"),
  canoe: p(36663410, "dark", "#5B646D", "pierre matile"),
  ceremony: p(34308120, "dark", "#677B79", "Tavip Budiono"),
  ubudSwing: p(35720624, "dark", "#64723F", "Nancy Turangan"),
  uluwatuCliffs: p(36407456, "dark", "#756D3E", "Tom Fisk"),
} as const;

export type PhotoKey = keyof typeof PHOTOS;
