
const addToCart = (idProduct) => {
    let quantity = +document.getElementById("count").value;

    let userSignin = JSON.parse(localStorage.getItem("userSignin"));
    if (userSignin == null) {
        alert("Vui lòng đăng nhập để xem giỏ hàng")
        location.href = "/user/sign.html"
    }
    // neu dp da co trong gio hang thi tang so luong
    let indexCartItem = userSignin.cart.findIndex(cartItem => cartItem.idProduct == idProduct)
    if (indexCartItem > -1) {
        userSignin.cart[indexCartItem].quantity += quantity;
        localStorage.setItem("userSignin", JSON.stringify(userSignin))
    } else {
        // chua ton tai thi tao moi
        let cartItem = {
            idProduct: idProduct,
            quantity,
        }
        // document.getElementById("cart-count").innerHTML += 1;
        userSignin.cart.push(cartItem);
        localStorage.setItem("userSignin", JSON.stringify(userSignin))
    }
    location.href = "/user/cart.html";
}

let products = JSON.parse(localStorage.getItem("products")) || [];

// danh sach gio hang
const showCart = () => {
    let userSignin = JSON.parse(localStorage.getItem("userSignin"));
    // can lay san pham ve de tinh toan
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let total = 0;
    let listCartItem = userSignin.cart.reduce((string, item, index) => {
        let product = products.find(p => p.product_id == item.idProduct);
        // console.log(product);

        // console.log(product.unit_price);
        total += product.unit_price * item.quantity;
        return (string +
            `  <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td><img src="/image/${product.image}" width="50" height="50" style="object-fit: cover;"></td>
                    <td>${(product.unit_price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td><input id="quantity_${item.idProduct}" type="number" min="1" value="${item.quantity}"/></td>
                    <td>${(product.unit_price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td><a onclick="handleDelete(${item.idProduct})" href="#"><i class="bi bi-trash"></i>Xoá</a></td>
                    <td><a onclick="handleUpdate(this,${item.idProduct})" href="#"><i
                                class="bi bi-pencil-square"></i>Sửa</a></td>
                </tr>`)
    }, "")
    document.querySelector("tbody").innerHTML = listCartItem;
    // document.querySelector("tfoot").innerHTML = ` <tr>
    //   <td colspan="8" style="text-align: center;">Tổng tiền : ${total}</td>
    // </tr>`;
    document.getElementById("total_all").innerHTML = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

}

showCart();

// XỬ lí xóa
const handleDelete = (idPro) => {
    if (confirm("Bạn có chắc chắn muốn xoá không?")) {
        let indexDelete = userSignin.cart.findIndex(ct => ct.idProduct == idPro)
        userSignin.cart.splice(indexDelete, 1);
        localStorage.setItem("userSignin", JSON.stringify(userSignin))
        showCart();
    }
}

// hàm xử lí cập nhật
const handleUpdate = (e, idPro) => {
    // lấy ra số lượng cần cập nhật
    let quantity = +document.querySelector(`#quantity_${idPro}`).value
    // Láy ra vị trí cần cập nhật
    let indexCartItem = userSignin.cart.findIndex(
        (cartIt) => cartIt.idProduct == idPro
    );
    userSignin.cart[indexCartItem].quantity = quantity;
    localStorage.setItem("userSignin", JSON.stringify(userSignin))
    showCart();
}

// xu ly checkout
// tao hoa don
const handleCheckOut = () => {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let userSignin = JSON.parse(localStorage.getItem("userSignin"));
    let order_details = [];
    let total_price = 0;
    for (let i = 0; i < userSignin.cart.length; i++) {
        const element = userSignin.cart[i];
        // tim san pham co vi tri theo element.idProduct
        let product = products.find(pro => pro.product_id == element.idProduct)
        // chuyen doi moi san pham trong gio hang
        total_price += product.unit_price * element.quantity;
        let order_detail = {
            product_id: element.idProduct,
            product_name: product.name,
            unit_price: product.unit_price,
            quantity: element.quantity,
            total_price,
        }
        order_details.push(order_detail);
    }

    // console.log("==>", order_details);

    let order_id = getNewIdOrder();
    let user_id = userSignin.user_id;
    let order_at = new Date().toLocaleString();
    let status = 1;
    let note = document.getElementById("note").value;
    let newOrder = {
        order_id,
        user_id,
        order_at,
        total_price,
        status,
        note,
        order_details,
    }
    // console.log(newOrder);

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    userSignin.cart = [];
    localStorage.setItem("userSignin", JSON.stringify(userSignin))
    // can thuc hien 1 so lenh khac

    alert("Đơn hàng đã được đặt")
    location.reload();

}
// tao id tu dong tang
const getNewIdOrder = () => {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let idMax = 0
    for (let i = 0; i < orders.length; i++) {
        const element = orders[i];
        if (idMax < element.order_id) {
            idMax = element.order_id
        }
    }
    return idMax + 1;
}