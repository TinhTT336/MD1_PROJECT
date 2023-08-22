let userSignin = JSON.parse(localStorage.getItem("userSignin"));
let div = document.getElementById("account");
if (userSignin != null && userSignin.role != "ADMIN") {
    // for (let i = 0; i < divs.length; i++) {
    //     const element = divs[i];
    //     element.innerHTML
    div.innerHTML =
        `
            <a style="display: inline-block;">
                <img width="15px" src="../image/${userSignin.avatar}" alt="avatar">
                <span>${userSignin.full_name}</span>
            </a>
            <ul id="navbar-account">
                <li><a href="account.html"><i class="bi bi-person-badge" ></i> Thông tin tài khoản</a></li>
                <li><a href="#" onclick="handleLogout()"><i
                            class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a>
                </li>
            </ul>
        `
}
else {

    div.innerHTML = ` <a href="sign.html"><i class="bi bi-person-fill"></i></a>`
}

const handleLogout = () => {
    // truoc khi dang xuat thi luu gio hang vao local
    let users = JSON.parse(localStorage.getItem("users"))
    // tim vi tri cua userSignin
    let userSigninIndex = users.findIndex(user => user.user_id == userSignin.user_id)
    users[userSigninIndex] = userSignin;
    // luu lai vao local
    localStorage.setItem("users", JSON.stringify(users))


    localStorage.removeItem("userSignin");
    location.href = "product.html"
}