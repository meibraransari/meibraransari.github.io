/**
 * Ibrar Ansari AI Landing Page - Main Script
 * Version: 2.0.0
 * Author: Ibrar Ansari
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       CUSTOM CURSOR & SPOTLIGHT EFFECT
       ========================================================================== */
    const cursorGlow = document.getElementById("cursorGlow");
    const cursorDot = document.getElementById("cursorDot");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
        document.addEventListener("mousemove", (e) => {
            // Use requestAnimationFrame for smoother cursor tracking
            window.requestAnimationFrame(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
                cursorDot.style.left = `${e.clientX}px`;
                cursorDot.style.top = `${e.clientY}px`;
            });
        });

        // Add hover effects for custom cursor
        const interactiveElements = document.querySelectorAll(
            "a, button, input, select, textarea, [role='button'], .palette-item, .link-card"
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });
            el.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });
        });
    }

    /* ==========================================================================
       SCROLL PERFORMANCE, SCROLLBARS & ACTIVE STATE
       ========================================================================== */
    const navbar = document.getElementById("navbar");
    const scrollProgress = document.getElementById("scrollProgress");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        // Update Scroll Progress Bar
        scrollProgress.style.width = `${scrollPercent}%`;

        // Sticky Navbar background blur & styling
        if (scrollTop > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Active navigation link update based on scroll position
        let currentSectionId = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });

    /* ==========================================================================
       HERO TYPING ANIMATION
       ========================================================================== */
    const typingText = document.getElementById("typingText");
    const phrases = [
        "Building Ideas...",
        "Creating AI Experiences...",
        "Learning Everyday...",
        "Open Source Enthusiast...",
        "Exploring Future Technology..."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40; // delete faster
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80; // normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at full phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before typing next phrase
        }

        setTimeout(type, typeSpeed);
    }
    
    if (typingText) {
        type();
    }



    /* ==========================================================================
       CARD SEARCH / PORTAL FILTERS
       ========================================================================== */
    const searchInput = document.getElementById("linkSearchInput");
    const searchClearBtn = document.getElementById("searchClearBtn");
    const linksGrid = document.getElementById("linksGrid");
    const linkCards = document.querySelectorAll(".link-card");
    const noResultsMessage = document.getElementById("noResultsMessage");
    const resetSearchBtn = document.getElementById("resetSearchBtn");

    function filterCards(query) {
        const normalizedQuery = query.toLowerCase().trim();
        let matches = 0;

        linkCards.forEach((card) => {
            const cardTags = card.getAttribute("data-tags") || "";
            const cardTitle = card.querySelector(".card-title")?.textContent || "";
            const cardDesc = card.querySelector(".card-desc")?.textContent || "";
            
            const textToMatch = `${cardTags} ${cardTitle} ${cardDesc}`.toLowerCase();

            if (textToMatch.includes(normalizedQuery)) {
                card.style.display = "block";
                matches++;
            } else {
                card.style.display = "none";
            }
        });

        // Toggle clear button visibility
        if (query.length > 0) {
            searchClearBtn.style.display = "flex";
        } else {
            searchClearBtn.style.display = "none";
        }

        // Toggle no results display
        if (matches === 0) {
            noResultsMessage.style.display = "block";
            linksGrid.style.opacity = "0.5";
        } else {
            noResultsMessage.style.display = "none";
            linksGrid.style.opacity = "1";
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            filterCards(e.target.value);
        });

        searchClearBtn.addEventListener("click", () => {
            searchInput.value = "";
            filterCards("");
            searchInput.focus();
        });
    }

    if (resetSearchBtn) {
        resetSearchBtn.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
                filterCards("");
                searchInput.focus();
            }
        });
    }

    /* ==========================================================================
       COMMAND PALETTE & DIALOG CONFIGURATION
       ========================================================================== */
    const commandPalette = document.getElementById("commandPalette");
    const paletteSearchInput = document.getElementById("paletteSearchInput");
    const paletteList = document.getElementById("paletteList");
    const paletteCloseBtn = document.getElementById("paletteCloseBtn");
    const searchTriggerNav = document.getElementById("searchTriggerNav");
    
    let paletteItems = [];
    let selectedPaletteIndex = 0;

    // Dynamically compile portal entries from cards
    function compilePaletteItems() {
        paletteItems = [];
        linkCards.forEach((card) => {
            // Skip pure widget items
            if (card.classList.contains("custom-hud-widget")) return;

            const title = card.querySelector(".card-title")?.textContent || "Link";
            const subtext = card.querySelector(".card-subtext")?.textContent || "";
            // Extract the entire inner HTML of the icon container to preserve inline SVGs
            const iconHtml = card.querySelector(".card-icon-container")?.innerHTML || `<i data-lucide="link"></i>`;
            const url = card.getAttribute("href") || "#";
            
            paletteItems.push({
                title,
                subtext,
                iconHtml,
                url
            });
        });
    }

    function renderPalette(filterText = "") {
        const cleanFilter = filterText.toLowerCase().trim();
        paletteList.innerHTML = "";
        
        const filtered = paletteItems.filter(item => 
            item.title.toLowerCase().includes(cleanFilter) || 
            item.subtext.toLowerCase().includes(cleanFilter)
        );

        if (filtered.length === 0) {
            paletteList.innerHTML = `
                <li class="palette-item" style="cursor: default; opacity: 0.6;">
                    <i data-lucide="alert-circle"></i>
                    <span>No matching portals found</span>
                </li>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        filtered.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = `palette-item ${index === selectedPaletteIndex ? 'selected' : ''}`;
            li.innerHTML = `
                <div class="palette-item-icon-wrapper">${item.iconHtml}</div>
                <span>${item.title}</span>
                <span class="item-sub">${item.subtext}</span>
            `;
            
            li.addEventListener("click", () => {
                openPortalUrl(item.url);
            });

            paletteList.appendChild(li);
        });

        // Trigger icon rendering for newly created DOM nodes
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Auto scroll to active selection
        const selectedElement = paletteList.querySelector(".palette-item.selected");
        if (selectedElement) {
            selectedElement.scrollIntoView({ block: "nearest" });
        }
    }

    function openPortalUrl(url) {
        closePalette();
        if (url.startsWith("mailto:")) {
            window.location.href = url;
        } else {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    }

    function openPalette() {
        compilePaletteItems();
        selectedPaletteIndex = 0;
        paletteSearchInput.value = "";
        renderPalette();
        commandPalette.showModal();
        setTimeout(() => paletteSearchInput.focus(), 50);
        document.body.style.overflow = "hidden"; // disable scroll
    }

    function closePalette() {
        commandPalette.close();
        document.body.style.overflow = ""; // enable scroll
    }

    if (searchTriggerNav) {
        searchTriggerNav.addEventListener("click", openPalette);
    }
    if (paletteCloseBtn) {
        paletteCloseBtn.addEventListener("click", closePalette);
    }

    // Close on overlay backdrop clicks
    commandPalette.addEventListener("click", (e) => {
        const rect = commandPalette.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            closePalette();
        }
    });

    paletteSearchInput.addEventListener("input", (e) => {
        selectedPaletteIndex = 0;
        renderPalette(e.target.value);
    });

    // Keyboard navigation inside Palette dialog
    paletteSearchInput.addEventListener("keydown", (e) => {
        const items = paletteList.querySelectorAll(".palette-item:not([style*='cursor: default'])");
        if (items.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            selectedPaletteIndex = (selectedPaletteIndex + 1) % items.length;
            renderPalette(paletteSearchInput.value);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            selectedPaletteIndex = (selectedPaletteIndex - 1 + items.length) % items.length;
            renderPalette(paletteSearchInput.value);
        } else if (e.key === "Enter") {
            e.preventDefault();
            const cleanFilter = paletteSearchInput.value.toLowerCase().trim();
            const filtered = paletteItems.filter(item => 
                item.title.toLowerCase().includes(cleanFilter) || 
                item.subtext.toLowerCase().includes(cleanFilter)
            );
            if (filtered[selectedPaletteIndex]) {
                openPortalUrl(filtered[selectedPaletteIndex].url);
            }
        }
    });

    // Global keyboard shortcuts listener
    document.addEventListener("keydown", (e) => {
        // Toggle palette using '/' key
        if (e.key === "/" && document.activeElement !== searchInput && 
            document.activeElement !== paletteSearchInput && 
            document.activeElement.tagName !== "INPUT" && 
            document.activeElement.tagName !== "TEXTAREA") {
            e.preventDefault();
            openPalette();
        }
    });

    /* ==========================================================================
       EXCALIDRAW-STYLE LASER POINTER TRAIL
       ========================================================================== */
    const canvas = document.createElement("canvas");
    canvas.id = "laserCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let points = [];
    let isDrawing = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Mouse events
    window.addEventListener("mousedown", (e) => {
        isDrawing = true;
        points = [];
        addPoint(e.clientX, e.clientY);
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;
        addPoint(e.clientX, e.clientY);
    });

    window.addEventListener("mouseup", () => {
        isDrawing = false;
    });

    window.addEventListener("mouseleave", () => {
        isDrawing = false;
    });

    // Touch events for mobile/tablet drag support
    window.addEventListener("touchstart", (e) => {
        isDrawing = true;
        points = [];
        const touch = e.touches[0];
        addPoint(touch.clientX, touch.clientY);
    });

    window.addEventListener("touchmove", (e) => {
        if (!isDrawing) return;
        const touch = e.touches[0];
        addPoint(touch.clientX, touch.clientY);
    });

    window.addEventListener("touchend", () => {
        isDrawing = false;
    });

    function addPoint(x, y) {
        points.push({
            x: x,
            y: y,
            time: Date.now()
        });
    }

    const TRAIL_LIFETIME = 400; // ms

    function animateLaser() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();
        points = points.filter(p => now - p.time < TRAIL_LIFETIME);

        if (points.length > 1) {
            // Draw outer neon cyan glow
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            for (let i = 1; i < points.length; i++) {
                const p1 = points[i - 1];
                const p2 = points[i];
                const ageRatio = (now - p2.time) / TRAIL_LIFETIME;
                const opacity = 1 - ageRatio;
                const width = 5 * (1 - ageRatio);

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                ctx.lineWidth = width;
                ctx.stroke();
            }

            // Draw inner bright white core
            ctx.shadowBlur = 0;
            for (let i = 1; i < points.length; i++) {
                const p1 = points[i - 1];
                const p2 = points[i];
                const ageRatio = (now - p2.time) / TRAIL_LIFETIME;
                const opacity = 1 - ageRatio;
                const width = 1.5 * (1 - ageRatio);

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.85})`;
                ctx.lineWidth = width;
                ctx.stroke();
            }
        }
        requestAnimationFrame(animateLaser);
    }
    requestAnimationFrame(animateLaser);

});
