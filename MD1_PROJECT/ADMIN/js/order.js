// hien tdi toan bo don hang theo thu tu ngay gan nhat

// let orders = JSON.parse(localStorage.getItem("orders")) || [];
const handleStatusCodeOrder = (statusCode) => {
  switch (statusCode) {
    case 1:
      return ` <button type="button" class="btn btn_edit waiting"><i class="fa-solid fa-circle-info"></i>  Đang chờ xác nhận</button> `
    case 2:
      return ` <button type="button" class="btn btn_edit accepted"><i class="fa-solid fa-circle-info"></i>  Đã xác nhận</button> `
    case 3:
      return ` <button type="button" class="btn btn_edit denied"><i class="fa-solid fa-circle-info"></i>  Bị từ chối</button> `
  }
}

let orders = JSON.parse(localStorage.getItem("orders")) || [];

console.log(orders);

const showOrders = (list = orders) => {
  list.sort((a, b) => b.order_at.localeCompare(a.order_at));
  let string = list.reduce(
    (str, value) =>
      str +
      `<tr>
    <td>${value.order_id}</td>
    <td>${value.order_at}</td>
    <td>${value.total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
    <td>${handleStatusCodeOrder(value.status)}</td>
    <td>
        <button type="button" onclick="showOrderDetail(${value.order_id
      })" class="btn btn_delete">Chi tiết đơn hàng</button>
    </td>  
</tr>`,
    ""
  );

  document.getElementById("t-body").innerHTML = string;
};
showOrders();

function toggleForm() {
  document.getElementById("form_scope_show").classList.toggle("hide");
}

const showOrderDetail = (idOrder) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  toggleForm()
  let orderDetail = orders.find((order) => order.order_id == idOrder);
  console.log(orderDetail);
  //  lấy người dùng theo user_id
  let user = users.find((u) => u.user_id == orderDetail.user_id);
  console.log(user);


  let str = '';
  orderDetail.order_details.forEach(value => {
    str +=
      `<tr>
         <td>${value.product_id}</td>
         <td>${value.product_name}</td>
         <td>${(value.unit_price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
         <td>${value.quantity}</td>
        <td>${(value.unit_price * value.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
   </tr>`
  });

  let string = `
    <div class="modal-header">
    <h3 class="modal-title" id="modalDetailLabel">Chi tiết đơn hàng</h3>
    <p>Số hóa đơn : ${orderDetail.order_id}</p>
    <p>Người đặt hàng : ${user.full_name}</p>
    <p>Thời gian đặt hàng : ${orderDetail.order_at}</p>
  </div>
  <h4>Chi tiết hóa đơn</h4>
  <table class="table" id="order-details">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Tên sản phẩm</th>
        <th scope="col">Đơn giá</th>
        <th scope="col">Số lượng</th>
        <th scope="col">Thành tiền</th>
      </tr>
    </thead>
    <tbody>
     ${str}
    </tbody>
    <tfoot> 
      <td colspan="4">Tổng tiền : </td>
      <td> ${(orderDetail.total_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
    </tfoot>
  </table>
  </div>
          <div class="modal-footer">
            <button class="btn btn_delete ${orderDetail.status == 1 ? "" : "no_click"}" type="button" onclick="handleAcceptOrder(${orderDetail.order_id})">Xác nhận</button>
            <button class="btn btn_add ${orderDetail.status == 1 ? "" : "no_click"}" type="button" onclick="handleDenyOrder(${orderDetail.order_id})">Từ chối</button>
          </div>`;

  document.querySelector(".modal-content").innerHTML = string;
};


// xác nhận đơn hàng
function handleAcceptOrder(idOrder) {
  const orders = JSON.parse(localStorage.getItem("orders")) || []
  let orderIndex = orders.findIndex((order) => order.order_id == idOrder);
  orders[orderIndex].status = 2;
  localStorage.setItem("orders", JSON.stringify(orders));
  location.reload();
}

