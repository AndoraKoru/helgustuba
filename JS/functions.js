const slides = [
    {
        title: "Kareda vee filter",
        desc: "Varem on Eestis tarkade nutitualettide parimat toimimist takistanud kare vesi. Helguse nutitualettide integreeritud filter pehmendab vett, kaitseb katlakivi eest ja pikendab seeläbi nutitualeti eluiga. See on meie jaoks üks olulisemaid detaile.",
        img: "Assets/Images/Functions/karedaVeeFilter.jpg",
        webp: "Assets/Images/Functions/karedaVeeFilter.webp"
    },
    {
        title: "Reguleeritava temperatuuriga prillaud",
        mobileTitle: "Reguleeritava<br>temperatuuriga prillaud",
        desc: "Soojus lisab igapäevasesse kasutusse selgelt tajutavat mugavust – eriti jahedatel hommikutel või külmemas vannitoas. Kui juba ära harjud, siis tagasiteed enam ei ole. Muidugi võib prilllaua jätta ka jahedaks.",
        img: "Assets/Images/Functions/soojendatudIste.jpg",
        webp: "Assets/Images/Functions/soojendatudIste.webp"
    },
    {
        title: "Steriilne UV puhastus",
        desc: "UV-valgus steriliseerib poti pinna automaatselt pärast igat kasutust. Selline bakterite vähendamine tagab päriselt puhta ja hügieenilise kogemuse.",
        img: "Assets/Images/Functions/steriilneUvPuhastus.jpg",
        webp: "Assets/Images/Functions/steriilneUvPuhastus.webp"
    },
    {
        title: "Sisse ehitatud veepaak",
        desc: "Kompaktne sisseehitatud veepaak säästab ruumi ja tagab vaikse ning tõhusa loputuse.",
        img: "Assets/Images/Functions/sisseEhitatudVeepaak.jpg",
        webp: "Assets/Images/Functions/sisseEhitatudVeepaak.webp"
    },
    {
        title: "Iseavanev ja -sulguv nutitualetikaas",
        mobileTitle: "Ise avanev ja<br>sulguv nutitualetikaas",
        desc: "Ise avanev ja sulguv nutitualetikaas kõrgendab tajutud modernsuse tunnet.",
        img: "Assets/Images/Functions/iseAvanevWCKaas.jpg",
        webp: "Assets/Images/Functions/iseavanevWcKaas.webp"
    },
    {
        title: "Õrn soe kuivatussüsteem",
        desc: "Peale pesu on järgmine samm kuivatus õrna, sooja ning pehme õhuvooluga.",
        img: "Assets/Images/Functions/kuivatus.jpg",
        webp: "Assets/Images/Functions/kuivatus.webp"
    },
];

let current = 0;
let isAnimating = false;

const strip = document.querySelector('.theWhatImages');
const textEl = document.querySelector('.theWhatRight');

// Rotating array — [0]=prev, [1]=active, [2]=next
// Each element is the <picture> element
let imgEls = [
    document.getElementById('picPrev'),
    document.getElementById('picActive'),
    document.getElementById('picNext')
];

function mod(n, m) { return ((n % m) + m) % m; }

// Set both <source srcset> and <img src> on a <picture> element
function setSrc(pic, slide) {
    pic.querySelector('source').srcset = slide.webp;
    pic.querySelector('img').src = slide.img;
}

// Create a new <picture class="featureImg"> with WebP + JPG fallback
function createPicture(slide, lazy) {
    const pic = document.createElement('picture');
    pic.className = 'featureImg';
    const source = document.createElement('source');
    source.type = 'image/webp';
    source.srcset = slide.webp;
    const img = document.createElement('img');
    img.src = slide.img;
    img.alt = '';
    if (lazy) img.loading = 'lazy';
    pic.appendChild(source);
    pic.appendChild(img);
    return pic;
}

