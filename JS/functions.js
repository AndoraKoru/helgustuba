const slides = [
    {
        title: "Kareda vee filter",
        desc: "Varem on Eestis tarkade tualettide parimat toimimist takistanud kare vesi. Helguse tualettide integreeritud filter pehendab vett, kaitstes seadet kaltsifikatsiooni eest ja pikendades selle eluiga. See on meie jaoks üks olulisemaid detaile.",
        img: "Assets/Images/Functions/karedaVeeFilter.jpg"
    },
    {
        title: "Reguleeritava temperatuuriga prillaud",
        desc: "Soojus lisab igapäevasesse kasutusse selgelt tajutavat mugavust – eriti jahedatel hommikutel või külmemas vannitoas. Kui juba ära harjud, siis tagasiteed enam ei ole. Muidugi võib prilllaua jätta ka jahedaks.",
        img: "Assets/Images/Functions/soojendatudIste.jpg"
    },
    {
        title: "Steriilne UV puhastus",
        desc: "UV-valgus steriliseerib poti pinna automaatselt pärast igat kasutust. See bakterite vähendamine tagab päriselt puhta ja hügieenilise kogemuse.",
        img: "Assets/Images/Functions/steriilneUvPuhastus.jpg"
    },
    {
        title: "Sisse ehitatud veepaak",
        desc: "Kompaktne sisseehitatud veepaak säästab ruumi ja tagab vaikse ning tõhusa loputuse.",
        img: "Assets/Images/Functions/sisseEhitatudVeepaak.jpg"
    },
    {
        title: "Ise avanev ja sulguv tualetikaas",
        desc: "Ise avanev ja sulguv tualetikaas kõrgendab tajutud modernsuse tunnet.",
        img: "Assets/Images/Functions/iseAvanevWCKaas.jpg"
    },
    {
        title: "Õrn soe kuivatussüsteem",
        desc: "Peale pesu on järgmine samm kuivatus õrna ning pehme õhuvooluga.",
        img: "Assets/Images/Functions/kuivatus.jpg"
    },
];

let current = 0;
let isAnimating = false;

const strip = document.querySelector('.theWhatImages');
const textEl = document.querySelector('.theWhatRight');

// Rotating array — [0]=prev, [1]=active, [2]=next
let imgEls = [
    document.getElementById('imgPrev'),
    document.getElementById('imgActive'),
    document.getElementById('imgNext')
];

function mod(n, m) { return ((n % m) + m) % m; }

function getLayout() {
    const W = strip.getBoundingClientRect().width;
    const mobile = W < 600;
    const gap = mobile ? 10 : 28;
    const containerH = strip.getBoundingClientRect().height;
    const activeW = mobile ? Math.round(W * 0.72) : 490;
    const activeH = mobile ? Math.round(containerH * 0.85) : 313;
    const sideW = mobile ? Math.round(W * 0.55) : 399;
    const sideH = mobile ? Math.round(containerH * 0.7) : 244;
    const activeTop = (containerH - activeH) / 2;
    const sideTop = (containerH - sideH) / 2;
    const activeX = (W - activeW) / 2;
    const prevX = activeX - sideW - gap;
    // shiftX so next image is exactly 2/3 visible (1/3 off right edge)
    const shiftX = mobile ? 0 : (W - activeW) / 2 - sideW * (2 / 3) - gap;
    return {
        prev: { left: prevX + shiftX, top: sideTop, width: sideW, height: sideH, opacity: 0.65 },
        active: { left: activeX + shiftX, top: activeTop, width: activeW, height: activeH, opacity: 1 },
        next: { left: activeX + activeW + gap + shiftX, top: sideTop, width: sideW, height: sideH, opacity: 0.65 },
        exitL: { left: -(sideW + gap), top: sideTop, width: sideW, height: sideH, opacity: 0.65 },
        exitR: { left: W + gap, top: sideTop, width: sideW, height: sideH, opacity: 0.65 }
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
        setPos(buffer, L.next);   // buffer → next (slides in from right)
    } else {
        setPos(imgEls[2], L.exitR);  // next   → exit right
        setPos(imgEls[1], L.next);   // active → next
        setPos(imgEls[0], L.active); // prev   → active
        setPos(buffer, L.prev);   // buffer → prev (slides in from left)
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
    }, mobile ? 500 : 600);
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
