// let categories = [
//     { category_id: 1, name: "Trái cây nội", description: "Trái cây được nuôi trồng và thu hoạch tại các trang trại lớn của Mộc Châu, Đà Lạt" },
//     { category_id: 2, name: "Trái cây nhập khẩu" },
//     { category_id: 3, name: "Nước ép trái cây" },
//     { category_id: 4, name: "Rau củ quả" },
// ]


let indexUpdateGlobal = null;
let categories = JSON.parse(localStorage.getItem("categories")) || []

const showCategories = (list = categories) => {
    console.log(categories);
    let strHTML = "";
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        strHTML += `  <tr>  
                    <td>${element.category_id}</td>
                    <td>${element.name}</td>
                    <td>${element.description.substring(0, 80)}</td>
                    <td> <button type="button" class="btn btn_edit"  onclick="toggleForm(${element.category_id})"> <i class="bi bi-pencil-square" </i> Sửa</button></td>
                    <td> <button type="button" class="btn btn_delete"><i class="bi bi-trash-fill" onclick="deleteCategory(${element.category_id})"></i> Xoá</button></td> `
    }
    document.getElementById("t-body").innerHTML = strHTML;
}
showCategories();

const deleteCategory = (id) => {
    if (confirm("Bạn có chắc chắn muốn xoá không?")) {
        let indexDelete = categories.findIndex(category => category.category_id == id);
        categories.splice(indexDelete, 1);
    }
    localStorage.setItem("categories", JSON.stringify(categories));
    showCategories();
}

// function toggleForm() {
//     document.getElementById("form_scope").classList.toggle("hide")
// }

// function addNewCategory() {
//     // categories = JSON.parse(localStorage.getItem("categories"));
//     let name = document.getElementById('name').value;
//     let description = document.getElementById('description').value;

//     let newCategory = {
//         category_id: getNewIdCategory(),
//         name: name,
//         description: description,
//     }

//     categories.push(newCategory);
//     localStorage.setItem("categories", JSON.stringify(categories));
//     toggleForm()
//     showCategories();
//     // location.reload();
// // }

// function editCategory(id) {
//     toggleForm()
//     categories = JSON.parse(localStorage.getItem("categories"));
//     let categoryEdit = categories.find(cat => cat.category_id == id);
//     document.getElementById('category_id').value = categoryEdit.category_id;
//     document.getElementById('name').value = categoryEdit.name;
//     document.getElementById('description').value = categoryEdit.description;
// }

// function updateCategory() {
//     let category_id = document.getElementById('category_id').value;
//     let name = document.getElementById('name').value;
//     let description = document.getElementById('description').value;
//     let indexUpdate = categories.findIndex(cat => cat.category_id == category_id);
//     categories[indexUpdate] = { ...categories[indexUpdate], name, description, category_id }
//     localStorage.setItem("categories", JSON.stringify(categories));
//     showCateglory();
// }

function toggleForm(id) {
    document.getElementById("form_scope").classList.toggle("hide")
    let categories = JSON.parse(localStorage.getItem("categories"))
    if (id != undefined) {
        const indexUpdate = categories.findIndex(value => value.category_id == id)
        indexUpdateGlobal = indexUpdate;
        console.log((indexUpdate));

        document.getElementById("category_id").value = categories[indexUpdate].category_id;
        document.getElementById("name").value = categories[indexUpdate].name;
        document.getElementById("description").value = categories[indexUpdate].description;
    } else {
        indexUpdateGlobal = null
        document.getElementById("form_category").reset()
    }
}


document.getElementById("form_category").addEventListener("submit", function (e) {
    e.preventDefault();
    // let categories = JSON.parse(localStorage.getItem("categories"))
    console.log(indexUpdateGlobal);
    if (indexUpdateGlobal != null) {
        categories[indexUpdateGlobal].name = document.getElementById("name").value
        categories[indexUpdateGlobal].description = document.getElementById("description").value;
        indexUpdateGlobal = null;
        this.reset();
        toggleForm();
        showCategories();
        localStorage.setItem("categories", JSON.stringify(categories));
        return;
    }
    let newCategory = {
        category_id: getNewIdCategory(),
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
    }
    categories = [...categories, newCategory]
    localStorage.setItem('categories', JSON.stringify(categories))
    // showCateglory();
    location.reload();


})

const getNewIdCategory = () => {
    let idMax = 0;
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        if (idMax < element.category_id) {
            idMax = element.category_id
        }
    }
    return ++idMax;
}

function searchByCategoryName() {
    let inputSearch = document.getElementById("input_search").value;

    let arrSearch = categories.filter(cat => cat.name.toLowerCase().trim().includes(inputSearch.toLowerCase()))

    showCategories(arrSearch);
    inputSearch = "";
}

// tính toán tổng số trang ;
let totalCategory = categories.length; // tổng số sp
let count = 5;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalCategory / count); // tổng số trang
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
    let categories = JSON.parse(localStorage.getItem("categories"))
    console.log(categories);
    pageCurrent = page
    categories = categories.sort((a, b) => b.category_id - a.category_id);
    console.log(categories);
    let categoryPaginate = categories.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    console.log(categoryPaginate);
    showCategories(categoryPaginate)
    showPagination()
}
handlePagination(0)