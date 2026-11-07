
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';


import '@fontsource/poppins/600.css';


import './style.css';


const title = document.querySelector('.card-title');
const text = title.textContent.trim();


title.setAttribute('aria-label', text);
title.textContent = '';

let index = 0;
const words = text.split(' ');

words.forEach((w, wi) => {
  const wordSpan = document.createElement('span');
  wordSpan.className = 'word';
  wordSpan.setAttribute('aria-hidden', 'true');

  [...w].forEach((ch) => {
    const letterSpan = document.createElement('span');
    letterSpan.className = 'letter';
    letterSpan.textContent = ch;
    letterSpan.style.setProperty('--i', index++);
    wordSpan.appendChild(letterSpan);
  });

  title.appendChild(wordSpan);

  if (wi < words.length - 1) {
    title.appendChild(document.createTextNode(' '));
  }
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;


  const text = `*New Contact Form Message*\n\n` +
    `*Name:* ${name}\n` +
    `*Email:* ${email}\n` +
    `*Phone:* ${phone || 'N/A'}\n\n` +
    `*Message:*\n${message}`;
 
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  window.open(url, '_blank');
});