function getLayout() {
    const W = strip.getBoundingClientRect().width;
    const mobile = W < 600;
    const gap = mobile ? 10 : 28;
    const containerH = strip.getBoundingClientRect().height;
    const activeW = mobile ? W : 490;
    const activeH = mobile ? containerH : 313;
    const sideW = mobile ? W : 399;
    const sideH = mobile ? containerH : 244;
    const activeTop = (containerH - activeH) / 2;
    const sideTop = (containerH - sideH) / 2;
    const activeX = (W - activeW) / 2;
    const prevX = activeX - sideW - gap;
    const shiftX = mobile ? 0 : (W - activeW) / 2 - sideW * (2 / 3) - gap;
    const sideOpacity = mobile ? 1 : 0.65;
    return {
        prev: { left: prevX + shiftX, top: sideTop, width: sideW, height: sideH, opacity: sideOpacity },
        active: { left: activeX + shiftX, top: activeTop, width: activeW, height: activeH, opacity: 1 },
        next: { left: activeX + activeW + gap + shiftX, top: sideTop, width: sideW, height: sideH, opacity: sideOpacity },
        exitL: { left: -(sideW + gap), top: sideTop, width: sideW, height: sideH, opacity: sideOpacity },
        exitR: { left: W + gap, top: sideTop, width: sideW, height: sideH, opacity: sideOpacity }
    };
}

function setPos(el, pos) {
    el.style.left = pos.left + 'px';
    el.style.top = pos.top + 'px';
    el.style.width = pos.width + 'px';
    el.style.height = pos.height + 'px';
    el.style.opacity = pos.opacity;
}

function positionImages() {
    const L = getLayout();
    imgEls.forEach(el => el.style.transition = 'none');
    setPos(imgEls[0], L.prev);
    setPos(imgEls[1], L.active);
    setPos(imgEls[2], L.next);
}

function updateText() {
    document.getElementById('slideTitle').textContent = slides[current].title;
    document.getElementById('slideDesc').textContent = slides[current].desc;
    // Collapse desc overlay on slide change
    const strip = document.querySelector('.theWhatImages');
    if (strip) strip.classList.remove('descExpanded');
    const btn = document.getElementById('mobilePlusBtn');
    if (btn) btn.textContent = '+';
    renderDots();
}

function updateMobileOverlay() {
    const mobileTitle = document.getElementById('mobileSlideTitle');
    const mobileDesc = document.getElementById('mobileSlideDescOverlay');
    if (mobileTitle) mobileTitle.innerHTML = slides[current].mobileTitle || slides[current].title;
    if (mobileDesc) mobileDesc.textContent = slides[current].desc;
}

function renderDots() {
    const dotsEl = document.getElementById('theWhatDots');
    dotsEl.innerHTML = slides.map((_, i) =>
        `<button class="theWhatDot${i === current ? ' active' : ''}" aria-label="Slaid ${i + 1}"></button>`
    ).join('');
    dotsEl.querySelectorAll('.theWhatDot').forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (i !== current) goTo(i > current ? 'next' : 'prev');
        });
    });
}

