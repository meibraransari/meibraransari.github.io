/**
 * Ibrar Ansari Portfolio & Links Hub - Main Script
 * Optimized for maximum performance (0 lag, 60fps)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Scroll Progress & Navbar Scrolled Class
    const navbar = document.getElementById("navbar");
    const scrollProgress = document.getElementById("scrollProgress");
    
    function updateScrollState() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        if (navbar) {
            if (scrollTop > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    }

    window.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();

    // 3. Intersection Observer for Navigation Links Active State
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    const sectionObserverOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // 4. Hero Section Typing Effect
    const typingText = document.getElementById("typingText");
    const phrases = [
        "Lead System Administrator",
        "DevOps & Cloud Specialist",
        "AWS & Docker Architect",
        "VMware & Linux Administrator",
        "Ivanti Certified Engineer"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function handleTyping() {
        if (!typingText) return;
        
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2200; // Pause at end of full phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 350;
        }

        setTimeout(handleTyping, typeSpeed);
    }
    
    if (typingText) {
        handleTyping();
    }

    // 5. Portals Live Filter Search
    const searchInput = document.getElementById("linkSearchInput");
    const searchClearBtn = document.getElementById("searchClearBtn");
    const linksGrids = document.querySelectorAll(".links-grid");
    const linkCards = document.querySelectorAll(".link-card");
    const noResultsMessage = document.getElementById("noResultsMessage");
    const resetSearchBtn = document.getElementById("resetSearchBtn");

    function filterCards(query) {
        const normalizedQuery = query.toLowerCase().trim();
        let totalMatches = 0;

        const groups = document.querySelectorAll(".portal-group");
        groups.forEach((group) => {
            const cards = group.querySelectorAll(".link-card");
            let groupMatches = 0;

            cards.forEach((card) => {
                const cardTags = card.getAttribute("data-tags") || "";
                const cardTitle = card.querySelector(".card-title")?.textContent || "";
                const cardDesc = card.querySelector(".card-desc")?.textContent || "";
                
                const textToMatch = `${cardTags} ${cardTitle} ${cardDesc}`.toLowerCase();

                if (textToMatch.includes(normalizedQuery)) {
                    card.style.display = "block";
                    groupMatches++;
                } else {
                    card.style.display = "none";
                }
            });

            const groupTitle = group.querySelector(".portal-group-title");
            const grid = group.querySelector(".links-grid");

            if (groupMatches === 0) {
                if (groupTitle) groupTitle.style.display = "none";
                if (grid) grid.style.display = "none";
            } else {
                if (groupTitle) groupTitle.style.display = "flex";
                if (grid) grid.style.display = "grid";
                totalMatches += groupMatches;
            }
        });

        if (searchClearBtn) {
            searchClearBtn.style.display = normalizedQuery.length > 0 ? "flex" : "none";
        }

        if (noResultsMessage) {
            if (totalMatches === 0) {
                noResultsMessage.style.display = "block";
                linksGrids.forEach(grid => grid.style.opacity = "0.4");
            } else {
                noResultsMessage.style.display = "none";
                linksGrids.forEach(grid => grid.style.opacity = "1");
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            filterCards(e.target.value);
        });

        if (searchClearBtn) {
            searchClearBtn.addEventListener("click", () => {
                searchInput.value = "";
                filterCards("");
                searchInput.focus();
            });
        }
    }

    if (resetSearchBtn && searchInput) {
        resetSearchBtn.addEventListener("click", () => {
            searchInput.value = "";
            filterCards("");
            searchInput.focus();
        });
    }

    // 6. Command Palette Dialog logic
    const commandPalette = document.getElementById("commandPalette");
    const paletteSearchInput = document.getElementById("paletteSearchInput");
    const paletteList = document.getElementById("paletteList");
    const paletteCloseBtn = document.getElementById("paletteCloseBtn");
    const searchTriggerNav = document.getElementById("searchTriggerNav");
    
    let paletteItems = [];
    let selectedIndex = 0;

    function buildPaletteItems() {
        paletteItems = [
            { title: "Home", sub: "Hero Overview", url: "#home", icon: "home" },
            { title: "About Me", sub: "Background & Profile", url: "#about", icon: "user" },
            { title: "Technical Skills", sub: "Tools & Technologies", url: "#skills", icon: "cpu" },
            { title: "Work Experience", sub: "9+ Years Career Timeline", url: "#experience", icon: "briefcase" },
            { title: "Certifications", sub: "AWS & Ivanti Credentials", url: "#certifications", icon: "award" },
            { title: "Digital Portals", sub: "Links Hub", url: "#portals", icon: "link" }
        ];

        linkCards.forEach((card) => {
            const title = card.querySelector(".card-title")?.textContent || "Link";
            const sub = card.querySelector(".card-subtext")?.textContent || "";
            const url = card.getAttribute("href") || "#";
            paletteItems.push({ title, sub, url, icon: "external-link" });
        });
    }

    function renderPalette(query = "") {
        if (!paletteList) return;
        const cleanQuery = query.toLowerCase().trim();
        paletteList.innerHTML = "";
        
        const filtered = paletteItems.filter(item => 
            item.title.toLowerCase().includes(cleanQuery) || 
            item.sub.toLowerCase().includes(cleanQuery)
        );

        if (filtered.length === 0) {
            paletteList.innerHTML = `
                <li class="palette-item" style="cursor: default; opacity: 0.6;">
                    <i data-lucide="alert-circle"></i>
                    <span>No results found</span>
                </li>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        filtered.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = `palette-item ${index === selectedIndex ? 'selected' : ''}`;
            li.innerHTML = `
                <div class="palette-item-icon-wrapper"><i data-lucide="${item.icon}"></i></div>
                <span>${item.title}</span>
                <span class="item-sub">${item.sub}</span>
            `;
            
            li.addEventListener("click", () => {
                executePaletteItem(item.url);
            });

            paletteList.appendChild(li);
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();

        const activeEl = paletteList.querySelector(".palette-item.selected");
        if (activeEl) {
            activeEl.scrollIntoView({ block: "nearest" });
        }
    }

    function executePaletteItem(url) {
        closePalette();
        if (url.startsWith("#")) {
            const targetEl = document.querySelector(url);
            if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
        } else if (url.startsWith("mailto:")) {
            window.location.href = url;
        } else {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    }

    function openPalette() {
        if (!commandPalette) return;
        buildPaletteItems();
        selectedIndex = 0;
        if (paletteSearchInput) paletteSearchInput.value = "";
        renderPalette();
        commandPalette.showModal();
        setTimeout(() => paletteSearchInput?.focus(), 50);
        document.body.style.overflow = "hidden";
    }

    function closePalette() {
        if (!commandPalette) return;
        commandPalette.close();
        document.body.style.overflow = "";
    }

    if (searchTriggerNav) searchTriggerNav.addEventListener("click", openPalette);
    if (paletteCloseBtn) paletteCloseBtn.addEventListener("click", closePalette);

    if (commandPalette) {
        commandPalette.addEventListener("click", (e) => {
            const rect = commandPalette.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
              rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            if (!isInDialog) closePalette();
        });
    }

    if (paletteSearchInput) {
        paletteSearchInput.addEventListener("input", (e) => {
            selectedIndex = 0;
            renderPalette(e.target.value);
        });

        paletteSearchInput.addEventListener("keydown", (e) => {
            const items = paletteList.querySelectorAll(".palette-item:not([style*='cursor: default'])");
            if (items.length === 0) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % items.length;
                renderPalette(paletteSearchInput.value);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                renderPalette(paletteSearchInput.value);
            } else if (e.key === "Enter") {
                e.preventDefault();
                const cleanQuery = paletteSearchInput.value.toLowerCase().trim();
                const filtered = paletteItems.filter(item => 
                    item.title.toLowerCase().includes(cleanQuery) || 
                    item.sub.toLowerCase().includes(cleanQuery)
                );
                if (filtered[selectedIndex]) {
                    executePaletteItem(filtered[selectedIndex].url);
                }
            }
        });
    }

    // Global Keydown Listener for '/' Shortcut
    document.addEventListener("keydown", (e) => {
        if (e.key === "/" && 
            document.activeElement !== searchInput && 
            document.activeElement !== paletteSearchInput && 
            document.activeElement.tagName !== "INPUT" && 
            document.activeElement.tagName !== "TEXTAREA") {
            e.preventDefault();
            openPalette();
        }
    });

});
