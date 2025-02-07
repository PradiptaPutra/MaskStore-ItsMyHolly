    // Data artikel
    const articles = [
        {
            id: 1,
            title: 'Tips Mengatasi Rambut Rontok dengan Bahan Alami',
            description: 'Deskripsi singkat artikel pertama',
            image: '/img/woman-getting-hair-loss-treatment-clinic.png',
            url: 'https://www.halodoc.com/artikel/ketahui-12-cara-mengatasi-rambut-rontok-secara-alami'
        },
        {
            id: 2,
            title: 'Cara Ampuh Menghilangkan Ketombe dengan Cepat',
            description: 'Deskripsi singkat artikel kedua',
            image: '/img/woman-giving-herself-scalp-massage.png',
            url: 'https://www.alodokter.com/berbagai-cara-alami-menghilangkan-ketombe'
        },
        {
            id: 3,
            title: 'Tips Merawat Rambut Patah dan Bercabang',
            description: 'Deskripsi singkat artikel ketiga',
            image: '/img/young-beautiful-angry-crazy-brunette-businessgirl-clutching-her-head-screaming-looking-away-white-wall.png',
            url: 'https://www.alodokter.com/Cara-Mengatasi-Rambut-Bercabang-Ada-di-Sini'
        },
    ];

    // Render card artikel
    window.addEventListener('load', function () {
        const cardContainer = document.querySelector('.grid');
        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md overflow-hidden';
            card.innerHTML = `
                <a href="${article.url}" target="_blank">
                    <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-xl font-semibold text-gray-900">${article.title}</h3>
                        <p class="mt-2 text-gray-600">${article.description}</p>
                    </div>
                </a>
            `;
            cardContainer.appendChild(card);
        });
    });

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
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = getCartCount();
        cartCountElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'inline' : 'none';
        });
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

    // Mobile menu toggle
    document.getElementById('menuButton').addEventListener('click', () => {
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.toggle('hidden');
    });

    document.getElementById('cartLink').addEventListener('click', updateCartCount);
    document.getElementById('mobileCartLink').addEventListener('click', updateCartCount);
