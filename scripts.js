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

  const badgeItems = document.querySelectorAll(".badge-item");

  badgeItems.forEach(badge => {
    badge.addEventListener("click", () => {
      const isFlipped = badge.classList.contains("flipped");
  
      if(!isFlipped) {
        // 1) 当前徽章 => flipped
        badge.classList.add("flipped");
  
        // 2) 其余徽章 => others-fadeout + 动态 transform
        badgeItems.forEach(other => {
          if(other !== badge) {
            other.classList.add("others-fadeout");
  
            // 生成随机角度 & 距离
            const angle = Math.random() * 360;         // 0~360
            const dist = 150 + Math.random() * 100;    // 150~250 px
            // 换算成 x,y
            const rad = angle * (Math.PI / 180);
            const tx = dist * Math.cos(rad);
            const ty = dist * Math.sin(rad);
  
            // inline style: translate(tx,ty) scale(0.8)
            other.style.transform = `translate(${tx}px, ${ty}px) scale(0.8)`;
          }
        });
  
      } else {
        // 若再次点击同一个徽章 => 恢复
        badge.classList.remove("flipped");
        badgeItems.forEach(other => {
          other.classList.remove("others-fadeout");
          other.style.transform = "";  // 清空 inline transform
        });
      }
    });
  });

});

