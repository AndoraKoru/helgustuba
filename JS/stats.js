const isMobile = () => window.innerWidth <= 800;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const delay = isMobile() ? card.dataset.delayMobile : card.dataset.delay;
            setTimeout(() => card.classList.add('visible'), delay || 0);
            statsObserver.unobserve(card);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.statCard').forEach((card, i) => {
    card.dataset.delay       = i * 100;
    card.dataset.delayMobile = i * 120;
    statsObserver.observe(card);
});
