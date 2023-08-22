let id = localStorage.getItem("product_id") || [];

if (id > -1) {
    let products = JSON.parse(localStorage.getItem("products"));
    let productDetail = products.find(product => product.product_id == id);
    // let listImg = productDetail.image.reduce((str, imgUrl)=> str + `<img data-imgbigurl="${imgUrl}" alt="#">`, "")
    let str = `
<div class="product-detail">
                <div class="product-detail_img">
                    <figure><img src="/image/${productDetail.image}" alt="">
                    </figure>
                </div>
                <div class="product-detail_info">
                    <h2>${productDetail.name}</h2>
                    <hr>
                    <h3>${(productDetail.unit_price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
                    <h4>Thông tin sản phẩm</h4>
                    <p id="product-description">${productDetail.description}</p>
                    <div class="count">
                        <input type="number" name="count" id="count" min="0" value="1">
                        <button type="button" onclick="addToCart(${productDetail.product_id})"><i class="bi bi-cart2"></i> THÊM VÀO GIỎ</button>
                    </div>
                    <div class="product-stock">
                        <div class="product-stock-inner">
                            <span>Tình trạng</span>
                            <span>Còn hàng</span>   
                        </div>
                        <div class="product-stock-inner">
                            <span>Thời gian giao hàng</span>
                            <span>Trong ngày</span>
                        </div>
                        <div class="product-stock-inner">
                            <span>Khối lượng</span>
                            <span>1kg</span>
                        </div>
                    </div>
                </div>
            </div>

    `
    document.getElementById("product-detail").innerHTML = str;
} else {
    location.href = "/index.html"
}