document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación de credenciales
    if (email === 'admin00@gmail.com' && password === 'adminblog00') {
        window.location.href = 'dashboard.html';
    } else {
        alert('Credenciales incorrectas');
    }
});