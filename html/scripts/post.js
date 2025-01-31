document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = Number(urlParams.get('id')); // Convertir a número
    const postContent = document.getElementById('postContent');
    
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(p => p.id === postId); // Búsqueda numérica

    if (!post) {
        postContent.innerHTML = '<p class="error-post">⚠️ Artículo no encontrado</p>';
        return;
    }

    postContent.innerHTML = `
        <article class="post-completo">
            <h1 class="titulo-post">${post.title}</h1>
            <div class="post-meta">
                <span class="categoria-post">${post.category}</span>
                <time class="fecha-post">${post.date || 'Sin fecha'}</time>
            </div>
            <img src="${post.image}" alt="${post.title}" class="imagen-destacada">
            <div class="contenido-post ql-editor">${post.content}</div>
        </article>
    `;
});