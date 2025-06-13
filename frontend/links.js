// links.js
const PLACEHOLDER = '/assets/videos/convention-cosplayers.mp4';

// Explicit mappings (both variants to ensure correct linking):
const specificLinks = {
  // Main categories
  CostumedPlay: '/assets/videos/costumed-play.mp4',
  CostumedPlay_video: '/assets/videos/costumed-play.mp4',

  // Performance category
  Performance: '/assets/videos/performance.mp4',
  Performance_video: '/assets/videos/performance.mp4',
  DragQueens: '/assets/videos/drag.mp4',
  DragQueens_video: '/assets/videos/drag.mp4',
  LuchaLibreWrestlers: '/assets/videos/luchalibre.mp4',
  LuchaLibreWrestlers_video: '/assets/videos/luchalibre.mp4',

  // Activism category
  BlackBloc: '/assets/videos/blacbloc.mp4',
  BlackBloc_video: '/assets/videos/blacbloc.mp4',
  SiegedSec: '/assets/videos/sieged-sec.mp4',
  SiegedSec_video: '/assets/videos/sieged-sec.mp4',
  PussyRiot: null, // Photos only
  PussyRiot_video: null,

  // Political category
  Political: '/assets/videos/politics.mp4',
  Political_video: '/assets/videos/politics.mp4',

  // Illegal category
  GraffitiCrews: '/assets/videos/graffiti.mp4',
  GraffitiCrews_video: '/assets/videos/graffiti.mp4',

  // Escapism category
  Escapism: '/assets/videos/escapism.mp4',
  Escapism_video: '/assets/videos/escapism.mp4',
  LARPers: '/assets/videos/larp.mp4',
  LARPers_video: '/assets/videos/larp.mp4',

  // Community category
  Community: '/assets/videos/community-2.mp4',
  Community_video: '/assets/videos/community-2.mp4',
  Furry: '/assets/videos/furry.mp4',
  Furry_video: '/assets/videos/furry.mp4',
  ConventionCosplayers: '/assets/videos/convention-cosplayers.mp4',
  ConventionCosplayers_video: '/assets/videos/convention-cosplayers.mp4',

  // Hobbyism category
  HistoricalReenactment: '/assets/videos/civil-war.mp4',
  HistoricalReenactment_video: '/assets/videos/civil-war.mp4',

  // Charity category
  "501stLegion": '/assets/videos/501legion-2.mp4',
  "501stLegion_video": '/assets/videos/501legion-2.mp4',

  // Professionalism category
  Professionalism: '/assets/videos/professionalism.mp4',
  Professionalism_video: '/assets/videos/professionalism.mp4',

  // Comics category
  Hellboy: '/assets/videos/hellboy.mp4',
  Hellboy_video: '/assets/videos/hellboy.mp4',
  XMen: '/assets/videos/x-men.mp4',
  XMen_video: '/assets/videos/x-men.mp4',
  SpiderMan: null, // Photos only
  SpiderMan_video: null,
  Batman: null, // Photos only
  Batman_video: null,
  Catwoman: null, // Photos only
  Catwoman_video: null,
  GhostRider: null, // Photos only
  GhostRider_video: null,
  Blade: null, // Photos only
  Blade_video: null,

  // Video Games category
  TheLegendOfZelda: '/assets/videos/legend-of-zelda.mp4',
  TheLegendOfZelda_video: '/assets/videos/legend-of-zelda.mp4',
  AmongUs: '/assets/videos/among-us.mp4',
  AmongUs_video: '/assets/videos/among-us.mp4',
  Pokemon: null, // Photos only
  Pokemon_video: null,
  Diablo: null, // Photos only
  Diablo_video: null,
  StarCraft: null, // Photos only
  StarCraft_video: null,
  Undertale: null, // Photos only
  Undertale_video: null,

  // Anime category
  AttackOnTitan: null, // Photos only
  AttackOnTitan_video: null,
  SailorMoon: null, // Photos only
  SailorMoon_video: null,

  // Other categories
  Warhammer40k: null, // Photos only
  Warhammer40k_video: null,
  Dune: null, // Photos only
  Dune_video: null
};

export const LINK_MAP = new Proxy(specificLinks, {
  get: (obj, key) => {
    // If the key exists and is explicitly set to null, return undefined
    // This prevents the browser from trying to load "/null" as a URL
    if (key in obj && obj[key] === null) {
      return undefined;
    }
    // Otherwise return the value or the placeholder
    return obj[key] || PLACEHOLDER;
  }
});

// Color mapping - these make the nodes clickable (using exact node names from data.js)
export const LINK_COLOR_MAP = {
  // Main categories with their respective colors
  "CostumedPlay": "#FF69B4",       // Hot Pink for root
  
  // Performance category - Purple shades
  "Performance": "#9932CC",         // Dark Orchid
  "DragQueens": "#9370DB",         // Medium Purple
  "LuchaLibreWrestlers": "#8A2BE2", // Blue Violet
  
  // Activism category - Red shades
  "BlackBloc": "#FF4444",          // Bright Red
  "SiegedSec": "#FF6B6B",          // Light Red
  "PussyRiot": "#FF3366",          // Pink Red
  
  // Political category - Dark Orange shades
  "Political": "#FF8C00",          // Dark Orange
  
  // Illegal category - Dark Red shades
  "GraffitiCrews": "#8B0000",      // Dark Red
  
  // Escapism category - Blue shades
  "Escapism": "#4169E1",           // Royal Blue
  "LARPers": "#1E90FF",            // Dodger Blue
  
  // Community category - Green shades
  "Community": "#228B22",          // Forest Green
  "Furry": "#32CD32",              // Lime Green
  "ConventionCosplayers": "#3CB371", // Medium Sea Green
  
  // Hobbyism category - Brown shades
  "HistoricalReenactment": "#8B4513", // Saddle Brown
  
  // Charity category - Gold shades
  "501stLegion": "#DAA520",        // Goldenrod
  
  // Professionalism category - Silver shades
  "Professionalism": "#C0C0C0",    // Silver
  
  // Comics category - Orange/Red shades
  "Hellboy": "#FF4500",            // Orange Red
  "XMen": "#FF7F50",               // Coral
  "SpiderMan": "#FF6347",          // Tomato
  "Batman": "#8B4513",             // Saddle Brown
  "Catwoman": "#696969",           // Dim Gray
  "GhostRider": "#B8860B",         // Dark Goldenrod
  "Blade": "#800000",              // Maroon
  
  // Video Games category - Cyan/Blue shades
  "TheLegendOfZelda": "#00CED1",   // Dark Turquoise
  "AmongUs": "#40E0D0",            // Turquoise
  "Pokemon": "#4682B4",            // Steel Blue
  "Diablo": "#8B0000",             // Dark Red
  "StarCraft": "#4169E1",          // Royal Blue
  "Undertale": "#9400D3",          // Dark Violet
  
  // Anime category - Pink/Purple shades
  "AttackOnTitan": "#FF1493",      // Deep Pink
  "SailorMoon": "#DDA0DD",         // Plum
  
  // Other categories
  "Warhammer40k": "#556B2F",       // Dark Olive Green
  "Dune": "#8B8B00"                // Dark Yellow
};
