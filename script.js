
function expandCircle() {
    var circle = document.getElementById("circle");
    var menu = document.getElementById("menu");
    circle.classList.toggle("expanded");
    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        menu.classList.add("visible");
    } else {
        menu.classList.remove("visible");
        menu.classList.add("hidden");
    }
}

let currentImageIndex = 0;
const images = document.querySelectorAll('.gallery img');
const lightboxImage = document.getElementById('lightbox-image');

function openLightbox() {
    var lightbox = document.getElementById('lightbox');
   // lightbox.style.display = 'flex'; // This line may be unnecessary as the next line sets the display to 'block'
    document.getElementById('lightbox').style.display = 'flex';
    
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
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
