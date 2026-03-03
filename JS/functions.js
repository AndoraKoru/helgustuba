const slides = [
    {
        title: "Soojendatud iste",
        desc: "Reguleeritav istemperatuur tagab mugava kasutuskogemuse ka külmadel hommikutel.",
        img: "Assets/Images/Functions/soojendatudIste.jpg"
    },
    {
        title: "Ise avanev WC kaas",
        desc: "Liikumisandur avab ja sulgeb kaane automaatselt – hügieeniline ja mugav lahendus igapäevaseks kasutamiseks.",
        img: "Assets/Images/Functions/iseAvanevWCKaas.jpg"
    },
    {
        title: "Võimas kuivatus",
        desc: "Sisseehitatud kuivati kuivatab tõhusalt ja kiiresti, asendades täielikult paberrätiku kasutamise vajaduse.",
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

// Rotating array — [0]=prev, [1]=active, [2]=next, [3]=buffer (off-screen incoming)
let imgEls = [
    document.getElementById('imgPrev'),
    document.getElementById('imgActive'),
    document.getElementById('imgNext'),
    document.getElementById('imgBuffer')
];

function mod(n, m) { return ((n % m) + m) % m; }

function getLayout() {
    const W    = strip.getBoundingClientRect().width;
    const gap  = 16;
    const sideW   = W * 0.24;
    const activeW = W * 0.37;
    const activeX = (W - activeW) / 2;
    const prevX   = activeX - sideW - gap;
    return {
        prev:   { left: prevX,              width: sideW,   height: 250, opacity: 0.65 },
        active: { left: activeX,            width: activeW, height: 300, opacity: 1    },
        next:   { left: activeX + activeW + gap, width: sideW, height: 250, opacity: 0.65 },
        exitL:  { left: prevX - sideW - gap, width: sideW,  height: 250, opacity: 0.65 },
        exitR:  { left: W + gap,            width: sideW,   height: 250, opacity: 0.65 }
    };
}

function setPos(el, pos) {
    el.style.left    = pos.left    + 'px';
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
    setPos(imgEls[3], L.exitR); // buffer hidden off-screen
}

function updateText() {
    document.getElementById('slideTitle').textContent = slides[current].title;
    document.getElementById('slideDesc').textContent  = slides[current].desc;
}

function goTo(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const L    = getLayout();
    const ease = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const imgT = `left 0.4s ${ease}, width 0.4s ${ease}, height 0.4s ${ease}, opacity 0.4s ${ease}`;
    const txtT = `transform 0.4s ${ease}`;

    current = mod(current + (direction === 'next' ? 1 : -1), slides.length);
    updateText();

    // Snap text to start offset (no transition)
    textEl.style.transition = 'none';
    textEl.style.transform  = `translateX(${direction === 'next' ? 40 : -40}px)`;

    if (direction === 'next') {
        // Load new next into buffer, place it off-screen right (no transition)
        imgEls[3].src = slides[mod(current + 1, slides.length)].img;
        imgEls[3].style.transition = 'none';
        setPos(imgEls[3], L.exitR);
    } else {
        // Load new prev into buffer, place it off-screen left (no transition)
        imgEls[3].src = slides[mod(current - 1, slides.length)].img;
        imgEls[3].style.transition = 'none';
        setPos(imgEls[3], L.exitL);
    }

    // Force reflow so browser registers all start positions before animating
    imgEls[3].getBoundingClientRect();

    // Animate all four images simultaneously
    imgEls.forEach(el => el.style.transition = imgT);

    if (direction === 'next') {
        setPos(imgEls[0], L.exitL);   // prev   → exit left
        setPos(imgEls[1], L.prev);    // active → prev
        setPos(imgEls[2], L.active);  // next   → active
        setPos(imgEls[3], L.next);    // buffer → next (slides in from right)
    } else {
        setPos(imgEls[2], L.exitR);   // next   → exit right
        setPos(imgEls[1], L.next);    // active → next
        setPos(imgEls[0], L.active);  // prev   → active
        setPos(imgEls[3], L.prev);    // buffer → prev (slides in from left)
    }

    // Slide text in
    textEl.style.transition = txtT;
    textEl.style.transform  = 'translateX(0)';

    setTimeout(() => {
        if (direction === 'next') {
            // [prev, active, next, buffer] = [old active, old next, old buffer, old prev]
            imgEls = [imgEls[1], imgEls[2], imgEls[3], imgEls[0]];
            imgEls[3].src = slides[mod(current + 2, slides.length)].img;
        } else {
            // [prev, active, next, buffer] = [old buffer, old prev, old active, old next]
            imgEls = [imgEls[3], imgEls[0], imgEls[1], imgEls[2]];
            imgEls[3].src = slides[mod(current - 2, slides.length)].img;
        }
        isAnimating = false;
    }, 400);
}

document.getElementById('prevBtn').addEventListener('click', () => goTo('prev'));
document.getElementById('nextBtn').addEventListener('click', () => goTo('next'));

// Set initial srcs (preload buffer too so first click has no delay)
imgEls[0].src = slides[mod(current - 1, slides.length)].img;
imgEls[1].src = slides[current].img;
imgEls[2].src = slides[mod(current + 1, slides.length)].img;
imgEls[3].src = slides[mod(current + 2, slides.length)].img;
positionImages();
updateText();
window.addEventListener('resize', positionImages);
