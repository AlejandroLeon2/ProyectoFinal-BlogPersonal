document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const validEmail = 'admin00@gmail.com';
    const validPassword = 'adminblog00';

    if (email === validEmail && password === validPassword) {
        alert('Login exitoso!');
        window.location.href = 'dashboard.html'; 
    } else {
        alert('Correo o contraseña incorrectos.');
    }
});
