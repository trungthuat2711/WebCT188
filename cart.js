document.addEventListener("DOMContentLoaded", function () {
    const cartTable = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const clearCartButton = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartTable.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td><img src="${item.image}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()} VNĐ</td>
                <td>
                    <button class="decrease" data-index="${index}">-</button>
                    ${item.quantity}
                    <button class="increase" data-index="${index}">+</button>
                </td>
                <td>${(item.price * item.quantity).toLocaleString()} VNĐ</td>
                <td><button class="remove-item" data-index="${index}">&#128465;</button></td>
            `;

            cartTable.appendChild(row);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.innerText = totalPrice.toLocaleString() + " VNĐ";
        localStorage.setItem("cart", JSON.stringify(cart)); // Lưu lại giỏ hàng
    }

    // Xử lý tăng/giảm số lượng
    cartTable.addEventListener("click", function (event) {
        const index = event.target.dataset.index;
        if (index !== undefined) {
            if (event.target.classList.contains("increase")) {
                cart[index].quantity += 1;
            } else if (event.target.classList.contains("decrease")) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1); // Xóa nếu số lượng về 0
                }
            } else if (event.target.classList.contains("remove-item")) {
                cart.splice(index, 1);
            }
            renderCart();
        }
    });

    // Xóa toàn bộ giỏ hàng
    clearCartButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        cart = [];
        renderCart();
    });

    renderCart(); // Gọi hàm hiển thị giỏ hàng khi tải trang
});
