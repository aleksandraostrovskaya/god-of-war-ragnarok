import '../styles/reset.scss';
import '../styles/mixins.scss';
import '../styles/style.scss';

import 'swiper/css';

import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { languages } from './languages'

// Swiper

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

// Menu

const menuBtn = document.querySelector('.header-menu__button');
const header = document.querySelector('.header');

menuBtn.addEventListener('click', () => {
  header.classList.toggle('opened');
});

// Scroll to sections

const menuLink = document.querySelectorAll('.menu-link');
menuLink.forEach(link => link.addEventListener('click', scrollToSection));

function scrollToSection(e) {
  e.preventDefault();

  const href = e.currentTarget.getAttribute('href');

  if (!href && !href.startsWith('#')) return;

  const section = href.slice(1);
  const top = document.getElementById(section)?.offsetTop || 0;

  window.scrollTo({ top, behavior: 'smooth' });
}

// Timer

const deadline = '2025-10-22';

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date()),
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    hours = Math.floor((t / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((t / 1000 / 60) % 60),
    seconds = Math.floor((t / 1000) % 60);

  return {
    total: t,
    days,
    hours,
    minutes,
    seconds,
  };
}

function setClock(selector, endtime) {
  const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds');

  const timeInterval = setInterval(updateClock, 1000);

  function updateClock() {
    const t = getTimeRemaining(endtime);

    days.innerHTML = t.days;
    hours.innerHTML = t.hours;
    minutes.innerHTML = t.minutes;
    seconds.innerHTML = t.seconds;

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }
}

setClock('.header-timer__values', deadline);

// Video

const video = document.querySelector('#video');
const playBtn = document.querySelector('.video-btn');
let isPlay = false;

function playVideo(e) {
  isPlay = !isPlay;

  const info = e.target.parentElement;
  info.classList.toggle('hidden', isPlay);
  e.target.innerText = isPlay ? 'Pause' : 'Play';
  isPlay ? video.play() : video.pause();
}

playBtn.addEventListener('click', playVideo);

// Switch

const checkboxes = {
  requirements: ['minimum', 'recommended'],
  versions: ['standart', 'limited'],
};

const checkboxButtons = document.querySelectorAll('.checkbox');

checkboxButtons.forEach(button =>
  button.addEventListener('click', handleCheckbox)
);

function handleCheckbox({ currentTarget: { checked, name } }) {
  const value = checkboxes[name][Number(checked)];

  const list = document.getElementById(value);

  const tabs = document.querySelectorAll(`[data-${name}]`);

  const siblings = list.parentElement.children;

  for (const item of siblings) item.classList.remove('active');
  list.classList.add('active');

  for (const tab of tabs) tab.classList.toggle('active');
}

// FAQ

const faqItem = document.querySelectorAll('.faq-item');

faqItem.forEach(item =>
  item.addEventListener('click', ({ currentTarget }) => {
    currentTarget.classList.toggle('opened');
    const isOpened = currentTarget.classList.contains('opened');

    const height = currentTarget.querySelector('p').clientHeight;

    const сontent = currentTarget.querySelector('.faq-item__content');

    сontent.style.height = `${isOpened ? height : 0}px`
  })
);

// Section animation

const sections = document.querySelectorAll(".section");

window.addEventListener('scroll', handleScroll)

function handleScroll () {
  const { scrollY, innerHeight } = window;
  sections.forEach((sec) => {
    if (scrollY > sec.offsetTop - innerHeight / 1.5) sec.classList.remove('hidden');
  });
};

// Languages

const language = document.querySelectorAll('.language')

language.forEach(item => item.addEventListener('click', toggleLanguage))

function toggleLanguage ({target}) {
  const {lang} = target.dataset

  if (!lang) return 

  localStorage.setItem('lang', lang)

  setText()
}

function setText () {
  const lang = localStorage.getItem('lang') || 'en'
  const currentLang = document.querySelectorAll('.current-lang')

  const content = languages[lang]

  Object.entries(content).forEach(([key, value]) => {
    const items = document.querySelectorAll( `[data-text="${key}"]`)
    items.forEach(item => item.innerHTML = value)
  })

  currentLang.forEach(item => item.innerText = lang === 'en' ? 'English' : 'Ukrainian')
  
}

setText()