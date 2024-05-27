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

    // Form submission for adding reviews
    document.getElementById("review-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const productName = document.getElementById("productName").value;
        const username = document.getElementById("username").value;
        const comment = document.getElementById("comment").value;
        const image = document.getElementById("image").files[0];

        if (!productName || !username || !comment || !image) {
            alert("Please fill out all fields and upload an image.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const review = {
                productName: productName,
                username: username,
                comment: comment,
                image: event.target.result,
            };

            let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            reviews.push(review);
            localStorage.setItem('reviews', JSON.stringify(reviews));

            modal.style.display = "none";
            displayReviews();
        };
        reader.readAsDataURL(image);
    });

    // Display reviews
    function displayReviews() {
        const reviewsContainer = document.getElementById("reviews");
        reviewsContainer.innerHTML = "";
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

        reviews.forEach(review => {
            const reviewCard = document.createElement("div");
            reviewCard.classList.add("review-card", "p-4", "bg-white", "rounded-lg", "shadow-md");
            reviewCard.innerHTML = `
                <h3 class="text-xl font-semibold mb-2">${review.productName}</h3>
                <p class="text-gray-600 mb-2">Reviewed by: ${review.username}</p>
                <p class="text-gray-800 mb-2">${review.comment}</p>
                <img src="${review.image}" alt="${review.productName}" class="w-full h-auto rounded-lg"/>
            `;
            reviewsContainer.appendChild(reviewCard);
        });
    }

    // Initial display of reviews
    displayReviews();

    // Attach toggleDropdown to the global scope
    window.toggleDropdown = toggleDropdown;
});

const reviewsData = [
    {
      productName: "Hair Mask Vanilla",
      username: "Nurul",
      comment: "Ulasan Produk 1",
      rating: 4,
      image: "/img/VANILLA.png",
    },
    {
      productName: "Hair Mask Alovera",
      username: "Yanti",
      comment: "Ulasan Produk 2",
      rating: 5,
      image: "/img/ALOEVERA.png",
    },
    {
      productName: "Hair Mask Banana",
      username: "Putri",
      comment: "Ulasan Produk 3",
      rating: 3,
      image: "/img/BANANA.png",
    },
  ];

  function loadReviews() {
    const reviewsContainer = document.getElementById("reviews");
    reviewsContainer.innerHTML = "";

    reviewsData.forEach((review) => {
      const reviewCard = document.createElement("div");
      reviewCard.className = "p-4 bg-white shadow rounded-lg review-card";

      reviewCard.innerHTML = `
      <img src="${
        review.image
      }" class="w-full h-40 object-cover mb-4" alt="Review Image">
      <h2 class="text-xl font-semibold">${review.productName}</h2>
      <div class="flex items-center mb-2">
        ${[...Array(5)]
          .map(
            (_, i) => `
          <img src="https://img.icons8.com/ios-filled/50/000000/star--v1.png" 
          class="${
            i < review.rating ? "text-yellow-500" : "text-gray-400"
          }"/>
        `
          )
          .join("")}
      </div>
      <p class="mb-4">${review.comment}</p>
      <p class="text-gray-600">- ${review.username}</p>
    `;

      reviewsContainer.appendChild(reviewCard);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadReviews();

    document
      .getElementById("add-review-btn")
      .addEventListener("click", () => {
        document.getElementById("myModal").style.display = "block";
      });

    document.querySelector(".close").addEventListener("click", () => {
      document.getElementById("myModal").style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
      }
    });

    document
      .getElementById("review-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const productName = document.getElementById("productName").value;
        const username = document.getElementById("username").value;
        const comment = document.getElementById("comment").value;
        const imageFile = document.getElementById("image").files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
          reviewsData.push({
            productName,
            username,
            comment,
            rating: 0,
            image: reader.result,
          });
          loadReviews();
          document.getElementById("myModal").style.display = "none";
        };
        if (imageFile) {
          reader.readAsDataURL(imageFile);
        }
      });
  });
  // Dropdown toggle
  function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = event.target.closest("li").querySelector("ul");
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden", "dropdown-exit-active");
      dropdown.classList.add("dropdown-enter", "dropdown-enter-active");
      setTimeout(() => {
        dropdown.classList.remove(
          "dropdown-enter",
          "dropdown-enter-active"
        );
      }, 300);
    } else {
      dropdown.classList.add("dropdown-exit", "dropdown-exit-active");
      setTimeout(() => {
        dropdown.classList.add("hidden");
        dropdown.classList.remove("dropdown-exit", "dropdown-exit-active");
      }, 300);
    }
  }