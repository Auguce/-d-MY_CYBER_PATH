document.addEventListener("DOMContentLoaded", () => {

  // 1) About Me 卡片：添加向下滑入动画
  const aboutMe = document.getElementById("card-about");
  aboutMe.classList.add("slide-in-top");
  aboutMe.classList.remove("intro-hide");

  // 2) 其余卡片：使用 IntersectionObserver 触发左右滑入动画
  const cards = document.querySelectorAll(".slide-hide");
  const onIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const direction = card.dataset.slide || "left";
        if (direction === "right") {
          card.classList.add("slide-in-right");
        } else {
          card.classList.add("slide-in-left");
        }
        card.classList.remove("slide-hide");
        observer.unobserve(card);
      }
    });
  };
  const options = { root: null, rootMargin: "0px", threshold: 0.1 };
  const observer = new IntersectionObserver(onIntersect, options);
  cards.forEach(card => observer.observe(card));

  // 3) 徽章点击事件：点击的徽章添加 flipped（使其移到卡片内居中并翻转放大），其余徽章随机飞散淡出
  const badgeItems = document.querySelectorAll(".badge-item");
  badgeItems.forEach(badge => {
    badge.addEventListener("click", () => {
      const isFlipped = badge.classList.contains("flipped");
      if (!isFlipped) {
        // 将当前徽章设为翻转状态
        badge.classList.add("flipped");
        // 对其它徽章随机飞散淡出
        badgeItems.forEach(other => {
          if (other !== badge) {
            other.classList.add("others-fadeout");
            // 生成随机角度 (0 ~ 360) 和距离 (150~250 px)
            const angle = Math.random() * 360;
            const dist = 150 + Math.random() * 100;
            const rad = angle * (Math.PI / 180);
            const tx = dist * Math.cos(rad);
            const ty = dist * Math.sin(rad);
            // 设置其它徽章的 transform
            other.style.transform = `translate(${tx}px, ${ty}px) scale(0.8)`;
          }
        });
      } else {
        // 若再次点击当前徽章，则恢复所有徽章状态
        badge.classList.remove("flipped");
        badgeItems.forEach(other => {
          other.classList.remove("others-fadeout");
          other.style.transform = ""; // 清除 inline style
        });
      }
    });
  });

});
