//1.Chuyển ảnh khi di chuột vào sản phẩm
document.querySelectorAll(".section__product").forEach(product => {
    const img = product.querySelector(".product__img");
    if (!img) return;
    //Ảnh sau khi di chuột vào
    const secondImg = img.getAttribute("data-hover");
    // Ảnh gốc
    const firstImg = img.src;
    
    if (secondImg) {
        img.style.transition = "opacity 0.3s ease-in-out"; 

        product.addEventListener("mouseenter", function() {
            img.style.opacity = "0.5"; //Làm mờ trước khi đổi ảnh
            setTimeout(function() {
                img.src = secondImg;
                img.style.opacity = "1";
            }, 150);
        });

        product.addEventListener("mouseleave", function() {
            img.style.opacity = "0.5";
            setTimeout(function() {
                img.src = firstImg;
                img.style.opacity = "1";
            }, 150);
        });
    }
});

//2.Banner tự động chạy.
document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector(".main__banner--slider");
    const bannerImages = document.querySelectorAll(".banner__img");
    
    if (!slider || bannerImages.length === 0) return;

    const cloneBanner1 = bannerImages[0].cloneNode(true);
    slider.appendChild(cloneBanner1);
    
    let index = 0;
    const slideBanner = function() {
        index++;
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(-${index * 100}%)`;

        setTimeout(function() {
            if (index === bannerImages.length) {
                slider.style.transition = "none";
                slider.style.transform = "translateX(0%)";
                index = 0;
            }
        }, 500);
    };

    setInterval(slideBanner, 3500);
});

//3.Quay về đầu trang khi nhấn f5.
window.addEventListener("load", function () {
    setTimeout(function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 10); 
});


//4.Bật tắt menu.
document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".off__side");
    const closeButton = document.querySelector(".side__button-close");
    const hamburgerMenu = document.querySelector(".hamburger-menu");

    if (hamburgerMenu && sidebar && closeButton) {
        hamburgerMenu.addEventListener("click", function() {
            sidebar.classList.toggle("active");
        });

        //Ẩn menu khi click X.
        closeButton.addEventListener("click", function() {
            sidebar.classList.remove("active");
        });

        //Ẩn menu khi click ra ngoài.
        document.addEventListener("click", function(event) {
            //kiểm tra có ấn bên ngoài không.
            if (!sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                sidebar.classList.remove("active");
            }
        });
    }
});

//5. Tìm sản phẩm.
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.querySelector(".search-container__form");
    const searchInput = document.querySelector(".form__input");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); //ngăn tải lại trang

        const searchQuery = searchInput.value.trim().toLowerCase();// bỏ khoảng trắng thừa và đưa về chữ thường.

        //kiểm tra độ dài nhập vào
        if (searchQuery.length < 3) {
            alert("Vui lòng nhập ít nhất 3 ký tự để tìm kiếm!");
            return;
        }

        const searchWords = searchQuery.split(/\s+/); //tách từ khóa thành mảng các từ.
        const products = document.querySelectorAll(".section__product");
        let found = false;

        products.forEach(product => {
            const productTitle = product.querySelector(".product__title").innerText.toLowerCase();

            // kiểm tra nếu tất cả các từ trong searchWords đều có trong productTitle
            const isMatch = searchWords.every(word => productTitle.includes(word));

            if (isMatch) {
                found = true;

                // cuộn đến sản phẩm tìm thấy
                product.scrollIntoView({ behavior: "smooth", block: "center" });

                //thêm hiệu ứng nổi bật
                product.classList.add("highlight");

                //xóa hiệu ứng sau 3.5  giây
                setTimeout(function() {
                    product.classList.remove("highlight");
                }, 3500);
            }
        });

        if (!found) {
            alert("Không tìm thấy sản phẩm!");
        }
    });
});

//6. Thêm sản phẩm vào giỏ hàng.
document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".product__button-cart");

    //lấy giỏ hàng từ localStorage , nếu chưa có gán cart = [].
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Gán sự kiện click cho từng nút
    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            //Tìm phần tử cha gần nhất có class .section__product giúp xác định đúng sản phẩm cần thêm.
            const product = this.closest(".section__product");
            // Gán ID dựa trên vị trí sản phẩm
            const productId = index + 1;
            const productName = product.querySelector(".product__title").innerText;
            const productPrice = parseInt(product.querySelector(".product__cost").innerText.replace(/\D/g, ""));
            const productImage = product.querySelector(".product__img").src;
            
            addToCart(productId, productName, productPrice, productImage);
            changeButtonStyle(this);
        });
    });

    function addToCart(id, name, price, image) {
        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        let existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id, name, price, image, quantity: 1 });
        }

        // Lưu lại giỏ hàng vào localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    //Thay đổi màu và text cuả nút khi ấn thêm.
    function changeButtonStyle(button) {
        button.style.backgroundColor = "#4CAF50";
        button.style.cursor = "not-allowed";
        button.innerText = "✔ Đã thêm";
        button.disabled = true;

        setTimeout(() => {
            button.style.backgroundColor = ""; //Trả về màu gốc
            button.style.cursor = "pointer";
            button.innerText = "🛒 Thêm vào giỏ hàng";
            button.disabled = false;
        }, 2000);
    }

});

