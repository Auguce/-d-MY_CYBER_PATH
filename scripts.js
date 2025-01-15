/*******************************************************
 * 0) DOM Ready
 *******************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const pageAbout = document.getElementById("page-about");
  const pageExp = document.getElementById("page-experience");
  // 不再需要单独操作 mainTitle
  // const mainTitle = document.getElementById("main-title");

  // 初始状态: 显示 About Me，不显示 Experience
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
    // speed 默认300~600，这里改到1200更慢
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
 * 2) 上下翻页按钮逻辑（先退出，再进入, 不隐藏标题）
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
 * 切换到 Experience 页面:
 *  1) 先让 #page-about 执行退出动画
 *  2) 等退出动画结束后，再让 #page-experience 进入
 *  注: 不再对 mainTitle 做 hidden-title 处理
 */
function showExperiencePage() {
  const pageAbout = document.getElementById("page-about");
  const pageExp = document.getElementById("page-experience");

  // 先让 AboutMe 退出
  pageAbout.classList.remove("visible-page");
  pageAbout.classList.add("not-visible");

  // 监听 AboutMe 的 transitionend
  function handleTransitionEnd(e) {
    if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
      pageAbout.removeEventListener('transitionend', handleTransitionEnd);

      // 现在 Experience 进入
      pageExp.classList.remove("not-visible");
      pageExp.classList.add("visible-page");
    }
  }
  pageAbout.addEventListener('transitionend', handleTransitionEnd);
}

/**
 * 切换回 About Me 页面:
 *  1) 先让 #page-experience 退出
 *  2) 等退出动画结束后，再让 #page-about 进入
 *  注: 不再对 mainTitle 做 hidden-title 处理
 */
function showAboutPage() {
  const pageAbout = document.getElementById("page-about");
  const pageExp = document.getElementById("page-experience");

  // 先让 Experience 退出
  pageExp.classList.remove("visible-page");
  pageExp.classList.add("not-visible");

  // 监听 Experience 的 transitionend
  function handleTransitionEnd(e) {
    if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
      pageExp.removeEventListener('transitionend', handleTransitionEnd);

      // 让 About Me 进入
      pageAbout.classList.remove("not-visible");
      pageAbout.classList.add("visible-page");
    }
  }
  pageExp.addEventListener('transitionend', handleTransitionEnd);
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
