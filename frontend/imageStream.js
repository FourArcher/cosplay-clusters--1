// Simple Image Stream
import { PHOTO_MAP, getImagesFromFolder } from './photos.js';

export class ImageStream {
    constructor() {
        console.log('Initializing ImageStream');
        
        // Create container
        this.container = document.createElement('div');
        this.container.className = 'image-stream';
        console.log('Created container with class:', this.container.className);
        
        // Create track
        this.track = document.createElement('div');
        this.track.className = 'image-track';
        this.container.appendChild(this.track);
        console.log('Created track with class:', this.track.className);

        // Create loading indicator
        this.loadingIndicator = document.createElement('div');
        this.loadingIndicator.className = 'loading-indicator';
        this.loadingIndicator.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading images...</div>
        `;
        this.container.appendChild(this.loadingIndicator);

        // Add to body
        document.body.appendChild(this.container);
        console.log('Added container to body');

        // Configuration
        this.width = '20vw'; // Default width
        this.speed = 75; // Adjusted speed (pixels per second)
        this.currentNode = null;
        this.images = []; // Store current images
        this.loadedImages = new Set(); // Track loaded images
        this.isLoading = false;
    }

    async setNode(nodeName) {
        console.log('Setting node:', nodeName);
        this.currentNode = nodeName;
        this.isLoading = true;
        
        // Show loading indicator
        this.loadingIndicator.style.display = 'flex';
        
        // Clear existing content
        this.track.innerHTML = '';
        console.log('Cleared track content');

        // Create two sequences for seamless loop
        const sequence1 = document.createElement('div');
        const sequence2 = document.createElement('div');
        sequence1.className = 'image-sequence';
        sequence2.className = 'image-sequence';
        console.log('Created sequences with class:', sequence1.className);

        // Get the folder name for this node
        const folderName = PHOTO_MAP[nodeName];
        if (!folderName) {
            console.error('No folder mapping found for node:', nodeName);
            this.showError('No images available');
            return;
        }
        console.log('Loading images from folder:', folderName);

        try {
            // Load all images from the folder using the manifest
            this.images = getImagesFromFolder(folderName);
            console.log('Loaded images from manifest:', this.images);

            if (this.images.length === 0) {
                console.warn('No images found for node:', nodeName);
                this.showError('No images available');
                return;
            }

            // Calculate how many images we need for smooth scrolling
            const screenWidth = window.innerWidth;
            const itemWidth = parseInt(this.width) / 100 * screenWidth;
            const itemsNeeded = Math.ceil(screenWidth / itemWidth) * 2; // Double for smooth loop
            console.log('Creating', itemsNeeded, 'images for sequence');

            // Function to create and load an image
            const createImage = (src, sequence) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        img.className = 'stream-image';
                        img.style.width = this.width;
                        img.style.opacity = '1'; // Force visibility
                        sequence.appendChild(img);
                        this.loadedImages.add(src);
                        resolve();
                    };
                    img.onerror = () => {
                        console.error('Failed to load image:', src);
                        resolve(); // Resolve anyway to continue loading others
                    };
                    img.src = src;
                });
            };

            // Load images in parallel for both sequences
            const loadPromises = [];
            for (let i = 0; i < itemsNeeded; i++) {
                const src = this.images[i % this.images.length];
                loadPromises.push(createImage(src, sequence1));
                loadPromises.push(createImage(src, sequence2));
            }

            // Wait for initial set of images to load
            await Promise.all(loadPromises);

            // Add sequences to track
            this.track.appendChild(sequence1);
            this.track.appendChild(sequence2);
            console.log('Added sequences to track');

            // Hide loading indicator
            this.loadingIndicator.style.display = 'none';
            this.isLoading = false;

            // Start animation
            this.startAnimation();
            
            // Force show
            this.show();

        } catch (error) {
            console.error('Error setting up image stream:', error);
            this.showError('Failed to load images');
        }
    }

    showError(message) {
        this.loadingIndicator.innerHTML = `
            <div class="error-icon">⚠️</div>
            <div class="error-text">${message}</div>
        `;
        this.loadingIndicator.style.display = 'flex';
        this.isLoading = false;
    }

    startAnimation() {
        console.log('Starting animation');
        const sequences = this.track.querySelectorAll('.image-sequence');
        console.log('Found sequences:', sequences.length);
        
        if (sequences.length === 0) {
            console.warn('No sequences found to animate');
            return;
        }

        const sequenceWidth = sequences[0].offsetWidth;
        const duration = sequenceWidth / this.speed;
        console.log('Animation duration:', duration, 'seconds');

        // Position second sequence
        sequences[1].style.transform = `translateX(${sequenceWidth}px)`;
        console.log('Positioned second sequence');

        // Start animation
        sequences.forEach((seq, i) => {
            seq.style.animation = `scroll-left ${duration}s linear infinite`;
            seq.style.animationPlayState = 'running';
            console.log(`Started animation for sequence ${i + 1}`);
        });
    }

    setWidth(width) {
        console.log('Setting width to:', width);
        this.width = width;
        this.container.style.width = width;
        if (this.currentNode) {
            this.setNode(this.currentNode);
        }
    }

    show() {
        console.log('Showing image stream');
        this.container.classList.add('show');
        this.container.style.display = 'flex'; // Force display
        console.log('Container classes after show:', this.container.className);
    }

    hide() {
        console.log('Hiding and clearing image stream');
        this.container.classList.remove('show');
        this.container.style.display = 'none'; // Force hide
        
        // Also clear the content and reset state
        this.track.innerHTML = '';
        this.currentNode = null;
        this.images = [];
        this.isLoading = false;

        console.log('Container classes after hide:', this.container.className);
    }
} 