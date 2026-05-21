document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();
        const department = document.getElementById("department").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find(u => u.email === email);

        if (exists) {
            alert("User already exists!");
            return;
        }

        const newUser = {
            name,
            email,
            phone,
            password,
            department,
            role: "user"
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration Successful!");
        form.reset();

        window.location.href = "login.html";
    });
});