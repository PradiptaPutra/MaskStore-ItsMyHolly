document.addEventListener("DOMContentLoaded", function () {
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });

    // Toggle dropdown menu
    function toggleDropdown(event) {
        event.preventDefault();
        const dropdown = event.target.nextElementSibling;
        if (dropdown.classList.contains('hidden')) {
            dropdown.classList.remove('hidden');
        } else {
            dropdown.classList.add('hidden');
        }
    }

    const produkLinks = document.querySelectorAll("[data-toggle='produk']");
    produkLinks.forEach(link => {
        link.addEventListener("click", toggleDropdown);
    });

    // Function to get cart count
    function getCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.length;
    }

    // Function to update cart count display
    function updateCartCount() {
        const cartCounts = document.querySelectorAll('.cart-count');
        const count = getCartCount();
        cartCounts.forEach(cartCount => {
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'inline' : 'none';
        });
    }

    // Update cart count on page load
    window.addEventListener('load', updateCartCount);

    // Add to cart function
    function addToCart(productId, productName, productPrice) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ id: productId, name: productName, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} telah ditambahkan ke keranjang!`);
        updateCartCount();
    }

    // Mobile menu toggle
    document.getElementById('menuButton').addEventListener('click', () => {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('dropdown-enter', 'dropdown-enter-active');
            setTimeout(() => {
                mobileMenu.classList.remove('dropdown-enter', 'dropdown-enter-active');
            }, 300);
            updateCartCount(); // Update cart count when the menu is shown
        } else {
            mobileMenu.classList.add('dropdown-exit', 'dropdown-exit-active');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('dropdown-exit', 'dropdown-exit-active');
            }, 300);
        }
    });

    // Attach toggleDropdown to the global scope
    window.toggleDropdown = toggleDropdown;
});
