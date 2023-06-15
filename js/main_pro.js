var id = window.location.search.slice(1);
console.log("id: ", id);

function layIdSanPham(id) {
  console.log("id: ", id);
  var promise = axios({
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
    method: "GET",
  });
  promise.then(function (result) {
    putMainProduct(result);
    realateProduct(result);
  });
  promise.catch(function (error) {
    console.log(error);
  });
}
function putMainProduct(result) {
  result.data.content;
  console.log("result.data.content: ", result.data.content);
  var arrProduct = result.data.content;
  var content = "";

  var contentSize = "";
  var numSize = arrProduct.size;
  for (var j = 0; j < numSize.length; j++) {
    contentSize += `

          <input
            type="radio"
            id="size-${numSize[j]}"
            name="size"
            value="${numSize[j]}"
            checked
          />
          <label for="size-${numSize[j]}">${numSize[j]}</label>
      `;
  }
  content += `
    <div class="pro_img">
      <img src="${arrProduct.image}" alt="" />
    </div>

    <div class="pro_content">
      <p class="title_pro">${arrProduct.name}</p>
      <p class="subtitle_pro">${arrProduct.description}</p>
      <div class="size-container">
        <p>Available Size</p>
        <div class="radio-group">
        ${contentSize}
        </div>
      </div>
      <div class="quantity-container">
        <label for="quantity">Select the quantity:</label>
        <div class="quantity-input">
          <input
            type="number"
            id="quantity"
            name="quantity"
            value="1"
            min="1"
            max="10"
          />
        </div>
        <button class="btn_buy">Add to cart</button>
      </div>
    </div>
      `;

  document.getElementById("promain_bg").innerHTML = content;
}
function realateProduct(result) {
  var arrProduct = result.data.content.relatedProducts;
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
                  <button onclick="layIdSanPham(${item.id})"><a href="#">Buy Now</a></button>
                </div>
        </div>
        `;
  }
  document.getElementById("row_product_item").innerHTML = content;
}
layIdSanPham(id);
