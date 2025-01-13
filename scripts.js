/*******************************************************
 * 1) 图片放大预览逻辑（保留原先需求）
 *******************************************************/

// 创建一个 modal 容器并追加到 body
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

// 获取 scores-gallery 中所有 img，并为其添加点击放大逻辑
const galleryImages = document.querySelectorAll(".scores-gallery img");
galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
        modal.style.display = "block";       // 显示 modal
        modalImg.src = img.src;             // 设置图片来源
        captionText.textContent = img.alt;   // 显示图片描述
    });
});

// 点击关闭按钮，隐藏 modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// 点击 modal 背景关闭
modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === closeModal) {
        modal.style.display = "none";
    }
});

/*******************************************************
 * 2) Swiper 初始化逻辑
 *******************************************************/
window.addEventListener("DOMContentLoaded", () => {
    // 等待 DOM 加载完毕后初始化 Swiper
    const swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        keyboard: {
          enabled: true, // 允许键盘导航
        },
        // 视具体需求可加更多配置
        // effect: 'slide' // 默认就是 slide，可改成 'fade', 'cube', 'coverflow' 等
    });
});
