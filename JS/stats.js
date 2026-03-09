const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const delay = card.dataset.delay || 0;
            setTimeout(() => card.classList.add('visible'), delay);
            statsObserver.unobserve(card);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.statsCard').forEach((card, i) => {
    card.dataset.delay = i * 100;
    statsObserver.observe(card);
});
