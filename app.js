/* ==========================================================================
   MACBOOK M5 PREMIUM INTERACTIVE ACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initThemeSwitcher();
    initSpotlightHighlight();
    initSpecsConfigurator();
    initScrollReveal();
    initAcousticsObserver();
    initBatteryObserver();
    initNewsletterForm();
    initNavScrollEffects();
    initScrollCanvasAnimation();
    initRetinaCanvasAnimation();
    initSpecsDrawer();
    initBentoChipScrollAnimation();
    initAppleIntelligenceReveal();
    initThinCanvasAnimation();
});

/* ==========================================================================
   1. PREMIUM INTERPOLATED CUSTOM CURSOR (MONOCHROMATIC)
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const cursorGlow = document.getElementById('customCursorGlow');
    
    if (!cursor || !cursorGlow) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverables = document.querySelectorAll('a, button, .color-swatch, .config-option');
    hoverables.forEach(node => {
        node.addEventListener('mouseenter', () => {
            cursor.style.width = '24px';
            cursor.style.height = '24px';
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
            cursorGlow.style.width = '350px';
            cursorGlow.style.height = '350px';
        });
        node.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.backgroundColor = '#ffffff';
            cursorGlow.style.width = '250px';
            cursorGlow.style.height = '250px';
        });
    });
}

/* ==========================================================================
   2. DYNAMIC INTERACTIVE CHASSIS COLORWAY MANAGER
   ========================================================================== */
function initThemeSwitcher() {
    const swatches = document.querySelectorAll('.color-swatch');
    const titleTag = document.getElementById('chassisTitleTag');
    const previewImage = document.getElementById('configPreviewImg');
    const baseLightingImage = document.getElementById('lightingBaseImage');
    const bgGlow1 = document.getElementById('ambientGlow1');
    const bgGlow2 = document.getElementById('ambientGlow2');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            const selectedTheme = swatch.getAttribute('data-theme');
            const selectedName = swatch.getAttribute('data-color-name');

            document.body.className = '';
            document.body.classList.add(selectedTheme);
            
            if (titleTag) {
                titleTag.style.opacity = 0;
                setTimeout(() => {
                    titleTag.textContent = selectedName;
                    titleTag.style.opacity = 1;
                }, 200);
            }

            const images = [previewImage, baseLightingImage];
            images.forEach(img => {
                if (img) {
                    img.style.filter = 'brightness(1.4) contrast(1.1)';
                    setTimeout(() => {
                        img.style.filter = '';
                    }, 400);
                }
            });

            if (bgGlow1 && bgGlow2) {
                bgGlow1.style.transform = 'scale(1.1) translate(20px, -15px)';
                bgGlow2.style.transform = 'scale(1.1) translate(-20px, 15px)';
                setTimeout(() => {
                    bgGlow1.style.transform = '';
                    bgGlow2.style.transform = '';
                }, 500);
            }
        });
    });
}

/* ==========================================================================
   3. HIGH-PRECISION SPECTRAL SPOTLIGHT SHADER
   ========================================================================== */
function initSpotlightHighlight() {
    const panel = document.getElementById('lightingPanel');
    const overlay = document.getElementById('spotlightOverlay');

    if (!panel || !overlay) return;

    panel.addEventListener('mousemove', (e) => {
        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        overlay.style.background = `radial-gradient(circle 240px at ${x}px ${y}px, rgba(var(--accent-color-rgb), 0.18) 0%, rgba(0, 0, 0, 0.99) 100%)`;
    });

    panel.addEventListener('mouseleave', () => {
        overlay.style.background = `radial-gradient(circle 350px at 50% 50%, rgba(var(--accent-color-rgb), 0.04) 0%, rgba(0, 0, 0, 0.99) 100%)`;
    });
}

/* ==========================================================================
   4. REACTIVE PERFORMANCE UPGRADE ENGINE (PRICING)
   ========================================================================== */
function initSpecsConfigurator() {
    const options = document.querySelectorAll('.config-option');
    const priceTicker = document.getElementById('totalPriceTicker');
    
    if (!priceTicker) return;

    const basePrice = 2499;
    const configPrices = {
        chip: 0,
        ram: 0,
        ssd: 0
    };

    options.forEach(option => {
        option.addEventListener('click', () => {
            const type = option.getAttribute('data-type');
            const priceDelta = parseInt(option.getAttribute('data-price'), 10);

            const groupOptions = option.closest('.config-group').querySelectorAll('.config-option');
            groupOptions.forEach(opt => opt.classList.remove('active'));

            option.classList.add('active');
            configPrices[type] = priceDelta;

            calculateTotalPrice();
        });
    });

    function calculateTotalPrice() {
        const targetTotal = basePrice + configPrices.chip + configPrices.ram + configPrices.ssd;
        animatePriceChange(targetTotal);
    }

    function animatePriceChange(targetPrice) {
        const currentPriceText = priceTicker.textContent.replace(/,/g, '');
        let currentPrice = parseInt(currentPriceText, 10);
        
        const steps = 12;
        const priceDiff = targetPrice - currentPrice;
        const stepAmt = priceDiff / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentPrice += stepAmt;
            priceTicker.textContent = Math.round(currentPrice).toLocaleString();
            currentStep++;

            if (currentStep >= steps) {
                clearInterval(interval);
                priceTicker.textContent = targetPrice.toLocaleString();
            }
        }, 20);
    }
}

