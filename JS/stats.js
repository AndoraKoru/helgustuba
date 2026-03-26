const isMobile = () => window.innerWidth <= 800;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const card = entry.target;
        if (entry.isIntersecting) {
            const delay = isMobile() ? card.dataset.delayMobile : card.dataset.delay;
            setTimeout(() => card.classList.add('visible'), delay || 0);
        } else {
            card.classList.remove('visible');
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.statCard').forEach((card, i) => {
    card.dataset.delay       = i * 100;
    card.dataset.delayMobile = i * 120;
    statsObserver.observe(card);
});

const brandObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.2 });

// Split brandStatementTitle into per-word spans with staggered delays
const brandTitle = document.querySelector('.brandStatementTitle');
if (brandTitle) {
    const words = [];
    brandTitle.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent.split(/(\s+)/).forEach(part => {
                if (part.trim()) {
                    const span = document.createElement('span');
                    span.className = 'brandWord';
                    span.textContent = part;
                    words.push(span);
                } else if (part) {
                    words.push(document.createTextNode(part));
                }
            });
        } else {
            // <mark> elements — treat as a single word unit
            node.classList.add('brandWord');
            words.push(node);
        }
    });
    brandTitle.innerHTML = '';
    let wordIndex = 0;
    words.forEach(w => {
        if (w.classList && w.classList.contains('brandWord')) {
            w.style.setProperty('--delay', `${wordIndex * 0.11}s`);
            wordIndex++;
        }
        brandTitle.appendChild(w);
    });
}

const brandSection = document.querySelector('.brandStatement');
if (brandSection) brandObserver.observe(brandSection);

const theWhatSection = document.querySelector('.theWhat');
if (theWhatSection) brandObserver.observe(theWhatSection);
