document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        formResponse.style.color = '#7209b7';
        formResponse.textContent = 'Sending message...';

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            const data = await res.json();

            if (data.success) {
                formResponse.style.color = '#2ec4b6';
                formResponse.textContent = data.message;
                contactForm.reset();
            } else {
                formResponse.style.color = '#f72585';
                formResponse.textContent = data.message;
            }
        } catch (error) {
            formResponse.style.color = '#f72585';
            formResponse.textContent = 'Something went wrong. Please try again.';
        }
    });

    // Refresh Projects Button
    document.getElementById('refreshProjects').addEventListener('click', () => {
        fetchProjects();
    });
});

async function fetchProjects() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '<p style="color: var(--text-dim)">Loading project cases...</p>';

    try {
        const res = await fetch('/api/projects');
        const data = await res.json();

        if (data.success && data.projects.length > 0) {
            container.innerHTML = '';
            data.projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <div class="project-category">${project.category}</div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tags">
                        ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                `;
                container.appendChild(card);
            });
        }
    } catch (err) {
        container.innerHTML = '<p style="color: #f72585">Failed to fetch projects from backend server.</p>';
    }
}