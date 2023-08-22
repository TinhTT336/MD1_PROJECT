const userSignin = JSON.parse(localStorage.getItem("userSignin"));
if (userSignin != null && userSignin.role == "ADMIN") {
    document.getElementById("admin-account").innerHTML =
        `
                            <img src="../image/${userSignin.avatar}" alt="avatar">
                            <span id="admin_name"><a href="#">${userSignin.username} <i class="fa-solid fa-caret-down"></i></a></span>
                            <ul class="navbar-right-item">
                               
                                <li id="logout" onclick="logout()"><a href="../user/sign.html"><i
                                            class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a>
                                </li>
                            </ul>
        `

} else {
    location.href = "/admin/403.html"
}

const logout = () => {
    window.location.href = "/user/sign.html";
    localStorage.removeItem("userSignin");

}
// document.getElementById("logout").addEventListener("click", function () {
//     window.location.href = "/user/sign.html";
// })

{/* <li id="account-admin"><a href="account.html"><i class="fa-regular fa-user"></i> Tài khoản</a></li> */}