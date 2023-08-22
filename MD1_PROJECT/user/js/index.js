// let userSignin = JSON.parse(localStorage.getItem("userSignin"));
// let div = document.getElementById("account");
// if (userSignin != null) {
//     // for (let i = 0; i < divs.length; i++) {
//     //     const element = divs[i];
//     //     element.innerHTML
//     div.innerHTML =
//         `
//             <a style="display: inline-block;">
//                 <img width="15px" src="../image/${userSignin.avatar}" alt="avatar">
//                 <span>${userSignin.full_name}</span>
//             </a>
//             <ul id="navbar-account">
//                 <li><a href="user/account.html"><i class="bi bi-person-badge" ></i> Thông tin tài khoản</a></li>
//                 <li><a href="#" onclick="handleLogout()"><i
//                             class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a>
//                 </li>
//             </ul>
//         `
// }
// else {
//     // for (let i = 0; i < divs.length; i++) {
//     //     const element = divs[i];
//     //     element.innerHTML =
//     div.innerHTML = ` <a href="sign.html"><i class="bi bi-person-fill"></i></a>`
// }
// // }

// const handleLogout = () => {
//     // truoc khi dang xuat thi luu gio hang vao local
//     let users = JSON.parse(localStorage.getItem("users"))
//     // tim vi tri cua userSignin
//     let userSigninIndex = users.findIndex(user => user.user_id == userSignin.user_id)
//     users[userSigninIndex] = userSignin;
//     // luu lai vao local
//     localStorage.setItem("users", JSON.stringify(users))


//     localStorage.removeItem("userSignin");
//     location.reload();
// }

// let initArr = [
//     { category_id: 1, name: "Trái cây nội" },
//     { category_id: 2, name: "Trái cây nhập khẩu" },
//     { category_id: 3, name: "Nước ép trái cây" },
//     { category_id: 4, name: "Rau củ quả" },
// ];
let categories = JSON.parse(localStorage.getItem("categories")) || [];



let str = " <button class='btn active' onclick='findListProductByCategory()'>Tất cả sản phẩm</button>";
for (let i = 0; i < categories.length; i++) {
    str += ` <button class="btn" onclick="findListProductByCategory(${categories[i].category_id})">${categories[i].name}</button>`

}
document.querySelector(".categories_btn").innerHTML = str;

// do danh muc san pham tren the navbar
let string = "";
for (let i = 0; i < categories.length; i++) {
    string += `  <li onclick="findListProductByCategory(${categories[i].category_id})"><a href="user/product.html">${categories[i].name}</a></li>`
}
document.querySelector(".navbar-list ul li ul").innerHTML = string;


// xem chi tiet san pham qua ten san pham
const showProductDetail = (id) => {
    localStorage.setItem("product_id", JSON.stringify(id))
    // console.log("product_id");
    location.href = 'user/detail.html';
}

// loc danh sach san pham theo danh muc
const findListProductByCategory = (idCategory = 0) => {

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let listProduct;
    if (idCategory == 0) {
        listProduct = products;
    } else {
        listProduct = products.filter(product => product.category_id == idCategory)
    }
    let str = "";
    for (let i = 0; i < listProduct.length; i++) {
        if (i == 8) {
            break;
        }
        const element = listProduct[i]
        str += `
        <div class="column-xl4 imported hide">
            <div class="product_item">
                <div class="product_img">
                    <figure>
                        <a href="#" onclick="showProductDetail(${element.product_id})">
                            <img src="./image/${element.image}" alt="cam_uc">
                        </a>
                    </figure>
                </div>
            </div>
            <div class="product_price">

                    <h2 onclick="showProductDetail(${element.product_id})" class="product_title">${element.name}</h2>

                <span>${(element.unit_price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            <button class="button_add"  onclick="showProductDetail(${element.product_id})"><i class="bi bi-basket"></i> Xem chi tiết</button>

            </div>
        </div>
        `
    }

    // console.log(str);    
    // document.getElementById("product-item-img").src = `../image/${element.image}`
    document.getElementsByClassName("categories-container")[0].innerHTML = str;
}
findListProductByCategory();

function searchByName() {
    let inputSearch = document.getElementById("nav-search").value;
    let products = JSON.parse(localStorage.getItem("products"));
    console.log(inputSearch);
    let productSearch = products.filter(product => product.name.toLowerCase().includes(inputSearch.toLowerCase()));

    let str2 = "";

    for (let i = 0; i < productSearch.length; i++) {
        const element = productSearch[i];
        if (productSearch != null) {
            str2 += `
              <div class="column-xl4 imported hide">
                        <div class="product_item">
                            <div class="product_img">
                                <figure>
                                    <a href="" onclick="showProductDetail(${element.product_id})">
                                        <img src="/image/${element.image}" alt="cam_uc">
                                    </a>
                                </figure>
                            </div>
                        </div>
                        <div class="product_price">

                                <h2 onclick="showProductDetail(${element.product_id})" class="product_title">${element.name}</h2>

                            <span>${(element.unit_price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            <button class="button_add"  onclick="showProductDetail(${element.product_id})"><i class="bi bi-basket"></i> Xem chi tiết</button>
                        </div>
                    </div>

                `
            document.getElementsByClassName("categories-container")[0].innerHTML = str2;

        } else {
            location.href = "user/product.html"
        }

    }
}

// featured products hien ngau nhien 8 san pham
let products = JSON.parse(localStorage.getItem("products")) || [];

let stringHTML = "";
const shuffleProduct = (products, count) => {
    const randomProducts = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.round(Math.random() * products.length)
        randomProducts.push(products[randomIndex])
    }
    return randomProducts;
}
// console.log(shuffleProduct(products, 8))

let randomProducts = shuffleProduct(products, 8)
// console.log(randomProducts);

for (let i = 0; i < randomProducts.length; i++) {
    const element = randomProducts[i]
    stringHTML += `
        <div class="column-xl4">
                    <div class="product_item">
                        <div class="product_img">
                            <figure>
                                <a href="" onclick="showProductDetail(${element.product_id})">
                                     <img src="/image/${element.image}" alt="cam_uc">
                                </a>
                            </figure>
                        </div>
                        <div class="product-badge">
                            <span class="sale-badge">New</span>
                        </div>
                    </div>
                    <div class="product_rating">
                        <a href="#"><i class="fas fa-star"></i></a>
                        <a href="#"><i class="fas fa-star"></i></a>
                        <a href="#"><i class="fas fa-star"></i></a>
                        <a href="#"><i class="fas fa-star"></i></a>
                        <a href="#"><i class="fas fa-star-half-alt"></i></a>
                    </div>
                    <div class="product_price">
                        <a href="#" ">
                            <h2 onclick="showProductDetail(${element.product_id})" class="product_title">${element.name}</h2>
                        </a>
                        <span>${(element.unit_price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        <button class="button_add" onclick="showProductDetail()" ><i class="bi bi-basket"></i> Xem chi tiết</button>
                    </div>
                </div>
        `
}
document.getElementsByClassName("featured_products_list")[0].innerHTML = stringHTML;







