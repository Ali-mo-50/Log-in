



// HTML DOM elements
const loginForm = document.getElementById("loginForm");
const signUpForm = document.getElementById("signUpForm");
const authSection = document.getElementById("auth");
const homeSection = document.getElementById("home");
const welcomeMessage = document.getElementById("welcomeMessage");
const loginError = document.getElementById("loginError");
const signUpError = document.getElementById("signUpError");

// Users array in localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Event listener to show the Login form
document.getElementById("showLogin").addEventListener("click", showLogin);

// Function to show the Login form
function showLogin() {
    loginForm.style.display = "block"; // Display the Login form
    signUpForm.style.display = "none"; // Hide the Sign-Up form
    loginError.textContent = ""; // Clear any  error messages
}

// Event listener to show the Sign-Up form
document.getElementById("showSignUp").addEventListener("click", showSignUp);

// Function to show the Sign-Up form
function showSignUp() {
    signUpForm.style.display = "block"; // Display the Sign-Up form
    loginForm.style.display = "none"; // Hide the Login form
    signUpError.textContent = ""; // Clear any  error messages
}

// Sign-Up function
function signUp() {
    // Get user input
    const name = document.getElementById("signUpName").value.trim();
    const email = document.getElementById("signUpEmail").value.trim();
    const password = document.getElementById("signUpPassword").value.trim();

    // Validate inputs
    if (!name || !email || !password) {
        signUpError.textContent = "All fields are required!";
        return;
    }

    // Check if user already exists
    if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) {
        signUpError.textContent = "Email is already registered!";
        return;
    }

    // Add new user to users array
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users)); // Save to localStorage

    signUpError.textContent = "Sign-Up Successful! Redirecting...";
    setTimeout(() => {
        showLogin(); // Show the login form after successful sign-up
    }, 1500);
}

// Login function
function login() {
    // Get user input
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // Validate inputs
    if (!email || !password) {
        loginError.textContent = "All fields are required!";
        return;
    }

    // Find user in the users array
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

    if (user) {
        // Save session user to localStorage
        localStorage.setItem("sessionUser", JSON.stringify(user));
        showWelcome(user.name); // Show the welcome screen
    } else {
        loginError.textContent = "Incorrect email or password!";
    }
}

// Show Welcome Screen
function showWelcome(username) {
    authSection.style.display = "none"; // Hide the authentication section
    homeSection.style.display = "block"; // Show the home section
    welcomeMessage.textContent = `Welcome   ${username}`;
}

// Logout function
function logout() {
    localStorage.removeItem("sessionUser"); // Remove session user
    authSection.style.display = "block"; // Show the authentication section
    homeSection.style.display = "none"; // Hide the home section
}

// Check if the user is already logged in
const sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
if (sessionUser) {
    showWelcome(sessionUser.name);
}