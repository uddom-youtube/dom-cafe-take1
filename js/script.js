// Dom Café · "Open now" badge
const badge = document.querySelector("#open-badge");

function isOpen(now) {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (day === 0 || day === 6) {
    return minutes >= 7 * 60 && minutes < 22 * 60;
  }
  return minutes >= 6 * 60 + 30 && minutes < 21 * 60;
}

function showBadge() {
  if (isOpen(new Date())) {
    badge.textContent = "បើកឥឡូវនេះ · Open now";
    badge.classList.remove("closed");
  } else {
    badge.textContent = "បិទហើយ · Closed";
    badge.classList.add("closed");
  }
}

if (badge) {
  showBadge();
  setInterval(showBadge, 60000);
}

// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", !open);
});
