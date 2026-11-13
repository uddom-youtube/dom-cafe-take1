// Dom Café · order form checks + summary
const orderForm = document.querySelector(".order-form");
const nameInput = document.querySelector("#name");
const nameError = document.querySelector("#name-error");
const timeInput = document.querySelector("#time");
const timeError = document.querySelector("#time-error");
const summary = document.querySelector("#order-summary");

function checkForm() {
  let ok = true;
  nameError.textContent = "";
  timeError.textContent = "";
  if (nameInput.value.trim().length < 2) {
    nameError.textContent = "សូមសរសេរឈ្មោះ យ៉ាងតិច ២ អក្សរ";
    ok = false;
  }
  if (timeInput.value === "") {
    timeError.textContent = "សូមជ្រើសម៉ោងមកយក";
    ok = false;
  }
  return ok;
}

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!checkForm()) {
    return;
  }
  const drink = document.querySelector("#drink");
  const size = document.querySelector('input[name="size"]:checked');
  const sugar = document.querySelector('input[name="sugar"]:checked');
  const qty = document.querySelector("#qty").value;
  let text = `អរគុណ ${nameInput.value.trim()}! ការកុម្ម៉ង់របស់អ្នក:`;
  text = text + `\n${drink.selectedOptions[0].textContent} × ${qty}`;
  text = text + `\nទំហំ ${size.parentElement.textContent.trim()} · ស្ករ ${sugar.value}%`;
  text = text + `\nមកយកម៉ោង ${timeInput.value}`;
  for (const item of cart) {
    text = text + `\n🛒 ${item.name} × ${item.qty}`;
  }
  if (cart.length > 0) {
    text = text + `\nកន្ត្រកសរុប ${formatDollar(cartTotal())} · ${formatRiel(cartTotal())}`;
  }
  summary.textContent = text;
  summary.hidden = false;
  clearCart();
});
