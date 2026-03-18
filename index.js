function setGreeting() {
    const hour = new Date().getHours();
    let message = 'Hello, I’m Rohit — I build reliable web and mobile platforms.';

    if (hour < 12) message = 'Good morning — ready to build something scalable today?';
    else if (hour < 16) message = 'Good afternoon — let’s make efficient and maintainable systems.';
    else if (hour < 19) message = 'Good evening — optimizing backend APIs and app performance.';
    else message = 'Good night — I’m still refining code quality, one commit at a time.';

    const greetingEl = document.getElementById('greetings');
    if (greetingEl) greetingEl.textContent = message;
}

function toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
}

function applySavedTheme() {
    const saved = localStorage.getItem('portfolio-theme');
    const root = document.documentElement;
    if (saved === 'dark') root.setAttribute('data-theme', 'dark');
}

async function loadProjects(user, count = 5) {
    const container = document.getElementById('project-list');

    try {
        const resp = await fetch(`https://api.github.com/users/${user}/repos?sort=stars&per_page=${count}`);
        if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);

        const repos = await resp.json();
        container.innerHTML = '';

        repos.forEach(repo => {
            const card = document.createElement('article');
            card.className = 'project-card';

            const title = document.createElement('h3');
            title.textContent = repo.name;

            const desc = document.createElement('p');
            desc.textContent = repo.description ? repo.description : 'No description available.';

            const meta = document.createElement('p');
            meta.className = 'project-meta';
            meta.innerHTML = `<strong>★ ${repo.stargazers_count}</strong> · ${repo.language || 'Unknown'} · Updated ${new Date(repo.updated_at).toLocaleDateString()}`;

            const link = document.createElement('a');
            link.href = repo.html_url;
            link.target = '_blank';
            link.rel = 'noreferrer';
            link.textContent = 'View on GitHub';

            card.append(title, desc, meta, link);
            container.appendChild(card);
        });

        if (repos.length === 0) {
            container.innerHTML = '<p>No repository data found.</p>';
        }
    } catch (error) {
        console.error('Failed to load repos', error);
        container.innerHTML = '<p>Unable to fetch repositories right now. Please try again later.</p>';
    }
}

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navClose = document.querySelector('.nav-close');

function updateNavToggleVisibility() {
    if (!navToggle) return;
    navToggle.style.display = window.innerWidth <= 760 ? 'block' : 'none';
}

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
}

if (navClose) {
    navClose.addEventListener('click', () => mainNav.classList.remove('open'));
}

if (mainNav) {
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
}

window.addEventListener('resize', updateNavToggleVisibility);
window.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    setGreeting();
    loadProjects('wishrohitv', 6);
    updateNavToggleVisibility();

    const themeToggleEl = document.getElementById('themeToggle');
    if (themeToggleEl) {
        themeToggleEl.addEventListener('click', toggleTheme);
    }
});