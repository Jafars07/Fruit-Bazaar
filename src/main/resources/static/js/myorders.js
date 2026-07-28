document.addEventListener("DOMContentLoaded", loadOrders);

function loadOrders() {

    const userId = localStorage.getItem("userId");

    if (!userId || userId === "null") {
        alert("Please login first");
        window.location.href = "/login";
        return;
    }

    fetch(`/api/orders/user/${userId}`)
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("ordersContainer");
            container.innerHTML = "";

			if (!data || data.length === 0) {

			    container.innerHTML = `
			        <div class="empty-orders">

			            <div style="font-size:70px">
			       
			            </div>

			            <h3>No Orders Yet</h3>

			            <p>
			                Start shopping and your orders will appear here.
			            </p>

			            <a href="/products" class="btn btn-success mt-2">
			                Browse Products
			            </a>

			        </div>
			    `;

			    return;
			}

            data.forEach(order => {

				container.innerHTML += `
				<div class="order-card">

				    <div class="d-flex justify-content-between align-items-start flex-wrap">

				        <div>

				            <div class="order-id">
				                Order #${order.id}
				            </div>

				            <div class="order-date">
				                📅 ${order.orderDate || "N/A"}
				                ${order.orderTime || ""}
				            </div>

				        </div>

						<span class="
						status
						${order.status === 'DELIVERED' ? 'status-delivered' :
						  order.status === 'PENDING' ? 'status-pending' :
						  'status-cancelled'}
						">
						    ${order.status}
						</span>

				    </div>

				    <hr>

				    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">

				        <div class="order-total">
				            ₹${order.totalAmount}
				        </div>

				        <button
				            class="btn btn-success"
				            onclick="viewOrder(${order.id})">

				            View Items

				        </button>

				    </div>

				</div>
				`;
            });
        })
        .catch(err => console.log(err));
}

// 🔍 VIEW ITEMS
function viewOrder(orderId) {
    window.location.href = `/order-details?orderId=${orderId}`;
}

// 🔓 LOGOUT
function logout() {
    localStorage.removeItem("userId");
    window.location.href = "/login";
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