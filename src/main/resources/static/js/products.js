// =========================
// LOAD PRODUCTS
// =========================

fetch("/api/products")
    .then(res => res.json())
    .then(products => {

        const container =
            document.getElementById("productList");

        container.innerHTML = "";

        products.forEach(p => {

            const card = `
            <div class="col-12 col-md-6 col-lg-4 mb-4">

                <div class="product-card">

                    <div class="product-img">

                        <img
                            src="${p.imageUrl || `https://via.placeholder.com/300?text=${p.name}`}"
                            alt="${p.name}"
                            onerror="this.src='/images/no-image.png'">

                        <span class="fruit-tag">
                            Fresh
                        </span>

                    </div>

                    <div class="product-content">

                        <h4 class="product-name">
                            ${p.name}
                        </h4>

                        <div class="product-rating">
                            ⭐⭐⭐⭐⭐
                        </div>

                        ${
                            p.available
                            ? `<div class="stock-badge">✓ In Stock</div>`
                            : `<div class="stock-badge text-danger">✗ Out of Stock</div>`
                        }

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
                            ${!p.available ? "disabled" : ""}
                            onclick='addToCart(${JSON.stringify(p)})'>

                            🛒 Add To Cart

                        </button>

                    </div>

                </div>

            </div>
            `;

            container.innerHTML += card;
        });
    })
    .catch(error => {

        console.error(error);

        showToast(
            "Failed to load products",
            "error"
        );
		updateCartCount();

    });


// =========================
// ADD TO CART
// =========================

function addToCart(product) {

    const userId =
        localStorage.getItem("userId");

    if (!userId || userId === "null") {

        showToast(
            "Please login first",
            "warning"
        );

        setTimeout(() => {

            window.location.href = "/login";

        }, 1000);

        return;
    }

    fetch("/api/cart/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            userId: parseInt(userId),
            productId: product.id,
            quantity: 1

        })

    })

    .then(res => {

        if (!res.ok) {
            throw new Error();
        }

        return res.json();

    })

	.then(() => {

	    showToast(
	        product.name + " added to cart!",
	        "success"
	    );

	    updateCartCount();

	})

    .catch(error => {

        console.error(error);

        showToast(
            "Failed to add item",
            "error"
        );

    });
}


// =========================
// TOAST
// =========================

function showToast(message, type = "success") {

    const toastEl =
        document.getElementById("liveToast");

    const toastMsg =
        document.getElementById("toastMsg");

    toastEl.classList.remove(
        "bg-success",
        "bg-danger",
        "bg-warning"
    );

    if (type === "success") {
        toastEl.classList.add("bg-success");
    }

    if (type === "error") {
        toastEl.classList.add("bg-danger");
    }

    if (type === "warning") {
        toastEl.classList.add("bg-warning");
    }

    toastMsg.innerText = message;

    const toast = new bootstrap.Toast(
        toastEl,
        {
            delay: 2000,
            autohide: true
        }
    );

    toast.show();
}


// =========================
// SEARCH PRODUCTS
// =========================

function filterProducts() {

    const searchValue =
        document.getElementById("searchBox")
        .value
        .toLowerCase()
        .trim();

    const products =
        document.querySelectorAll(
            "#productList > div"
        );

    products.forEach(product => {

        const productName =
            product.querySelector(".product-name")
            .innerText
            .toLowerCase();

        if (
            productName.includes(searchValue)
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}




//cart update
function updateCartCount() {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        document.getElementById("cartCount").innerText = "0";
        return;
    }

    fetch(`/api/cart/user/${userId}`)
        .then(res => res.json())
        .then(cartItems => {

            let count = 0;

            cartItems.forEach(item => {
                count += item.quantity;
            });

            document.getElementById("cartCount").innerText = count;
        })
        .catch(err => {

            console.log(err);

            document.getElementById("cartCount").innerText = "0";
        });
}
// =========================
// LOGOUT
// =========================

function logout() {

    localStorage.removeItem("userId");

    window.location.href = "/login";

}
updateCartCount();



