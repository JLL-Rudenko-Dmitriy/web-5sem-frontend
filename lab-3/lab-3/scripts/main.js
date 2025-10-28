import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },

  breakpoints: {
    0:    { slidesPerView: 1, spaceBetween: 12, },
    768:  { slidesPerView: 1, spaceBetween: 16, },
    1200: { slidesPerView: 3, spaceBetween: 5, },
  },
});