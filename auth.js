document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        // admin login
        if (email === "admin@gmail.com" && password === "admin123") {
            localStorage.setItem("currentUser", JSON.stringify({
                name: "Admin",
                email: email,
                role: "admin"
            }));

            alert("Admin Login Successful");
            window.location.href = "admin.html";
            return;
        }

        // user login
        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            alert("Invalid Email or Password");
            return;
        }

        user.role = "user";
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login Successful");
        window.location.href = "dashboard.html";
    });
});