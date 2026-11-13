// Dom Café · menu search + Hot / Iced filter
const searchInput = document.querySelector("#search");
const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".menu-card");
let activeFilter = "all";

function matches(item, text) {
  const nameOk = item.name.toLowerCase().includes(text);
  if (activeFilter === "hot") {
    return nameOk && item.hot === true;
  }
  if (activeFilter === "iced") {
    return nameOk && item.hot === false;
  }
  return nameOk;
}

function applySearch() {
  const text = searchInput.value.trim().toLowerCase();
  const shownIds = menu.filter((item) => matches(item, text)).map((item) => item.id);
  cards.forEach((card) => {
    const id = card.querySelector(".add").dataset.id;
    card.classList.toggle("hidden", !shownIds.includes(id));
  });
}

searchInput.addEventListener("input", applySearch);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((other) => other.classList.toggle("active", other === button));
    applySearch();
  });
});
