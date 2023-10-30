document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("username").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";
});


async function register() {
    const userName = document.getElementById("username").value;
    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const errorMessage = document.getElementById("error-message");

    if (userPassword !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
    }

    const userInfo = {
        firstName,
        lastName,
        phone
    };

    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect') || "/";

    try {
        const response = await fetch(`/api/addUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName,
                userEmail,
                userPassword,
                userInfo
            }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = redirectUrl;
        } else {
            errorMessage.textContent = data.message || "Error registering.";
            errorMessage.style.display = "block";
        }
    } catch (error) {
        errorMessage.textContent = "There was a problem registering: " + error.message;
        errorMessage.style.display = "block";
    }
}
