// ===== Год в подвале =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Шапка при скролле =====
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll);
onScroll();

// ===== Мобильное меню =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('active');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('active');
  });
});

// ===== Форма бронирования =====
const form = document.getElementById('bookingForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const phone = data.get('phone');
  const checkin = data.get('checkin');
  const checkout = data.get('checkout');
  const guests = data.get('guests');
  const comment = data.get('comment') || '—';

  // Проверка дат
  if (new Date(checkout) <= new Date(checkin)) {
    note.textContent = 'Дата выезда должна быть позже даты заезда.';
    note.style.color = '#ff8a8a';
    return;
  }

  // Формируем сообщение для WhatsApp
  const text = encodeURIComponent(
    `Заявка на бронирование HaskiHaus%0A` +
    `Имя: ${name}%0A` +
    `Телефон: ${phone}%0A` +
    `Заезд: ${checkin}%0A` +
    `Выезд: ${checkout}%0A` +
    `Гостей: ${guests}%0A` +
    `Комментарий: ${comment}`
  );

  note.style.color = '#c9a36a';
  note.textContent = 'Открываем WhatsApp с готовой заявкой…';
  window.open(`https://wa.me/79504729999?text=${text}`, '_blank');

  setTimeout(() => {
    note.textContent = 'Если WhatsApp не открылся — позвоните: +7 (950) 472-99-99';
  }, 1500);
});