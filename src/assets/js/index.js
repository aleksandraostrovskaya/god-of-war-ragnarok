import '../styles/reset.scss';
import '../styles/mixins.scss';
import '../styles/style.scss';

import 'swiper/css';

import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';


const swiper = new Swiper('.swiper', {
  modules: [Navigation, Autoplay],

  direction: 'horizontal',
  slidesPerView: 2.5,
  spaceBetween: 20,
	centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});



