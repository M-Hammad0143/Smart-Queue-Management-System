document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || user.role !== "user") {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("profileName").innerText = user.name;
    document.getElementById("profileEmail").innerText = user.email;
    document.getElementById("profilePhone").innerText = user.phone;
    document.getElementById("profileDepartment").innerText = user.department;

    let queue = JSON.parse(localStorage.getItem("queue")) || [];

    let myQueue = queue.find(q => q.email === user.email);

    if (!myQueue) {
        myQueue = {
            email: user.email,
            name: user.name,
            token: "Q" + String(queue.length + 1).padStart(3, "0"),
            status: "waiting"
        };

        queue.push(myQueue);
        localStorage.setItem("queue", JSON.stringify(queue));
    }

    document.getElementById("myToken").innerText = myQueue.token;

    const current = queue.find(q => q.status === "serving");
    document.getElementById("currentServing").innerText =
        current ? current.token : "None";

    const index = queue.findIndex(q => q.email === user.email);
    document.getElementById("waitingTime").innerText =
        (index * 5) + " mins";
});


function showSection(section) {
    document.getElementById("tokenSection").style.display = "none";
    document.getElementById("statusSection").style.display = "none";
    document.getElementById("profileSection").style.display = "none";

    document.getElementById(section + "Section").style.display = "block";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

window.showSection = showSection;
window.logout = logout;

function toggleMenu(){
   document.querySelector(".menu-toggle").classList.toggle("active");

   const menu =
      document.querySelector(".sidebar") ||
      document.querySelector("nav");

   menu.classList.toggle("show");
}