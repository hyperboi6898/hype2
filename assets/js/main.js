// Khởi tạo SwiperJS cho slideshow trang chủ
document.addEventListener('DOMContentLoaded', function () {
  const heroSlider = document.querySelector('.swiper-container');
  if (heroSlider) {
    const swiper = new Swiper(heroSlider, {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }
});
