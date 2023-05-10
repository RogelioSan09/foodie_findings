// Define the registered users array to keep track of registered users
const registeredUsers = [
	{ username: "user1", password: "password1" },
	{ username: "user2", password: "password2" },
	{ username: "user3", password: "password3" },
];

// Get the login and signup forms by their IDs
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// Add an event listener to the login form submit button
loginForm.addEventListener("submit", (event) => {
	// Prevent the form from submitting and refreshing the page
	event.preventDefault();

	// Get the values of the username and password inputs
	const username = loginForm.elements["username"].value;
	const password = loginForm.elements["password"].value;

	// Find the user in the registered users array based on the entered username and password
	const user = registeredUsers.find(user => user.username === username && user.password === password);

	// If a user is found, log them in successfully, otherwise show an error message
	if (user) {
		console.log(`User ${username} logged in successfully`);
	} else {
		console.log("Invalid username or password");
	}
});

// Add an event listener to the signup form submit button
signupForm.addEventListener("submit", (event) => {
	// Prevent the form from submitting and refreshing the page
	event.preventDefault();


	// Get the values of the new username and password inputs
	const username = signupForm.elements["new-username"].value;
	const password = signupForm.elements["new-password"].value;

	// Check if the entered username already exists in the registered users array
	const userExists = registeredUsers.some(user => user.username === username);


	// If the username already exists, show an error message, otherwise add the new user to the registered users array
	if (userExists) {
		console.log("Username already exists");
	} else {
		registeredUsers.push({ username, password });
		console.log(`User ${username} registered successfully`);
	}
});