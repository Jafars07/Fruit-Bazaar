const params =
    new URLSearchParams(window.location.search);

const isAdmin =
    params.get("admin") === "true";
	if(isAdmin){

	    const navbar =
	        document.querySelector(".navbar");

	    if(navbar){
	        navbar.style.display = "none";
	    }

	    document.getElementById(
	        "adminBackButton"
	    ).style.display = "block";
	}
document.addEventListener("DOMContentLoaded", loadOrderItems);

function loadOrderItems() {

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");
	loadOrderInfo(orderId);

    if (!orderId) {
        alert("Invalid order");
        return;
    }

    fetch(`/api/orders/items/${orderId}`)
        .then(res => res.json())
        .then(items => {

            const container = document.getElementById("orderItems");
            const totalEl = document.getElementById("orderTotal");

            container.innerHTML = "";

            let total = 0;

            if (!items || items.length === 0) {
                container.innerHTML = "<h5>No items found</h5>";
                totalEl.innerText = 0;
                return;
            }

            items.forEach(item => {

                const itemTotal = item.price * item.quantity;
                total += itemTotal;

				container.innerHTML += `
				<div class="col-12">

				    <div class="card order-card p-3">

				        <div class="d-flex justify-content-between align-items-start">

				            <div>

				                <h5 class="fw-bold mb-2">
				                    ${item.name}
				                </h5>

				                <p class="text-muted mb-2">
				                    ₹${item.price} × ${item.quantity}
				                </p>

				                <span class="qty-badge">
				                    Qty: ${item.quantity}
				                </span>

				            </div>

				            <h5 class="price">
				                ₹${itemTotal}
				            </h5>

				        </div>

				    </div>

				</div>
				`;
            });

            // ✅ THIS IS IMPORTANT
            totalEl.innerText = total;

        })
        .catch(err => {
            console.log(err);
        });
}

// BACK BUTTON
function goBack() {
    window.history.back();
}

function loadOrderInfo(orderId) {

    fetch(`/api/orders/${orderId}`)
        .then(res => res.json())
        .then(order => {

            document.getElementById("orderInfo").innerHTML = `

                <div class="row">

                    <div class="col-md-6">

                        <h5>
                            Order #${order.id}
                        </h5>

                        <p class="mb-1">
                            📅 ${order.orderDate}
                        </p>

                        <p class="mb-0">
                            ⏰ ${order.orderTime}
                        </p>

                    </div>

                    <div class="col-md-6 text-md-end">

                        <span class="badge bg-success px-3 py-2">
                            ${order.status}
                        </span>

                    </div>

                </div>

                <hr>

                <h6>
                    👤 ${order.customerName}
                </h6>

                <p class="mb-1">
                    📞 ${order.phone}
                </p>

                <p class="mb-0">
                    📍 ${order.address}
                </p>

            `;
        });
}


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