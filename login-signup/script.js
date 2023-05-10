const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

loginForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const username = loginForm.elements["username"].value;
	const password = loginForm.elements["password"].value;
	// Add your login logic here
});

signupForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const username = signupForm.elements["new-username"].value;
	const password = signupForm.elements["new-password"].value;
	// Add your signup logic here
});
