let form1 = document.getElementById("form-1");
let form2 = document.getElementById("form-2");
let email;

const showForm = (check) => {
    if (check) {
        form1.style.display = "flex";
        form2.style.display = "none";
    } else {
        form1.style.display = "none";
        form2.style.display = "flex";
    }
}
showForm(true);

email = document.getElementById("input-email").value;
const forgetPass = () => {
    if (checkExitEmail(email)) {
        showForm(false);

    } else {
        document.getElementById("error").innerHTML = "Email không tồn tại, vui lòng thử lại"
    }
}

const checkExitEmail = (email) => {
    let users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
    console.log(email);

    for (i = 0; i < users.length; i++) {
        const element = users[i]
        if (element.email == email) {
            let random = Math.round(Math.random() * 8999) + 1000
            localStorage.setItem("code", random);
            return true;
        }
    }
    return false;
}

const confirmCode = () => {
    let users = JSON.parse(localStorage.getItem("users"));
    let code = document.getElementById("code-input");
    let codeLocal = localStorage.getItem("code");
    if (code != codeLocal) {
        document.getElementById("error-code").innerHTML = "Mã xác thực không hợp lệ, vui lòng kiểm tra lại"
    } else {
        let newPass = "12345a$";
        let indexUpdate = users.findIndex(user => user.email == email);
        users[indexUpdate].password = newPass;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Mật khẩu của bạn là " + newPassword + ", vui lòng đăng nhập và đổi mật khẩu")
        location.href = "login.html"
    }
}
