const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = "https://kea-alt-del.dk/t7/api/products/" + id;
fetch(url)
  .then((res) => res.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  console.log(product);
  document.querySelector(".prinfo .season").textContent =
    "Season: " + product.season;
  document.querySelector(".prinfo .color").textContent =
    "Color: " + product.basecolour;
  document.querySelector(".prinfo .origin-pr").textContent =
    product.price + " DKK";
  document.querySelector(".prinfo .brand").textContent =
    product.articletype + " | " + product.brandname;
  document.querySelector(".prinfo .pr-name").textContent =
    product.productdisplayname;
  if (product.discount) {
    document.querySelector(".new-price").textContent =
      "Now " +
      `${Math.ceil(product.price * (1 - product.discount / 100))}` +
      " DKK";
    document.querySelector(".prinfo .origin-pr").textContent =
      "Prev. " + product.price + " DKK";
  }
  document.querySelector(".prinfo .material").textContent =
    "Material: " + product.materialcaredesc;
  document.querySelector(
    "img.imgproduct"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  document.querySelector("img.imgproduct").alt = product.productdisplayname;
  document.querySelector("img.imgproduct").alt = product.productdisplayname;
  document.querySelector(".prinfo .id-nb").textContent =
    "ID Number: " + product.id;
}
