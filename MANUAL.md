# How to Add New Content to Cosplay Clusters

This guide explains how to add new nodes, videos, and photo galleries to the visualization.

## The Core Files

There are 4 key files you need to understand to add new content:

1.  **`frontend/data.js`**: Defines the structure of the dendrogram. Every node in the visualization is created here.
2.  **`frontend/links.js`**: This file does two things:
    *   It gives nodes a color, which makes them **clickable**.
    *   It maps nodes to **video files**.
3.  **`frontend/photos.js`**: Maps nodes to **photo folders**.
4.  **`frontend/image-manifest.json`**: **Crucially**, this file acts as a master list of every single image file that exists for each photo folder. It is the "source of truth" for the image streams.

---

## Part 1: Adding a New Clickable Node

Let's say you want to add a new clickable node called **"DoctorWho"**.

### Step 1: Add the Node to the Structure

-   Open `frontend/data.js`.
-   Add a new line that defines its position in the hierarchy. The `.` notation defines the parent-child relationship.

```javascript
// data.js

// ... existing data ...
/* ================ 4) SERIES (40 leaves) ============================ */
CostumedPlay.Community.ConventionCosplayers.Series.TheWitcher,"Geralt of Rivia"
CostumedPlay.Community.ConventionCosplayers.Series.StrangerThings,"80s nostalgia horror"
// Add your new line here:
CostumedPlay.Community.ConventionCosplayers.Series.DoctorWho,"Time Lord adventures"
// ...
```

### Step 2: Make the Node Clickable

-   Open `frontend/links.js`.
-   Find the `LINK_COLOR_MAP` object.
-   Add an entry for your new node. The key must be the **exact name** you used in `data.js` ("DoctorWho"). The value is the color for the node's circle.

```javascript
// links.js

// ...
export const LINK_COLOR_MAP = {
  // ... existing color mappings ...
  "TheMandalorian": "#808080",
  "TheWitcher": "#FFFFFF",
  "DoctorWho": "#003B6F", // A nice TARDIS blue
};
```

**Your node is now visible and clickable!** But it doesn't have any content yet.

---

## Part 2: Connecting Content to Your Node

You can connect a video, a photo stream, or both.

### How to Add a Video

1.  **Add the file:** Place your video file (e.g., `doctor-who.mp4`) into the `assets/videos/` directory.
2.  **Link the file:**
    -   Open `frontend/links.js`.
    -   Find the `specificLinks` object.
    -   Add an entry that maps your node name to the video file path.

```javascript
// links.js

const specificLinks = {
  // ... existing links ...
  TheWitcher_video: '/assets/videos/the-witcher.mp4',

  // Add your new entry here:
  DoctorWho: '/assets/videos/doctor-who.mp4',
  DoctorWho_video: '/assets/videos/doctor-who.mp4', // Add both for consistency
};
// ...
```

### How to Add a Photo Image Stream

This is a multi-step process that requires careful attention.

1.  **Create a folder:**
    *   Create a new folder inside `assets/photos/`.
    *   The name should be simple and lowercase, for example: `doctorwho`.

2.  **Add your images:**
    *   Copy all your images for this node into the new `assets/photos/doctorwho/` folder. The filenames can be anything.

3.  **Map the Node to the Folder:**
    *   Open `frontend/photos.js`.
    *   Find the `PHOTO_MAP` object.
    *   Add an entry mapping the **exact node name** to the **folder name**.

```javascript
// photos.js

export const PHOTO_MAP = {
  // ... existing mappings ...
  Dune: 'dune',
  DoctorWho: 'doctorwho', // Add your new mapping
};
// ...
```

4.  **CRITICAL: Update the Image Manifest**
    *   This is the most important step for photos.
    *   Open `frontend/image-manifest.json`.
    *   You must **manually** add a new entry for your folder. The key is the folder name (`doctorwho`), and the value is an array of strings, where each string is the **exact filename** of an image in that folder.

```json
// image-manifest.json
{
  "dune": [
    "91cdae89-12d3-4475-9196-19795f77edf2_2048x1310.jpg",
    "dune-prophecy-why-isnt-the-sisterhood-called-the-bene-gesser_m2y2.1248.webp",
    "dune-prophecy_7.webp",
    "entertainment-filme-dune-neu-rezension-aufm.webp",
    "representatives-of-the-house-harkonnen-the-sardaukar-and-the-guild-navigators-in-the-david-lynch-movie-dune.png"
  ],
  "doctorwho": [
    "tardis.jpg",
    "dalek.png",
    "cybermen.webp",
    "weeping-angel.jpeg"
  ]
}
```

**Your photo stream is now fully configured and will work when the "DoctorWho" node is clicked.** This manifest system is robust and ensures that only images that actually exist are loaded, preventing errors. 