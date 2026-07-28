fetch("/api/products/all")
.then(res => res.json())
.then(products => {

    const box =
        document.getElementById("featuredProducts");

    box.innerHTML = "";

    products
        .filter(p => p.featured)

        .forEach(p => {

			box.innerHTML += `
			<div class="col-12 col-sm-6 col-md-4">

			    <div class="product-card">

			        <div class="product-img">

			            <img src="${p.imageUrl}"
			                 onerror="this.src='/images/no-image.png'">

			            <span class="fruit-tag">
			                Fresh
			            </span>

			        </div>

					<div class="product-content">

					    <h4>${p.name}</h4>

					    <div class="product-rating">
					        ⭐⭐⭐⭐⭐
					    </div>

					    <div class="stock-badge">
					        ✓ In Stock
					    </div>

					    <div class="price-row">

					        <span class="price">
					            ₹${p.price}
					        </span>

					        <span class="unit">
					            / ${p.unit}
					        </span>

					    </div>

					    <div class="product-meta">
					        🚚 Same Day Delivery
					    </div>

					    <button
					        class="buy-btn"
					        onclick="buyNow()">

					        🛒 Add To Cart

					    </button>

					</div>

			    </div>

			</div>
			`;
        });

});


/*HAmaberger return state*/
document.addEventListener("click", function (event) {

    const navbarCollapse =
        document.getElementById("navBar");

    const navbarToggler =
        document.querySelector(".navbar-toggler");

    if (
        navbarCollapse.classList.contains("show") &&
        !navbarCollapse.contains(event.target) &&
        !navbarToggler.contains(event.target)
    ) {

        bootstrap.Collapse
            .getInstance(navbarCollapse)
            .hide();
    }
});

function buyNow() {

    const userId = localStorage.getItem("userId");

    if (!userId || userId === "null") {

        showToast("Please login first", "error");

        setTimeout(() => {
            window.location.href = "/login";
        }, 1000);

        return;
    }

    // logged in → products page
    window.location.href = "/products";
}