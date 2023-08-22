

// slider-container
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// feedback
let slideIndexFeedback = 1;
showSlidesFeedback(slideIndexFeedback);

function plusSlidesFeedback(n) {
    showSlidesFeedback(slideIndexFeedback += n);
}

function currentSlideFeedback(n) {
    showSlidesFeedback(slideIndexFeedback = n);
}

function showSlidesFeedback(n) {
    let i;
    let slidesFeedback = document.querySelectorAll(".mySlides-feedback");
    if (n > slidesFeedback.length) { slideIndexFeedback = 1 }
    if (n < 1) { slideIndexFeedback = slidesFeedback.length }
    for (i = 0; i < slidesFeedback.length; i++) {
        slidesFeedback[i].style.display = "none";
    }

    slidesFeedback[slideIndexFeedback - 1].style.display = "block";
    setTimeout(showSlidesFeedback, 3000)

}

showSlidesFeedback(slideIndexFeedback);


// featured-products

let index = 1;
let listImageUrl = document.querySelectorAll(".featured_products_list img");
console.log(listImageUrl);
// chức năng next ảnh 
function changeNextImage(n) {
    // thay đổi index thêm 1 đơn vị, nếu nó = length-1 thì quay trỏ về 0
    // index++;
    if (n > listImageUrl.length) { index = 1 }
    if (n < 1) { slideIndexFeedback = listImageUrl.length }
    for (i = 0; i < listImageUrl.length; i++) {
        listImageUrl[i].style.display = "none";
    }
}
// chức năng lùi ảnh
function changePrevImage() {
    // index  từ 1, nếu nó =0 thì gán = length -1
    if (index == 0) {
        index = listImageUrl.length - 1;
    } else {
        index--
    }
}

// trượt mỗi ảnh sau 3s 
let id = setInterval(changeNextImage, 3000);

// xóa vòng lặp vô hạn
clearInterval(id);
// chỉ gọi 1 lần sau 1 khoảng thời gian
// setTimeout(changePrevImage,5000);


