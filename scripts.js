/*******************************************************
 * 0) DOM Ready
 *******************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const pageAbout = document.getElementById("page-about");
  const pageExp = document.getElementById("page-experience");

  // 初始状态: 显示 About Me(visible-page), 不显示 Experience(not-visible)
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

    // speed 默认300~600，这里改到1200让横向翻页也更平滑
    speed: 1200,

    // 其它配置
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

// 关闭模态
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === closeModal) {
    modal.style.display = "none";
  }
});

/*******************************************************
 * 2) 上下翻页按钮逻辑（并行动画）
 *******************************************************/
const btnToExp = document.getElementById("btn-to-experience");
const btnToAbout = document.getElementById("btn-to-about");

btnToExp?.addEventListener("click", () => {
  showExperiencePage();
});
btnToAbout?.addEventListener("click", () => {
  showAboutPage();
});

/**
 * 同时让 #page-about 退出 & #page-experience 进入
 */
function showExperiencePage() {
  const pageAbout = document.getElementById("page-about");
  const pageExp = document.getElementById("page-experience");

  // 让Experience进入(从 transform: translateY(5%), opacity:0.7 到 0,1)
  pageExp.classList.remove("not-visible");
  pageExp.classList.add("visible-page");

  // 让About退出(从 transform:0, opacity:1 到 -5%,0.7)
  pageAbout.classList.remove("visible-page");
  pageAbout.classList.add("not-visible");
}

/**
 * 同时让 #page-experience 退出 & #page-about 进入
 */
function showAboutPage() {
  const pageAbout = document.getElementById("page-about");
  const pageExp = document.getElementById("page-experience");

  // 让About进入
  pageAbout.classList.remove("not-visible");
  pageAbout.classList.add("visible-page");

  // 让Experience退出
  pageExp.classList.remove("visible-page");
  pageExp.classList.add("not-visible");
}

/*******************************************************
 * 3) 滚轮事件(可选) - 暂时注释
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
