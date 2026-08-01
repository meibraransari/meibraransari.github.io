/**
 * Ibrar Ansari Portfolio & Links Hub - Main Redesigned Script
 * Optimized for performance, responsiveness, and keyboard interactions
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Feather Icons ---
    if (window.feather) {
        feather.replace();
    }

    // --- Footer year ---
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const setMenu = (open) => {
        if (!mobileMenu || !mobileMenuButton) return;
        mobileMenu.classList.toggle('hidden', !open);
        mobileMenuButton.setAttribute('aria-expanded', String(open));
    };
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const open = mobileMenu.classList.contains('hidden');
            setMenu(open);
        });
        // Close menu after clicking a link
        mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    }

    // --- Typing Animation ---
    const typingTextElement = document.getElementById('typing-text');
    const roles = [
        "AWS Certified",
        "Ivanti Certified",
        "DevOps, Docker, Jenkins and K8s",
        "AWS, Google & Azure",
        "Vmware, Proxmox & Linux",
        "Grafana, Zabbix & Uptime-kuma"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const type = () => {
        if (!typingTextElement) return;
        const currentRole = roles[roleIndex];
        typingTextElement.textContent = currentRole.substring(0, isDeleting ? --charIndex : ++charIndex);
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 40 : 100);
        }
    };
    type();

    // --- Scroll Animations ---
    const revealElements = document.querySelectorAll('.section-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    revealElements.forEach(el => observer.observe(el));

    // --- Dynamic Skills (grouped) ---
    const skillsGroupsEl = document.getElementById('skills-groups');
    const skillGroups = [
        { label: 'Cloud & DevOps', items: [
            { name: 'AWS', if: 'logos/aws' },
            { name: 'Docker', si: 'docker' },
            { name: 'Kubernetes', src: 'assets/logos/kubernetes.svg' },
            { name: 'Git & GitLab', si: 'gitlab' },
            { name: 'HAProxy', icon: 'git-merge' },
            { name: 'DigitalOcean', si: 'digitalocean' },
            { name: 'Sonarqube', si: 'sonarqube' },
            { name: 'PM2 Process Manager', icon: 'activity' }
        ]},
        { label: 'Virtualization & Enterprise IT', items: [
            { name: 'VMware ESXi 6.x', icon: 'server' },
            { name: 'VMware Workstation', icon: 'monitor' },
            { name: 'Ivanti UEM (Certified)', icon: 'shield' },
            { name: 'Ivanti Automation (Certified)', icon: 'cpu' },
            { name: 'Ivanti Identity & Service Manager', icon: 'users' },
            { name: 'Ivanti Asset Manager', icon: 'archive' },
            { name: 'Xtraction Reporting', icon: 'bar-chart' },
            { name: 'MDM (Android & iOS DEP/VPP)', icon: 'tablet' }
        ]},
        { label: 'Web Hosting & Servers', items: [
            { name: 'WHM & cPanel', si: 'cpanel' },
            { name: 'Parallel Plesk (Win/Linux)', icon: 'sliders' },
            { name: 'Apache2', si: 'apache' },
            { name: 'Nginx', si: 'nginx' },
            { name: 'Microsoft IIS', icon: 'server' },
            { name: 'DNS & DHCP Management', icon: 'globe' },
            { name: 'Ajenti & WordPress', si: 'wordpress' }
        ]},
        { label: 'Databases & Storage', items: [
            { name: 'MySQL & MariaDB', si: 'mysql' },
            { name: 'Microsoft SQL Server', si: 'microsoftsqlserver' },
            { name: 'PostgreSQL', si: 'postgresql' },
            { name: 'MongoDB', si: 'mongodb' },
            { name: 'Auto Backup & Restoration', icon: 'database' },
            { name: 'Incremental & Mirror Backups', icon: 'copy' }
        ]},
        { label: 'OS, Scripting & Security', items: [
            { name: 'Linux OS (Ubuntu, CentOS)', si: 'linux' },
            { name: 'Windows Server & Active Directory', si: 'windows' },
            { name: 'Bash & Batch Scripting', si: 'gnubash' },
            { name: 'PowerShell Automation', si: 'powershell' },
            { name: 'SonicWALL UTM Firewalls', icon: 'lock' },
            { name: 'Nagios & Monit Monitoring', icon: 'eye' },
            { name: 'RocketChat & Openfire', icon: 'message-square' }
        ]},
        { label: 'Networking & Hardware', items: [
            { name: 'WAN & LAN Infrastructure', icon: 'git-commit' },
            { name: 'WiFi AP & Extender Config', icon: 'wifi' },
            { name: 'Door Lock Controllers & RFID', icon: 'key' },
            { name: 'PuTTY, Bitvise, Xshell', icon: 'terminal' },
            { name: 'Vendor Coordination', icon: 'truck' }
        ]}
    ];
    if (skillsGroupsEl) {
        skillGroups.forEach((group, gi) => {
            const wrap = document.createElement('div');
            wrap.className = 'flex flex-col md:flex-row md:items-center gap-4 stagger';
            wrap.style.setProperty('--i', gi);
            const chips = group.items.map(s => {
                let ic;
                if (s.if) {
                    ic = `<img src="https://api.iconify.design/${s.if}.svg" alt="" loading="lazy" width="16" height="16">`;
                } else if (s.si) {
                    ic = `<img src="https://cdn.simpleicons.org/${s.si}/c9d1d9" alt="" loading="lazy" width="16" height="16">`;
                } else if (s.src) {
                    ic = `<img src="${s.src}" alt="" loading="lazy" width="16" height="16">`;
                } else {
                    ic = `<i data-feather="${s.icon || 'tag'}" class="w-4 h-4"></i>`;
                }
                return `<span class="chip">${ic}${s.name}</span>`;
            }).join('');
            wrap.innerHTML = `
                <div class="md:w-48 flex-shrink-0">
                    <p class="font-fira text-xs uppercase tracking-wider text-gray-500"># ${group.label}</p>
                </div>
                <div class="flex flex-wrap gap-2.5 flex-1">${chips}</div>
            `;
            skillsGroupsEl.appendChild(wrap);
        });
    }



    // --- Dynamic Experience Timeline ---
    const experienceContainer = document.querySelector('#experience .relative');
    const experienceData = [
        {
            company: 'IConflux Technologies Pvt Ltd',
            role: 'Lead System Administrator (DevOps)',
            date: 'Jul 2017 - Present (8+ yrs)',
            current: true,
            desc: 'Operating Kubernetes workloads with Git and Docker container setups. Provisioning infrastructure on AWS (EC2, S3, IAM, CloudWatch, RDS, VPC, Route 53) and DigitalOcean Droplets. Managing GitLab repositories, web hosting control panels (WHM/cPanel/Plesk), and configuring advanced system automations using Bash and Batch scripts.'
        },
        {
            company: 'ACIS Information Technology',
            role: 'Senior System Engineer & Administrator',
            date: 'Nov 2017 - May 2023 (5 yrs 7 mos)',
            desc: 'Provided enterprise-level deployment and customer production environment support for the Ivanti suite (UEM, Automation, Identity Director, Service/Asset Manager). Configured Active Directory, IIS web server troubleshooting, database optimization (MS SQL Server maintenance plans), and Mobile Device Management policies.'
        },
        {
            company: 'Sigmate Informatics Pvt. Ltd.',
            role: 'System and Network Administrator',
            date: 'Jun 2015 - Jun 2017 (2 yrs 1 mo)',
            desc: 'Maintained IT infrastructure, cPanel servers, and IIS/Apache web runtimes. Handled MS SQL & MySQL database administration, backup procedures (Full, Incremental, Mirror), firewall configurations, and virtual machines on VMware ESXi platforms.'
        }
    ];
    if (experienceContainer) {
        const timelineIcons = ['terminal', 'shield', 'briefcase'];
        experienceData.forEach((item, i) => {
            const expItem = document.createElement('div');
            expItem.className = 'ml-10 mb-10 tech-card p-6 rounded-md';
            expItem.style.setProperty('--i', i);
            const dotClass = item.current ? 'timeline-dot timeline-dot-current' : 'timeline-dot';
            const currentBadge = item.current ? `<span class="status-pill" style="font-size:0.7rem; padding:0.15rem 0.55rem;"><span class="dot"></span>Current</span>` : '';
            const iconName = timelineIcons[i] || 'briefcase';
            expItem.innerHTML = `
                <div class="absolute ${dotClass}" aria-hidden="true">
                    <i data-feather="${iconName}" style="width: 14px; height: 14px;"></i>
                </div>
                <div class="flex items-start justify-between gap-3 mb-1">
                    <h3 class="text-xl font-bold text-white">${item.role}</h3>
                    ${currentBadge}
                </div>
                <p class="text-primary-color mb-1">${item.company}</p>
                <time class="text-sm font-fira text-gray-400 block mb-2">${item.date}</time>
                ${item.desc ? `<p class="text-gray-400 text-sm leading-relaxed">${item.desc}</p>` : ''}
            `;
            experienceContainer.appendChild(expItem);
        });
        if (window.feather) feather.replace();
    }

    // --- Dynamic Projects / Portals ---
    const projectContainer = document.getElementById('projects-grid');
    const projectData = [
        { title: 'KubeKosh', desc: 'Interactive, self-hosted Kubernetes learning playground containerized in a single Docker image.', link: 'https://github.com/zeborg/kubekosh', repo: 'zeborg/kubekosh', tags: ['Kubernetes', 'Docker', 'Learning', 'Interactive'], src: 'assets/logos/kubernetes.svg', brandClass: 'card-k8s' },
        { title: 'Ansible Playground', desc: 'Docker-based multi-container playground environment for testing Ansible playbooks and provisioning flows.', link: 'https://github.com/meibraransari/ansible-playground-docker', repo: 'meibraransari/ansible-playground-docker', tags: ['Ansible', 'Docker', 'Playground', 'Automation'], src: 'assets/logos/ansible.svg', brandClass: 'card-ansible' },
        { title: 'SFTP Server Docker', desc: 'Secure FTP server packaged in Docker supporting password and key-based SSH authentication.', link: 'https://github.com/meibraransari/sftp-server-docker', repo: 'meibraransari/sftp-server-docker', tags: ['SFTP', 'Docker', 'SSH', 'Security'], feather: 'shield', brandClass: 'card-security' },
        { title: 'Vim Ninja', desc: 'High-speed editor settings and customized Vim keybindings for ninja-level coding and configuration editing.', link: 'https://github.com/meibraransari/vim-ninja', repo: 'meibraransari/vim-ninja', tags: ['Vim', 'Configuration', 'IDE', 'Speed'], src: 'assets/logos/vim.svg', brandClass: 'card-vim' },
        { title: 'FTP Server', desc: 'Lightweight, multi-user FTP server setup for rapid file transfer and file sharing pipelines.', link: 'https://github.com/meibraransari/ftp-server', repo: 'meibraransari/ftp-server', tags: ['FTP', 'Docker', 'File Transport'], feather: 'folder', brandClass: 'card-ftp' },
        { title: 'Dotfiles', desc: 'Personal configuration files, shell shortcuts, aliases, and development environment setups for Linux systems.', link: 'https://github.com/meibraransari/dotfiles', repo: 'meibraransari/dotfiles', tags: ['Dotfiles', 'Bash', 'Zsh', 'Terminal'], feather: 'terminal', brandClass: 'card-terminal' }
    ];

    function renderProjects() {
        if (!projectContainer) return;
        projectContainer.innerHTML = '';
        projectData.forEach((proj, i) => {
            const tagsHtml = proj.tags.map(tag => `<span class="text-xs font-fira bg-primary-color/10 text-primary-color py-1 px-2 rounded-full">${tag}</span>`).join(' ');
            let iconHtml;
            if (proj.src) {
                iconHtml = `<img src="${proj.src}" alt="" loading="lazy" class="w-6 h-6 object-contain">`;
            } else if (proj.if) {
                iconHtml = `<img src="https://api.iconify.design/${proj.if}.svg" alt="" loading="lazy" class="w-6 h-6">`;
            } else if (proj.si) {
                iconHtml = `<img src="https://cdn.simpleicons.org/${proj.si}/58a6ff" alt="" loading="lazy" class="w-6 h-6">`;
            } else {
                iconHtml = `<i data-feather="${proj.feather || 'folder'}" class="text-primary-color"></i>`;
            }
            const projCard = document.createElement('a');
            projCard.href = proj.link;
            projCard.target = '_blank';
            projCard.rel = 'noopener noreferrer';
            projCard.className = `tech-card p-6 rounded-md flex flex-col group ${proj.brandClass || ''}`;
            projCard.setAttribute('data-tags', `${proj.title} ${proj.desc} ${proj.tags.join(' ')}`);
            projCard.style.setProperty('--i', i);
            projCard.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    ${iconHtml}
                    <div class="flex items-center gap-3">
                        ${proj.repo ? `<span class="gh-stars font-fira text-xs text-gray-400" data-repo="${proj.repo}"></span>` : ''}
                        <i data-feather="external-link" class="text-gray-500 group-hover:text-primary-color w-4 h-4 transition-colors"></i>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-white mb-2 card-title">${proj.title}</h3>
                <p class="text-gray-400 mb-4 flex-grow text-sm leading-relaxed card-desc">${proj.desc}</p>
                <div class="flex flex-wrap gap-2 mt-auto">
                    ${tagsHtml}
                </div>
            `;
            projectContainer.appendChild(projCard);
        });

        if (window.feather) feather.replace();

        // Fetch stars counts
        document.querySelectorAll('.gh-stars').forEach(el => {
            fetch('https://api.github.com/repos/' + el.dataset.repo)
                .then(r => r.ok ? r.json() : Promise.reject())
                .then(d => {
                    if (typeof d.stargazers_count === 'number') el.textContent = '★ ' + d.stargazers_count.toLocaleString('en-US');
                })
                .catch(() => {});
        });
    }
    renderProjects();



    // --- Scroll spy active navbar links ---
    const sections = document.querySelectorAll('main[id], section[id]');
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    const linkByHash = new Map();
    navLinks.forEach(a => linkByHash.set(a.getAttribute('href').slice(1), a));
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach(a => {
                a.classList.remove('nav-active');
                a.removeAttribute('aria-current');
            });
            if (linkByHash.has(id)) {
                const active = linkByHash.get(id);
                active.classList.add('nav-active');
                active.setAttribute('aria-current', 'true');
            }
        });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(s => spy.observe(s));

    // --- Vim-style keyboard navigation ---
    const navByKey = {
        a: 'about', h: 'honors', s: 'skills', e: 'experience',
        p: 'projects', w: 'writing', c: 'contact'
    };
    let chordPending = '';
    let chordTimer = null;
    const headerNav = document.querySelector('header nav');
    const showKeys = () => headerNav && headerNav.classList.add('show-keys');
    const hideKeys = () => headerNav && headerNav.classList.remove('show-keys');
    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea, [contenteditable]')) return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        if (e.key === 'Escape') {
            chordPending = '';
            hideKeys();
            return;
        }
        if (e.key === '?') {
            headerNav && headerNav.classList.toggle('show-keys');
            return;
        }
        if (e.key === 'g' && !chordPending) {
            chordPending = 'g';
            showKeys();
            clearTimeout(chordTimer);
            chordTimer = setTimeout(() => { chordPending = ''; hideKeys(); }, 1200);
            return;
        }
        if (chordPending === 'g' && navByKey[e.key]) {
            const target = document.getElementById(navByKey[e.key]);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            chordPending = '';
            hideKeys();
            e.preventDefault();
        }
    });

    // --- Command Palette dialog logic ---
    const commandPalette = document.getElementById('commandPalette');
    const paletteSearchInput = document.getElementById('paletteSearchInput');
    const paletteList = document.getElementById('paletteList');
    const paletteCloseBtn = document.getElementById('paletteCloseBtn');

    let paletteItems = [];
    let selectedIndex = 0;

    function buildPaletteItems() {
        paletteItems = [
            { title: "Home", sub: "Hero Overview", url: "#main", icon: "home" },
            { title: "About Me", sub: "Background & Profile", url: "#about", icon: "user" },
            { title: "Certifications", sub: "Professional Credentials", url: "#honors", icon: "award" },
            { title: "Technical Skills", sub: "Tech Stack & Tooling", url: "#skills", icon: "cpu" },
            { title: "Career Journey", sub: "Timeline & Positions", url: "#experience", icon: "briefcase" },
            { title: "Things I've Built", sub: "Open Source Portals", url: "#projects", icon: "grid" },
            { title: "Writing & Channels", sub: "Blogger & YouTube", url: "#writing", icon: "book-open" },
            { title: "Get In Touch", sub: "Contact Terminal", url: "#contact", icon: "send" }
        ];

        paletteItems.push({ title: "DevOps Blog (Hashnode)", sub: "Articles on Kubernetes & CI/CD", url: "https://ibraransari.hashnode.dev/", icon: "edit-3" });
        paletteItems.push({ title: "Tech Blog (Blogger)", sub: "Database & network configs logs", url: "https://ibraransari.blogspot.com/", icon: "book-open" });
        paletteItems.push({ title: "YouTube Channel (DevOps in Action)", sub: "Video tutorials & labs", url: "https://www.youtube.com/@DevOpsinAction", icon: "video" });
        paletteItems.push({ title: "Telegram Community", sub: "DevOps discussion & chat group", url: "https://t.me/DevOpsinActionTelegram", icon: "send" });
        paletteItems.push({ title: "Docker Hub Registry", sub: "Public Docker images registry", url: "https://hub.docker.com/u/ibraransaridocker", icon: "package" });
        paletteItems.push({ title: "GitHub Profile", sub: "Public code repositories & scripts", url: "https://github.com/meibraransari", icon: "github" });

        projectData.forEach(p => {
            paletteItems.push({ title: p.title, sub: `Project · ${p.desc}`, url: p.link, icon: "external-link" });
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
                    <div class="palette-item-icon-wrapper"><i data-feather="alert-circle"></i></div>
                    <span>No results found</span>
                </li>`;
            if (window.feather) feather.replace();
            return;
        }

        filtered.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = `palette-item ${index === selectedIndex ? 'selected' : ''}`;
            li.innerHTML = `
                <div class="palette-item-icon-wrapper"><i data-feather="${item.icon}"></i></div>
                <span>${item.title}</span>
                <span class="item-sub">${item.sub}</span>
            `;
            
            li.addEventListener("click", () => executePaletteItem(item.url));
            paletteList.appendChild(li);
        });

        if (window.feather) feather.replace();

        const activeEl = paletteList.querySelector(".palette-item.selected");
        if (activeEl) activeEl.scrollIntoView({ block: "nearest" });
    }

    function executePaletteItem(url) {
        closePalette();
        if (url.startsWith("#")) {
            const targetEl = document.querySelector(url);
            if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
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

    if (paletteCloseBtn) paletteCloseBtn.addEventListener('click', closePalette);

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
            const items = paletteList.querySelectorAll(".palette-item");
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
            document.activeElement !== paletteSearchInput && 
            document.activeElement.tagName !== "INPUT" && 
            document.activeElement.tagName !== "TEXTAREA") {
            e.preventDefault();
            openPalette();
        }
    });

    // --- Toast Notification Logic ---
    const showToast = (message, type) => {
        const toast = document.getElementById('toast-notification');
        const msg = document.getElementById('toast-message');
        if (!toast || !msg) return;
        msg.textContent = message;
        toast.classList.toggle('error', type === 'error');
        toast.classList.add('show');
        if (window.feather) feather.replace();
        setTimeout(() => toast.classList.remove('show'), 3500);
    };



    // --- Back to top button ---
    const backTop = document.getElementById('back-to-top');
    if (backTop) {
        const onScroll = () => backTop.classList.toggle('show', window.scrollY > 600);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // --- Nav Search Badge ---
    const navSearchBadge = document.getElementById('navSearchBadge');
    if (navSearchBadge) {
        navSearchBadge.addEventListener('click', openPalette);
    }

    // --- Hero Terminal Typing Simulation ---
    const termTypingEl = document.getElementById('terminal-typing-text');
    if (termTypingEl) {
        const commands = [
            "docker ps",
            "ansible-playbook setup.yml -i hosts",
            "kubectl get pods -n production",
            "git push origin main",
            "ssh ibrar@prod-server-04",
            "terraform apply -auto-approve"
        ];
        let cmdIdx = 0;
        let charIdx = 0;
        let isDel = false;
        
        const typeCmd = () => {
            if (!termTypingEl) return;
            const current = commands[cmdIdx];
            if (isDel) {
                termTypingEl.textContent = current.substring(0, charIdx - 1);
                charIdx--;
            } else {
                termTypingEl.textContent = current.substring(0, charIdx + 1);
                charIdx++;
            }
            
            let speed = isDel ? 40 : 70;
            if (!isDel && charIdx === current.length) {
                speed = 2200; // pause at end
                isDel = true;
            } else if (isDel && charIdx === 0) {
                isDel = false;
                cmdIdx = (cmdIdx + 1) % commands.length;
                speed = 600; // pause before next
            }
            
            setTimeout(typeCmd, speed);
        };
        
        setTimeout(typeCmd, 1500);
    }

    // Friendly Console Welcome
    try {
        console.log('%cwhoami → Ibrar Ansari · Lead System Administrator & DevOps Engineer', 'color:#58a6ff;font:bold 14px Fira Code,monospace');
        console.log('%cShortcuts: g+a/h/s/e/p/w/c · ? for hints · Esc to clear · / for Search Palette', 'color:#8b949e;font:12px Fira Code,monospace');
    } catch (_) {}

});
