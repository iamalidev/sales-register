document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const costPriceInput = document.getElementById("cost-price");
  const purchasedQtyInput = document.getElementById("purchased-qty");
  const sellingPriceInput = document.getElementById("selling-price");
  const sellingQtyInput = document.getElementById("selling-qty");
  const addButton = document.getElementById("add-btn");
  const cardsWrapper = document.querySelector(".cards-wrapper");
  const profitAllProducts = document.querySelector(".total-price");

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let totalProfit = parseFloat(localStorage.getItem("totalProfit")) || 0;

  function renderProducts() {
    cardsWrapper.innerHTML = "";
    products.forEach((product, index) => {
      const profit = (product.sellingPrice - product.costPrice) * product.sellingQty;
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          <div class="card-info">
            <p class="product-name">Name: <b>${product.name}</b></p>
            <p class="product-name">Cost price: <b>$${product.costPrice}</b></p>
            <p class="product-name">Purchased qty: <b>${product.purchasedQty}</b></p>
            <p class="product-name">Selling price: <b>$${product.sellingPrice}</b></p>
            <p class="product-name">Selling qty: <b>${product.sellingQty}</b></p>
          </div>
          <div class="actions">
            <button class="action-btn delete-btn" data-index="${index}">
              <i class="fa fa-trash-o"></i>
            </button>
            <div class="product-profit">
              <p>Profit:</p>
              <span>$${profit}</span>
            </div>
          </div>
        `;
      cardsWrapper.appendChild(card);
    });
    profitAllProducts.textContent = `$${totalProfit}`;
  }

  function updateLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("totalProfit", totalProfit.toString());
  }

  addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const costPrice = parseInt(costPriceInput.value);
    const purchasedQty = parseInt(purchasedQtyInput.value);
    const sellingPrice = parseInt(sellingPriceInput.value);
    const sellingQty = parseInt(sellingQtyInput.value);

    if (!name || !costPrice || !purchasedQty || !sellingPrice || !sellingQty || purchasedQty < sellingQty) {
      return alert("Please fill all fields correctly!");
    }

    const profit = (sellingPrice - costPrice) * sellingQty;
    totalProfit += profit;

    products.push({ name, costPrice, purchasedQty, sellingPrice, sellingQty });
    updateLocalStorage();
    renderProducts();

    nameInput.value = "";
    costPriceInput.value = "";
    purchasedQtyInput.value = "";
    sellingPriceInput.value = "";
    sellingQtyInput.value = "";
  });

  cardsWrapper.addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn")) {
      const index = e.target.closest(".delete-btn").dataset.index;
      const profit = (products[index].sellingPrice - products[index].costPrice) * products[index].sellingQty;
      totalProfit -= profit;
      products.splice(index, 1);
      updateLocalStorage();
      renderProducts();
    }
  });

  renderProducts();
});
