window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.pageYOffset + window.innerHeight;

    sections.forEach(section => {
        if (scrollPosition > section.offsetTop + section.offsetHeight / 2) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});