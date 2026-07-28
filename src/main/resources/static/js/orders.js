document.addEventListener("DOMContentLoaded", loadOrderItems);

function loadOrderItems() {

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");

    if (!orderId) {
        alert("Invalid order");
        return;
    }

    fetch(`/api/order-items/${orderId}`)
        .then(res => res.json())
        .then(items => {

            const container = document.getElementById("orderItems");
            container.innerHTML = "";

            let total = 0;

            if (!items || items.length === 0) {
                container.innerHTML = "<h5>No items found</h5>";
                return;
            }

            items.forEach(item => {

                total += (item.price * item.quantity);

                container.innerHTML += `
                    <div class="card mb-2 p-2">
                        <h5>${item.name}</h5>
                        <p>₹${item.price} x ${item.quantity}</p>
                    </div>
                `;
            });

            document.getElementById("orderTotal").innerText = total;
        })
        .catch(err => console.error("Order items error:", err));
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