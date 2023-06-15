function getData() {
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  });
  promise.then(function (result) {
    var arrProduct = result.data.content;
    console.log("arrProduct: ", arrProduct);

    var content = "";
    for (var i = 0; i < arrProduct.length; i++) {
      var item = arrProduct[i];
      content += `
        <div class="col_item" id="item${item.id}">
        <img
            border="0"
            src="${item.image}"
            width="300"
            height="300"
        />
        <p class="item_title">${item.name}</p>
        <p class="item_subtitle">${item.description}</p>
        <p>
        <i class="fa-solid fa-star"></i
        ><i class="fa-solid fa-star"></i
        ><i class="fa-solid fa-star"></i
        ><i class="fa-solid fa-star"></i
        ><i class="fa-solid fa-star"></i>
      </p>
      <div class="btn_product">
                  <p>${item.price}$</p>
                  <button onclick="layIdSanPham(${item.id})"><a href="http://127.0.0.1:5500/product.html?${item.id}">Buy Now</a></button>
                </div>
        </div>
        `;
    }
    document.getElementById("row_product_item").innerHTML = content;
  });
  promise.catch(function (error) {
    console.log(error);
  });
}
getData();
