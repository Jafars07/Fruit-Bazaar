let verifiedEmail = null;

/* SEND OTP */
document.getElementById("sendOtpBtn")
.addEventListener("click", () => {

    const username =
        document.getElementById("username").value.trim();

    const btn =
        document.getElementById("sendOtpBtn");

    const status =
        document.getElementById("statusMessage");

    if (!username) {

        showToast(
            "Please enter your email",
            "warning"
        );

        return;
    }

    btn.disabled = true;

    btn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>Checking Email...';

    status.innerHTML =
        '<span class="text-warning">⏳ Checking email...</span>';

    setTimeout(() => {

        status.innerHTML =
            '<span class="text-info">📨 Sending OTP...</span>';

    }, 1000);

    fetch("/api/auth/send-registration-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username
        })
    })

    .then(async res => {

        const message = await res.text();

        if (!res.ok) {
            throw new Error(message);
        }

        return message;
    })

    .then(() => {

        btn.disabled = false;

        status.innerHTML =
            '<span class="text-success">✅ OTP Sent Successfully</span>';

        showToast(
            "OTP sent successfully 📩",
            "success"
        );

        document.getElementById("username")
            .readOnly = true;

        document.getElementById("emailSection")
            .style.display = "none";

        document.getElementById("sendOtpBtn")
            .style.display = "none";

        document.getElementById("step1")
            .classList.remove("active");

        document.getElementById("step1")
            .classList.add("completed");

        document.getElementById("step2")
            .classList.add("active");

        const otpSection =
            document.getElementById("otpSection");

        otpSection.style.display = "block";

        setTimeout(() => {
            otpSection.classList.add("show-step");
        }, 100);

    })

    .catch(error => {

        btn.disabled = false;

        btn.innerHTML = "Send OTP";

        status.innerHTML = "";

        if (error.message === "USER_ALREADY_EXISTS") {

            showToast(
                "Account already exists. Please login.",
                "warning"
            );

        } else if (error.message === "Enter valid email") {

            showToast(
                "Please enter a valid email address.",
                "warning"
            );

        } else {

            showToast(
                "Unable to send OTP",
                "error"
            );

        }

    });

});


/* VERIFY OTP */
document.getElementById("verifyOtpBtn")
.addEventListener("click", () => {

    const username =
        document.getElementById("username").value;

    const otp =
        document.getElementById("otp").value.trim();

    const btn =
        document.getElementById("verifyOtpBtn");

    if (otp.length !== 4) {

        showToast(
            "Enter valid 4-digit OTP",
            "warning"
        );

        return;
    }

    btn.disabled = true;

    fetch("/api/auth/verify-registration-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            otp: otp
        })
    })

    .then(res => {

        if (!res.ok) {
            throw new Error();
        }

        return res.text();
    })

    .then(() => {

        btn.disabled = false;

        verifiedEmail = username;

        showToast(
            "OTP verified successfully ✅",
            "success"
        );

        /* Hide OTP Step */
        document.getElementById("otpSection")
            .style.display = "none";

        /* Progress */
        document.getElementById("step2")
            .classList.remove("active");

        document.getElementById("step2")
            .classList.add("completed");

        document.getElementById("step3")
            .classList.add("active");

        /* Show Password Section */
        const passwordSection =
            document.getElementById("passwordSection");

        passwordSection.style.display = "block";

        setTimeout(() => {
            passwordSection.classList.add("show-step");
        }, 100);

    })

    .catch(() => {

        btn.disabled = false;

        showToast(
            "Invalid OTP",
            "error"
        );

    });

});


/* REGISTER */
document.getElementById("registerForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (!verifiedEmail) {

        showToast(
            "Verify email first",
            "warning"
        );

        return;
    }

    if (password.length < 6) {

        showToast(
            "Password must be at least 6 characters",
            "warning"
        );

        return;
    }

    if (password !== confirmPassword) {

        showToast(
            "Passwords do not match",
            "warning"
        );

        return;
    }

    const user = {

        username: verifiedEmail,
        password: password

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
            throw new Error();
        }

        return res.text();
    })

    .then(() => {

        document.getElementById("step3")
            .classList.remove("active");

        document.getElementById("step3")
            .classList.add("completed");

        document.getElementById("step4")
            .classList.add("active");

        showToast(
            "Welcome to Fruit Bazaar 🎉",
            "success"
        );

        setTimeout(() => {

            window.location.href = "/login";

        }, 2000);

    })

    .catch(() => {

        showToast(
            "Registration Failed",
            "error"
        );

    });

});


/* PASSWORD TOGGLE */
function togglePassword(id) {

    const input =
        document.getElementById(id);

    const icon =
        input.parentElement.querySelector("i");

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


/* OTP NUMBERS ONLY */
document.getElementById("otp")
.addEventListener("input", function () {

    this.value =
        this.value.replace(/[^0-9]/g, "");

});