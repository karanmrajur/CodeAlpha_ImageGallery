// ========================================
// SELECT ELEMENTS
// ========================================

const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


// ========================================
// VARIABLES
// ========================================

let visibleImages = [];
let currentIndex = 0;


// ========================================
// GET ALL IMAGES
// ========================================

function updateVisibleImages() {

    visibleImages = [];

    galleryItems.forEach((item) => {

        if (item.style.display !== "none") {

            const image = item.querySelector("img");

            visibleImages.push(image);

        }

    });
}


// ========================================
// OPEN LIGHTBOX
// ========================================

function openLightbox(index) {

    updateVisibleImages();

    currentIndex = index;

    const selectedImage = visibleImages[currentIndex];

    if (selectedImage) {

        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt;

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";
    }
}


// ========================================
// CLOSE LIGHTBOX
// ========================================

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";
}


// ========================================
// SHOW PREVIOUS IMAGE
// ========================================

function showPreviousImage() {

    if (visibleImages.length === 0) {
        return;
    }

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    lightboxImage.src = visibleImages[currentIndex].src;
    lightboxImage.alt = visibleImages[currentIndex].alt;
}


// ========================================
// SHOW NEXT IMAGE
// ========================================

function showNextImage() {

    if (visibleImages.length === 0) {
        return;
    }

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    lightboxImage.src = visibleImages[currentIndex].src;
    lightboxImage.alt = visibleImages[currentIndex].alt;
}


// ========================================
// IMAGE CLICK
// ========================================

galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        updateVisibleImages();

        const image = item.querySelector("img");

        currentIndex = visibleImages.indexOf(image);

        openLightbox(currentIndex);

    });

});


// ========================================
// FILTER BUTTONS
// ========================================

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.category;


        // Remove active class from all buttons

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });


        // Add active class to clicked button

        button.classList.add("active");


        // Show / hide images

        galleryItems.forEach((item) => {

            const itemCategory = item.dataset.category;

            if (
                selectedCategory === "all" ||
                itemCategory === selectedCategory
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});


// ========================================
// BUTTON EVENTS
// ========================================

closeBtn.addEventListener("click", closeLightbox);

prevBtn.addEventListener("click", showPreviousImage);

nextBtn.addEventListener("click", showNextImage);


// ========================================
// CLOSE WHEN CLICKING BACKGROUND
// ========================================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }


    // Escape = Close

    if (event.key === "Escape") {

        closeLightbox();

    }


    // Left Arrow = Previous

    if (event.key === "ArrowLeft") {

        showPreviousImage();

    }


    // Right Arrow = Next

    if (event.key === "ArrowRight") {

        showNextImage();

    }

});