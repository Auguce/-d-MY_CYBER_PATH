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
      // 如果已经flipped，点击可恢复
      const isFlipped = badge.classList.contains("flipped");
      
      if(!isFlipped){
        // 1) 当前徽章加 flipped
        badge.classList.add("flipped");
        // 2) 其余徽章 => others-fadeout
        badgeItems.forEach(other => {
          if(other !== badge) {
            other.classList.add("others-fadeout");
          }
        });
      } else {
        // 如果已flipped, 再点一次可反转回去
        badge.classList.remove("flipped");
        // 取消其他徽章 fadeout
        badgeItems.forEach(other => {
          other.classList.remove("others-fadeout");
        });
      }
    });
  });

});

