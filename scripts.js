/*******************************************************
 * 0) DOM 就绪后的一些初始设置
 *******************************************************/
document.addEventListener("DOMContentLoaded", () => {
    // 初始状态: About Me 可见, Experience 不可见
    const pageAbout = document.getElementById("page-about");
    const pageExp = document.getElementById("page-experience");
  
    pageAbout.classList.add("visible-page");
    pageExp.classList.add("not-visible");
  
    // 初始化 Swiper
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
      // 将翻页速度调为600ms，比默认慢约50%
      speed: 600,
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
   * 1) 图片放大预览
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
   * 2) 上下翻页按钮逻辑
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
   * 3) 监听滚轮事件(可选) - 暂时注释掉
   *******************************************************/
  /*
  let scrollTimeout = null;
  window.addEventListener("wheel", (e) => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
    }, 1200);
  
    // e.deltaY > 0 表示向下滚动
    if (e.deltaY > 0) {
      showExperiencePage();
    } else {
      showAboutPage();
    }
  });
  */
  