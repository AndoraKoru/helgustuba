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
