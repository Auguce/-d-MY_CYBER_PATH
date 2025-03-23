document.addEventListener("DOMContentLoaded", () => {
  // 选取所有初始隐藏的卡片
  const cards = document.querySelectorAll(".slide-hide");

  // Intersection Observer 回调
  const onIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const card = entry.target;
        const direction = card.dataset.slide || "left";
        if (direction === "right") {
          card.classList.add("slide-in-right");
        } else {
          card.classList.add("slide-in-left");
        }
        // 移除初始隐藏
        card.classList.remove("slide-hide");
        // 不再重复监听
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

  // 对每张 "slide-hide" 卡片监听
  cards.forEach(card => observer.observe(card));
});
