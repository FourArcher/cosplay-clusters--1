// Photo folder mappings for each node
export const PHOTO_MAP = {
    // Main categories (these don't have direct photo folders)
    CostumedPlay: null,
    Performance: null,
    Political: null,
    Escapism: null,
    Community: null,
    Professionalism: null,

    // Activism category
    BlackBloc: 'blackbloc',
    PussyRiot: 'pussyriot',

    // Comics category
    SpiderMan: 'spiderman',
    Batman: 'batman',
    Catwoman: 'catwoman',
    GhostRider: 'ghostrider',
    Blade: 'blade',
    Marvel: 'Marvel',

    // Video Games category
    Pokemon: 'pokemon',
    Diablo: 'diablo',
    StarCraft: 'starcraft',
    Undertale: 'undertale',

    // Anime category
    AttackOnTitan: 'attackontitan',
    SailorMoon: 'sailormoon',

    // Other categories
    Warhammer40k: 'warhammer40k',
    Dune: 'dune'
};

let photoManifest = null;

// Function to load the manifest file
export async function loadManifest() {
    if (photoManifest) return photoManifest; // Return cached manifest if available
    try {
        const response = await fetch('/frontend/image-manifest.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        photoManifest = await response.json();
        console.log('Photo manifest loaded successfully:', photoManifest);
        return photoManifest;
    } catch (error) {
        console.error('Failed to load photo manifest:', error);
        return {}; // Return empty object on failure
    }
}

// Get images for a specific folder from the loaded manifest
export function getImagesFromFolder(folderName) {
    if (!photoManifest) {
        console.error('Photo manifest not loaded yet. Make sure to call loadManifest() first.');
        return [];
    }
    if (!photoManifest[folderName]) {
        console.warn(`No images found in manifest for folder: ${folderName}`);
        return [];
    }

    // Map the filenames from the manifest to their full paths
    const imagePaths = photoManifest[folderName].map(file => `/assets/photos/${folderName}/${file}`);
    
    // Shuffle the array to randomize the order
    for (let i = imagePaths.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagePaths[i], imagePaths[j]] = [imagePaths[j], imagePaths[i]];
    }

    return imagePaths;
} 