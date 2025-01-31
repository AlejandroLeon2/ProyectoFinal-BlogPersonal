document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('postsContainer');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    const publishedPosts = posts.filter(post => post.status === 'published');

    if (publishedPosts.length === 0) {
        postsContainer.innerHTML = '<p class="no-posts">No hay artículos disponibles.</p>';
        return;
    }

    postsContainer.innerHTML = publishedPosts.map(post => `
        <article class="post-card">
            <img src="${post.image}" alt="${post.title}" class="post-imagen">
            <div class="post-contenido">
                <span class="post-categoria">${post.category}</span>
                <h3 class="post-titulo">${post.title}</h3>
                <p class="post-descripcion">${post.description}</p>
                <a href="post.html?id=${post.id}" class="boton-leer-mas">Leer más</a>
            </div>
        </article>
    `).join('');
});