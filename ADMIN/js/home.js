

// let users = [
//     { user_id: 1, full_name: "Admin", username: "admin", avatar: "/image/avatar.webp", email: "admin@gmail.com", password: "admin", role: "ADMIN" },
//     { user_id: 2, full_name: "Nguyễn Văn A", username: "nguyenvana", avatar: "/image/avatar.webp", email: "nguyenvana@gmail.com", password: "1234a$", role: "USER", cart: [] },
//     { user_id: 3, full_name: "Nguyễn Văn B", username: "nguyenvanb", avatar: "/image/avatar.webp", email: "nguyenvanb@gmail.com", password: "2234a$", role: "USER", cart: [] },
//     { user_id: 4, full_name: "Nguyễn Văn C", username: "nguyenvanc", avatar: "/image/avatar.webp", email: "nguyenvanc@gmail.com", password: "3234a$", role: "USER", cart: [] }
// ]



let users = JSON.parse(localStorage.getItem("users")) || arr;
console.log(users);
// localStorage.setItem("users", JSON.stringify(users));
function showUsers(realData = users) {
    let strHTML = "";
    realData.forEach(element => {
        strHTML += `<tr>
                        <td>${element.user_id}</td>
                        <td>${element.full_name}</td>
                        <td>${element.username}</td>
                        <td><img src="../${element.avatar}"  width="60px" height="130px" style="object-fit: cover; border-radius: 50%;" alt="img"></td>
                        <td>${element.email}</td>
                        <td><input type="password" value="${element.password}" class="user_pass"> <button type="button" class="show-hide"> <span class="fas fa-eye"></span></button></td>
                        <td>${element.role}</td>
                        <td>${element.cart}</td>
                        <td> <button type="button" class="btn btn_edit"> <i class="bi bi-pencil-square" onclick="readUser(${element.user_id})"></i> Xem</button></td>
                        <td> <button type="button" class="btn btn_delete" onclick="deleteUser(${element.user_id})"><i class="bi bi-trash-fill"></i> Xoá</button>
                        </td>
                    </tr>`
    });
    document.getElementById("t-body").innerHTML = strHTML;
}
showUsers();

function deleteUser(id) {
    let indexDelete = users.findIndex(e => e.id === id);
    let result = confirm("Bạn có chắc chắn muốn xoá không?");
    if (result) {
        users.splice(indexDelete, 1)
    }
    showUsers();
    localStorage.setItem("users", JSON.stringify(users));
}

function toggleForm() {
    document.getElementById("form_scope").classList.toggle("hide");
}

const readUser = (id) => {
    toggleForm()
    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find(u => u.user_id == id);
    document.getElementById("user_id").value = user.user_id;
    document.getElementById("full_name").value = user.full_name;
    document.getElementById("username").value = user.username;
    document.getElementById("avatar").src = user.avatar;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("role").value = user.role;
    document.getElementById("cart").value = user.cart;
}



function searchByUsername() {
    let inputSearch = document.getElementById("input_search").value;

    let arrUser = users.filter(value => value.username.toLowerCase().includes(inputSearch.trim().toLowerCase()))

    showUsers(arrUser);
}

function sortUsers() {
    users.sort((a, b) => a.username.localeCompare(b.username));
    showUsers();
}

// let pass = document.querySelector(".user_pass");
// let toggleBtn = document.querySelector(".show-hide");
// toggleBtn.addEventListener("click", function () {
//     if (pass.type == "password") {
//         pass.type = "text";
//         toggleBtn.classList.add("show");
//     } else {
//         pass.type = "password";
//         toggleBtn.classList.remove("show");
//     }
// })

const toggleBtn = document.querySelector(".show-hide");
const passInputs = document.querySelectorAll(".user_pass");

toggleBtn.addEventListener("click", function () {
    for (const passInput of passInputs) {
        if (passInput.type === "password") {
            passInput.type = "text";
            toggleBtn.classList.add("show");
        } else {
            passInput.type = "password";
            toggleBtn.classList.remove("show");
        }
    }
});

// tính toán tổng số trang ;
let totalUser = users.length; // tổng số sp
let count = 2;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalUser / count); // tổng số trang
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
    let users = JSON.parse(localStorage.getItem("users"))
    console.log(users);
    pageCurrent = page
    users = users.sort((a, b) => b.user_id - a.user_id);
    console.log(users);
    let userPaginate = users.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    console.log(userPaginate);
    showUsers(userPaginate)
    showPagination()
}
handlePagination(0)

