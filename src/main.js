/** @format */

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "@fontsource/poppins/600.css";
import "./style.css";
import { Dropdown } from "bootstrap/dist/js/bootstrap.bundle.min.js";

// ---------------------NAVBAR SECTION ----------------------------------
const navItems = [
	{ label: "Home", href: "#home" },
	{ label: "About", href: "#about" },
	{ label: "Services", href: "#services" },
	{ label: "Contact", href: "#contact" },
	{
		label: "Short Contents",
		children: [
			{ label: "3D Motion", href: "#" },
			{ label: "Sound Graphics", href: "#" },
		],
	},
];

const navList = document.getElementById("navLinks");

navItems.forEach((item) => {
	const li = document.createElement("li");

	if (item.children) {
		// Dropdown wala item
		li.className = "nav-item dropdown";

		const toggle = document.createElement("a");
		toggle.className = "nav-link ripple dropdown-toggle";
		toggle.href = "#";
		toggle.role = "button";
		toggle.textContent = item.label;
		toggle.setAttribute("data-bs-toggle", "dropdown");
		toggle.setAttribute("aria-expanded", "false");

		const menu = document.createElement("ul");
		menu.className = "dropdown-menu";

		item.children.forEach((child) => {
			const childLi = document.createElement("li");
			const childLink = document.createElement("a");
			childLink.className = "dropdown-item";
			childLink.href = child.href;
			childLink.textContent = child.label;
			childLi.appendChild(childLink);
			menu.appendChild(childLi);
		});

		li.append(toggle, menu);
	} else {
		// Normal link
		li.className = "nav-item";

		const link = document.createElement("a");
		link.className = "nav-link ripple";
		link.href = item.href;
		link.textContent = item.label;
		li.appendChild(link);
	}

	navList.appendChild(li);
});

// -------------- RIPPLE EFFECT on NAVBAR-----------------------------

document.addEventListener("mouseover", (e) => {
	const el = e.target.closest(".ripple");
	if (!el) return;

	const rect = el.getBoundingClientRect();
	const size = Math.max(rect.width, rect.height);

	const circle = document.createElement("span");
	circle.className = "ripple-circle";
	circle.style.width = circle.style.height = `${size}px`;
	circle.style.left = `${e.clientX - rect.left - size / 2}px`;
	circle.style.top = `${e.clientY - rect.top - size / 2}px`;

	el.appendChild(circle);
	circle.addEventListener("animationend", () => circle.remove());
});

// ================ HERO VIDEO SECTION =======================================

const videoSlot = {
	video: "/videoEditPro1.mp4",
	poster: "/videos/poster.jpg",
	title: "Where Raw Footage Becomes Magic.",
	highlight: "Cuts, color, sound, and motion",
	desc: ", blended into stories that hold attention from the first second to the last.",
	buttonText: "View Our Work",
};

const videoSection = document.getElementById("videoCard");

videoSection.innerHTML = `
  <video class="video-bg" autoplay muted loop playsinline poster="${videoSlot.poster}">
    <source src="${videoSlot.video}" type="video/mp4">
  </video>

  <div class="card-img-overlay video-blur d-flex flex-column justify-content-center">
    <h5 class="card-title">${videoSlot.title}</h5>
    <p class="card-text">
      <strong class="subtext text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">${videoSlot.highlight}</strong>${videoSlot.desc}
    </p>
    <button class="btn glow-btn">${videoSlot.buttonText}</button>
  </div>
`;

// =========== HERO SECTION ANIMATION ==============================

const title = document.querySelector(".card-title");
const text = title.textContent.trim();

title.setAttribute("aria-label", text);
title.textContent = "";

let index = 0;
const words = text.split(" ");

words.forEach((w, wi) => {
	const wordSpan = document.createElement("span");
	wordSpan.className = "word";
	wordSpan.setAttribute("aria-hidden", "true");

	[...w].forEach((ch) => {
		const letterSpan = document.createElement("span");
		letterSpan.className = "letter";
		letterSpan.textContent = ch;
		letterSpan.style.setProperty("--i", index++);
		wordSpan.appendChild(letterSpan);
	});

	title.appendChild(wordSpan);

	if (wi < words.length - 1) {
		title.appendChild(document.createTextNode(" "));
	}
});

// ================== SERVICES GRID SECTION ===========================

const services = [
  { Title: "Video Editing", Desc: "Clean cuts and smooth transitions for ads, reels, and films.", img: "/videoEdit1.jpg", icon: "bi-camera-reels" },
  { Title: "Motion Graphics", Desc: "Animated titles, logos, and effects that grab attention.", img: "/videoEdit2.jpg", icon: "bi-stars" },
  { Title: "Color Grading", Desc: "Cinematic color that gives your video a premium look.", img: "/videoEdit3.jpg", icon: "bi-palette" },
  { Title: "Sound Design", Desc: "Music, sound effects, and clear audio mixing.", img: "/videoEdit4.jpg", icon: "bi-music-note-beamed" },
  { Title: "Social Media Content", Desc: "Vertical videos made for Instagram, TikTok, and YouTube Shorts.", img: "/videoEdit5.jpg", icon: "bi-phone" },
  { Title: "Fast Delivery", Desc: "Quick turnaround without compromising quality.", img: "/videoEdit6.jpg", icon: "bi-lightning-charge" },
];

const servicesRow = document.getElementById("servicesRow");

servicesRow.innerHTML = services
  .map(
    (item) => `
  <div class="col-12 col-md-6 col-lg-4">
    <div class="service-card h-100 text-center p-4">
      <img src="${item.img}" alt="${item.Title}">
      <i class="bi ${item.icon} tech-icon"></i>
      <h5 class="card-titleGrid mt-3">${item.Title}</h5>
      <p class="card-textGrid">${item.Desc}</p>
    </div>
  </div>`
  )
  .join("");



// ======================= CONTACT FORM =================================

document.getElementById("contactForm").addEventListener("submit", function (e) {
	e.preventDefault();

	const name = document.getElementById("name").value.trim();
	const email = document.getElementById("email").value.trim();
	const phone = document.getElementById("phone").value.trim();
	const message = document.getElementById("message").value.trim();

	const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

	const text =
		`*New Contact Form Message*\n\n` +
		`*Name:* ${name}\n` +
		`*Email:* ${email}\n` +
		`*Phone:* ${phone || "N/A"}\n\n` +
		`*Message:*\n${message}`;

	const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

	window.open(url, "_blank");
});


document.querySelectorAll("video").forEach((v) => {
  v.muted = true;
  v.play().catch((err) => console.log("Video error:", err.name, err.message));
});