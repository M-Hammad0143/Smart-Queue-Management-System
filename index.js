

document.addEventListener("DOMContentLoaded", () => {

    // =============================
    // GO TO TOP BUTTON
    // =============================
    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }
});

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // =============================
    // FADE-IN ANIMATION
    // =============================
    const sections = document.querySelectorAll(".fade-up, .fade-down");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });


    // =============================
    // PROTECT NAV LINKS
    // =============================
    const dashboardLink = document.querySelector('a[href="dashboard.html"]');
    const adminLink = document.querySelector('a[href="admin.html"]');

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    dashboardLink.addEventListener("click", (e) => {
        if (!currentUser || currentUser.role !== "user") {
            e.preventDefault();
            alert("Please login as user first.");
            window.location.href = "login.html";
        }
    });

    adminLink.addEventListener("click", (e) => {
        if (!currentUser || currentUser.role !== "admin") {
            e.preventDefault();
            alert("Admin access only.");
            window.location.href = "login.html";
        }
    });

});

function toggleMenu(){
   document.querySelector(".menu-toggle").classList.toggle("active");

   const menu =
      document.querySelector(".sidebar") ||
      document.querySelector("nav");

   menu.classList.toggle("show");
}