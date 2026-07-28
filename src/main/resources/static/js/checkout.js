document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("checkoutForm")
        .addEventListener("submit", placeOrder);

});

function placeOrder(e) {

    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {

        showToast(
            "Please login first",
            "error"
        );

        return;
    }

    const data = {

        customerName:
            document.getElementById("customerName").value.trim(),

        phone:
            document.getElementById("phone").value.trim(),

        address:
            document.getElementById("address").value.trim()
    };

    // validation

    if (
        !data.customerName ||
        !data.phone ||
        !data.address
    ) {

        showToast(
            "Please fill all fields",
            "error"
        );

        return;
    }

    // show loading

    document
        .getElementById("loadingOverlay")
        .classList.remove("d-none");

    document
        .getElementById("placeOrderBtn")
        .disabled = true;

    fetch(`/api/orders/place/${userId}`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    })

    .then(res => {

        if (!res.ok) {
            throw new Error("Order Failed");
        }

        return res.json();
    })

    .then(order => {

        showToast(
            `Order #${order.id} placed successfully`,
            "success"
        );

        setTimeout(() => {

            window.location.href =
                "/my-orders";

        }, 1500);

    })

    .catch(error => {

        console.error(error);

        document
            .getElementById("loadingOverlay")
            .classList.add("d-none");

        document
            .getElementById("placeOrderBtn")
            .disabled = false;

        showToast(
            "Failed to place order",
            "error"
        );

    });

}

// =====================
// TOAST
// =====================

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

    const toast =
        new bootstrap.Toast(toastEl, {
            delay: 2500
        });

    toast.show();
}

// =====================
// LOGOUT
// =====================

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