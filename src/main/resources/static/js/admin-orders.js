document.addEventListener("DOMContentLoaded", () => {

    loadOrders();

    const searchBox = document.getElementById("searchOrders");

    if (searchBox) {

        searchBox.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            document
                .querySelectorAll(".order-card")
                .forEach(card => {

                    const text = card.innerText.toLowerCase();

                    card.parentElement.style.display =
                        text.includes(value)
                            ? ""
                            : "none";
                });
        });
    }
});
let allOrders = [];

function loadOrders() {

    fetch("/api/orders")
        .then(res => res.json())
        .then(data => {

            const container =
                document.getElementById("ordersContainer");

            container.innerHTML = "";

            if (!data || data.length === 0) {

                container.innerHTML = `
                    <div class="text-center text-muted py-5">
                        <h4>No Orders Found</h4>
                    </div>
                `;

                return;
            }
			allOrders = data;

            /* DASHBOARD COUNTS */

            const totalOrders = data.length;

            const deliveredOrders =
                data.filter(o => o.status === "DELIVERED").length;

            const placedOrders =
                data.filter(o => o.status === "PLACED").length;

            updateRevenue();
            const totalOrdersEl =
                document.getElementById("totalOrders");

            const placedOrdersEl =
                document.getElementById("placedOrders");

            const deliveredOrdersEl =
                document.getElementById("deliveredOrders");

            const revenueEl =
                document.getElementById("totalRevenue");

            if (totalOrdersEl)
                totalOrdersEl.innerText = totalOrders;

            if (placedOrdersEl)
                placedOrdersEl.innerText = placedOrders;

            if (deliveredOrdersEl)
                deliveredOrdersEl.innerText = deliveredOrders;

            updateRevenue();


            /* RENDER ORDERS */

			renderOrders(data);
        })
        .catch(err => {

            console.error(err);

            document.getElementById("ordersContainer").innerHTML = `
                <div class="text-center text-danger py-5">
                    Failed to load orders
                </div>
            `;
        });
}

//revenue Calculations
function updateRevenue() {

    const revenueFilter =
        document.getElementById("revenueFilter");

    if(!revenueFilter) return;

    const filter = revenueFilter.value;

    const today = new Date();

    let filteredOrders = allOrders;

    if(filter === "today") {

        filteredOrders =
        allOrders.filter(o => {

            const orderDate =
            new Date(o.orderDate);

            return (
                orderDate.toDateString() ===
                today.toDateString()
            );
        });

    } else if(filter === "week") {

        const weekAgo = new Date();

        weekAgo.setDate(today.getDate() - 7);

        filteredOrders =
        allOrders.filter(o =>
            new Date(o.orderDate) >= weekAgo
        );

    } else if(filter === "month") {

        filteredOrders =
        allOrders.filter(o => {

            const d =
            new Date(o.orderDate);

            return (
                d.getMonth() === today.getMonth()
                &&
                d.getFullYear() === today.getFullYear()
            );
        });
    }

    const revenue =
        filteredOrders.reduce(
            (sum,o) =>
                sum + (o.totalAmount || 0),
            0
        );

    document.getElementById(
        "totalRevenue"
    ).innerText =
    "₹" + revenue.toFixed(0);

    document.getElementById(
        "revenueLabel"
    ).innerText =
    revenueFilter.options[
        revenueFilter.selectedIndex
    ].text + " Revenue";
}
/*render order*/

function renderOrders(orders) {

    const container =
        document.getElementById("ordersContainer");

    container.innerHTML = "";

    orders.forEach(order => {

        const statusColor =
            order.status === "DELIVERED"
                ? "bg-success"
                : order.status === "PLACED"
                ? "bg-warning text-dark"
                : "bg-primary";

        container.innerHTML += `

        <div class="col-lg-6 col-md-12">

            <div class="order-card p-4">

                <div class="d-flex justify-content-between align-items-center">

                    <h5 class="fw-bold mb-0">
                        Order #${order.id}
                    </h5>

                    <span class="badge ${statusColor}">
                        ${order.status}
                    </span>

                </div>

                <hr>

                <p>
                    <i class="bi bi-person-fill text-success"></i>
                    <b>${order.customerName || "N/A"}</b>
                </p>

                <p>
                    <i class="bi bi-telephone-fill text-success"></i>
                    ${order.phone || "N/A"}
                </p>

                <p>
                    <i class="bi bi-geo-alt-fill text-success"></i>
                    ${order.address || "N/A"}
                </p>

                <hr>

                <p class="fw-bold text-success mb-1">
                    ₹${order.totalAmount}
                </p>

                <p class="text-muted mb-3">
                    ${order.orderDate} • ${order.orderTime}
                </p>

                <div class="d-flex gap-2 action-buttons">

                    <button
                        class="btn btn-outline-success flex-fill"
                        onclick="viewItems(${order.id})">

                        <i class="bi bi-eye"></i>
                        View Details

                    </button>

                    ${
                        order.status === "DELIVERED"

                        ? `
                        <button
                            class="btn btn-success flex-fill"
                            disabled>

                            <i class="bi bi-check-circle-fill"></i>
                            Delivered

                        </button>
                        `

                        : `
                        <button
                            class="btn btn-warning flex-fill"
                            onclick="markDelivered(${order.id})">

                            <i class="bi bi-truck"></i>
                            Deliver

                        </button>
                        `
                    }

                </div>

            </div>

        </div>
        `;
    });
}

function filterOrders(status){

    document
        .querySelectorAll(".order-filter-bar .btn")
        .forEach(btn =>
            btn.classList.remove("filter-active")
        );

    event.target.classList.add("filter-active");

    if(status === "ALL"){
        renderOrders(allOrders);
        return;
    }

    const filtered =
        allOrders.filter(
            order => order.status === status
        );

    renderOrders(filtered);
}


/* VIEW ITEMS */

function viewItems(orderId) {
    window.location.href =
        `/order-details?orderId=${orderId}&admin=true`;
}


/* MARK DELIVERED */

function markDelivered(orderId) {

    if (!confirm("Mark this order as delivered?")) {
        return;
    }

    fetch(`/api/orders/delivered/${orderId}`, {
        method: "PUT"
    })
        .then(res => {

            if (!res.ok) {
                throw new Error("Failed");
            }

            return res.json();
        })
        .then(() => {

            loadOrders();
        })
        .catch(err => {

            console.error(err);

            alert("Failed to update status");
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