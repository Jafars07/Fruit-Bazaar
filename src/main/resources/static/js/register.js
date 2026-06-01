document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
	
    .then(res => {
        if (!res.ok) {
            throw new Error("User already exists");
        }
        return res.text();
    })
	
    .then(data => {

        // ✅ success toast stays
        showToast("Registered successfully! Please login", "success");

        console.log(data);

        // optional redirect after 2 sec
        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);

    })
    .catch(() => {

        showToast(
            "Registration failed - User Exists With This ID",
            "error"
        );

    });
});


// Password eye
function togglePassword(id) {

    const input = document.getElementById(id);
    const icon = input.parentElement.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}