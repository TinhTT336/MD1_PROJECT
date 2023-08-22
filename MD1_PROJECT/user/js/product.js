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
//                 <li><a href="#"><i class="bi bi-person-badge"></i> Thông tin tài khoản</a></li>
//                 <li><a href="#"><i class="fa-solid fa-right-to-bracket"></i> Thay đổi mật khẩu</a>
//                 </li>
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
//     // localStorage.removeItem("userSignin");
//     location.reload();
// }

// let initArr = [
//     { category_id: 1, name: "Trái cây nội" },
//     { category_id: 2, name: "Trái cây nhập khẩu" },
//     { category_id: 3, name: "Nước ép trái cây" },
//     { category_id: 4, name: "Rau củ quả" },

// // ];
let categories = JSON.parse(localStorage.getItem("categories")) || [];

// do danh muc san pham tren the navbar
let string = "";
for (let i = 0; i < categories.length; i++) {
    string += `  <li onclick="findListProductByCategory(${categories[i].category_id})"><a href="product.html">${categories[i].name}</a></li>`
}
document.querySelector(".navbar-list ul li ul").innerHTML = string;


let str = " <button class='btn active' onclick='findListProductByCategory()'>Tất cả sản phẩm</button>";
for (let i = 0; i < categories.length; i++) {
    str += ` <button class="btn" onclick="findListProductByCategory(${categories[i].category_id})">${categories[i].name}</button>`

}
document.querySelector(".categories_btn").innerHTML = str;

// xem chi tiet san pham qua ten san pham
const showProductDetail = (id) => {
    localStorage.setItem("product_id", JSON.stringify(id))
    // console.log("product_id");
    location.href = 'detail.html';
}

// // loc danh sach san pham theo danh muc
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
        const element = listProduct[i]
        str += `
        <div class="column-xl4 imported hide">
            <div class="product_item">
                <div class="product_img">
                    <figure>
                        <a href="product-detail.html">
                            <img src="/image/${element.image}" alt="cam_uc">
                        </a>
                    </figure>
                </div>
            </div>
            <div class="product_price">

                    <h2 onclick="showProductDetail(${element.product_id})" class="product_title">${element.name}</h2>

                <span>${(element.unit_price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                <button class="button_add" ><i class="bi bi-basket"></i> Thêm vào giỏ
                    hàng</button>
            </div>
        </div>
        `
    }

    // console.log(str);    
    // document.getElementById("product-item-img").src = `../image/${element.image}`
    document.getElementsByClassName("categories-container")[0].innerHTML = str;
}
findListProductByCategory();


// // // loc san pham theo gia 

const sortPriceAToB = () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let listSortAToB = products.sort((a, b) => (a.unit_price - b.unit_price));

    let str = "";
    for (let i = 0; i < listSortAToB.length; i++) {
        const element = listSortAToB[i]
        str += `
        <div class="column-xl4 imported hide">
            <div class="product_item">
                <div class="product_img">
                    <figure>
                        <a href="product-detail.html">
                            <img src="/image/${element.image}" alt="cam_uc">
                        </a>
                    </figure>
                </div>
            </div>
            <div class="product_price">

                    <h2 onclick="showProductDetail(${element.product_id})" class="product_title">${element.name}</h2>

                <span>${(element.unit_price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                <button class="button_add" ><i class="bi bi-basket"></i> Thêm vào giỏ
                    hàng</button>
            </div>
        </div>
        `
    }
    document.getElementsByClassName("categories-container")[0].innerHTML = str;

}
let str1 = "";

const sortPriceBToA = () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let listSortBToA = products.sort((a, b) => b.unit_price - (a.unit_price));

    for (let i = 0; i < listSortBToA.length; i++) {
        const element = listSortBToA[i]
        str1 += `
        <div class="column-xl4 imported hide">
            <div class="product_item">
                <div class="product_img">
                    <figure>
                        <a href="product-detail.html">
                            <img src="/image/${element.image}" alt="cam_uc">
                        </a>
                    </figure>
                </div>
            </div>
            <div class="product_price">

                    <h2 onclick="showProductDetail(${element.product_id})" class="product_title">${element.name}</h2>

                <span>${(element.unit_price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                <button class="button_add" ><i class="bi bi-basket"></i> Thêm vào giỏ
                    hàng</button>
            </div>
        </div>
        `
    }
    document.getElementsByClassName("categories-container")[0].innerHTML = str1;
}

// tim kiem san pham

function searchByName() {
    let inputSearch = document.getElementById("nav-search").value;
    let products = JSON.parse(localStorage.getItem("products"));
    let productSearch = products.filter(product => product.name.toLowerCase().includes(inputSearch.toLowerCase()));
    let str2 = "";

    for (let i = 0; i < productSearch.length; i++) {
        const element = productSearch[i];
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
                            <button class="button_add" ><i class="bi bi-basket" onclick="addToCart()"></i> Thêm vào giỏ
                                hàng</button>
                        </div>
                    </div>

                `
    }
    document.getElementsByClassName("categories-container")[0].innerHTML = str2;

}






