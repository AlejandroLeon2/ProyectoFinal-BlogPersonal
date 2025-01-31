let posts = JSON.parse(localStorage.getItem('posts')) || [];
let editingPostId = null;

function showEditor() {
    document.getElementById('editorContainer').style.display = 'block';
    document.getElementById('postsGrid').style.display = 'none';
    document.getElementById('statsContainer').style.display = 'none';
}

function showPosts() {
    document.getElementById('editorContainer').style.display = 'none';
    document.getElementById('postsGrid').style.display = 'block';
    document.getElementById('statsContainer').style.display = 'none';
    renderPosts();
}

function showStats() {
    document.getElementById('editorContainer').style.display = 'none';
    document.getElementById('postsGrid').style.display = 'none';
    document.getElementById('statsContainer').style.display = 'block';
    updateStats();
}

function updateStats() {
    const totalPosts = posts.length;
    const publishedPosts = posts.filter(p => p.status === 'published').length;
    const draftPosts = totalPosts - publishedPosts;
    const totalWords = posts.reduce((sum, post) => sum + (post.content.split(/\s+/).length || 0), 0);
    const averageWords = totalPosts ? Math.round(totalWords / totalPosts) : 0;

    document.getElementById('generalStats').innerHTML = `
        <p>📝 Total posts: ${totalPosts}</p>
        <p>📤 Publicados: ${publishedPosts}</p>
        <p>📄 Borradores: ${draftPosts}</p>
        <p>📚 Palabras totales: ${totalWords}</p>
        <p>⏱️ Promedio por post: ${averageWords} palabras</p>
    `;
}

function savePost() {
    const title = document.getElementById('postTitle').value;
    const description = document.getElementById('postDescription').value;
    const image = document.getElementById('postImage').files[0];
    const category = document.getElementById('postCategory').value;
    const content = quill.root.innerHTML;

    const errors = [];
    if (!title) errors.push("El título es obligatorio");
    if (!description) errors.push("La descripción es obligatoria");
    if (!image) errors.push("La imagen de portada es obligatoria");
    if (!category) errors.push("La categoría es obligatoria");
    if (!content) errors.push("El contenido no puede estar vacío");
    
    document.getElementById('formErrors').innerHTML = errors.map(e => `
        <div style="color: red; margin: 5px 0;">⚠️ ${e}</div>
    `).join('');

    if (errors.length > 0) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const post = {
            id: editingPostId || Date.now(),
            title,
            description,
            image: e.target.result,
            category,
            content,
            date: new Date().toLocaleString(),
            status: 'draft'
        };

        if (editingPostId) {
            const index = posts.findIndex(p => p.id === editingPostId);
            posts[index] = post;
        } else {
            posts.push(post);
        }

        localStorage.setItem('posts', JSON.stringify(posts));
        clearEditor();
        showPosts();
    };
    reader.readAsDataURL(image);
}

function clearEditor() {
    document.getElementById('postForm').reset();
    document.getElementById('formErrors').innerHTML = '';
    quill.root.innerHTML = '';
    editingPostId = null;
}

function renderPosts() {
    const postsTableBody = document.getElementById('postsTableBody');
    postsTableBody.innerHTML = '';

    posts.forEach(post => {
        const postRow = document.createElement('tr');
        postRow.innerHTML = `
            <td>${post.title}</td>
            <td>${post.description}</td>
            <td>${post.category}</td>
            <td>
                <button class="btn btn-edit" onclick="editPost(${post.id})">Editar</button>
                <button class="btn btn-danger" onclick="deletePost(${post.id})">Eliminar</button>
                <button class="btn" onclick="toggleStatus(${post.id})">${post.status === 'draft' ? 'Publicar' : 'Despublicar'}</button>
            </td>
        `;
        postsTableBody.appendChild(postRow);
    });
}

function editPost(id) {
    const post = posts.find(p => p.id === id);
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postDescription').value = post.description;
    document.getElementById('postCategory').value = post.category;
    quill.root.innerHTML = post.content;
    editingPostId = id;
    showEditor();
}

function deletePost(id) {
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
}

function toggleStatus(id) {
    const post = posts.find(p => p.id === id);
    post.status = post.status === 'draft' ? 'published' : 'draft';
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
}

// Inicialización
showPosts();
