// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlYTcl1C3v6pLVW5Tzm1RcFTHHDQR9Gfw",
    authDomain: "partyinvitations-e9ad2.firebaseapp.com",
    projectId: "partyinvitations-e9ad2",
    storageBucket: "partyinvitations-e9ad2.appspot.com",
    messagingSenderId: "815887812692",
    appId: "1:815887812692:web:eb0d7a095b3db0aabf05c1",
    measurementId: "G-3D12K461NF"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Google Sign-In function
function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // User signed in
            var user = result.user;
            console.log("Google Sign-In successful", user);
            displayWelcomeMessage(user.email);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Google Sign-In failed", errorCode, errorMessage);
        });
}

// Initialize Firebase and Google Sign-In
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in
        console.log("User is signed in:", user);
        displayWelcomeMessage(user.email);
    } else {
        // User is signed out
        console.log("User is signed out");
        initGoogleSignIn(); // Initialize Google Sign-In if the user is not signed in
    }
});

// Function for user login
function login() {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User signed in
            var user = userCredential.user;
            console.log("Login successful", user);
            displayWelcomeMessage(user.email);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Login failed", errorCode, errorMessage);
        });
}

// Function for user signup
function signup() {
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User signed up
            var user = userCredential.user;
            console.log("Sign-up successful", user);
            displayWelcomeMessage(user.email);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Sign-up failed", errorCode, errorMessage);
        });
}

// Function to display a welcome message
function displayWelcomeMessage(email) {
    var welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = "Welcome, " + email;
}

// Function to initialize Google Sign-In
function initGoogleSignIn() {
    gapi.load('auth2', function () {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID'
        }).then(function () {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.attachClickHandler('google-signin-btn', {}, signInWithGoogle, function (error) {
                console.error("Google Sign-In button click handler error", error);
            });
        });
    });
}

// Function for user logout
function logout() {
    firebase.auth().signOut()
        .then(() => {
            // Sign-out successful
            console.log("Logout successful");
            clearWelcomeMessage();
        })
        .catch((error) => {
            // An error happened
            console.error("Logout failed", error);
        });
}

// Function to clear the welcome message when logging out
function clearWelcomeMessage() {
    var welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = "";
}
