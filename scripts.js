document.addEventListener("DOMContentLoaded", () => {
    // 初始状态: About Me 可见, Experience 不可见
    const pageAbout = document.getElementById("page-about");
    const pageExp = document.getElementById("page-experience");
  
    pageAbout.classList.add("visible-page");
    pageExp.classList.add("not-visible");
  
    // 初始化 Swiper（coverflow），速度减半
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
      speed: 600, /* 动画速度更慢 */
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
   * 图片放大预览
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
   * 上下翻页按钮逻辑
   *******************************************************/
  const btnToExp = document.getElementById("btn-to-experience");
  const btnToAbout = document.getElementById("btn-to-about");
  
  btnToExp?.addEventListener("click", () => {
    showExperiencePage();
  });
  btnToAbout?.addEventListener("click", () => {
    showAboutPage();
  });
  
  function showExperiencePage() {
    const pageAbout = document.getElementById("page-about");
    const pageExp = document.getElementById("page-experience");
  
    pageAbout.classList.remove("visible-page");
    pageAbout.classList.add("not-visible");
  
    pageExp.classList.remove("not-visible");
    pageExp.classList.add("visible-page");
  }
  
  function showAboutPage() {
    const pageAbout = document.getElementById("page-about");
    const pageExp = document.getElementById("page-experience");
  
    pageExp.classList.remove("visible-page");
    pageExp.classList.add("not-visible");
  
    pageAbout.classList.remove("not-visible");
    pageAbout.classList.add("visible-page");
  }
  
  /*******************************************************
   * 滚轮事件(可选) - 已注释
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
  