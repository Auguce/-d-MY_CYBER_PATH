/*******************************************************
 * 0) DOM Ready
 *******************************************************/
document.addEventListener("DOMContentLoaded", () => {
  // 不再做 pageAbout/pageExp翻页
  // 只做 Swiper 初始化
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
    speed: 1200,
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

  // 初始化图片预览模态
  initGalleryPreview();

  // 初始化 pop-up 动画
  initPopUpAnimation();
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
 * 2) 去除上下翻页按钮逻辑
 *******************************************************/
/* 让arrow-down/arrow-up无效或直接删除
const btnToExp = document.getElementById("btn-to-experience");
const btnToAbout = document.getElementById("btn-to-about");
*/

/*******************************************************
 * 3) pop-up 动画逻辑 (IntersectionObserver)
 *******************************************************/
function initPopUpAnimation() {
  // 选出所有需要“弹出动画”的元素
  const popUpElems = document.querySelectorAll(".pop-up.hidden");

  // IntersectionObserver 配置
  const options = {
    root: null,        // viewport
    rootMargin: "0px",
    threshold: 0.1     // 超过10%可见度即触发
  };

  // 回调：当元素进入视窗时，把 .hidden 替换成 .show
  function onIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");
        entry.target.classList.add("show");
        // 一旦出现后，可取消观察，避免重复动画
        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(onIntersect, options);
  popUpElems.forEach(elem => {
    observer.observe(elem);
  });
}