// từ chối đơn hàng
function handleDenyOrder(idOrder) {
  const orders = JSON.parse(localStorage.getItem("orders")) || []
  let orderIndex = orders.findIndex((order) => order.order_id == idOrder);
  orders[orderIndex].status = 3;
  localStorage.setItem("orders", JSON.stringify(orders));
  location.reload();
}

// tìm kiếm
const searchByOrderStatus = () => {
  let inputSearch = document.getElementById("input_search").value;
  console.log(inputSearch);

  let orderStatus = orders.filter(order => order.status==(inputSearch))
  console.log(orderStatus);

  showOrders(orderStatus)
  inputSearch = "";
}









// const showOrders = (list) => {

//   if (!list) {
//     list = JSON.parse(localStorage.getItem("orders")) || []
//   }


//   list.sort((a, b) => b.order_at.localeCompare(a.order_at))

//   let stringHTML = ""
//   let itemsHTML = ""
//   list.forEach(value => {

//     itemsHTML = ""
//     value.order_details.forEach(e => {
//       itemsHTML +=
//         `
//           <li>
//               <span>${e.product_name}</span> |
//               <span>${e.unit_price}</span> |
//               <span>${e.quantity}</span>
//           </li>
//         `
//     })

//     stringHTML +=
//       `
//         <tr>
//           <td>${value.order_id}</td>
//           <td>${value.order_at}</td>
//           <td>
//               <ul style="list-style: none;">
//                   ${itemsHTML}
//               </ul>
//           </td>
//           <td>${value.total_price}</td>
//           <td>
//             ${value.status == 1 ? "Cho xu ly" : value.status == 2 ? "Chap nhan" : "Tu choi"}
//           </td>
//           <td>
//               <span>
//                   <button class="${value.status == 1 ? "" : "no_click"}" onclick="accept(${value.order_id})">oke</button>
//                   <button class="${value.status == 1 ? "" : "no_click"}" onclick="cancel(${value.order_id})">cancel</button>
//               </span>
//           </td>
//       </tr>
//       `
//   });


//   document.getElementById("t-body").innerHTML = stringHTML;
// }

// showOrders();


// function accept(id) {
//   const orders = JSON.parse(localStorage.getItem("orders"))

//   const index = orders.findIndex(e => e.order_id == id)

//   orders[index].status = 2

//   localStorage.setItem("orders", JSON.stringify(orders))
//   showOrders()
// }

// function cancel(id) {
//   const orders = JSON.parse(localStorage.getItem("orders"))

//   const index = orders.findIndex(e => e.order_id == id)

//   orders[index].status = 3

//   localStorage.setItem("orders", JSON.stringify(orders))
//   showOrders()
// }




//   let button =
//     orderDetail.status == 1
//       ? `<button type="button" class="btn btn-deny"  onclick="handleDenyOrder(${orderDetail.order_id})">Từ chối</button>
// <button type="button" class="btn btn-success" onclick="handleAcceptOrder(${orderDetail.order_id})">Xác nhận</button>`
//       : `<button type="button" class="btn btn-info" data-bs-dismiss="modal">Close</button>`; // ${button}


// tính toán tổng số trang ;
let totalOrder = orders.length; // tổng số sp
let count = 5;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalOrder / count); // tổng số trang
console.log(totalPage);


// đổ ra giao diện
const showPagination = () => {
  let links = "";
  for (let i = 0; i < totalPage; i++) {
    links += `<li class="page-item ${i == pageCurrent ? 'active' : ''}" onclick="handlePagination(${i})"><a class="page-link" href="#">${i + 1}</a></li>`
  }
  document.querySelector(".pagination").innerHTML = `${links}`
}


// phần trang  : số trang hiện tại / số phần tử trên 1 trang
const handlePagination = (page = 0) => {
  let orders = JSON.parse(localStorage.getItem("orders"))
  pageCurrent = page
  let orderPaginate = orders.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
  showOrders(orderPaginate)
  showPagination()
}
handlePagination(0)