function goTo(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const L = getLayout();
    const mobile = strip.getBoundingClientRect().width < 600;
    const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const mobileEase = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const imgT = mobile ? `left 0.5s ${mobileEase}, opacity 0.5s ${mobileEase}` : `left 0.6s ${ease}, top 0.6s ${ease}, width 0.6s ${ease}, height 0.6s ${ease}, opacity 0.6s ${ease}`;
    const txtT = mobile ? `transform 0.5s ${mobileEase}` : `transform 0.6s ${ease}`;

    current = mod(current + (direction === 'next' ? 1 : -1), slides.length);
    updateText();

    // Snap text to start offset (no transition)
    textEl.style.transition = 'none';
    textEl.style.transform = `translateX(${direction === 'next' ? 40 : -40}px)`;

    // Create a temporary incoming <picture>, placed off-screen on the entry side
    const bufferSlide = direction === 'next'
        ? slides[mod(current + 1, slides.length)]
        : slides[mod(current - 1, slides.length)];
    const buffer = createPicture(bufferSlide, true);
    strip.appendChild(buffer);
    buffer.style.transition = 'none';

    if (direction === 'next') {
        setPos(buffer, L.exitR);
    } else {
        setPos(buffer, L.exitL);
    }

    // Force reflow so browser registers all start positions before animating
    strip.getBoundingClientRect();

    // Animate all four simultaneously
    imgEls.forEach(el => el.style.transition = imgT);
    buffer.style.transition = imgT;

    if (direction === 'next') {
        setPos(imgEls[0], L.exitL);  // prev   → exit left
        setPos(imgEls[1], L.prev);   // active → prev
        setPos(imgEls[2], L.active); // next   → active
        setPos(buffer, L.next);      // buffer → next (slides in from right)
    } else {
        setPos(imgEls[2], L.exitR);  // next   → exit right
        setPos(imgEls[1], L.next);   // active → next
        setPos(imgEls[0], L.active); // prev   → active
        setPos(buffer, L.prev);      // buffer → prev (slides in from left)
    }

    // Slide text in
    textEl.style.transition = txtT;
    textEl.style.transform = 'translateX(0)';

    setTimeout(() => {
        if (direction === 'next') {
            imgEls[0].remove();
            imgEls = [imgEls[1], imgEls[2], buffer];
        } else {
            imgEls[2].remove();
            imgEls = [buffer, imgEls[0], imgEls[1]];
        }
        isAnimating = false;
        if (mobile) updateMobileOverlay();
    }, mobile ? 500 : 600);
}

document.getElementById('prevBtn').addEventListener('click', () => goTo('prev'));
document.getElementById('nextBtn').addEventListener('click', () => goTo('next'));

// Set initial srcs
setSrc(imgEls[0], slides[mod(current - 1, slides.length)]);
setSrc(imgEls[1], slides[current]);
setSrc(imgEls[2], slides[mod(current + 1, slides.length)]);
positionImages();
updateText();
updateMobileOverlay();
window.addEventListener('resize', positionImages);

// Mobile "+" toggle
const mobilePlusBtn = document.getElementById('mobilePlusBtn');
if (mobilePlusBtn) {
    mobilePlusBtn.addEventListener('click', () => {
        const expanded = strip.classList.toggle('descExpanded');
        mobilePlusBtn.textContent = expanded ? '×' : '+';
    });
}

// Drag / swipe support
let touchStartX = 0;
let isDragging = false;
let dragDx = 0;
const dragEase = 'cubic-bezier(0.22, 1, 0.36, 1)';

strip.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    if (!isMobile()) return;
    isDragging = true;
    dragDx = 0;
    imgEls.forEach(el => el.style.transition = 'none');
}, { passive: true });

strip.addEventListener('touchmove', e => {
    if (!isDragging || !isMobile()) return;
    dragDx = e.touches[0].clientX - touchStartX;
    imgEls[1].style.transform = `translateX(${dragDx}px)`;
    if (dragDx > 0) {
        imgEls[0].style.transform = `translateX(${dragDx}px)`;
        imgEls[2].style.transform = '';
    } else {
        imgEls[2].style.transform = `translateX(${dragDx}px)`;
        imgEls[0].style.transform = '';
    }
}, { passive: true });

strip.addEventListener('touchend', e => {
    if (!isMobile()) {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? 'next' : 'prev');
        return;
    }
    isDragging = false;
    if (Math.abs(dragDx) > 60 && !isAnimating) {
        imgEls.forEach(el => el.style.transform = '');
        goTo(dragDx > 0 ? 'prev' : 'next');
    } else {
        imgEls.forEach(el => {
            el.style.transition = `transform 0.35s ${dragEase}`;
            el.style.transform = '';
        });
        setTimeout(() => imgEls.forEach(el => el.style.transition = ''), 350);
    }
}, { passive: true });