/* ==========================================================================
   5. INTERSECTION OBSERVER FOR DYNAMIC SCROLL REVEALS
   ========================================================================== */
function initScrollReveal() {
    const selectors = [
        '.section-header', 
        '.bento-card', 
        '.lighting-interactive-panel', 
        '.config-preview-pane', 
        '.config-controls-pane'
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal-el');
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, idx * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-el').forEach(el => {
        revealObserver.observe(el);
    });
}

/* ==========================================================================
   6. SOUND BAR KINETICS ON AUDIO VISUALIZER
   ========================================================================== */
function initAcousticsObserver() {
    const audioCard = document.getElementById('bentoAudioCard');
    const bars = document.querySelectorAll('.bento-audio-visualizer .bar');

    if (!audioCard || bars.length === 0) return;

    const soundObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bars.forEach(bar => {
                    bar.style.animationPlayState = 'running';
                });
            } else {
                bars.forEach(bar => {
                    bar.style.animationPlayState = 'paused';
                });
            }
        });
    }, { threshold: 0.1 });

    soundObserver.observe(audioCard);
}

/* ==========================================================================
   7. BATTERY FILL-UP ANIMATION CONTROL
   ========================================================================== */
function initBatteryObserver() {
    const batteryCard = document.getElementById('bentoBatteryCard');
    const fill = document.getElementById('batteryFill');

    if (!batteryCard || !fill) return;

    const batteryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    fill.style.width = '100%';
                }, 400);
            } else {
                fill.style.width = '0%';
            }
        });
    }, { threshold: 0.1 });

    batteryObserver.observe(batteryCard);
}

/* ==========================================================================
   8. PREMIUM NEWSLETTER SUBMISSION EFFECT
   ========================================================================== */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const submitBtn = document.getElementById('newsletterBtn');
    const statusMsg = document.getElementById('newsletterStatus');

    if (!form || !emailInput || !submitBtn || !statusMsg) return;

    form.addEventListener('submit', () => {
        const email = emailInput.value.trim();
        if (!email) return;

        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Connecting...';
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            submitBtn.style.background = '#ffffff';
            submitBtn.style.color = '#000000';
            submitBtn.querySelector('span').textContent = 'Secured';
            
            statusMsg.textContent = 'Verification successful. Your early access key is locked.';
            statusMsg.className = 'newsletter-status-msg success';

            emailInput.value = '';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.querySelector('span').textContent = 'Subscribe';
                submitBtn.style.opacity = '';
                statusMsg.textContent = '';
                statusMsg.className = 'newsletter-status-msg';
            }, 4000);
        }, 1500);
    });
}

/* ==========================================================================
   9. SCROLL STYLES ON NAVIGATION GLASS BAR
   ========================================================================== */
function initNavScrollEffects() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   10. HIGH-PERFORMANCE SCROLL FRAME CANVAS & 3D FALLBACK ENGINE
   ========================================================================== */
