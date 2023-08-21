// let products = JSON.parse(localStorage.getItem("products")) || [];

let categories = [
    { category_id: 1, name: "Trái cây nội" },
    { category_id: 2, name: "Trái cây nhập khẩu" },
    { category_id: 3, name: "Nước ép trái cây" },
    { category_id: 4, name: "Rau củ quả" },
];
const getCategoryNameByCategoryId = (id) => {
    let rs = categories.find(cat => cat.category_id == id)
    return rs.name
}

let str = "";
for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    str += ` <option value = "${element.category_id}" > ${element.name}</option >`
}
document.getElementById("category_add").innerHTML = str;
document.getElementById("category_edit").innerHTML = str;

const products = JSON.parse(localStorage.getItem("products")) || []

const showListProducts = (list = products) => {
    let strHTML = "";
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        strHTML += `  <tr>
                    <td>${element.product_id}</td>
                    <td>${element.name}</td>
                        <td><img src="../image/${element.image}" width="30px"  height="65px" style="object-fit" alt="#"></td>
                    <td>${element.description.substring(0, 30)}</td>
                    <td>${(element.unit_price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td>${element.stock}</td>
                    <td>${getCategoryNameByCategoryId(element.category_id)}</td>
                    <td> <button type="button" class="btn btn_edit"> <i class="bi bi-pencil-square" onclick="editProduct(${element.product_id})"></i> Sửa</button></td>
                    <td> <button type="button" class="btn btn_delete"><i class="bi bi-trash-fill" onclick="deleteProduct(${element.product_id})"></i> Xoá</button></td>
                    </tr> `
    }
    document.getElementById("t-body").innerHTML = strHTML;
}
showListProducts();

const getNewId = () => {
    let idMax = 0;
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        if (idMax < element.product_id) {
            idMax = element.product_id
        }
    }
    return ++idMax;
}


const deleteProduct = (id) => {
    const products = JSON.parse(localStorage.getItem("products"))

    if (confirm("Bạn có chắc chắn muốn xoá không?")) {
        let indexDelete = products.findIndex(product => product.product_id == id);
        console.log(indexDelete);
        products.splice(indexDelete, 1);
        localStorage.setItem("products", JSON.stringify(products));
        showListProducts();
    }
}


function toggleFormAdd() {
    document.getElementById("form_scope").classList.toggle("hide");
}

let fileImageGlobal = null;

document.getElementById("image_add").addEventListener("change", function (e) {
    document.getElementById("img_product").src = `../image/${e.target.files[0].name}`
    fileImageGlobal = e.target.files[0].name
})

document.getElementById("image_edit").addEventListener("change", function (e) {
    document.getElementById("img_product_edit").src = `../image/${e.target.files[0].name}`
    fileImageGlobal = e.target.files[0].name
})

const addNewProduct = () => {
    let products = JSON.parse(localStorage.getItem("products"))
    let product_id = getNewId();
    let name = document.getElementById("product_name_add").value;
    let image = fileImageGlobal;
    let description = document.getElementById("description_add").value;
    let unit_price = document.getElementById("product_price_add").value;
    let stock = document.getElementById("stock_add").value;
    let category_id = Number(document.getElementById("category_add").value);
    let error = "";
    if (name.trim() == "") {
        error = "Tên không được để trống"
        document.getElementById("error").innerHTML = error;
        return
    }

    if (unit_price <= 0) {
        error = "Đơn giá phải lớn hơn 0";
        document.getElementById("error").innerHTML = error;
        return
    }
    if (stock <= 0) {
        error = "Số lượng phải lớn hơn 0";
        document.getElementById("error").innerHTML = error;
        return
    }

    let newProduct = {
        product_id,
        name,
        image,
        description,
        unit_price,
        stock,
        category_id
    }
    // products.push(newProduct)
    products = [...products, newProduct];
    fileImageGlobal = null;

    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
    // document.getElementById(form_add).reset()
    // toggleFormAdd();
    // showListProducts()   
}

function toggleFormEdit() {
    document.getElementById("form_scope_edit").classList.toggle("hide")
}
const editProduct = (id) => {
    toggleFormEdit()
    const products = JSON.parse(localStorage.getItem("products"));
    let productEdit = products.find(p => p.product_id == id);
    document.getElementById("product_id_edit").value = productEdit.product_id;
    document.getElementById("product_name_edit").value = productEdit.name;

    document.getElementById("description_edit").value = productEdit.description;
    document.getElementById("product_price_edit").value = productEdit.unit_price;
    document.getElementById("stock_edit").value = productEdit.stock;
    document.getElementById("category_edit").value = productEdit.category_id;

    document.getElementById("image_edit").src = productEdit.image;
    fileImageGlobal = productEdit.image;
    document.getElementById("img_product_edit").src = `../image/${productEdit.image}`

}


const updateProduct = () => {
    let product_id = document.getElementById("product_id_edit").value;
    let name = document.getElementById("product_name_edit").value;
    let image = document.getElementById("image_edit")
    image = fileImageGlobal;
    let description = document.getElementById("description_edit").value;
    let unit_price = document.getElementById("product_price_edit").value;
    let stock = document.getElementById("stock_edit").value;
    let category_id = document.getElementById("category_edit").value;

    let indexUpdate = products.findIndex(p => p.product_id == product_id);

    products[indexUpdate] = { ...products[indexUpdate], name, image, description, unit_price, stock, category_id }

    localStorage.setItem("products", JSON.stringify(products))
    fileImageGlobal = null

    location.reload();
}

const searchByName = () => {
    let inputSearch = document.getElementById("input_search").value;

    console.log(inputSearch);
    let productSearch = products.filter(value => value.name.toLowerCase().includes(inputSearch.trim().toLowerCase()))
    console.log(productSearch);
    showListProducts(productSearch)
    inputSearch = "";
}


// tính toán tổng số trang ;
let totalProduct = products.length; // tổng số sp
let count = 5;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalProduct / count); // tổng số trang
console.log(totalPage);


// đổ ra giao diện
const showPagination = () => {
    let links = "";
    for (let i = 0; i < totalPage; i++) {
        links += `<li class="page-item ${i == pageCurrent ? 'active' : ''}" onclick="handlePagination(${i})"><a class="page-link" href="#">${i + 1}</a></li>`
    }
    // console.log(links);
    document.querySelector(".pagination").innerHTML = `${links}`
}


// phần trang  : số trang hiện tại / số phần tử trên 1 trang
const handlePagination = (page = 0) => {
    let products = JSON.parse(localStorage.getItem("products"))
    console.log(products);
    pageCurrent = page
    products = products.sort((a, b) => b.product_id - a.product_id);
    console.log(products);
    let productPaginate = products.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    console.log(productPaginate);
    showListProducts(productPaginate)
    showPagination()
}
handlePagination(0)


