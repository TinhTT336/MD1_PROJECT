function toggleForm() {
    let formSignIn = document.getElementById("form-signin");
    let formSignUp = document.getElementById("form-signup");

    formSignIn.classList.toggle("hidden");
    formSignUp.classList.toggle("hidden");

    // Reset nội dung các input khi chuyển qua form khác
    if (formSignIn.classList.contains("hidden")) {
        document.getElementById("sign-in").reset();
    } else {
        document.getElementById("sign-up").reset();
    }
}


let users = JSON.parse(localStorage.getItem("users")) || []
console.log(users);

document.getElementById("form-signup").addEventListener("submit", function (e) {
    e.preventDefault();
    const fullName = document.getElementById("signup_name").value;
    const userNameReg = document.getElementById("signup_username").value;
    const email = document.getElementById("signup_email").value;
    const passwordReg = document.getElementById("signup_pass").value;
    const confirmPassword = document.getElementById("signup_confirmpass").value;

    const errFullName = document.getElementById("name-error");
    const errUserNameReg = document.getElementById("username-reg-error");
    const errEmail = document.getElementById("email-error");
    const errPasswordReg = document.getElementById("password-reg-error");
    const errConfirmPassword = document.getElementById("confirm-password-error");

    if (fullName == "") {
        errFullName.innerHTML = "Không được để trống Họ và tên";
        return;
    } else {
        errFullName.innerHTML = "";
    }

    if (userNameReg.trim() === "") {
        errUserNameReg.innerHTML = "Không được để trống tên đăng nhập";
        return;
    } else if (users.findIndex((value) => value.username === userNameReg) > -1) {
        errUserNameReg.innerHTML = "Tài khoản này đã tồn tại";
        return;
    } else {
        errUserNameReg.innerHTML = "";
    }

    if (email.trim() == "") {
        errEmail.innerHTML = "Không được để trống email";
        return;
    } else if (users.findIndex((value) => value.email === email) > -1) {
        errEmail.innerHTML = "Tài khoản này đã tồn tại";
        return;
    } else if (!checkEmail(email)) {
        errEmail.innerHTML = "Không đúng định dạng email";
        return;
    } else {
        errEmail.innerHTML = "";
    }

    if (passwordReg.trim() == "") {
        errPasswordReg.innerHTML = "Không được để trống mật khẩu";
        return;
    } else if (!checkPassword(passwordReg)) {
        errPasswordReg.innerHTML = "Mật khẩu có độ dài ít nhất 6 kí tự bao gồm 1 chữ số, 1 kí tự đặc biệt";
        return;
    } else {
        errPasswordReg.innerHTML = "";
    }

    if (passwordReg.trim() !== confirmPassword.trim()) {
        errConfirmPassword.innerHTML = "Mật khẩu không trùng khớp";
        return;
    }

    let newUser = {
        user_id: getNewId(),
        username: userNameReg,
        email,
        full_name: fullName,
        password: passwordReg,
        role: "USER",
        avatar: "image/avatar-2.jpg",
        cart: []
    }

    users = [...users, newUser]
    localStorage.setItem("users", JSON.stringify(users))
    toggleForm();
})

//check email
const checkEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
//check pass
const checkPassword = (pass) => {
    return String(pass)
        .toLowerCase()
        .match(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/);
}

const getNewId = () => {
    let idMax = 0;
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if (idMax < element.user_id) {
            idMax = element.user_id
        }
    }
    return ++idMax;
}


document.getElementById("form-signin").addEventListener("submit", function (e) {
    e.preventDefault();
    const usernameIn = document.getElementById("signin_username").value;
    const passwordIn = document.getElementById("signin_pass").value;
    const errMess = document.getElementById("error-message");
    const users = JSON.parse(localStorage.getItem("users"));
    let index = users.findIndex(value => value.username == usernameIn.trim())

    if (usernameIn.trim() === "" || passwordIn.trim() === "") {
        errMess.innerHTML = " Không được để trống tên đăng nhập và mật khẩu";
        return;
    } else {
        if (index == -1) {
            errMess.innerHTML = " Tên đăng nhập không chính xác";
            return;
        } else {
            if (users[index].password != passwordIn.trim()) {
                errMess.innerHTML = "Mật khẩu không chính xác, vui lòng thử lại";
                return;
            } else {
                errMess.innerHTML = "";
                console.log(users[index]);
                localStorage.setItem("userSignin", JSON.stringify(users[index]))
                // this.reset()
            }
        }
    }
    if (users[index].role === "ADMIN") {
        location.href = "/ADMIN/home.html";
    } else {
        location.href = "/home.html"
    }
})

// document.getElementById("form-signin").addEventListener("submit", function (e) {
//     e.preventDefault();
//     const usernameIn = document.getElementById("signin_username").value;
//     const passwordIn = document.getElementById("signin_pass").value;
//     const errMess = document.getElementById("error-message");
//     const users = JSON.parse(localStorage.getItem("users"));
//     if (usernameIn.trim() === "" || passwordIn.trim() === "") {
//         errMess.innerHTML = " Không được để trống tên đăng nhập và mật khẩu";
//         return;
//     }
//     let userSignin = checkSignin(usernameIn, passwordIn);
//     if (userSignin == null) {
//         errMess.innerHTML = "Tên đăng nhập và mật khẩu không chính xác, vui lòng thử lại";
//         return;
//     }
//     //dang nhap thanh cong
//     localStorage.setItem("userSignin", JSON.stringify(userSignin))
//     console.log(userSignin);
//     if (userSignin.role == "ADMIN") {
//         location.href = "/ADMIN/home.html"
//     } else {
//         location.href = "/home.html"
//     }
// })

const checkSignin = (username, password) => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        const usernameIn = document.getElementById("signin_username").value;
        const passwordIn = document.getElementById("signin_pass").value;
        if (user.username === usernameIn && user.password === passwordIn) {
            return user;
        }
    }
    return null;
}

