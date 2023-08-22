let userSignin = JSON.parse(localStorage.getItem("userSignin"));

const full_nameHTML = document.getElementById("account-fullname")
const usernameHTML = document.getElementById("account-username")
const emailHTML = document.getElementById("account-email")
const passwordHTML = document.getElementById("account-password")
const newPasswordHTML = document.getElementById("account-newpassword");
const avatarHTML = document.getElementById("account-avatar");
let fileNameGlobal = null;

const getAccount = () => {
    const userSignin = JSON.parse(localStorage.getItem("userSignin"))


    full_nameHTML.value = userSignin.full_name;
    usernameHTML.value = userSignin.username;
    emailHTML.value = userSignin.email;
    avatarHTML.src = `../image/${userSignin.avatar}`;
    passwordHTML.value = "";
    newPasswordHTML.value = "";

    fileNameGlobal = userSignin.avatar;
}
getAccount();

document.getElementById("change_avatar").addEventListener("change", function (e) {
    document.getElementById("account-avatar").src = `../image/${e.target.files[0].name}`
    // const fileName = e.target.file[0].name;

    // if (fileName != "") {
    //     fileNameGlobal = fileName
    // }
    // avatarHTML.src = `../image/${fileName}`
    // fileNameGlobal = avatarHTML.src;
    fileNameGlobal = e.target.files[0].name

})

const cancelUpdate = () => {
    location.href = "/home.html"
}

const updateAccount = () => {
    const userSignin = JSON.parse(localStorage.getItem("userSignin"));
    const newInfo = {
        full_name: full_nameHTML.value,
        username: usernameHTML.value,
        email: emailHTML.value,
        avatar: fileNameGlobal,
        oldPassword: passwordHTML.value,
        newPassword: newPasswordHTML.value,
    }
    if (newInfo.newPassword != "" && newInfo.oldPassword == userSignin.password) {
        userSignin.full_name = newInfo.full_name;
        userSignin.username = newInfo.username;
        userSignin.email = newInfo.email;
        userSignin.avatar = newInfo.avatar;
        userSignin.password = newInfo.newPassword;
    } else if (newInfo.newPassword == "" && newInfo.oldPassword == userSignin.password) {
        userSignin.full_name = newInfo.full_name;
        userSignin.username = newInfo.username;
        userSignin.email = newInfo.email;
        userSignin.avatar = newInfo.avatar;
    } else {
        alert("Sai mât khẩu, vui lòng kiểm tra lại!")
        return;
    }
    localStorage.setItem("userSignin", JSON.stringify(userSignin));
    let users = JSON.parse(localStorage.getItem("users"))
    // tim vi tri cua userSignin
    let userSigninIndex = users.findIndex(user => user.user_id == userSignin.user_id)

    users[userSigninIndex] = userSignin;

    localStorage.setItem("users", JSON.stringify(users))
    location.href = "home.html"

}