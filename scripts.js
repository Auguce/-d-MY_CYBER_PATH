document.addEventListener("DOMContentLoaded", () => {

  // 1) About Me卡片: .intro-hide => .slide-in-top
  const aboutMe = document.getElementById("card-about");
  aboutMe.classList.add("slide-in-top");
  // 移除初始隐藏
  aboutMe.classList.remove("intro-hide");

  // 2) 其余卡片 通过 Intersection Observer 进入视口后 slide-in-left / slide-in-right
  const cards = document.querySelectorAll(".slide-hide");

  const onIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const card = entry.target;
        const direction = card.dataset.slide || "left";

        if(direction === "right") {
          card.classList.add("slide-in-right");
        } else {
          card.classList.add("slide-in-left");
        }

        card.classList.remove("slide-hide");
        observer.unobserve(card);
      }
    });
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver(onIntersect, options);
  cards.forEach(card => observer.observe(card));

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

  function initGalleryPreview() {
    const galleryImages = document.querySelectorAll(".scores-gallery img");
    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.textContent = img.alt;
      });
    });
  }
  initGalleryPreview();

  img.addEventListener("click", () => {
    modal.classList.add("active");
    modalImg.src = img.src;
    captionText.textContent = img.alt;
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === closeModal) {
      modal.classList.remove("active");
    }
  });
});