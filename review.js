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
  // Mendapatkan elemen dropdown
const produkDropdown = document.getElementById('produkDropdown');
const produkDropdownMobile = document.getElementById('produkDropdownMobile');

// Fungsi untuk menampilkan/menyembunyikan dropdown
function toggleDropdown(event) {
  event.preventDefault(); // Mencegah tautan berpindah

  // Menyembunyikan dropdown lain yang mungkin terbuka
  const openDropdowns = document.querySelectorAll('.dropdown-menu:not([style*="display: none"])');
  openDropdowns.forEach(dropdown => {
    dropdown.style.display = 'none';
  });

  // Menampilkan/menyembunyikan dropdown yang diklik
  if (produkDropdown.style.display === 'none' || produkDropdown.style.display === '') {
    produkDropdown.style.display = 'block';
  } else {
    produkDropdown.style.display = 'none';
  }

  if (produkDropdownMobile.style.display === 'none' || produkDropdownMobile.style.display === '') {
    produkDropdownMobile.style.display = 'block';
  } else {
    produkDropdownMobile.style.display = 'none';
  }
}

// Menambahkan event listener pada tautan "Produk"
const produkLinks = document.querySelectorAll('a[onclick="toggleDropdown(event)"]');
produkLinks.forEach(link => {
  link.addEventListener('click', toggleDropdown);
});

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

  // Modal functionality
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("add-review-btn");
  const span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
      modal.style.display = "block";
  }

  span.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  // Default review data
  const defaultReview = {
      productName: "Default Product",
      username: "Admin",
      comment: "This is a default review.",
      rating: 5,
      image: "https://via.placeholder.com/150"
  };

  // Star rating functionality
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
      star.addEventListener('click', function() {
          const value = this.getAttribute('data-value');
          document.getElementById('rating').value = value;
          stars.forEach(s => {
              s.classList.remove('selected');
              if (s.getAttribute('data-value') <= value) {
                  s.classList.add('selected');
              }
          });
      });
  });

  // Form submission for adding reviews
  document.getElementById("review-form").addEventListener("submit", function(event) {
      event.preventDefault();
      const productName = document.getElementById("productName").value;
      const username = document.getElementById("username").value;
      const comment = document.getElementById("comment").value;
      const rating = document.getElementById("rating").value;
      const image = document.getElementById("image").files[0];

      if (!productName || !username || !comment || !rating || !image) {
          alert("Please fill out all fields, select a rating and upload an image.");
          return;
      }

      const reader = new FileReader();
      reader.onloadend = function() {
          const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
          const newReview = {
              productName: productName,
              username: username,
              comment: comment,
              rating: parseInt(rating),
              image: reader.result
          };
          reviews.push(newReview);
          localStorage.setItem('reviews', JSON.stringify(reviews));
          displayReviews();
          modal.style.display = "none";
          document.getElementById("review-form").reset();
          stars.forEach(s => s.classList.remove('selected')); // Reset star selection
      };
      reader.readAsDataURL(image);
  });

  function displayReviews() {
      const reviewsContainer = document.getElementById("reviews");
      reviewsContainer.innerHTML = "";
      const reviews = JSON.parse(localStorage.getItem('reviews')) || [defaultReview];

      reviews.forEach(review => {
          const reviewCard = document.createElement("div");
          reviewCard.className = "bg-white p-4 rounded-lg shadow";
          reviewCard.innerHTML = `
              <h3 class="text-lg font-semibold mb-2">${review.productName}</h3>
              <div class="mb-2">
                  ${'<span class="star selected">&#9733;</span>'.repeat(review.rating)}
                  ${'<span class="star">&#9733;</span>'.repeat(5 - review.rating)}
              </div>
              <p class="text-gray-700 mb-2">${review.comment}</p>
              <p class="text-gray-600 text-sm mb-4">- ${review.username}</p>
              <img src="${review.image}" alt="Review Image" class="w-full h-48 object-cover rounded-lg">
          `;
          reviewsContainer.appendChild(reviewCard);
      });
  }

  displayReviews();
});
