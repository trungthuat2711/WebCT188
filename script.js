//1.Chuyển ảnh khi di chuột vào sản phẩmphẩm
document.querySelectorAll(".section__product").forEach(product => {
    const img = product.querySelector(".product__img");
    if (!img) return;
    //Ảnh sau khi di chuột vào
    const secondImg = img.getAttribute("data-hover");
    // Ảnh gốc
    const firstImg = img.src;
    
    if (secondImg) {
        img.style.transition = "opacity 0.3s ease"; 

        product.addEventListener("mouseenter", () => {
            img.style.opacity = "0.5"; //Làm mờ trước khi đổi ảnh
            setTimeout(() => {
                img.src = secondImg;
                img.style.opacity = "1";
            }, 150);
        });

        product.addEventListener("mouseleave", () => {
            img.style.opacity = "0.5";
            setTimeout(() => {
                img.src = firstImg;
                img.style.opacity = "1";
            }, 150);
        });
    }
});

//2.Banner tự động chạy.
const slider = document.querySelector(".main__banner--slider");
const bannerImages = document.querySelectorAll(".banner__img");
const cloneBanner1 = bannerImages[0].cloneNode(true);
slider.appendChild(cloneBanner1); //thêm 1 ảnh banner 1 ở cuối để quay về ảnh 1.
let index = 0;
function slideBanner() {
    // Chuyển sang ảnh tiếp theo
    index++; 
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${index * 100}%)`;
    setTimeout(function() {
        if (index == bannerImages.length) {
            slider.style.transition = "none"; //Xóa hiệu ứng
            slider.style.transform = "translateX(0%)";
            index = 0;
        }
    }, 500);
}
// Tự động chạy banner mỗi 3.5 giây
setInterval(slideBanner, 3500);

//3.Quay về đầu trang khi nhấn f5.
window.addEventListener("load", function() {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1);
});
