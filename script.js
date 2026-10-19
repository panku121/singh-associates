const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('inquiry-form')?.addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('form-note').textContent = 'Thank you. Your enquiry has been noted — connect this form to your preferred email or CRM service.';
  event.target.reset();
});
