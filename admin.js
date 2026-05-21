
// =====================
// INIT / SECURITY CHECK
// =====================
document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || user.role !== "admin") {
        window.location.href = "login.html";
        return;
    }

    showAdminSection("dashboard");
    loadAll();

    setInterval(loadAll, 1000);
});


// =====================
// HAMBURGER MENU
// =====================
function toggleMenu(){

    const btn = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    if(btn) btn.classList.toggle("active");
    if(sidebar) sidebar.classList.toggle("show");
}


// =====================
// LOAD ALL DATA
// =====================
function loadAll(){
    loadQueue();
    loadStats();
    loadPatients();
    loadDoctors();
    loadAppointments();
}


// =====================
// SECTION SWITCH
// =====================
function showAdminSection(section){

    document.querySelectorAll(".adminSection").forEach(sec => {
        sec.style.display = "none";
    });

    const target = document.getElementById(section + "Section");

    if(target){
        target.style.display = "block";
    }
}


// =====================
// QUEUE
// =====================
function loadQueue(){

    const queue = JSON.parse(localStorage.getItem("queue")) || [];
    const table = document.getElementById("queueTable");

    if(!table) return;

    table.innerHTML = "";

    queue.forEach(q => {
        table.innerHTML += `
            <tr>
                <td>${q.token}</td>
                <td>${q.name}</td>
                <td>${q.status}</td>
            </tr>
        `;
    });
}

function nextPatient(){

    let queue = JSON.parse(localStorage.getItem("queue")) || [];

    queue.forEach(q => {
        if(q.status === "serving"){
            q.status = "completed";
        }
    });

    const next = queue.find(q => q.status === "waiting");

    if(next){
        next.status = "serving";
    }

    localStorage.setItem("queue", JSON.stringify(queue));

    loadAll();
}

function resetQueue(){
    localStorage.removeItem("queue");
    loadAll();
}


// =====================
// STATS
// =====================
function loadStats(){

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const queue = JSON.parse(localStorage.getItem("queue")) || [];
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    const totalPatients = document.getElementById("totalPatients");
    const activeQueue = document.getElementById("activeQueue");
    const totalDoctors = document.getElementById("totalDoctors");

    if(totalPatients) totalPatients.innerText = users.length;
    if(activeQueue) activeQueue.innerText = queue.length;
    if(totalDoctors) totalDoctors.innerText = doctors.length;
}


// =====================
// PATIENTS
// =====================
function loadPatients(){

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const box = document.getElementById("patientList");

    if(!box) return;

    box.innerHTML = "";

    users.forEach(u => {
        box.innerHTML += `<p>${u.name} - ${u.email}</p>`;
    });
}

function clearCompletedPatients(){

    let queue = JSON.parse(localStorage.getItem("queue")) || [];

    queue = queue.filter(q => q.status !== "completed");

    localStorage.setItem("queue", JSON.stringify(queue));

    loadAll();
}


// =====================
// DOCTORS
// =====================
function loadDoctors(){

    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const box = document.getElementById("doctorList");

    if(!box) return;

    box.innerHTML = "";

    doctors.forEach(d => {
        box.innerHTML += `<p>${d.name} - ${d.expertise}</p>`;
    });
}

function addDoctor(){

    const name = document.getElementById("doctorName");
    const expertise = document.getElementById("doctorExpertise");

    if(!name.value || !expertise.value){
        alert("Fill all fields");
        return;
    }

    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    doctors.push({
        name: name.value,
        expertise: expertise.value
    });

    localStorage.setItem("doctors", JSON.stringify(doctors));

    name.value = "";
    expertise.value = "";

    loadAll();
}

function clearDoctors(){
    localStorage.removeItem("doctors");
    loadAll();
}


// =====================
// APPOINTMENTS
// =====================
function loadAppointments(){

    const queue = JSON.parse(localStorage.getItem("queue")) || [];
    const box = document.getElementById("appointmentList");

    if(!box) return;

    box.innerHTML = "";

    queue.forEach(q => {
        box.innerHTML += `<p>${q.token} - ${q.name} - ${q.status}</p>`;
    });
}


// =====================
// SETTINGS
// =====================
function clearUsers(){
    localStorage.removeItem("users");
    loadAll();
    alert("All users deleted");
}

function systemReset(){
    localStorage.clear();
    window.location.href = "index.html";
}


// =====================
// LOGOUT
// =====================
function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}


// =====================
// EXPORT FUNCTIONS TO HTML
// =====================
window.toggleMenu = toggleMenu;
window.showAdminSection = showAdminSection;
window.nextPatient = nextPatient;
window.resetQueue = resetQueue;
window.addDoctor = addDoctor;
window.clearDoctors = clearDoctors;
window.clearUsers = clearUsers;
window.systemReset = systemReset;
window.logout = logout;
window.clearCompletedPatients = clearCompletedPatients;