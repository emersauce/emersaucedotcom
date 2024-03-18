function expandCircle() {
    var circle = document.getElementById("circle");
    var menu = document.getElementById("menu");

    circle.classList.toggle("expanded");
    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        menu.classList.add("visible");
        // Show the menu text with a delay to wait for the transition
        setTimeout(function() {
            var menuLinks = menu.getElementsByTagName("a");
            for (var i = 0; i < menuLinks.length; i++) {
                menuLinks[i].style.opacity = 1;
            }
        }, 200); // Adjust the delay (in milliseconds) to match your transition duration
    } else {
        menu.classList.remove("visible");
        menu.classList.add("hidden");
        var menuLinks = menu.getElementsByTagName("a");
        for (var i = 0; i < menuLinks.length; i++) {
            menuLinks[i].style.opacity = 0; // Hide the menu text immediately
        }
    }
}

// Function to collapse circle menu when clicking away from it
document.addEventListener('click', function(e) {
    var circle = document.getElementById("circle");
    var menu = document.getElementById("menu");
    var target = e.target;

    // Check if the click is outside the circle and menu
    if (!circle.contains(target) && !menu.contains(target)) {
        menu.classList.remove("visible");
        menu.classList.add("hidden");
        circle.classList.remove("expanded");
        var menuLinks = menu.getElementsByTagName("a");
        for (var i = 0; i < menuLinks.length; i++) {
            menuLinks[i].style.opacity = 0; // Hide the menu text immediately
        }
    }
});


let currentImageIndex = 0;
const images = document.querySelectorAll('.gallery img');
const lightboxImage = document.getElementById('lightbox-image');

function openLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex'; // Display the lightbox
    
    // Initialize Hammer.js on the lightbox element
    var hammer = new Hammer(lightbox);

    // Enable horizontal swiping
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    // Handle swipe events
    hammer.on('swipeleft', function () {
        changeImage(1); // Swipe left to show the next image
    });

    hammer.on('swiperight', function () {
        changeImage(-1); // Swipe right to show the previous image
    });
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none'; // Hide the lightbox
}

// Close lightbox when clicking on the background
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target !== lightboxImage && e.target.className !== 'prev' && e.target.className !== 'next') {
        closeLightbox();
    }
});

// Close lightbox on key press, and navigate images with arrow keys and spacebar
document.addEventListener('keydown', function(e) {
    if (e.keyCode === 37) { // Left arrow key
        changeImage(-1);
    } else if (e.keyCode === 39 || e.keyCode === 32) { // Right arrow key or Space key
        changeImage(1);
    } else if (e.keyCode === 38) { // Up arrow key
        changeImage(-1);
    } else if (e.keyCode === 40) { // Down arrow key
        changeImage(1);
    } else {
        closeLightbox();
    }
});

function setCurrentImage(index) {
    currentImageIndex = index;
    lightboxImage.src = images[index - 1].src;
    document.getElementById('caption').textContent = images[index - 1].alt;
}

function changeImage(step) {
    currentImageIndex += step;
    if (currentImageIndex < 1) {
        currentImageIndex = images.length;
    } else if (currentImageIndex > images.length) {
        currentImageIndex = 1;
    }
    setCurrentImage(currentImageIndex);
}


document.addEventListener('DOMContentLoaded', (event) => {
    positionArrows();
});

window.onresize = function(event) {
    positionArrows();
};

function positionArrows() {
    var lightboxWidth = document.querySelector('.lightbox').offsetWidth;
    var arrowSpacing = 5; // Spacing from edge
    var prevArrow = document.querySelector('.prev');
    var nextArrow = document.querySelector('.next');

    prevArrow.style.left = arrowSpacing + 'px';
    nextArrow.style.right = arrowSpacing + 'px';
}

// Initialize Hammer.js for the lightbox element
var lightboxElement = document.getElementById('lightbox');
var hammer = new Hammer(lightboxElement);

// Configure the swipe gesture with a tolerance for slightly angled swipes
hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 10, velocity: 0.2 });

// Handle swipe left and right events
hammer.on('swipeleft', function() {
    changeImage(1); // Swipe left to show the next image
});

hammer.on('swiperight', function() {
    changeImage(-1); // Swipe right to show the previous image
});
