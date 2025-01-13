// Select the modal, modal image, and caption
const modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-content" id="modal-img">
    <div id="caption"></div>
`;
document.body.appendChild(modal);

const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeModal = modal.querySelector(".close");

// Add event listeners to all images in the scores gallery
const galleryImages = document.querySelectorAll(".scores-gallery img");
galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
        modal.style.display = "block"; // Show modal
        modalImg.src = img.src; // Set modal image source
        captionText.textContent = img.alt; // Set caption text
    });
});

// Close the modal when the close button is clicked
closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal
});

// Close the modal when clicking outside the image
modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === closeModal) {
        modal.style.display = "none"; // Hide modal
    }
});
