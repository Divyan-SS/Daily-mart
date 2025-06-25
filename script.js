// Combined and Improved JavaScript for Daily Mart Project

const loginModal = document.getElementById("loginModal");
const otpModal = document.getElementById("otpModal");
const cartModal = document.getElementById("cartModal");
const paymentPage = document.getElementById("paymentPage");
const searchBox = document.getElementById("searchBox");

const searchTerms = [
  'Search "Dairy Products"',
  'Search "Fruits"',
  'Search "Kitchen Essentials"',
  'Search "Electronics"',
  'Search "Household and Cleaning"',
  'Search "Fashion Products"',
  'Search "Beverages"',
  'Search "Personal Care"'
];

let searchIndex = 0;
let placeholderInterval = null;
let isLoggedIn = false;
let cart = [];

// Placeholder rotation
function startSearchRotation() {
  searchBox.placeholder = searchTerms[searchIndex];
  placeholderInterval = setInterval(() => {
    searchIndex = (searchIndex + 1) % searchTerms.length;
    searchBox.placeholder = searchTerms[searchIndex];
  }, 2000);
}

function pauseSearchRotation() {
  clearInterval(placeholderInterval);
}

function resumeSearchRotation() {
  startSearchRotation();
}

document.addEventListener("DOMContentLoaded", () => {
  startSearchRotation();

  const mobileInput = document.getElementById("mobileInput");
  if (mobileInput) {
    mobileInput.addEventListener("input", function () {
      const value = this.value;
      document.getElementById("continueBtn").disabled = value.length !== 10;
    });
  }
});

// Login flow
function openLoginPopup() {
  loginModal.style.display = "flex";
}

function sendOTP() {
  const mobile = document.getElementById("mobileInput").value;
  loginModal.style.display = "none";
  otpModal.style.display = "flex";
  document.getElementById("mobileDisplay").innerText = mobile;
}

function completeLogin() {
  isLoggedIn = true;
  otpModal.style.display = "none";
  document.getElementById("proceedToPay").style.display = "inline-block";
  document.getElementById("loginToPay").style.display = "none";
}

// Cart modal
function openCartPopup() {
  cartModal.style.display = "flex";
  renderCart();
}

function showPaymentPage() {
  cartModal.style.display = "none";
  paymentPage.style.display = "flex";
}

function closePayment() {
  paymentPage.style.display = "none";
  alert("Payment complete!");
  cart = [];
  renderCart();
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cartBtn").innerText = `Cart (₹${cart.reduce((t, p) => t + p.price, 0)})`;
}

function renderCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.name} - ₹${item.price} 
      <button onclick="removeItem(${i})">Remove</button>
    `;
    container.appendChild(div);
  });

  document.getElementById("itemTotal").innerText = total;
  document.getElementById("grandTotal").innerText = total + 25 + 2;
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartCount();
}

// Category and Subcategory
const subcategories = {
  groceries: ["Rice", "Wheat", "Dal"],
  dairy: ["Milk", "Ghee", "Butter"],
  electronics: ["TV", "Mobile", "Laptop"],
  decor: ["Lamp", "Wall Art", "Candles"],
  fashion: ["T-Shirts", "Jeans", "Shoes"],
  cleaning: ["Soap", "Cleaner", "Mop"],
  fruits: ["Apple", "Banana", "Carrot"],
  kitchen: ["Utensils", "Pan", "Spoons"],
  personal: ["Shampoo", "Toothpaste", "Cream"]
};

function goTo(category) {
  const container = document.getElementById("subcategoryContainer");
  container.innerHTML = "";

  if (subcategories[category]) {
    const row = document.createElement("div");
    row.className = "subcategory-row";

    subcategories[category].forEach(item => {
      const sub = document.createElement("div");
      sub.className = "subcategory-item";
      sub.innerHTML = `<button onclick="addToCartItem('${item}', 50)">${item}</button>`;
      row.appendChild(sub);
    });

    container.appendChild(row);
  }
}

function addToCartItem(name, price) {
  const product = { name, price };
  cart.push(product);
  renderCart();
  updateCartCount();
}