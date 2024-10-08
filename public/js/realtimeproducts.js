const socket = io();

function $(selector) {
  return document.querySelector(selector);
}

function addProductToCart(pid) {
  console.log(`Product with ID ${pid} added to cart`);
}

socket.on("statusError", (data) => {
  console.log(data);
  alert(data);
});

socket.on("publishProducts", (data) => {
  updateProductList(data);
});

function updateProductList(data) {
  // $(".products-box").innerHTML = "";

  const objectToLoop = (data.docs) ? data.docs : data;
  // let html = "";
  let html = document.createElement("div");
  html.setAttribute("class", "product-card");

  objectToLoop.forEach((product) => {
    html.innerHTML = `
      <h3>${product.title}</h3>
      <hr>
      <p>Categoria: ${product.category}</p>
      <p>Descripción: ${product.description}</p>
      <p>Precio: $ ${product.price}</p>
      <img src="https://i.ebayimg.com/images/g/swoAAOSwCm9kEMTF/s-l1200.webp" alt="Welcome Image">
      <button id="button-delete" onclick="deleteProduct('${product._id}')">Eliminar</button>
    `;
  });

  // $(".products-box").innerHTML = html;
  document.querySelector(".products-box").prepend(html);

  // Update pagination links
  const paginationHtml = `
    ${
      data.hasPrevPage
        ? `<a href="/realtimeproducts?page=${data.prevPage}&limit=${data.limit}" class="prev">Previous</a>`
        : ""
    }
    ${
      data.hasNextPage
        ? `<a href="/realtimeproducts?page=${data.nextPage}&limit=${data.limit}" class="next">Next</a>`
        : ""
    }
  `;
  document.querySelector(".pagination").innerHTML = paginationHtml;
}

function createProduct(event) {
  event.preventDefault();
  const newProduct = {
    title: $("#title").value,
    description: $("#description").value,
    code: $("#code").value,
    price: $("#price").value,
    stock: $("#stock").value,
    category: $("#category").value,
  };

  cleanForm();

  socket.emit("createProduct", newProduct);
}

function deleteProduct(pid) {
  socket.emit("deleteProduct", { pid });
}

function cleanForm() {
  $("#title").value = "";
  $("#description").value = "";
  $("#code").value = "";
  $("#price").value = "";
  $("#stock").value = "";
  $("#category").value = "";
}

// Listen for the emailSent event and show a SweetAlert notification
socket.on("emailSent", (data) => {
  Swal.fire({
    icon: "success",
    title: "Email Notification",
    text: data.message,
  });
});

// Listen for the productDeleted event
socket.on("productDeleted", (data) => {
  Swal.fire({
    icon: "success",
    title:
      "We have send you and email that the product has been deleted correctly",
    text: data.message,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR5-aktgHItDjLDmdPdsxCkN3jQCxA_YEMxg&s",
  });
  updateProductList(data.products);
});