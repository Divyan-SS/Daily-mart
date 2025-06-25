const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

let cart = JSON.parse(localStorage.getItem("cart")) || [
  { name: "Milk", qty: 1, price: 50 },
  { name: "Ghee", qty: 2, price: 100 }
];

function renderCart() {
  const container = document.getElementById("cartItemsContainer");
  const totalEl = document.getElementById("totalAmount");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.qty * item.price;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>₹${item.price} × 
        <button onclick="updateQty(${index}, -1)">-</button>
        ${item.qty}
        <button onclick="updateQty(${index}, 1)">+</button>
        = ₹${itemTotal}</p>
    `;
    container.appendChild(div);
  });

  totalEl.innerText = total;
  renderCheckoutButtons();
}

function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty < 1) cart[index].qty = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCheckoutButtons() {
  const box = document.getElementById("checkoutButtons");
  box.innerHTML = "";

  if (!isLoggedIn) {
    box.innerHTML = `<button class="login-btn" onclick="location.href='login.html'">Login to Pay</button>`;
  } else {
    box.innerHTML = `<button class="login-btn" onclick="payNow()">Pay Now</button>`;
  }
}

function payNow() {
  const address = document.getElementById("deliveryAddress").value;
  const mode = document.getElementById("deliveryMode").value;
  if (!address) {
    alert("Please enter delivery address.");
    return;
  }
  alert(`Order Placed!\nPayment Mode: ${mode}\nDelivery to: ${address}`);
  localStorage.removeItem("cart");
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", renderCart);
