
// Render carousel artikel terbaru
const swiperWrapper = document.querySelector('.swiper-wrapper');
articles.forEach(article => {
  const slide = document.createElement('div');
  slide.className = 'swiper-slide';
  slide.innerHTML = `
    <a href="/artikel/${article.id}">
      <img src="${article.image}" alt="${article.title}">
    </a>
  `;
  swiperWrapper.appendChild(slide);
});

// Render card artikel
const cardContainer = document.querySelector('.grid');
articles.forEach(article => {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow-md overflow-hidden';
  card.innerHTML = `
    <a href="/artikel/${article.id}">
      <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-xl font-semibold text-gray-900">${article.title}</h3>
        <p class="mt-2 text-gray-600">${article.description}</p>
      </div>
    </a>
  `;
  cardContainer.appendChild(card);
});
// JavaScript for slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.bg-gray-200 img');

// Function to show next slide
function nextSlide() {
slides[currentSlide].style.opacity = 0;
currentSlide = (currentSlide + 1) % slides.length;
slides[currentSlide].style.opacity = 1;
}

// Function to show previous slide
function prevSlide() {
slides[currentSlide].style.opacity = 0;
currentSlide = (currentSlide - 1 + slides.length) % slides.length;
slides[currentSlide].style.opacity = 1;
}

// Automatically change slide every 5 seconds
setInterval(nextSlide, 5000);

// Function to toggle dropdown menu
function toggleDropdown(event) {
event.preventDefault();
const dropdown = document.getElementById('produkDropdown');
dropdown.classList.toggle('hidden');
}
      // Fungsi untuk mendapatkan jumlah item di keranjang
      function getCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.length;
    }

    // Fungsi untuk memperbarui tampilan jumlah item di keranjang
    function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const count = getCartCount();
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'inline' : 'none';
    }

    // Memperbarui tampilan jumlah item di keranjang saat halaman dimuat
    window.addEventListener('load', updateCartCount);

    // Memperbarui tampilan jumlah item di keranjang setelah menambahkan barang ke keranjang
    function addToCart(productId, productName, productPrice) {
    // Mendapatkan data keranjang dari localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Menambahkan item baru ke keranjang
    cart.push({ id: productId, name: productName, price: productPrice });

    // Menyimpan data keranjang ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Menampilkan pesan sukses
    alert(`${productName} telah ditambahkan ke keranjang!`);
  
    updateCartCount();
    }

    // Data artikel
    const articles = [
      {
        id: 1,
        title: 'Artikel Pertama',
        description: 'Deskripsi singkat artikel pertama',
        image: 'https://via.placeholder.com/600x400',
      },
      // Tambahkan data artikel lainnya di sini
      {
        id: 2,
        title: 'Artikel Kedua',
        description: 'Deskripsi singkat artikel kedua',
        image: 'https://via.placeholder.com/600x400',
      },
      {
        id: 3,
        title: 'Artikel Ketiga',
        description: 'Deskripsi singkat artikel ketiga',
        image: 'https://via.placeholder.com/600x400',
      },
    ];

    // Inisialisasi Swiper untuk carousel artikel terbaru
    window.addEventListener('load', function() {
      new Swiper('.swiper', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
