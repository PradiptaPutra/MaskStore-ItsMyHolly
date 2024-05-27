    document.addEventListener("DOMContentLoaded", function () {
        console.log("app.js is loaded");

        let currentSlide = 0;
        const slides = document.querySelectorAll(".slider-image");
        const dots = document.querySelectorAll(".slider-dot");

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("opacity-100", i === index);
                slide.classList.toggle("opacity-0", i !== index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle("opacity-50", i !== index);
                dot.classList.toggle("opacity-100", i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        function goToSlide(index) {
            currentSlide = index;
            showSlide(currentSlide);
        }

        document.querySelector(".next-btn").addEventListener("click", nextSlide);
        document.querySelector(".prev-btn").addEventListener("click", prevSlide);
        setInterval(nextSlide, 3000);
        showSlide(currentSlide);

        function toggleDropdown(event) {
            event.preventDefault();
            const dropdown = event.target.closest("li").querySelector("ul");
            if (dropdown.classList.contains("hidden")) {
                dropdown.classList.remove("hidden", "dropdown-exit-active");
                dropdown.classList.add("dropdown-enter", "dropdown-enter-active");
                setTimeout(() => {
                    dropdown.classList.remove("dropdown-enter", "dropdown-enter-active");
                }, 300);
            } else {
                dropdown.classList.add("dropdown-exit", "dropdown-exit-active");
                setTimeout(() => {
                    dropdown.classList.add("hidden");
                    dropdown.classList.remove("dropdown-exit", "dropdown-exit-active");
                }, 300);
            }
        }

        window.toggleDropdown = toggleDropdown;

        function getCartCount() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            return cart.length;
        }

        function updateCartCount() {
            const cartCounts = document.querySelectorAll(".cart-count");
            const count = getCartCount();
            cartCounts.forEach(cartCount => {
                cartCount.textContent = count;
                cartCount.style.display = count > 0 ? "inline" : "none";
            });
        }

        window.addEventListener("load", updateCartCount);

        function addToCart(productId, productName, productPrice) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ id: productId, name: productName, price: productPrice });
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${productName} telah ditambahkan ke keranjang!`);
            updateCartCount();
        }

        const swiper = new Swiper(".swiper-container", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
            },
        });

        const slidesToAnimate = document.querySelectorAll(".swiper-slide");
        slidesToAnimate.forEach((slide, index) => {
            setTimeout(() => {
                slide.classList.add("staggered-animation-visible");
            }, index * 150);
        });

        window.addEventListener("scroll", function () {
            const header = document.querySelector("header");
            const blurClass = "blur-md";
            if (window.scrollY > 0) {
                header.classList.add(blurClass);
            } else {
                header.classList.remove(blurClass);
            }
        });

        document.getElementById("menuButton").addEventListener("click", () => {
            const mobileMenu = document.querySelector(".mobile-menu");
            if (mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.remove("hidden");
                mobileMenu.classList.add("dropdown-enter", "dropdown-enter-active");
                setTimeout(() => {
                    mobileMenu.classList.remove("dropdown-enter", "dropdown-enter-active");
                }, 300);
            } else {
                mobileMenu.classList.add("dropdown-exit", "dropdown-exit-active");
                setTimeout(() => {
                    mobileMenu.classList.add("hidden");
                    mobileMenu.classList.remove("dropdown-exit", "dropdown-exit-active");
                }, 300);
                updateCartCount();
            }
        });

        console.log("DOM fully loaded and parsed");
    });
