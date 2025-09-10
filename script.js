// Audio setup for pleasant cosmic sounds
// Tone.js is still included in HTML, but its direct use for background sound is removed.
// The functions are kept in case future features require audio.
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Pleasant note frequencies based on pentatonic scale (can be customized for DJ vibe)
const NOTES = [196.00, 220.00, 261.63, 293.66, 329.63, 392.00];

function createHarmonicSound(baseFreq) {
    // This function is no longer actively used for background, but kept for reference.
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0, audioContext.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    masterGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);
    masterGain.connect(audioContext.destination);

    const osc = audioContext.createOscillator();
    osc.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
    osc.type = 'sine';
    
    const harmonic = audioContext.createOscillator();
    harmonic.frequency.setValueAtTime(baseFreq * 1.5, audioContext.currentTime);
    harmonic.type = 'sine';
    
    const harmonicGain = audioContext.createGain();
    harmonicGain.gain.value = 0.2;

    osc.connect(masterGain);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(masterGain);
    
    osc.start();
    harmonic.start();
    osc.stop(audioContext.currentTime + 2);
    harmonic.stop(audioContext.currentTime + 2);
}

// Keyboard controls state (kept for potential future use or debugging)
const controls = {
    isShiftPressed: false,
    isCtrlPressed: false,
    activeKeys: new Set()
};

// Removed QuantumNexus class and all related particle/flow field logic.
// New background effects: Matrix Rain and Chinese Character Grid.

class MatrixRain {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.columns = [];
        this.columnWidth = 20; // Width of each matrix column in pixels
        this.charHeight = 16; // Approximate height of a character
        this.maxColumnHeight = window.innerHeight / this.charHeight;
        this.characters = '0123456789ABCDEF!@#$%^&*()_+-=[]{}|;:,.<>?/~`'; // Matrix characters
        this.init();
        window.addEventListener('resize', () => this.resize());
    }

    init() {
        this.createColumns();
        this.animate();
    }

    resize() {
        this.container.innerHTML = ''; // Clear existing columns
        this.columns = [];
        this.maxColumnHeight = window.innerHeight / this.charHeight;
        this.createColumns();
    }

    createColumns() {
        const numColumns = Math.floor(window.innerWidth / this.columnWidth);
        for (let i = 0; i < numColumns; i++) {
            const column = document.createElement('div');
            column.classList.add('matrix-column');
            column.style.left = `${i * this.columnWidth}px`;
            column.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random speed
            column.style.animationDelay = `-${Math.random() * 10}s`; // Stagger start times
            this.container.appendChild(column);
            this.columns.push({
                element: column,
                length: Math.floor(Math.random() * (this.maxColumnHeight * 0.8)) + (this.maxColumnHeight * 0.2),
                offset: Math.random() * window.innerHeight // Initial vertical offset
            });
            this.updateColumnContent(column, this.columns[i].length);
        }
    }

    updateColumnContent(columnElement, length) {
        let text = '';
        for (let i = 0; i < length; i++) {
            text += this.characters[Math.floor(Math.random() * this.characters.length)];
            if (i === 0) { // Make the first character brighter
                columnElement.style.color = 'rgba(183, 0, 255, 1)'; // Primary color
            } else {
                columnElement.style.color = 'rgba(255, 0, 212, 0.8)'; // Slightly faded
            }
        }
        columnElement.textContent = text;
    }

    animate() {
        // This animation is primarily handled by CSS @keyframes
        // This function can be used for more complex JS-driven animations if needed
        requestAnimationFrame(() => this.animate());
    }
}

class ChineseBackground {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.charElements = [];
        this.gridSize = 30; // Size of each grid cell for characters
        this.flashInterval = null;
        this.init();
        window.addEventListener('resize', () => this.resize());
    }

    init() {
        this.createGrid();
        this.startFlashing();
    }

    resize() {
        this.container.innerHTML = ''; // Clear existing characters
        this.charElements = [];
        this.createGrid();
    }

    createGrid() {
        const numCols = Math.ceil(window.innerWidth / this.gridSize);
        const numRows = Math.ceil(window.innerHeight / this.gridSize);
        this.container.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        this.container.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                const charDiv = document.createElement('div');
                charDiv.classList.add('chinese-char');
                charDiv.textContent = this.generateRandomChineseChar();
                this.container.appendChild(charDiv);
                this.charElements.push(charDiv);
            }
        }
    }

    generateRandomChineseChar() {
        // Unicode range for common Chinese characters (CJK Unified Ideographs)
        const min = 0x4E00; // U+4E00
        const max = 0x9FFF; // U+9FFF
        return String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    startFlashing() {
        if (this.flashInterval) clearInterval(this.flashInterval);
        this.flashInterval = setInterval(() => {
            // Flash a random subset of characters
            const numToFlash = Math.floor(this.charElements.length * 0.05); // Flash 5% of characters
            for (let i = 0; i < numToFlash; i++) {
                const randomIndex = Math.floor(Math.random() * this.charElements.length);
                const char = this.charElements[randomIndex];
                char.classList.add('flash');
                char.textContent = this.generateRandomChineseChar(); // Corrupt character on flash
                // Remove flash class after a short delay
                setTimeout(() => {
                    char.classList.remove('flash');
                    char.textContent = this.generateRandomChineseChar(); // Change back or to new random
                }, Math.random() * 200 + 100); // Random short duration for flash
            }
        }, 150); // Flash every 150ms
    }
}


