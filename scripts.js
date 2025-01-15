/*******************************************************
 * 0) DOM Ready
 *******************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const pageAbout = document.getElementById("page-about");
  const pageExp = document.getElementById("page-experience");
  // 不再需要单独操作标题
  // const mainTitle = document.getElementById("main-title");

  // 初始状态: About Me 可见, Experience 不可见
  pageAbout.classList.add("visible-page");
  pageExp.classList.add("not-visible");

  // 初始化 Swiper：Coverflow + 放慢速度
  const swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: -100,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: false,
    speed: 1200, // 动画速度
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
    },
  });
});

/*******************************************************
 * 1) 图片放大预览 (Modal)
 *******************************************************/
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

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === closeModal) {
    modal.style.display = "none";
  }
});

/*******************************************************
 * 2) 上下翻页按钮逻辑 (同时进行翻页, 不隐藏标题)
 *******************************************************/
const btnToExp = document.getElementById("btn-to-experience");
const btnToAbout = document.getElementById("btn-to-about");

btnToExp?.addEventListener("click", showExperiencePage);
btnToAbout?.addEventListener("click", showAboutPage);

/**
 * 切换到 Experience 页面 (同时进行动画)：
 *  - pageAbout: visible -> not-visible
 *  - pageExp: not-visible -> visible
 */
function showExperiencePage() {
  const pageAbout = document.getElementById("page-about");
  const pageExp = document.getElementById("page-experience");

  pageAbout.classList.remove("visible-page");
  pageAbout.classList.add("not-visible");

  pageExp.classList.remove("not-visible");
  pageExp.classList.add("visible-page");
}

/**
 * 切换回 About Me 页面 (同时进行动画)：
 *  - pageExp: visible -> not-visible
 *  - pageAbout: not-visible -> visible
 */
function showAboutPage() {
  const pageExp = document.getElementById("page-experience");
  const pageAbout = document.getElementById("page-about");

  pageExp.classList.remove("visible-page");
  pageExp.classList.add("not-visible");

  pageAbout.classList.remove("not-visible");
  pageAbout.classList.add("visible-page");
}

/*******************************************************
 * 3) 滚轮事件(可选) - 注释
 *******************************************************/
/*
let scrollTimeout = null;
window.addEventListener("wheel", (e) => {
  if (scrollTimeout) return;
  scrollTimeout = setTimeout(() => {
    scrollTimeout = null;
  }, 1200);

  if (e.deltaY > 0) {
    showExperiencePage();
  } else {
    showAboutPage();
  }
});
*/
