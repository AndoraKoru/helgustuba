const slides = [
    {
        title: "Jaapani vannitoakultuurist inspireeritud Eesti bränd",
        desc: "Iga helguse tualett on saanud oma nime kodumaiste joastike järgi: Jägala, Ukuoru, Kohina ja Valaste. Toodete tehnoloogiline pool on koostatud arvestades Eesti nüansside ja nõuetega. ",
        img: "Assets/Images/Functions/soojendatudIste.jpg"
    },
    {
        title: "Kareda vee filter",
        desc: "Varem on tarkade tualettide head toimimist takistanud kare vesi. Helguse tualettide integreeritud filter pehendab vett, kaitstes seadet kaltsifikatsiooni eest ja pikendades selle eluiga. See on meie jaoks üks olulisemaid detaile.",
        img: "Assets/Images/Functions/iseAvanevWCKaas.jpg"
    },
    {
        title: "Reguleeritava temperatuuriga prillaud",
        desc: "Soojus lisab igapäevasesse kasutusse selgelt tajutavat mugavust – eriti jahedatel hommikutel või külmemas vannitoas. Kui juba ära harjud, siis tagasiteed enam ei ole. Muidugi võib prilllaua jätta ka külmaks,",
        img: "Assets/Images/Functions/võimasKuivatus.jpg"
    },
    {
        title: "Steriilne UV puhastus",
        desc: "UV-valgus steriliseerib poti pinna automaatselt pärast iga kasutust, tagades pideva puhtuse.",
        img: "Assets/Images/Functions/steriilneUvPuhastus.jpg"
    },
    {
        title: "Sisse ehitatud veepaak",
        desc: "Kompaktne sisseehitatud veepaak säästab ruumi ja tagab vaikse ning tõhusa loputuse.",
        img: "Assets/Images/Functions/sisseEhitatudVeepaak.jpg"
    },
    {
        title: "Karede vee filter",
        desc: "Integreeritud filter pehendab vett, kaitstes seadet kaltsifikatsiooni eest ja pikendades selle eluiga.",
        img: "Assets/Images/Functions/karedaVeeFilter.jpg"
    }
];

let current = 0;
let isAnimating = false;

const strip  = document.querySelector('.theWhatImages');
const textEl = document.querySelector('.theWhatRight');

// Rotating array — [0]=prev, [1]=active, [2]=next
let imgEls = [
    document.getElementById('imgPrev'),
    document.getElementById('imgActive'),
    document.getElementById('imgNext')
];

function mod(n, m) { return ((n % m) + m) % m; }

function getLayout() {
    const W        = strip.getBoundingClientRect().width;
    const mobile   = W < 600;
    const gap      = mobile ? 10 : 28;
    const containerH = strip.getBoundingClientRect().height;
    const activeW = mobile ? Math.round(W * 0.72) : 490;
    const activeH = mobile ? Math.round(containerH * 0.85) : 313;
    const sideW   = mobile ? Math.round(W * 0.55) : 399;
    const sideH   = mobile ? Math.round(containerH * 0.7) : 244;
    const activeTop = (containerH - activeH) / 2;
    const sideTop   = (containerH - sideH) / 2;
    const activeX = (W - activeW) / 2;
    const prevX   = activeX - sideW - gap;
    // shiftX so next image is exactly 2/3 visible (1/3 off right edge)
    const shiftX  = mobile ? 0 : (W - activeW) / 2 - sideW * (2 / 3) - gap;
    return {
        prev:   { left: prevX                      + shiftX, top: sideTop,   width: sideW,   height: sideH,   opacity: 0.65 },
        active: { left: activeX                    + shiftX, top: activeTop, width: activeW, height: activeH, opacity: 1    },
        next:   { left: activeX + activeW + gap    + shiftX, top: sideTop,   width: sideW,   height: sideH,   opacity: 0.65 },
        exitL:  { left: -(sideW + gap),                      top: sideTop,   width: sideW,   height: sideH,   opacity: 0.65 },
        exitR:  { left: W + gap,                             top: sideTop,   width: sideW,   height: sideH,   opacity: 0.65 }
    };
}

function setPos(el, pos) {
    el.style.left    = pos.left    + 'px';
    el.style.top     = pos.top     + 'px';
    el.style.width   = pos.width   + 'px';
    el.style.height  = pos.height  + 'px';
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
    document.getElementById('slideDesc').textContent  = slides[current].desc;
    renderDots();
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

    const L    = getLayout();
    const ease = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const imgT = `left 0.4s ${ease}, top 0.4s ${ease}, width 0.4s ${ease}, height 0.4s ${ease}, opacity 0.4s ${ease}`;
    const txtT = `transform 0.4s ${ease}`;

    current = mod(current + (direction === 'next' ? 1 : -1), slides.length);
    updateText();

    // Snap text to start offset (no transition)
    textEl.style.transition = 'none';
    textEl.style.transform  = `translateX(${direction === 'next' ? 40 : -40}px)`;

    // Create a temporary incoming image, placed off-screen on the entry side
    const buffer = document.createElement('img');
    buffer.className = 'featureImg';
    strip.appendChild(buffer);
    buffer.style.transition = 'none';

    if (direction === 'next') {
        buffer.src = slides[mod(current + 1, slides.length)].img;
        setPos(buffer, L.exitR);
    } else {
        buffer.src = slides[mod(current - 1, slides.length)].img;
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
        setPos(buffer,    L.next);   // buffer → next (slides in from right)
    } else {
        setPos(imgEls[2], L.exitR);  // next   → exit right
        setPos(imgEls[1], L.next);   // active → next
        setPos(imgEls[0], L.active); // prev   → active
        setPos(buffer,    L.prev);   // buffer → prev (slides in from left)
    }

    // Slide text in
    textEl.style.transition = txtT;
    textEl.style.transform  = 'translateX(0)';

    setTimeout(() => {
        if (direction === 'next') {
            imgEls[0].remove();
            imgEls = [imgEls[1], imgEls[2], buffer];
        } else {
            imgEls[2].remove();
            imgEls = [buffer, imgEls[0], imgEls[1]];
        }
        isAnimating = false;
    }, 400);
}

document.getElementById('prevBtn').addEventListener('click', () => goTo('prev'));
document.getElementById('nextBtn').addEventListener('click', () => goTo('next'));

// Set initial srcs
imgEls[0].src = slides[mod(current - 1, slides.length)].img;
imgEls[1].src = slides[current].img;
imgEls[2].src = slides[mod(current + 1, slides.length)].img;
positionImages();
updateText();
window.addEventListener('resize', positionImages);

// Swipe support
let touchStartX = 0;
strip.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
strip.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? 'next' : 'prev');
}, { passive: true });
