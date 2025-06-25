function goTo(category) {
  const subcategories = {
    groceries: ["Rice", "Wheat", "Dal"],
    dairy: ["Milk", "Ghee", "Butter"],
    electronics: ["TV", "Mobile", "Laptop"],
    decor: ["Lamp", "Wall Art", "Candles"],
    fashion: ["T-Shirts", "Jeans", "Shoes"],
    cleaning: ["Soap", "Floor Cleaner"],
    fruits: ["Apples", "Banana", "Carrot"],
    kitchen: ["Utensils", "Cutlery", "Cookware"],
    personal: ["Shampoo", "Toothpaste", "Lotion"]
  };

  const container = document.getElementById("subcategoryContainer");
  container.innerHTML = "";

  if (subcategories[category]) {
    const row = document.createElement("div");
    row.className = "subcategory-row";

    subcategories[category].forEach(item => {
      const sub = document.createElement("div");
      sub.className = "subcategory-item";
      sub.innerHTML = `<button onclick="addToCart('${item}')">${item}</button>`;
      row.appendChild(sub);
    });

    container.appendChild(row);
  }
}

let cartTotal = 0;
function addToCart(item) {
  cartTotal += 50; // fixed price
  document.getElementById("cartBtn").innerText = `Cart (₹${cartTotal})`;
}
