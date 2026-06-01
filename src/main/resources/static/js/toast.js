function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.innerText = message;

    // center screen
    toast.style.position = "fixed";
    toast.style.top = "50%";
    toast.style.left = "50%";
    toast.style.transform = "translate(-50%, -50%)";

    toast.style.zIndex = "9999";

    // styling
    toast.style.padding = "14px 24px";
    toast.style.borderRadius = "12px";
    toast.style.color = "#fff";
    toast.style.fontWeight = "600";
    toast.style.fontSize = "15px";
    toast.style.textAlign = "center";
    toast.style.minWidth = "220px";
    toast.style.maxWidth = "90%";

    // shadow + blur
    toast.style.boxShadow =
        "0 8px 25px rgba(0,0,0,0.18)";
    toast.style.backdropFilter = "blur(6px)";

    // animation
    toast.style.opacity = "0";
    toast.style.transition =
        "all 0.35s ease";

    // colors
    if (type === "success") {
        toast.style.background =
            "linear-gradient(135deg,#28a745,#1f8f3b)";
    }
    else if (type === "error") {
        toast.style.background =
            "linear-gradient(135deg,#dc3545,#b02a37)";
    }
    else {
        toast.style.background =
            "linear-gradient(135deg,#444,#222)";
    }

    document.body.appendChild(toast);

    // fade in
    setTimeout(() => {
        toast.style.opacity = "1";
    }, 50);

    // fade out
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform =
            "translate(-50%, -55%)";
    }, 2000);

    // remove
    setTimeout(() => {
        toast.remove();
    }, 2500);
}