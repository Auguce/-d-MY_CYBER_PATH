document.addEventListener("DOMContentLoaded", () => {

  // 选取所有要滚动弹出的元素
  const revealEls = document.querySelectorAll(".reveal");

  // 设置 IntersectionObserver
  const options = {
    threshold: 0.1 // 元素进入视口10%时触发
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        // 元素进入视口 => 加.scrolled
        entry.target.classList.add("scrolled");
        // 若只想触发一次, 加下面一行
        obs.unobserve(entry.target);
      }
    });
  }, options);

  // 将所有 .reveal 元素都监听
  revealEls.forEach(el => {
    observer.observe(el);
  });

});
