document.addEventListener("DOMContentLoaded", () => {

  // 选取所有 "slide-hide" 卡片
  const cards = document.querySelectorAll(".slide-hide");

  // Intersection Observer 回调
  const onIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        // 如果进入可视区域
        const card = entry.target;
        // 根据 data-slide="left"/"right" 来选择动画
        const direction = card.dataset.slide || "left";
        if(direction === "right") {
          card.classList.add("slide-in-right");
        } else {
          card.classList.add("slide-in-left");
        }
        // 移除初始隐藏
        card.classList.remove("slide-hide");
        // 卡片进入视口后，不再重复观察
        observer.unobserve(card);
      }
    });
  };

  // 创建 Intersection Observer
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1 // 卡片10%进入视口就触发
  };
  const observer = new IntersectionObserver(onIntersect, options);

  // 对每个 slide-hide 卡片进行观察
  cards.forEach(card => {
    observer.observe(card);
  });

});
