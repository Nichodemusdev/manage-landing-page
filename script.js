document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const closeIcon = document.createElement('span');
    const yearElement = document.getElementById('year');
yearElement.textContent = new Date().getFullYear();
    document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

    closeIcon.className = 'close-icon';
    closeIcon.textContent = '×';

    closeIcon.style.position = 'absolute';
    closeIcon.style.top = '5px';
    closeIcon.style.right = '10px';
    closeIcon.style.fontSize = '30px';
    closeIcon.style.fontWeight = '600';
    closeIcon.style.display = 'none';

    menuToggle.appendChild(closeIcon);

    function toggleMenu() {
        if (menuToggle.style.display === 'block') {
            menuToggle.style.display = 'none';
            menu.style.display = 'block';
            closeIcon.style.display = 'none';
        } else {
            menuToggle.style.display = 'block';
            menu.style.display = 'none';
            closeIcon.style.display = 'block';
        }
    }

    menu.addEventListener('click', toggleMenu);
    closeIcon.addEventListener('click', toggleMenu);

    const boxes = document.querySelectorAll('.box');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function updateVisibility() {
        if (window.innerWidth <= 430) {
            // Show only one box at a time on mobile screens
            boxes.forEach((box, index) => {
                box.style.display = index === currentIndex ? 'flex' : 'none';
            });
        } else {
            // Show all boxes on larger screens
            boxes.forEach(box => {
                box.style.display = 'flex';
            });
        }
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function handleSwipe(e) {
        const touchStart = e.touches[0].clientX;

        function onTouchMove(e) {
            const touchEnd = e.touches[0].clientX;
            const diff = touchStart - touchEnd;

            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < boxes.length - 1) {
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    currentIndex--;
                }
                updateVisibility();
                container.removeEventListener('touchmove', onTouchMove);
            }
        }

        container.addEventListener('touchmove', onTouchMove);
    }

    const container = document.querySelector('.boxes');
    container.addEventListener('touchstart', handleSwipe);

    
    window.addEventListener('resize', updateVisibility);
    updateVisibility();
});

document.addEventListener('DOMContentLoaded', () => {

    const yearElement = document.getElementById('year');
    yearElement.textContent = new Date().getFullYear();

});
