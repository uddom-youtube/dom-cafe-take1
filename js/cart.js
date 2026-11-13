// Dom Café · cart
const cartCount = document.querySelector(".cart-count");
const addButtons = document.querySelectorAll(".add");
const cartList = document.querySelector(".cart-items");
const cartTotalText = document.querySelector(".cart-total");
const RATE = 4100;

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    for (const item of saved) {
      item.qty = Number(item.qty) || 1;
    }
    return saved;
  } catch (err) {
    console.error("ទិន្នន័យកន្ត្រកខូច:", err.message);
    return [];
  }
}

let cart = loadCart();
localStorage.removeItem("cartCount");

function formatDollar(amount) {
  return "$" + amount.toFixed(2);
}

function formatRiel(amount) {
  return Math.round(amount * RATE).toLocaleString("en-US") + "៛";
}

function cartTotal() {
  let total = 0;
  for (const item of cart) {
    total = total + item.price;
  }
  return total;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCount() {
  let count = 0;
  for (const item of cart) {
    count = count + item.qty;
  }
  cartCount.textContent = count;
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function renderCart() {
  updateCount();
  if (!cartList) {
    return;
  }
  cartList.textContent = "";
  for (const item of cart) {
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = item.name;
    const qty = document.createElement("input");
    qty.type = "number";
    qty.min = 1;
    qty.value = item.qty;
    qty.setAttribute("aria-label", "ចំនួន " + item.name);
    qty.addEventListener("change", () => {
      item.qty = Number(qty.value);
      saveCart();
      renderCart();
    });
    const line = document.createElement("strong");
    line.textContent = formatDollar(item.price * item.qty);
    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.textContent = "✕";
    remove.setAttribute("aria-label", "លុប " + item.name);
    remove.addEventListener("click", () => {
      cart = cart.filter((other) => other !== item);
      saveCart();
      renderCart();
    });
    li.append(name, qty, line, remove);
    cartList.append(li);
  }
  if (cart.length === 0) {
    cartTotalText.textContent = "កន្ត្រកនៅទទេ · ចុច + បន្ថែម នៅទំព័រ Menu";
    return;
  }
  const total = cartTotal();
  cartTotalText.textContent = `សរុប ${formatDollar(total)} · ${formatRiel(total)}`;
}

for (const button of addButtons) {
  button.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    const inCart = cart.find((item) => item.id === id);
    if (inCart) {
      inCart.qty = inCart.qty + 1;
    } else {
      const item = menu.find((food) => food.id === id);
      cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
    }
    saveCart();
    renderCart();
  });
}

renderCart();
