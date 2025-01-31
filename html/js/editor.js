var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link']
        ]
    }
});

function guardarContenido() {
    var contenido = quill.root.innerHTML;
    localStorage.setItem("blogPost", contenido);
    alert("Contenido guardado!");
}

function cargarContenido() {
    var contenido = localStorage.getItem("blogPost");
    if (contenido) {
        quill.root.innerHTML = contenido;
    } else {
        alert("No hay contenido guardado.");
    }
}

function limpiarContenido() {
    quill.root.innerHTML = "";
    localStorage.removeItem("blogPost");
}
