(() => {
    const body = document.body;
    const header = document.querySelector('[data-nav]');
    const navToggle = document.querySelector('[data-nav-toggle]');
    const navLinks = document.querySelector('[data-nav-links]');

    const onScroll = () => {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    navToggle?.addEventListener('click', () => {
        body.classList.toggle('nav-open');
    });

    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => body.classList.remove('nav-open'));
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

    const magneticItems = document.querySelectorAll('.magnetic');
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', event => {
            const rect = item.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            item.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px) translateY(-3px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });

    const tiltCard = document.querySelector('.tilt-card');
    if (tiltCard && window.matchMedia('(pointer: fine)').matches) {
        tiltCard.addEventListener('mousemove', event => {
            const rect = tiltCard.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            tiltCard.style.animation = 'none';
            tiltCard.style.transform = `rotateX(${8 - y * 8}deg) rotateY(${-12 + x * 10}deg) rotateZ(${3 + x * 2}deg) translateY(-8px)`;
        });

        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.animation = '';
            tiltCard.style.transform = '';
        });
    }

    const activityTrack = document.querySelector('[data-activity-track]');
    if (activityTrack) {
        activityTrack.addEventListener('pointermove', event => {
            for (const card of activityTrack.querySelectorAll('.activity-card')) {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,.14), rgba(255,255,255,.075) 28%, rgba(255,255,255,.045) 70%)`;
            }
        });

        activityTrack.addEventListener('pointerleave', () => {
            activityTrack.querySelectorAll('.activity-card').forEach(card => {
                card.style.background = '';
            });
        });
    }
})();
