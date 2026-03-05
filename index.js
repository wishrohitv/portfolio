// Greeter
function called() {
    const hour = new Date().getHours();
    let greet_user = "";

    if (hour < 12) {
        greet_user = "Good Morning 🤩";
    } else if (hour < 16) {
        greet_user = "Good Afternoon 🥰";
    } else if (hour < 19) {
        greet_user = "Good Evening 😎";
    } else {
        greet_user = "Good Night 😴";
    }

    document.getElementById("greetings").innerText = `Hello, ${greet_user}`;
}

// text color changer
function changColor() {
    const colors = ["red", "green", "yellow", "purple", "skyblue", "pink"];
    const idx = Math.floor(Math.random() * colors.length);
    const elems = document.querySelectorAll(
        "#greetings, #table, #greetme, #changColor, #changbackColor, #about"
    );
    elems.forEach(el => el && (el.style.color = colors[idx]));
}

// background Color changer
function changBackgroundColor() {
    const gradients = [
        "linear-gradient(-45deg, #ee9952, #e74c7e, #29a6d5, #66d5ab)",
        "linear-gradient(-45deg, #e2c81f, #e20157, #23a6d5, #58e8c6)",
        "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
    ];
    const idx = Math.floor(Math.random() * gradients.length);
    document.getElementById("bck").style.background = gradients[idx];
}

// fetch popular GitHub repos and display
async function loadProjects(user, count = 5) {
    try {
        const resp = await fetch(`https://api.github.com/users/${user}/repos?sort=stars&per_page=${count}`);
        if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
        const repos = await resp.json();
        const container = document.getElementById('project-list');
        container.innerHTML = '';
        repos.forEach(r => {
            const a = document.createElement('a');
            a.href = r.html_url;
            a.target = '_blank';
            a.textContent = r.name + ' ⭐' + r.stargazers_count;
            const p = document.createElement('p');
            p.appendChild(a);
            container.appendChild(p);
        });
    } catch (e) {
        console.error('Failed to load repos', e);
        const container = document.getElementById('project-list');
        container.innerHTML = '<p>Unable to fetch repositories.</p>';
    }
}

// nav toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navClose = document.querySelector('.nav-close');

function updateNavToggleVisibility() {
    if (!navToggle) return;
    navToggle.style.display = window.innerWidth <= 600 ? '' : 'none';
}

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        mainNav.classList.remove('open');
    });
}

if (mainNav) {
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
        });
    });
}

window.addEventListener('resize', updateNavToggleVisibility);
window.addEventListener('DOMContentLoaded', updateNavToggleVisibility);

// run on startup
window.addEventListener('DOMContentLoaded', () => loadProjects('wishrohitv', 5));