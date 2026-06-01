function applyTheme() {

    const btn =
        document.getElementById("themeBtn");

    // always default light
    document.body.classList.remove("dark-mode");

    if (btn) {
        btn.innerText = "🌙";
    }
}

function toggleTheme() {

    const btn =
        document.getElementById("themeBtn");

    document.body.classList.toggle("dark-mode");

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        if (btn) {
            btn.innerText = "☀️";
        }

    } else {

        if (btn) {
            btn.innerText = "🌙";
        }
    }
}

document.addEventListener(
    "DOMContentLoaded",
    applyTheme
);