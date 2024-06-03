function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  let total = 0;

  cartItems.innerHTML = "";

  for (const item of cart) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">${item.name}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="text-sm text-gray-500">RP ${item.price.toLocaleString('id-ID')}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button class="text-indigo-600 hover:text-indigo-900" onclick="removeFromCart(${item.id})">Remove</button>
      </td>
    `;
    cartItems.appendChild(row);
    total += item.price;
  }

  document.getElementById("cart-total").textContent = `RP ${total.toLocaleString('id-ID')}`;
  generateTemplate(cart, total);
}

function addToCart(productId, productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} telah ditambahkan ke keranjang!`);
  updateCartCount();
}

function removeFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existingItem = cart.find((item) => item.id === itemId);

  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity--;
  } else {
    cart = cart.filter((item) => item.id !== itemId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function generateTemplate(cart, total) {
  const template = document.getElementById("cart-template");
  let items = "";

  for (const item of cart) {
    items += `${item.name} x 1 = RP ${item.price.toLocaleString('id-ID')}\n`;
  }

  const message = `Halo itsmyholy, saya ingin memesan:\n\n${items}\nApakah Produk Tersedia?.\nTotal: RP ${total.toLocaleString('id-ID')}\n\nTerimakasih.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/+6285265894479?text=${encodedMessage}`;
  template.href = whatsappLink;
}

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.length;
}

function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  const count = getCartCount();
  cartCount.textContent = count;
  cartCount.style.display = count > 0 ? "inline" : "none";
}

window.addEventListener("load", () => {
  loadCart();
  updateCartCount();
});
