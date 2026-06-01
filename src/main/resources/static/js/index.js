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

                <div class="card product-card h-100 text-center">

                    <img src="${p.imageUrl}"
                         class="card-img-top"
                         onerror="this.src='/images/no-image.png'">

                    <div class="card-body">

                        <h5>${p.name}</h5>

                        <p>
                           ₹${p.price}
                           / ${p.unit}
                        </p>

						<button
						   class="btn btn-success btn-sm"
						   onclick="buyNow()">
						   Buy
						</button>

                    </div>

                </div>

            </div>
            `;
        });

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