function initScrollCanvasAnimation() {
    const track = document.getElementById('heroScrollTrack');
    const canvas = document.getElementById('heroCanvas');
    const textBlock = document.getElementById('heroText');

    if (!track || !canvas) return;

    const ctx = canvas.getContext('2d');
    const frameCount = 240;
    const frames = [];
    let imagesLoaded = 0;
    let imagesPreloadFailed = false;

    const states = [
        {
            id: "hero",
            tag: "M5 Silicon Era",
            title: `<span class="gradient-text-1">MacBook M5</span><br><span class="gradient-text-2">A mind-blowing powerhouse.</span>`,
            desc: `Anodized Space Black aluminum chassis. Powered by the groundbreaking M5 Pro and M5 Max chips. Experience industry-leading performance.`,
            range: [0.0, 0.12]
        },
        {
            id: "chassis",
            tag: "Chassis Structure",
            title: `<span class="gradient-text-1">Space Black</span> <span class="gradient-text-2">Aluminum</span>`,
            desc: `Crafted from 100% recycled aluminum with a gorgeous anodized seal that reduces fingerprints.`,
            range: [0.12, 0.35]
        },
        {
            id: "cpu",
            tag: "Performance Silicon",
            title: `<span class="gradient-text-1">M5 Max</span> <span class="gradient-text-2">Silicon</span>`,
            desc: `Up to 16-core CPU and 40-core GPU built on industry-leading 3nm technology for extreme workloads.`,
            range: [0.35, 0.60]
        },
        {
            id: "display",
            tag: "Visual Precision",
            title: `<span class="gradient-text-1">Liquid Retina</span> <span class="gradient-text-2">XDR</span>`,
            desc: `ProMotion adaptive 120Hz refresh rates with up to 1600 nits peak HDR brightness.`,
            range: [0.60, 0.80]
        },
        {
            id: "battery",
            tag: "Efficiency Metrics",
            title: `<span class="gradient-text-1">24-Hour</span> <span class="gradient-text-2">Battery</span>`,
            desc: `The longest battery life ever in a Mac, sustaining heavy creative workflows anywhere.`,
            range: [0.80, 1.01]
        }
    ];
    let currentStateId = "hero";

    // Adjust high DPI canvas backing store coordinates
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        let w = rect.width;
        let h = rect.height;
        
        // Safety fallback layout checks in case container has layout lags on load
        if (w === 0) w = window.innerWidth * 0.85;
        if (h === 0) h = window.innerHeight * 0.55;
        
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 1. Attempt image frame preloads
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        // Zero-padding frames: assets/images/ezgif-345cb0ad655ab48a-png-split/ezgif-frame-001.png through ...-240.png
        const frameNum = String(i).padStart(3, '0');
        img.src = `assets/images/ezgif-345cb0ad655ab48a-png-split/ezgif-frame-${frameNum}.png`;
        
        img.onload = () => {
            imagesLoaded++;
            // Instantly draw first frame once loaded to show closed laptop immediately
            if (i === 1) {
                triggerRender();
            }
            if (imagesLoaded === frameCount) {
                imagesPreloadFailed = false;
                triggerRender();
            }
        };

        img.onerror = () => {
            // Only flag full preload failure if it's completely missing or broken
            if (imagesLoaded === 0) {
                imagesPreloadFailed = true;
            }
        };

        frames.push(img);
    }

    // Easing state for butter-smooth inertial scroll
    let currentProgress = 0;
    let targetProgress = 0;

    // Inertial LERP animation loop
    function animate() {
        const rect = track.getBoundingClientRect();
        const trackHeight = track.offsetHeight - window.innerHeight;
        let scrollProgress = -rect.top / trackHeight;
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));

        targetProgress = scrollProgress;

        // Apply smooth LERP easing for liquid navigation feel
        currentProgress += (targetProgress - currentProgress) * 0.08;

        render(currentProgress);
        requestAnimationFrame(animate);
    }

    // Safety fallback trigger
    function triggerRender() {
        // Handled dynamically by the high-performance continuous render loop
    }

    // Start render loop immediately
    animate();

    function render(progress) {
        
        // 2. Perform dynamic side text content updates based on scroll state
        const badgeEl = textBlock.querySelector('.hero-pill-badge');
        const titleEl = textBlock.querySelector('.hero-title');
        const descEl = textBlock.querySelector('.hero-subtitle');
        const buttonsEl = textBlock.querySelector('.hero-buttons');

        if (textBlock && badgeEl && titleEl && descEl) {
            let activeState = null;
            for (const state of states) {
                if (progress >= state.range[0] && progress < state.range[1]) {
                    activeState = state;
                    break;
                }
            }

            if (activeState && currentStateId !== activeState.id) {
                currentStateId = activeState.id;

                // 1. Exit transition: Fast fade out and slide upwards
                badgeEl.style.transition = 'opacity 0.16s cubic-bezier(0.16, 1, 0.3, 1), transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)';
                titleEl.style.transition = 'opacity 0.16s cubic-bezier(0.16, 1, 0.3, 1), transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)';
                descEl.style.transition = 'opacity 0.16s cubic-bezier(0.16, 1, 0.3, 1), transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)';
                if (buttonsEl) buttonsEl.style.transition = 'opacity 0.16s cubic-bezier(0.16, 1, 0.3, 1), transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)';

                badgeEl.style.opacity = '0';
                badgeEl.style.transform = 'translateY(-14px)';
                titleEl.style.opacity = '0';
                titleEl.style.transform = 'translateY(-14px)';
                descEl.style.opacity = '0';
                descEl.style.transform = 'translateY(-14px)';
                if (buttonsEl) {
                    buttonsEl.style.opacity = '0';
                    buttonsEl.style.transform = 'translateY(-14px)';
                }

                setTimeout(() => {
                    // Update content HTML
                    badgeEl.innerHTML = activeState.tag;
                    titleEl.innerHTML = activeState.title;
                    descEl.innerHTML = activeState.desc;

                    // 2. Reposition elements instantly below baseline without transition animations
                    badgeEl.style.transition = 'none';
                    titleEl.style.transition = 'none';
                    descEl.style.transition = 'none';
                    if (buttonsEl) buttonsEl.style.transition = 'none';

                    badgeEl.style.transform = 'translateY(14px)';
                    titleEl.style.transform = 'translateY(14px)';
                    descEl.style.transform = 'translateY(14px)';
                    if (buttonsEl) buttonsEl.style.transform = 'translateY(14px)';

                    // Force browser layout reflow to register the new position instantly
                    badgeEl.offsetHeight;

                    // 3. Re-apply the transition properties for smooth entry
                    badgeEl.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                    titleEl.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                    descEl.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                    if (buttonsEl) buttonsEl.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';

                    // 4. Entry transition: Smooth fade in and slide up from below
                    badgeEl.style.opacity = '1';
                    badgeEl.style.transform = 'translateY(0)';
                    titleEl.style.opacity = '1';
                    titleEl.style.transform = 'translateY(0)';
                    descEl.style.opacity = '1';
                    descEl.style.transform = 'translateY(0)';

                    if (activeState.id === 'hero') {
                        if (buttonsEl) {
                            buttonsEl.style.display = 'flex';
                            badgeEl.offsetHeight; // Reflow
                            buttonsEl.style.opacity = '1';
                            buttonsEl.style.transform = 'translateY(0)';
                            buttonsEl.style.pointerEvents = 'auto';
                        }
                    } else {
                        if (buttonsEl) {
                            buttonsEl.style.display = 'none';
                            buttonsEl.style.pointerEvents = 'none';
                        }
                    }
                }, 180);
            }
        }


        // 4. Render laptop frames on Canvas
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, width, height);

        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(progress * frameCount)
        );
        const activeImg = frames[frameIndex];

        // Aspect-ratio fitting drawing helper with smart clipping prevention
        function drawFrame(imgEl) {
            const imgRatio = imgEl.width / imgEl.height;
            const canvasRatio = width / height;
            let drawWidth, drawHeight, x, y;

            // Base scale multiplier to crop transparent margins beautifully
            let multiplier = 2.4; 

            // Calculate standard dimensions based on aspect fitting
            if (imgRatio > canvasRatio) {
                drawWidth = width * multiplier;
                drawHeight = drawWidth / imgRatio;
            } else {
                drawHeight = height * multiplier;
                drawWidth = drawHeight * imgRatio;
            }

            // Safeguard cap: Prevent the physical laptop chassis from being clipped
            // We cap drawing bounds to a maximum bleed threshold (12% overflow) 
            // to guarantee that the left and right screen corners are 100% visible on all screen aspect ratios.
            const maxBleed = 1.12; 
            if (drawWidth > width * maxBleed) {
                drawWidth = width * maxBleed;
                drawHeight = drawWidth / imgRatio;
            }
            if (drawHeight > height * maxBleed) {
                drawHeight = height * maxBleed;
                drawWidth = drawHeight * imgRatio;
            }

            x = (width - drawWidth) / 2;
            y = (height - drawHeight) / 2;

            ctx.drawImage(imgEl, x, y, drawWidth, drawHeight);
        }

        // Draw active frame if fully loaded
        if (activeImg && activeImg.complete && activeImg.naturalWidth !== 0) {
            drawFrame(activeImg);
        } else {
            // Find nearest preloaded frame to prevent any blank flashes
            let nearestImg = null;
            for (let j = frameIndex; j >= 0; j--) {
                if (frames[j] && frames[j].complete && frames[j].naturalWidth !== 0) {
                    nearestImg = frames[j];
                    break;
                }
            }
            if (!nearestImg) {
                for (let j = frameIndex; j < frameCount; j++) {
                    if (frames[j] && frames[j].complete && frames[j].naturalWidth !== 0) {
                        nearestImg = frames[j];
                        break;
                    }
                }
            }

            if (nearestImg) {
                drawFrame(nearestImg);
            } else {
                // Draw 3D wireframe fallback immediately if absolutely no frames are loaded yet
                drawVector3DLaptop(ctx, width, height, progress);
            }
        }
    }

    /* ==========================================================================
       3D VECTOR LAPTOP MATHEMATICAL MATRIX ENGINE (FALLBACK)
       ========================================================================== */
    function drawVector3DLaptop(ctx, width, height, progress) {
        // Base coordinate matrices
        // Hinge rotates based on progress. Hinge angle: 0 (flat closed) to 110 degrees
        const lidAngle = progress * (Math.PI / 1.6);
        
        // Pivot yaw and pitch angles as user scrolls down
        const yaw = -0.2 + progress * 0.35;
        const pitch = 0.3 + progress * 0.12;
        
        // 3D coordinate projection mapping
        function project(x, y, z) {
            // 1. Yaw rotation (Y-axis)
            const x1 = x * Math.cos(yaw) - z * Math.sin(yaw);
            const z1 = x * Math.sin(yaw) + z * Math.cos(yaw);
            
            // 2. Pitch rotation (X-axis)
            const y2 = y * Math.cos(pitch) - z1 * Math.sin(pitch);
            const z2 = y * Math.sin(pitch) + z1 * Math.cos(pitch);
            
            // 3. Translation depth scaling
            const distance = 580;
            const depth = distance + z2;
            const scale = 1150 / depth; // Increased scale to 1150 for a massive, high-contrast visual display
            
            return {
                x: width / 2 + x1 * scale,
                y: height / 2 + y2 * scale
            };
        }

        // Draw Laptop Chassis Base (Isometric/Perspective rect)
        const baseHalfW = 160;
        const baseHalfDepth = 110;
        const baseHeightY = 40; // Base rests lower down in Y space

        // 3D vertex indices for chassis base
        const bFL = project(-baseHalfW, baseHeightY, baseHalfDepth);
        const bFR = project(baseHalfW, baseHeightY, baseHalfDepth);
        const bBL = project(-baseHalfW, baseHeightY, -baseHalfDepth);
        const bBR = project(baseHalfW, baseHeightY, -baseHalfDepth);

        // Bottom metal plate depth mapping
        const bFL_Plate = project(-baseHalfW, baseHeightY + 8, baseHalfDepth);
        const bFR_Plate = project(baseHalfW, baseHeightY + 8, baseHalfDepth);
        const bBL_Plate = project(-baseHalfW, baseHeightY + 8, -baseHalfDepth);
        const bBR_Plate = project(baseHalfW, baseHeightY + 8, -baseHalfDepth);

        // Draw bottom chassis extrusion thickness
        ctx.beginPath();
        ctx.moveTo(bFL.x, bFL.y);
        ctx.lineTo(bFL_Plate.x, bFL_Plate.y);
        ctx.lineTo(bFR_Plate.x, bFR_Plate.y);
        ctx.lineTo(bFR.x, bFR.y);
        ctx.closePath();
        ctx.fillStyle = '#060608';
        ctx.fill();
        ctx.strokeStyle = '#222226';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Chassis Base Plate Face
        ctx.beginPath();
        ctx.moveTo(bFL.x, bFL.y);
        ctx.lineTo(bFR.x, bFR.y);
        ctx.lineTo(bBR.x, bBR.y);
        ctx.lineTo(bBL.x, bBL.y);
        ctx.closePath();
        ctx.fillStyle = '#0b0b0e';
        ctx.fill();
        ctx.strokeStyle = '#3a3a3c';
        ctx.stroke();

        // Draw Trackpad (centered on base)
        const padW = 45;
        const padH1 = 20;
        const padH2 = 60;
        const padFL = project(-padW, baseHeightY, baseHalfDepth - padH1);
        const padFR = project(padW, baseHeightY, baseHalfDepth - padH1);
        const padBR = project(padW, baseHeightY, baseHalfDepth - padH2);
        const padBL = project(-padW, baseHeightY, baseHalfDepth - padH2);

        ctx.beginPath();
        ctx.moveTo(padFL.x, padFL.y);
        ctx.lineTo(padFR.x, padFR.y);
        ctx.lineTo(padBR.x, padBR.y);
        ctx.lineTo(padBL.x, padBL.y);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Keyboard grid matrix (positioned in top half of base)
        const kbW = 135;
        const kbStartDepth = -90;
        const kbEndDepth = -15;

        // Draw Keyboard plate cavity border
        const kbFL = project(-kbW, baseHeightY, kbEndDepth);
        const kbFR = project(kbW, baseHeightY, kbEndDepth);
        const kbBR = project(kbW, baseHeightY, kbStartDepth);
        const kbBL = project(-kbW, baseHeightY, kbStartDepth);

        ctx.beginPath();
        ctx.moveTo(kbFL.x, kbFL.y);
        ctx.lineTo(kbFR.x, kbFR.y);
        ctx.lineTo(kbBR.x, kbBR.y);
        ctx.lineTo(kbBL.x, kbBL.y);
        ctx.closePath();
        ctx.fillStyle = '#050507';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.stroke();

        // Keyboard grid rows lines (dynamic keyboard activation lighting)
        const rows = 5;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + progress * 0.12})`;
        ctx.lineWidth = 0.5;
        for (let r = 0; r <= rows; r++) {
            const ratio = r / rows;
            const currentDepth = kbStartDepth + (kbEndDepth - kbStartDepth) * ratio;
            const lineL = project(-kbW, baseHeightY, currentDepth);
            const lineR = project(kbW, baseHeightY, currentDepth);
            ctx.beginPath();
            ctx.moveTo(lineL.x, lineL.y);
            ctx.lineTo(lineR.x, lineR.y);
            ctx.stroke();
        }

        // Draw Laptop Hinge Hanger
        const hingeWidth = 100;
        const hingeL = project(-hingeWidth, baseHeightY - 1, -baseHalfDepth + 2);
        const hingeR = project(hingeWidth, baseHeightY - 1, -baseHalfDepth + 2);
        ctx.beginPath();
        ctx.moveTo(hingeL.x, hingeL.y);
        ctx.lineTo(hingeR.x, hingeR.y);
        ctx.strokeStyle = '#111113';
        ctx.lineWidth = 4;
        ctx.stroke();

        // 3D Display Screen Lid vertices relative to hinge line (y = baseHeightY, z = -baseHalfDepth)
        // Lid height space is negative (meaning up)
        const lidHeight = 200;
        
        // Dynamic trigonometric lid height coordinate shift based on scroll angle
        const lH_Y = -lidHeight * Math.sin(lidAngle);
        const lH_Z = -lidHeight * Math.cos(lidAngle);

        // Hinge baseline anchors
        const hBL = { x: -baseHalfW, y: baseHeightY, z: -baseHalfDepth };
        const hBR = { x: baseHalfW, y: baseHeightY, z: -baseHalfDepth };

        // Lid top corner offsets
        const tBL = { x: -baseHalfW, y: baseHeightY + lH_Y, z: -baseHalfDepth + lH_Z };
        const tBR = { x: baseHalfW, y: baseHeightY + lH_Y, z: -baseHalfDepth + lH_Z };

        // Project lid coordinates
        const p_hBL = project(hBL.x, hBL.y, hBL.z);
        const p_hBR = project(hBR.x, hBR.y, hBR.z);
        const p_tBL = project(tBL.x, tBL.y, tBL.z);
        const p_tBR = project(tBR.x, tBR.y, tBR.z);

        // Draw Lid Backplate Chassis
        ctx.beginPath();
        ctx.moveTo(p_hBL.x, p_hBL.y);
        ctx.lineTo(p_tBL.x, p_tBL.y);
        ctx.lineTo(p_tBR.x, p_tBR.y);
        ctx.lineTo(p_hBR.x, p_hBR.y);
        ctx.closePath();
        ctx.fillStyle = '#09090b';
        ctx.fill();
        ctx.strokeStyle = '#2d2d30';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Screen Bezel inner offsets
        const innerRatioX = 0.96;
        const innerRatioY = 0.94;
        
        const p_hBL_In = project(hBL.x * innerRatioX, hBL.y - 4, hBL.z + lH_Z * 0.03);
        const p_hBR_In = project(hBR.x * innerRatioX, hBR.y - 4, hBR.z + lH_Z * 0.03);
        const p_tBL_In = project(tBL.x * innerRatioX, tBL.y - lH_Y * (1 - innerRatioY), tBL.z - lH_Z * (1 - innerRatioY));
        const p_tBR_In = project(tBR.x * innerRatioX, tBR.y - lH_Y * (1 - innerRatioY), tBR.z - lH_Z * (1 - innerRatioY));

        ctx.beginPath();
        ctx.moveTo(p_hBL_In.x, p_hBL_In.y);
        ctx.lineTo(p_tBL_In.x, p_tBL_In.y);
        ctx.lineTo(p_tBR_In.x, p_tBR_In.y);
        ctx.lineTo(p_hBR_In.x, p_hBR_In.y);
        ctx.closePath();
        ctx.fillStyle = '#020203';
        ctx.fill();
        ctx.strokeStyle = '#1c1c1e';
        ctx.stroke();

        // Draw Glowing Liquid Display XDR Panel (if lid has opened)
        if (progress > 0.02) {
            ctx.beginPath();
            ctx.moveTo(p_hBL_In.x, p_hBL_In.y);
            ctx.lineTo(p_tBL_In.x, p_tBL_In.y);
            ctx.lineTo(p_tBR_In.x, p_tBR_In.y);
            ctx.lineTo(p_hBR_In.x, p_hBR_In.y);
            ctx.closePath();

            // Create linear screen backlight glow matching theme variables
            const grad = ctx.createLinearGradient(
                (p_tBL_In.x + p_tBR_In.x) / 2, (p_tBL_In.y + p_tBR_In.y) / 2,
                (p_hBL_In.x + p_hBR_In.x) / 2, (p_hBL_In.y + p_hBR_In.y) / 2
            );
            
            // Dynamic theme gradients
            const rgb = getComputedStyle(document.body).getPropertyValue('--accent-color-rgb').trim();
            grad.addColorStop(0, `rgba(${rgb}, ${progress * 0.12})`);
            grad.addColorStop(0.5, `rgba(${rgb}, ${progress * 0.04})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0.9)');

            ctx.fillStyle = grad;
            ctx.fill();

            // Screen Specular rim light pathing
            ctx.beginPath();
            ctx.moveTo(p_tBL_In.x, p_tBL_In.y);
            ctx.lineTo(p_tBR_In.x, p_tBR_In.y);
            ctx.strokeStyle = `rgba(${rgb}, ${progress * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
}

/* ==========================================================================
   10b. RETINA DISPLAY SCROLL-DRIVEN CANVAS ANIMATION (BREAKTHROUGH SECTION)
   ========================================================================== */
function initRetinaCanvasAnimation() {
    const retinaCard = document.getElementById('bentoDisplayCard');
    const canvas = document.getElementById('bentoRetinaCanvas');
    if (!retinaCard || !canvas) {
        console.log('Retina canvas elements not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    const frameCount = 67;
    const frames = [];
    let imagesLoaded = 0;
    let firstFrameRendered = false;
    let isAnimating = true;
    let autoPlayFrame = 0;
    let useAutoPlay = true;

    console.log('Initializing retina canvas animation with', frameCount, 'frames');

    // Set canvas background for visibility
    canvas.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';

    // Preload all 67 frames from the image2 folder
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        img.src = `assets/image2/ezgif-2a12352d0eba485e-png-split/ezgif-frame-${frameNum}.png`;
        img.onload = () => {
            imagesLoaded++;
            console.log(`Loaded frame ${i}/${frameCount}`);
            // Render first frame immediately when loaded
            if (i === 1 && !firstFrameRendered) {
                firstFrameRendered = true;
                setTimeout(() => renderFrame(0), 100);
            }
        };
        img.onerror = () => {
            console.error(`Failed to load frame ${i}`);
        };
        frames.push(img);
    }

    // High-DPI canvas resize
    function resizeRetinaCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        let w = rect.width;
        let h = rect.height;
        if (w === 0) w = 400;
        if (h === 0) h = 280;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset before re-scaling
        ctx.scale(dpr, dpr);

        // Re-render after resize
        if (firstFrameRendered) {
            renderFrame(useAutoPlay ? autoPlayFrame : Math.min(frameCount - 1, Math.floor(currentRetinaProgress * frameCount)));
        }
    }
    window.addEventListener('resize', resizeRetinaCanvas);
    resizeRetinaCanvas();
    setTimeout(() => { resizeRetinaCanvas(); }, 400);

    // Smooth LERP easing state
    let currentRetinaProgress = 0;

    // Helper function to render a specific frame
    function renderFrame(frameIndex) {
        const dpr = window.devicePixelRatio || 1;
        const cw = canvas.width / dpr;
        const ch = canvas.height / dpr;
        
        // Clear with background color
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, cw, ch);

        const img = frames[frameIndex];
        if (img && img.complete && img.naturalWidth !== 0) {
            // Cover-fit: fill the canvas completely, cropping overflow
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = cw / ch;
            let drawW, drawH, dx, dy;

            if (imgRatio > canvasRatio) {
                // Image is wider — fit height, crop sides
                drawH = ch;
                drawW = drawH * imgRatio;
            } else {
                // Image is taller — fit width, crop top/bottom
                drawW = cw;
                drawH = drawW / imgRatio;
            }

            dx = (cw - drawW) / 2;
            dy = (ch - drawH) / 2;
            ctx.drawImage(img, dx, dy, drawW, drawH);
        } else {
            // Draw loading indicator
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(`Loading frame ${frameIndex + 1}/${frameCount}...`, cw / 2, ch / 2);
            
            // Find nearest loaded frame as fallback
            for (let j = frameIndex; j >= 0; j--) {
                if (frames[j] && frames[j].complete && frames[j].naturalWidth !== 0) {
                    const fb = frames[j];
                    const fbRatio = fb.naturalWidth / fb.naturalHeight;
                    const fbCanvasRatio = cw / ch;
                    let fbW, fbH, fbX, fbY;
                    if (fbRatio > fbCanvasRatio) {
                        fbH = ch; fbW = fbH * fbRatio;
                    } else {
                        fbW = cw; fbH = fbW / fbRatio;
                    }
                    fbX = (cw - fbW) / 2;
                    fbY = (ch - fbH) / 2;
                    ctx.drawImage(fb, fbX, fbY, fbW, fbH);
                    break;
                }
            }
        }
    }

    // Intersection observer to start/stop animation based on visibility
    const retinaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isAnimating = true;
                console.log('Retina card is visible, starting animation');
                if (!animationRunning) {
                    animationRunning = true;
                    animateRetina();
                }
            } else {
                isAnimating = false;
                console.log('Retina card is hidden, stopping animation');
            }
        });
    }, { threshold: 0.1 });
    
    retinaObserver.observe(retinaCard);

    // Auto-play animation (cycles through frames)
    let lastAutoPlayTime = 0;
    function animateAutoPlay(timestamp) {
        if (!isAnimating) {
            animationRunning = false;
            return;
        }

        if (timestamp - lastAutoPlayTime > 50) { // 20fps
            autoPlayFrame = (autoPlayFrame + 1) % frameCount;
            renderFrame(autoPlayFrame);
            lastAutoPlayTime = timestamp;
        }

        requestAnimationFrame(animateAutoPlay);
    }

    // Scroll-driven animation
    let animationRunning = false;
    function animateRetina() {
        if (!isAnimating) {
            animationRunning = false;
            return;
        }

        if (useAutoPlay) {
            // Use auto-play mode
            requestAnimationFrame(animateAutoPlay);
            return;
        }

        const rect = retinaCard.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Progress: 0 when card top enters viewport bottom, 1 when card bottom exits viewport top
        const rawProgress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)));

        // Apply dynamic LERP easing: starts slow (0.08) then speeds up to 0.35
        const dynamicEasing = 0.08 + (rawProgress * 0.27);
        currentRetinaProgress += (rawProgress - currentRetinaProgress) * dynamicEasing;

        const frameIndex = Math.min(frameCount - 1, Math.floor(currentRetinaProgress * frameCount));
        renderFrame(frameIndex);

        requestAnimationFrame(animateRetina);
    }
    
    // Start animation loop immediately with auto-play
    animationRunning = true;
    useAutoPlay = true;
    animateRetina();
    
    // Switch to scroll-driven after 5 seconds
    setTimeout(() => {
        useAutoPlay = false;
        console.log('Switching to scroll-driven animation');
    }, 5000);
    
    // Also render first frame after a short delay to ensure visibility
    setTimeout(() => {
        if (!firstFrameRendered && frames[0] && frames[0].complete) {
            firstFrameRendered = true;
            renderFrame(0);
            console.log('First frame rendered on timeout');
        }
    }, 500);
    
    // Force render first frame after all images load
    setTimeout(() => {
        if (imagesLoaded > 0 && !firstFrameRendered) {
            firstFrameRendered = true;
            renderFrame(0);
            console.log('First frame rendered after load check');
        }
    }, 2000);
}

/* ==========================================================================
   11. TECH SPECS DRAWER CONTROLLER
   ========================================================================== */
function initSpecsDrawer() {
    const openBtn = document.getElementById('openSpecsBtn');
    const closeBtn = document.getElementById('closeSpecsBtn');
    const overlay = document.getElementById('drawerOverlay');
    const drawer = document.getElementById('specsDrawer');

    if (!openBtn || !closeBtn || !overlay || !drawer) return;

    openBtn.addEventListener('click', () => {
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    });

    const closeDrawer = () => {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable background scrolling
    };

    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
}

/* ==========================================================================
   12. HIGH-PERFORMANCE CINEMATIC CHIP SHOWCASE SCROLL ANIMATION
   ========================================================================== */
function initBentoChipScrollAnimation() {
    const chipCanvas = document.getElementById('bentoChipCanvas');
    if (!chipCanvas) return;

    // Use the full showcase card as the scroll trigger (wider viewport trigger window)
    const chipCard = document.getElementById('chipShowcaseCard') || chipCanvas.closest('.chip-showcase-card') || chipCanvas;

    const ctx = chipCanvas.getContext('2d');
    const frameCount = 121;
    const frames = [];
    let imagesLoaded = 0;

    // Preload all 121 chip frames
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        img.src = `assets/images1/ezgif-26530a6b67038ef5-png-split/ezgif-frame-${frameNum}.png`;

        img.onload = () => {
            imagesLoaded++;
            if (i === 1) drawFrame(1);
        };
        frames.push(img);
    }

    let currentProgress = 0;
    let targetProgress = 0;

    function animate() {
        const rect = chipCard.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Trigger: animation starts when card begins to enter viewport,
        // completes when card is fully scrolled through
        const totalDist = windowHeight + rect.height;
        const currentPos = windowHeight - rect.top;

        let progress = currentPos / totalDist;
        // Map 0.05–0.90 of scroll range to 0–1 frame range for a snappier feel
        progress = (progress - 0.05) / 0.85;
        progress = Math.max(0, Math.min(1, progress));

        targetProgress = progress;
        // Smoother LERP at 0.1 for cinematic lag
        currentProgress += (targetProgress - currentProgress) * 0.10;

        const frameIndex = Math.max(1, Math.min(frameCount, Math.floor(currentProgress * (frameCount - 1)) + 1));
        drawFrame(frameIndex);

        requestAnimationFrame(animate);
    }

    animate();

    function drawFrame(index) {
        const img = frames[index - 1];
        if (!img || !img.complete) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = chipCanvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        // Resize canvas if needed
        if (Math.abs(chipCanvas.width - w * dpr) > 1 || Math.abs(chipCanvas.height - h * dpr) > 1) {
            chipCanvas.width = Math.round(w * dpr);
            chipCanvas.height = Math.round(h * dpr);
        }

        ctx.clearRect(0, 0, chipCanvas.width, chipCanvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = chipCanvas.width / chipCanvas.height;

        let drawW, drawH;
        // "cover" style: always fill the canvas with a slight 1.05x bleed
        if (imgRatio > canvasRatio) {
            drawH = chipCanvas.height * 1.05;
            drawW = drawH * imgRatio;
        } else {
            drawW = chipCanvas.width * 1.05;
            drawH = drawW / imgRatio;
        }

        const x = (chipCanvas.width - drawW) / 2;
        const y = (chipCanvas.height - drawH) / 2;

        ctx.drawImage(img, x, y, drawW, drawH);
    }

    // Redraw on resize
    window.addEventListener('resize', () => {
        const frameIndex = Math.max(1, Math.min(frameCount, Math.floor(currentProgress * (frameCount - 1)) + 1));
        drawFrame(frameIndex);
    });
}

/* ==========================================================================
   13. APPLE INTELLIGENCE SECTION — SCROLL REVEAL
   ========================================================================== */
function initAppleIntelligenceReveal() {
    const cards = document.querySelectorAll('#apple-intelligence .ai-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // fire once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach(card => observer.observe(card));
}


/* ==========================================================================
   PREMIUM ENCLOSURE — STICKY SCROLL-DRIVEN CANVAS ANIMATION
   Frames: assets/image3/ezgif-5c4e7adb65ce1284-png-split/ezgif-frame-NNN.png
   ========================================================================== */
function initThinCanvasAnimation() {
    const track  = document.getElementById('thinScrollTrack');
    const canvas = document.getElementById('bentoThinCanvas');
    if (!track || !canvas) return;

    const ctx = canvas.getContext('2d');

    // ── Frame config ──────────────────────────────────────────────────────────
    const FRAME_COUNT = 153;
    const FRAME_PATH  = (n) =>
        `assets/image3/ezgif-5c4e7adb65ce1284-png-split/ezgif-frame-${String(n).padStart(3, '0')}.png`;

    // ── Preload all frames ────────────────────────────────────────────────────
    const frames = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i);
        img.onload = () => {
            loaded++;
            if (i === 1) { resizeCanvas(); drawFrame(0); }
        };
        frames.push(img);
    }

    // ── HiDPI canvas resize ───────────────────────────────────────────────────
    function resizeCanvas() {
        const dpr  = window.devicePixelRatio || 1;
        const wrap = canvas.parentElement;
        const w    = wrap ? wrap.offsetWidth  : 800;
        const h    = wrap ? wrap.offsetHeight : 500;
        canvas.width  = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', () => { resizeCanvas(); drawFrame(currentFrame); });
    resizeCanvas();
    setTimeout(() => { resizeCanvas(); drawFrame(currentFrame); }, 400);

    // ── Draw helper ───────────────────────────────────────────────────────────
    let currentFrame = 0;

    function drawFrame(index) {
        const dpr = window.devicePixelRatio || 1;
        const cw  = canvas.width  / dpr;
        const ch  = canvas.height / dpr;
        ctx.clearRect(0, 0, cw, ch);

        let img = frames[index];
        // Fallback to nearest loaded frame
        if (!img || !img.complete || !img.naturalWidth) {
            for (let j = index; j >= 0; j--) {
                if (frames[j] && frames[j].complete && frames[j].naturalWidth) { img = frames[j]; break; }
            }
        }
        if (!img || !img.naturalWidth) return;

        const ir = img.naturalWidth / img.naturalHeight;
        const cr = cw / ch;
        let dw, dh, dx, dy;
        if (ir > cr) { dh = ch; dw = dh * ir; }
        else         { dw = cw; dh = dw / ir; }
        dx = (cw - dw) / 2;
        dy = (ch - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
    }

    // ── Scroll-driven render loop (track-based, same as hero) ─────────────────
    let smoothProgress = 0;

    function animate() {
        const rect        = track.getBoundingClientRect();
        const trackHeight = track.offsetHeight - window.innerHeight;
        let   progress    = -rect.top / trackHeight;
        progress = Math.max(0, Math.min(1, progress));

        // Smooth LERP
        smoothProgress += (progress - smoothProgress) * 0.10;

        const idx = Math.min(FRAME_COUNT - 1, Math.floor(smoothProgress * FRAME_COUNT));
        if (idx !== currentFrame) {
            currentFrame = idx;
            drawFrame(currentFrame);
        }

        requestAnimationFrame(animate);
    }

    animate();
}
