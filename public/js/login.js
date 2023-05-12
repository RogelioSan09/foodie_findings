// create a helper that stores user object into localStorage
function storeUser (user) {
    localStorage.setItem("user", JSON.stringify(user));
}

const loginFormHandler = async (event) => {
    event.preventDefault();
    // Gather the data from the form elements on the page
    const username = document.querySelector('#username-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();
  
    if (username && password) {
        // Send the e-mail and password to the server
        const response = await fetch('/api/user/login', {
            method: 'POST',
            mode: 'no-cors',
            body: new URLSearchParams({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        if (response.status === 200) {
            // if successful, store user object in localStorage
            storeUser(data);
            document.location.replace('/');
        } else {
            alert('Failed to log in.');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-register-input').value.trim();
    const password = document.querySelector('#password-register-input').value.trim();
  
    if (username && password) {
        const response = await fetch('/api/user/new', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: new URLSearchParams({ username, password }),
        });
        const data = await response.json();

        if (response.status === 200) {
            storeUser(data);
            document.location.replace('/');
        } else {
            alert('Failed to sign up. Please try again');
        }
    }
};

function init() {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', loginFormHandler);

    const signupForm = document.querySelector('#signup-form');
    signupForm.addEventListener('submit', signupFormHandler);
}

document.addEventListener('DOMContentLoaded', init);