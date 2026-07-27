const PARTY_DATE = new Date("2026-08-30T10:30:00-04:00");

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSctMRaAeqamwpqPuujU9UXHMcq75nigv0XMRonyhX6aS77C2g/viewform?usp=sharing&ouid=117808659673557743123";

const TEXT_MESSAGE_URL = "sms:+4844479344";

const AMAZON_WISHLIST_URL =
  "https://www.amazon.com/registries/gl/guest-view/2M1QA4N4GXYK2?ref_=cm_sw_r_cp_ud_ggr-subnav-share_F1T2PF900QRPXZ183YT4";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Charlestown+Township+Park+Phoenixville+PA";

const byId = (id) => document.getElementById(id);

/**
 * Activates a button when a URL has been provided.
 */
function activateLink(id, url) {
  const element = byId(id);

  if (!element || !url) {
    return;
  }

  element.href = url;
  element.classList.remove("disabled-link");
  element.removeAttribute("aria-disabled");
}

activateLink("form-button", GOOGLE_FORM_URL);
activateLink("text-button", TEXT_MESSAGE_URL);
activateLink("wishlist-button", AMAZON_WISHLIST_URL);
activateLink("maps-button", GOOGLE_MAPS_URL);

/**
 * Prevents placeholder buttons from navigating.
 */
document.querySelectorAll(".disabled-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!link.href || link.getAttribute("href") === "#") {
      event.preventDefault();
      alert("This link will be added soon.");
    }
  });
});

/**
 * Main photo handling.
 *
 * The complete/naturalWidth check fixes the issue where the image loads
 * before JavaScript attaches the load event listener.
 */
const photo = byId("rei-photo");
const placeholder = byId("photo-placeholder");

function showMainPhoto() {
  if (photo) {
    photo.style.display = "block";
  }

  if (placeholder) {
    placeholder.style.display = "none";
  }
}

function showMainPlaceholder() {
  if (photo) {
    photo.style.display = "none";
  }

  if (placeholder) {
    placeholder.style.display = "flex";
  }
}

if (photo && placeholder) {
  if (photo.complete && photo.naturalWidth > 0) {
    showMainPhoto();
  } else {
    photo.addEventListener("load", showMainPhoto);
    photo.addEventListener("error", showMainPlaceholder);
  }
}

/**
 * Gallery photo handling.
 */
document.querySelectorAll(".gallery-grid figure").forEach((figure) => {
  const image = figure.querySelector("img");
  const galleryPlaceholder = figure.querySelector("div");

  if (!image || !galleryPlaceholder) {
    return;
  }

  function showGalleryImage() {
    image.style.display = "block";
    galleryPlaceholder.style.display = "none";
  }

  function showGalleryPlaceholder() {
    image.style.display = "none";
    galleryPlaceholder.style.display = "flex";
  }

  if (image.complete && image.naturalWidth > 0) {
    showGalleryImage();
  } else {
    image.addEventListener("load", showGalleryImage);
    image.addEventListener("error", showGalleryPlaceholder);
  }
});

/**
 * Countdown timer.
 */
function updateCountdown() {
  let distance = PARTY_DATE - new Date();

  if (distance <= 0) {
    const countdownTitle = document.querySelector("#countdown h2");

    if (countdownTitle) {
      countdownTitle.textContent =
        "Today's the day — happy birthday, Rei!";
    }

    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      const element = byId(id);

      if (element) {
        element.textContent = "0";
      }
    });

    return;
  }

  const days = Math.floor(distance / 86400000);
  distance %= 86400000;

  const hours = Math.floor(distance / 3600000);
  distance %= 3600000;

  const minutes = Math.floor(distance / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  if (byId("days")) {
    byId("days").textContent = days;
  }

  if (byId("hours")) {
    byId("hours").textContent = String(hours).padStart(2, "0");
  }

  if (byId("minutes")) {
    byId("minutes").textContent = String(minutes).padStart(2, "0");
  }

  if (byId("seconds")) {
    byId("seconds").textContent = String(seconds).padStart(2, "0");
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

/**
 * Mobile navigation.
 */
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

/**
 * Opening animation.
 */
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = byId("intro");

    if (intro) {
      intro.classList.add("hidden");
    }
  }, 2200);
});
