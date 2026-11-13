// Dom Café · today's specials
const specialsJson = `[
  { "name": "កាហ្វេទឹកដោះគោទឹកកក", "price": 1.5, "isNew": false },
  { "name": "Iced Latte", "price": 2, "isNew": false },
  { "name": "តែបៃតងទឹកដោះគោ", "price": 2.25, "isNew": false },
  { "name": "ក្រឡុកដូង", "price": 1.75, "isNew": true }
]`;
const specials = JSON.parse(specialsJson);

const specialsList = document.querySelector(".specials-list");

function renderSpecials() {
  specialsList.textContent = "";
  for (const item of specials) {
    const li = document.createElement("li");
    const name = document.createElement("strong");
    name.textContent = item.name;
    li.append(name, ` · $${item.price.toFixed(2)}`);
    if (item.isNew) {
      const tag = document.createElement("span");
      tag.classList.add("tag");
      tag.textContent = "ថ្មី";
      li.append(tag);
    }
    specialsList.append(li);
  }
}

renderSpecials();
