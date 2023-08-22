

// let users = [
//     { user_id: 1, full_name: "Admin", username: "admin", avatar: "/image/avatar.webp", email: "admin@gmail.com", password: "admin", role: "ADMIN" },
//     { user_id: 2, full_name: "Nguyễn Văn A", username: "nguyenvana", avatar: "/image/avatar.webp", email: "nguyenvana@gmail.com", password: "1234a$", role: "USER", cart: [] },
//     { user_id: 3, full_name: "Nguyễn Văn B", username: "nguyenvanb", avatar: "/image/avatar.webp", email: "nguyenvanb@gmail.com", password: "2234a$", role: "USER", cart: [] },
//     { user_id: 4, full_name: "Nguyễn Văn C", username: "nguyenvanc", avatar: "/image/avatar.webp", email: "nguyenvanc@gmail.com", password: "3234a$", role: "USER", cart: [] }
// ]



let users = JSON.parse(localStorage.getItem("users")) || [];
function showUsers(realData = users) {
    let strHTML = "";
    realData.forEach(element => {
        strHTML += `<tr>
                        <td>${element.user_id}</td>
                        <td>${element.full_name}</td>
                        <td>${element.username}</td>
                        <td><img src="../image/${element.avatar}"  width="60px" height="110px" style="object-fit: cover; border-radius: 50%;" alt="img"></td>
                        <td>${element.email}</td>
                    
                        <td>${element.role}</td>
                        <td> <button type="button" class="btn btn_edit"  onclick="readUser(${element.user_id})"> <i class="bi bi-pencil-square"></i> Xem</button></td>
                        <td> <button type="button" class="btn btn_delete" onclick="deleteUser(${element.user_id})"><i class="bi bi-trash-fill"></i> Xoá</button>
                        </td>
                    </tr>`
    });
    document.getElementById("t-body").innerHTML = strHTML;
}
showUsers();

function deleteUser(id) {
    let indexDelete = users.findIndex(e => e.user_id === id);
    // console.log(indexDelete);
    let user = users[indexDelete]
    // console.log(user);
    if (user.role !== "ADMIN") {
        let result = confirm("Bạn có chắc chắn muốn xoá không?");
        if (result) {
            users.splice(indexDelete, 1)
        }
        // showUsers();
        location.reload()
        localStorage.setItem("users", JSON.stringify(users));
    } else {
        alert("Bạn không có quyền xoá tài khoản này")
    }
}

function toggleForm() {
    document.getElementById("form_scope").classList.toggle("hide");
}

const readUser = (id) => {
    toggleForm()
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.user_id == id);
    document.getElementById("user_id").value = user.user_id;
    document.getElementById("full_name").value = user.full_name;
    document.getElementById("username").value = user.username;
    document.getElementById("avatar").src = `../image/${user.avatar}`;
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


// const toggleBtn = document.querySelector(".show-hide");
// const passInputs = document.querySelectorAll(".user_pass");

// toggleBtn.addEventListener("click", function () {
//     for (const passInput of passInputs) {
//         if (passInput.type === "password") {
//             passInput.type = "text";
//             toggleBtn.classList.add("show");
//         } else {
//             passInput.type = "password";
//             toggleBtn.classList.remove("show");
//         }
//     }
// });

// tính toán tổng số trang ;
let totalUser = users.length; // tổng số sp
let count = 3;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalUser / count); // tổng số trang


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
    let users = JSON.parse(localStorage.getItem("users")) || []
    pageCurrent = page
    users = users.sort((a, b) => b.user_id - a.user_id);
    let userPaginate = users.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    showUsers(userPaginate)
    showPagination()
}
handlePagination(0)

