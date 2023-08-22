
let users = JSON.parse(localStorage.getItem("users")) || [];
const form1 = document.getElementById("form-1");
const form2 = document.getElementById("form-2");
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

const forgetPass = () => {
    email = document.getElementById('input-email').value;
    if (checkExistEmail(email)) {
        showForm(false);
    } else {
        document.getElementById('error').innerText = "Email không tồn tại, vui lòng thử lại";
        return
    }
}

const checkExistEmail = (email) => {
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if (element.email === email) {
            // 1000 - 9999
            let random = Math.round(Math.random() * 8999) + 1000
            localStorage.setItem("code", random);
            return true;
        }
    }
    return false

}
// xác thực code 
const confirmCode = () => {
    let code = document.getElementById("code-input").value;
    let codeLocal = localStorage.getItem("code")
    if (codeLocal != code) {
        document.getElementById('error-code').innerText = "Mã xác thực không hợp lệ, vui lòng kiểm tra lại"
        return;
    } else {
        let newPassword = "123456";
        let indexEdit = users.findIndex(user => user.email === email)
        users[indexEdit].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        alert("Mật khẩu của bạn là " + newPassword + ", vui lòng đăng nhập và đổi mật khẩu")
        location.href = "sign.html"
    }
}
