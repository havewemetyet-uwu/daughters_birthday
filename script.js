const PARTY_DATE = new Date("2026-08-30T10:30:00-04:00");

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSctMRaAeqamwpqPuujU9UXHMcq75nigv0XMRonyhX6aS77C2g/viewform?usp=sharing&ouid=117808659673557743123";

const TEXT_MESSAGE_URL = "sms:+4844479344";

const AMAZON_WISHLIST_URL =
  "https://www.amazon.com/registries/gl/guest-view/2M1QA4N4GXYK2?ref_=cm_sw_r_cp_ud_ggr-subnav-share_F1T2PF900QRPXZ183YT4";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Charlestown+Township+Park+Phoenixville+PA";

const byId = (id) => document.getElementById(id);

function activateLink(id, url) {
  const element = byId(id);
  if (!element || !url) return;

  element.href = url;
  element.classList.remove("disabled-link");
  element.removeAttribute("aria-disabled");
}

activateLink("form-button", GOOGLE_FORM_URL);
activateLink("text-button", TEXT_MESSAGE_URL);
activateLink("wishlist-button", AMAZON_WISHLIST_URL);
activateLink("maps-button", GOOGLE_MAPS_URL);

document.querySelectorAll(".disabled-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!link.href || link.getAttribute("href") === "#") {
      event.preventDefault();
      alert("This link will be added soon.");
    }
  });
});

const photo = byId("rei-photo");
const placeholder = byId("photo-placeholder");

function showMainPhoto() {
  if (photo) photo.style.display = "block";
  if (placeholder) placeholder.style.display = "none";
}

function showMainPlaceholder() {
  if (photo) photo.style.display = "none";
  if (placeholder) placeholder.style.display = "flex";
}

if (photo && placeholder) {
  if (photo.complete && photo.naturalWidth > 0) {
    showMainPhoto();
  } else {
    photo.addEventListener("load", showMainPhoto);
    photo.addEventListener("error", showMainPlaceholder);
  }
}

function updateCountdown() {
  let distance = PARTY_DATE - new Date();

  if (distance <= 0) {
    const heading = document.querySelector("#countdown h2");
    if (heading) heading.textContent = "Today's the day — happy birthday, Rei!";

    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      const element = byId(id);
      if (element) element.textContent = "0";
    });
    return;
  }

  const days = Math.floor(distance / 86400000);
  distance %= 86400000;
  const hours = Math.floor(distance / 3600000);
  distance %= 3600000;
  const minutes = Math.floor(distance / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  if (byId("days")) byId("days").textContent = days;
  if (byId("hours")) byId("hours").textContent = String(hours).padStart(2, "0");
  if (byId("minutes")) byId("minutes").textContent = String(minutes).padStart(2, "0");
  if (byId("seconds")) byId("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const menu = document.querySelector(".menu-toggle");
const navigation = byId("nav-links");

if (menu && navigation) {
  menu.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    });
  });
}


const themeToggle = byId("theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(isNight) {
  document.body.classList.toggle("night-mode", isNight);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isNight));
    themeToggle.setAttribute(
      "aria-label",
      isNight ? "Switch to day mode" : "Switch to night mode"
    );
    themeToggle.title = isNight
      ? "Tap the moon to return to day mode"
      : "Tap the sun to switch to night mode";
  }

  if (themeColor) {
    themeColor.setAttribute("content", isNight ? "#071426" : "#087d9b");
  }
}

const savedTheme = localStorage.getItem("reiInvitationTheme");
const prefersNight = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme === "night" : prefersNight);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isNight = !document.body.classList.contains("night-mode");
    applyTheme(isNight);
    localStorage.setItem("reiInvitationTheme", isNight ? "night" : "day");
  });
}


/* Sparkling shell interaction: hover on desktop, tap on mobile, keyboard friendly. */
const sparkleShells = document.querySelectorAll(".sparkle-shell");

function sparkleShell(shell) {
  if (!shell || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  shell.classList.remove("is-sparkling");
  void shell.offsetWidth;
  shell.classList.add("is-sparkling");

  for (let index = 0; index < 7; index += 1) {
    const spark = document.createElement("span");
    spark.className = "shell-spark";
    spark.style.setProperty("--spark-angle", `${index * (360 / 7)}deg`);
    spark.style.animationDelay = `${index * 0.025}s`;
    shell.appendChild(spark);
    spark.addEventListener("animationend", () => spark.remove(), { once: true });
  }

  window.setTimeout(() => shell.classList.remove("is-sparkling"), 760);
}

sparkleShells.forEach((shell) => {
  shell.addEventListener("pointerenter", () => sparkleShell(shell));
  shell.addEventListener("click", () => sparkleShell(shell));
  shell.addEventListener("focus", () => sparkleShell(shell));
});


/* Treasure chest reveal */
const treasureChest = byId("treasure-chest");
const treasureReveal = byId("treasure-reveal");

if (treasureChest && treasureReveal) {
  treasureChest.addEventListener("click", () => {
    const isOpen = treasureChest.getAttribute("aria-expanded") === "true";
    treasureChest.setAttribute("aria-expanded", String(!isOpen));
    treasureChest.classList.toggle("is-open", !isOpen);
    treasureReveal.hidden = isOpen;

    const label = treasureChest.querySelector(".chest-label");
    if (label) {
      label.textContent = isOpen
        ? "Tap to open Rei's treasure chest"
        : "Tap to close Rei's treasure chest";
    }

    if (!isOpen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      treasureReveal.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}


window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = byId("intro");
    if (intro) intro.classList.add("hidden");
  }, 2200);
});
