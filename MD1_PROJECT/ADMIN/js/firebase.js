const firebaseConfig = {
    apiKey: "AIzaSyAZhycsCPj-q1XEvcSK6W4sihA6TYMxEOM",
    authDomain: "module1-tinhtt.firebaseapp.com",
    projectId: "module1-tinhtt",
    storageBucket: "module1-tinhtt.appspot.com",
    messagingSenderId: "786667168966",
    appId: "1:786667168966:web:a03d7ededc98b81aff23c7",
    measurementId: "G-WS6GZT0JWR"
};
firebase.initializeApp(firebaseConfig);
var image;
// firebase bucket name
// REPLACE WITH THE ONE YOU CREATE
// ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
var fbBucketName = "images";


//   forrm ADD
// get elements
// ther progess
var uploaderAdd = document.getElementById("uploader");
// ther input file
var fileButtonAdd = document.getElementById("product_image");

// listen for file selection
fileButtonAdd.addEventListener("change", function (e) {
    //Get files
    image = [];
    for (var i = 0; i < e.target.files.length; i++) {
        var imageFile = e.target.files[i];

        uploadImageAsPromise(imageFile);
    }
});

//Handle waiting to upload each file using promise
function uploadImageAsPromise(imageFile) {
    return new Promise(function (resolve, reject) {
        var storageRef = firebase
            .storage()
            .ref(fbBucketName + "/" + imageFile.name);

        //Upload file
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on(
            "state_changed",
            function progress(snapshot) {
                var percentage =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploaderAdd.value = percentage;
            },
            function error(err) { },
            function complete() {
                var downloadURL = task.snapshot.downloadURL;
                console.log("dowload URL --->", downloadURL);
                image.push(downloadURL);
                let divLocation = document.getElementById("list_images");
                let imgElement = document.createElement("img");
                imgElement.src = downloadURL;
                imgElement.width = "50";
                divLocation.append(imgElement);
            }
        );
    });
}


// forrm edit
var uploaderEdit = document.getElementById("uploader_edit");
// ther input file
var fileButtonEdit = document.getElementById("product_image_edit");

// listen for file selection
fileButtonEdit.addEventListener("change", function (e) {
    //Get files
    image = [];
    for (var i = 0; i < e.target.files.length; i++) {
        var imageFile = e.target.files[i];

        uploadImageAsPromise(imageFile);
    }
});

//Handle waiting to upload each file using promise
function uploadImageAsPromise(imageFile) {
    return new Promise(function (resolve, reject) {
        var storageRef = firebase
            .storage()
            .ref(fbBucketName + "/" + imageFile.name);

        //Upload file
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on(
            "state_changed",
            function progress(snapshot) {
                var percentage =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploaderEdit.value = percentage;
            },
            function error(err) { },
            function complete() {
                var downloadURL = task.snapshot.downloadURL;
                console.log("dowload URL --->", downloadURL);
                image.push(downloadURL);
                let divLocation = document.getElementById("list_images_edit");
                let imgElement = document.createElement("img");
                imgElement.src = downloadURL;
                imgElement.width = "50";
                divLocation.append(imgElement);
            }
        );
    });
}
function getImage() {
    return image;
}