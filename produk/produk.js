document.addEventListener("DOMContentLoaded", function () {
    // Toggle mobile menu
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    menuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
        if (!mobileMenu.classList.contains("hidden")) {
            updateCartCount();
        }
    });

    // Toggle dropdown menu
    const produkLinks = document.querySelectorAll("[data-toggle='produk']");
    produkLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const dropdown = document.getElementById(link.dataset.target);
            dropdown.classList.toggle("hidden");
        });
    });

    // Update cart count on page load
    updateCartCount();

    // Add sticky header functionality
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
});

// Function to get cart count
function getCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.length;
}

// Function to update cart count display
function updateCartCount() {
    const cartCounts = document.querySelectorAll(".cart-count");
    const count = getCartCount();
    cartCounts.forEach(cartCount => {
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? "inline" : "none";
    });
}

// Function to add product to cart
function addToCart() {
    // Retrieve product details from the DOM
    const productName = document.querySelector(".product-name").textContent;
    const productPrice = parseFloat(
        document.querySelector(".product-price").textContent.replace(/RP|\.|,/g, '')
    );

    // Get cart data from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add new item to cart
    cart.push({ name: productName, price: productPrice });

    // Save cart data to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Display success message
    alert(`${productName} telah ditambahkan ke keranjang!`);

    updateCartCount();
}
