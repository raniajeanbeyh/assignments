const urlParams = new URLSearchParams(window.location.search);
const season = urlParams.get("season");
const url = "https://kea-alt-del.dk/t7/api/products?season=" + season;

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    handleProductList(data);
  });
function handleProductList(data) {
  console.log(data);
  data.forEach(showProduct);
}
function showProduct(product) {
  console.log(product);
  const template = document.querySelector("#smallProductTemplate").content;
  const clone = template.cloneNode(true);

  clone
    .querySelector("a")
    .setAttribute("href", "product.html?id=" + product.id);
  clone.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  clone.querySelector(
    ".type"
  ).textContent = `${product.articletype} | ${product.brandname}`;
  clone.querySelector("h4").textContent = `${product.productdisplayname}`;
  clone.querySelector(".o-price").textContent = `${product.price}` + " DKK";

  if (product.soldout) {
    clone.querySelector("section").classList.add("soldOut");
  }
  if (product.discount) {
    clone.querySelector("section").classList.add("onSale");

    clone.querySelector(".new-price").textContent =
      "Now " +
      `${Math.ceil(product.price * (1 - product.discount / 100))}` +
      " DKK";
    clone.querySelector("#saleTag").textContent = `${product.discount}` + " %";
    console.log("workings");
  }
  const parent = document.querySelector("main");
  parent.appendChild(clone);
}
