// Fade-in animation
document.addEventListener('DOMContentLoaded', function () {
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);

            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Check on load
    checkFade();

    // Check on scroll
    window.addEventListener('scroll', checkFade);
});