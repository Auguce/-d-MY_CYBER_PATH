/*******************************************************
 * 0) DOM Ready
 *******************************************************/
document.addEventListener("DOMContentLoaded", () => {
    // 先获取关键节点
    const pageAbout = document.getElementById("page-about");
    const pageExp = document.getElementById("page-experience");
    const mainTitle = document.getElementById("main-title");
  
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
      speed: 1200, // 再度放慢动画，帧率更平滑
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
  const mainTitle = document.getElementById("main-title");
  
  btnToExp?.addEventListener("click", () => {
    showExperiencePage();
  });
  btnToAbout?.addEventListener("click", () => {
    showAboutPage();
  });
  
  /**
   * 切换到体验(Experience)页面:
   *  - 隐藏 #page-about
   *  - 显示 #page-experience
   *  - 隐藏主标题(#main-title)
   */
  function showExperiencePage() {
    const pageAbout = document.getElementById("page-about");
    const pageExp = document.getElementById("page-experience");
  
    // 切换可见性
    pageAbout.classList.remove("visible-page");
    pageAbout.classList.add("not-visible");
    pageExp.classList.remove("not-visible");
    pageExp.classList.add("visible-page");
  
    // 隐藏主标题
    mainTitle?.classList.add("hidden-title");
  }
  
  /**
   * 切换回 About (page-about):
   *  - 隐藏 #page-experience
   *  - 显示 #page-about
   *  - 显示主标题(#main-title)
   */
  function showAboutPage() {
    const pageAbout = document.getElementById("page-about");
    const pageExp = document.getElementById("page-experience");
  
    pageExp.classList.remove("visible-page");
    pageExp.classList.add("not-visible");
    pageAbout.classList.remove("not-visible");
    pageAbout.classList.add("visible-page");
  
    // 恢复主标题
    mainTitle?.classList.remove("hidden-title");
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
      // 向下滚轮 -> showExperiencePage()
      showExperiencePage();
    } else {
      // 向上滚轮 -> showAboutPage()
      showAboutPage();
    }
  });
  */
  