// Initialize when the window loads
window.addEventListener('load', () => {
    // Initialize new background effects
    new MatrixRain('matrix-background');
    new ChineseBackground('chinese-background');

    // OS info display (from previous version, still relevant)
    const osInfoDisplay = document.getElementById('os-info-display');
    if (osInfoDisplay) {
        // You can add dynamic updates here if needed, e.g., current time, uptime
        // For now, it just ensures the content is set from HTML.
    }

    // Chinese symbols display on the right (from previous version)
    const chineseSymbolsDisplay = document.getElementById('chinese-symbols-display');
    if (chineseSymbolsDisplay) {
        const generateRandomChineseCharForFixed = () => {
            const min = 0x4E00;
            const max = 0x9FFF;
            return String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
        };

        const generateCorruptedSymbolsFixed = (length) => {
            let symbols = '';
            for (let i = 0; i < length; i++) {
                symbols += generateRandomChineseCharForFixed();
            }
            return symbols;
        };

        let corruptionIntervalFixed;
        let flashTimeoutFixed;

        const applyCorruptionFixed = () => {
            if (Math.random() < 0.7) { // 70% chance to corrupt
                chineseSymbolsDisplay.textContent = generateCorruptedSymbolsFixed(20); // Generate 20 random symbols
                chineseSymbolsDisplay.classList.add('corrupted'); // This class needs to be defined in CSS for visual effect
                chineseSymbolsDisplay.style.opacity = 0.3 + Math.random() * 0.7; // Random opacity
                chineseSymbolsDisplay.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
            } else {
                chineseSymbolsDisplay.textContent = generateCorruptedSymbolsFixed(20); // Still show some symbols
                chineseSymbolsDisplay.classList.remove('corrupted');
                chineseSymbolsDisplay.style.opacity = 0.7; // Normal opacity
                chineseSymbolsDisplay.style.color = 'var(--secondary)'; // Normal color
            }

            // Random flashing effect
            if (Math.random() < 0.4) { // 40% chance to flash
                chineseSymbolsDisplay.style.visibility = 'hidden';
                flashTimeoutFixed = setTimeout(() => {
                    chineseSymbolsDisplay.style.visibility = 'visible';
                }, Math.random() * 100 + 50); // Short flash duration
            } else {
                chineseSymbolsDisplay.style.visibility = 'visible';
            }
        };

        corruptionIntervalFixed = setInterval(applyCorruptionFixed, 300); // Update every 300ms for constant corruption

        // Clear intervals/timeouts if the element is removed or page changes
        window.addEventListener('beforeunload', () => {
            clearInterval(corruptionIntervalFixed);
            clearTimeout(flashTimeoutFixed);
        });
    }

    // New logic for DJ name transition on scroll
    const djNameTransitionElement = document.getElementById('dj-name-transition');
    const loadingStatusElement = document.getElementById('loading-status');
    const initialText = '🜁IHSAK';
    const finalText = 'KASHI🜁';
    const transitionScrollStart = 0; // Start transition from top of the page
    const transitionScrollEnd = 500; // Transition completes after 500px of scroll

    // Function to interpolate text character by character
    const interpolateText = (initial, final, progress) => {
        let result = '';
        const maxLength = Math.max(initial.length, final.length);
        for (let i = 0; i < maxLength; i++) {
            const initialChar = initial[i] || '';
            const finalChar = final[i] || '';

            // This makes the transition happen sequentially across characters
            // Each character transitions over a segment of the total progress
            const charTransitionStart = i / maxLength;
            const charTransitionEnd = (i + 1) / maxLength;

            if (progress < charTransitionStart) {
                result += initialChar; // Still initial character
            } else if (progress >= charTransitionEnd) {
                result += finalChar; // Already final character
            } else {
                // In transition for this character
                const charProgress = (progress - charTransitionStart) / (charTransitionEnd - charTransitionStart);
                // Randomly switch between initial and final char during transition for glitch effect
                result += (Math.random() < charProgress) ? finalChar : initialChar;
            }
        }
        return result;
    };


    const updateDjNameTransition = () => {
        const scrollY = window.scrollY;
        let scrollProgress = (scrollY - transitionScrollStart) / (transitionScrollEnd - transitionScrollStart);
        scrollProgress = Math.max(0, Math.min(1, scrollProgress)); // Clamp between 0 and 1

        if (djNameTransitionElement && loadingStatusElement) {
            // Loading Status Logic
            const loadingFadeOutStart = 0.3; // Start fading out "Loading..." at 30% scroll progress
            const loadingFadeOutEnd = 0.6;   // "Loading..." fully faded out at 60%
            const loadedFadeInStart = 0.7;   // "Loaded" starts fading in at 70%
            const loadedFadeInEnd = 1.0;     // "Loaded" fully faded in at 100%

            if (scrollProgress < loadingFadeOutStart) {
                loadingStatusElement.textContent = "Loading...";
                loadingStatusElement.style.opacity = 1;
            } else if (scrollProgress < loadingFadeOutEnd) {
                const fadeProgress = (scrollProgress - loadingFadeOutStart) / (loadingFadeOutEnd - loadingFadeOutStart);
                loadingStatusElement.textContent = "Loading...";
                loadingStatusElement.style.opacity = 1 - fadeProgress;
            } else if (scrollProgress < loadedFadeInStart) {
                loadingStatusElement.textContent = ""; // Hide between transitions
                loadingStatusElement.style.opacity = 0;
            } else if (scrollProgress < loadedFadeInEnd) {
                const fadeProgress = (scrollProgress - loadedFadeInStart) / (loadedFadeInEnd - loadedFadeInStart);
                loadingStatusElement.textContent = "Loaded";
                loadingStatusElement.style.opacity = fadeProgress;
            } else {
                loadingStatusElement.textContent = "Loaded";
                loadingStatusElement.style.opacity = 1;
            }


            // DJ Name Transition Logic
            // Glitch intensity and text content change over the scrollProgress range
            djNameTransitionElement.textContent = interpolateText(initialText, finalText, scrollProgress);

            // Glitch properties: duration and text-shadow offsets
            // More intense glitch at the beginning, less intense at the end
            const glitchDuration = 1.5 - (scrollProgress * 1.2); // From 1.5s down to 0.3s
            const shadowOffsetPrimary = 0.05 + (scrollProgress * 0.1); // From 0.05em up to 0.15em
            const shadowOffsetSecondary = 0.05 + (scrollProgress * 0.05); // From 0.05em up to 0.1em
            const opacity = 0.8 + (scrollProgress * 0.2); // From 0.8 to 1.0

            djNameTransitionElement.style.setProperty('--glitch-duration', `${glitchDuration}s`);
            djNameTransitionElement.style.setProperty('--glitch-shadow-1-x', `${shadowOffsetPrimary}em`);
            djNameTransitionElement.style.setProperty('--glitch-shadow-1-y', `${shadowOffsetPrimary * 0.5}em`);
            djNameTransitionElement.style.setProperty('--glitch-shadow-2-x', `-${shadowOffsetSecondary}em`);
            djNameTransitionElement.style.setProperty('--glitch-shadow-2-y', `-${shadowOffsetSecondary * 0.5}em`);
            djNameTransitionElement.style.opacity = opacity;

            // Also adjust transform values for the glitch animation for more dynamic effect
            const transformX1 = -0.05 + (scrollProgress * 0.1);
            const transformY1 = -0.025 + (scrollProgress * 0.05);
            const transformX2 = 0.05 - (scrollProgress * 0.1);
            const transformY2 = 0.025 - (scrollProgress * 0.05);

            djNameTransitionElement.style.setProperty('--glitch-transform-x-0', `${transformX1}em`);
            djNameTransitionElement.style.setProperty('--glitch-transform-y-0', `${transformY1}em`);
            djNameTransitionElement.style.setProperty('--glitch-transform-x-15', `${transformX2}em`);
            djNameTransitionElement.style.setProperty('--glitch-transform-y-15', `${transformY2}em`);
            // Apply similar adjustments to other keyframe transform properties if desired for more complex glitch
        }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', updateDjNameTransition);

    // Call once on load to set initial state
    updateDjNameTransition();
});
