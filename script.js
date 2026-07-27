// ============================================================
// REI'S VOYAGE TO THREE — QUICK CONFIGURATION
// Replace the placeholder values below when you are ready.
// ============================================================

const PARTY_DATE = new Date("2026-08-30T10:30:00-04:00");

// Paste your published Google Form URL here.
const GOOGLE_FORM_URL = "";

// Example: "sms:+16105551234"
// Keep the country code (+1 for the U.S.) and use numbers only.
const TEXT_MESSAGE_URL = "";

// Paste the public Amazon Wishlist URL here.
const AMAZON_WISHLIST_URL = "";

// Replace this only if you find a more precise Google Maps link.
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Charlestown+Township+Park+PA";

// ============================================================

const byId = (id) => document.getElementById(id);

function activateLink(id, url) {
  const el = byId(id);
  if (!el || !url) return;
  el.href = url;
  el.classList.remove("disabled-link");
  el.removeAttribute("aria-disabled");
}

activateLink("form-button", GOOGLE_FORM_URL);
activateLink("text-button", TEXT_MESSAGE_URL);
activateLink("wishlist-button", AMAZON_WISHLIST_URL);
activateLink("maps-button", GOOGLE_MAPS_URL);

document.querySelectorAll(".disabled-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
      alert("This link will be added soon.");
    }
  });
});

// Countdown
function updateCountdown() {
  const now = new Date();
  let distance = PARTY_DATE - now;

  if (distance <= 0) {
    byId("countdown").querySelector("h2").textContent =
      "Today's the day — happy birthday, Rei!";
    ["days", "hours", "minutes", "seconds"].forEach((id) => byId(id).textContent = "0");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  distance %= 1000 * 60 * 60 * 24;
  const hours = Math.floor(distance / (1000 * 60 * 60));
  distance %= 1000 * 60 * 60;
  const minutes = Math.floor(distance / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  byId("days").textContent = days;
  byId("hours").textContent = String(hours).padStart(2, "0");
  byId("minutes").textContent = String(minutes).padStart(2, "0");
  byId("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Mobile menu
const menuButton = document.querySelector(".menu-toggle");
const navLinks = byId("nav-links");

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

// Short opening animation
window.addEventListener("load", () => {
  setTimeout(() => byId("intro")?.classList.add("hidden"), 2200);
});
