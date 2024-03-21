var isLoggedIn = localStorage.getItem("loggedInUser");

document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");
    var newUserButton = document.getElementById("newUserButton");
    var registerButton = document.getElementById("registerButton");
    var backButton = document.getElementById("backButton");
    var errorMessage = document.getElementById("errorMessage");
    var loggedInInfo = document.getElementById("loggedInInfo");
    var logoutButton = document.getElementById("logoutButton");

    if (isLoggedIn) {
        loginForm.style.display = "none";
        loggedInInfo.innerHTML = "Logged in as: <strong>" + isLoggedIn + "</strong>";
        loggedInInfo.style.display = "block";
        logoutButton.style.display = "inline-block";
    } else {
        loginForm.style.display = "block";
    }

    loginForm.addEventListener("submit", handleFormSubmission);
    newUserButton.addEventListener("click", toggleForms);
    backButton.addEventListener("click", toggleBack);
    registerButton.addEventListener("click", registerUser);
    logoutButton.addEventListener("click", logoutUser);

    var loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        showLoggedInState(loggedInUser);
    }

    function handleFormSubmission(event) {
        event.preventDefault();
        
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        
        var formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8000/azure_conn.php", true);

        xhr.onload = function() {
            console.log(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300) {
                var response = JSON.parse(xhr.responseText);
                if (response.status === "success") {
                    localStorage.setItem("loggedInUser", username);
                    location.reload();
                } else {
                    displayErrorMessage("Väärä käyttäjä tai salasana.");
                }
            } else {
                displayErrorMessage("Virhe yhteydessä palvelimeen.");
            }
        };        

        xhr.onerror = function() {
            displayErrorMessage("Virhe yhteydessä palvelimeen.");
        };

        xhr.send(formData);
    }

    function showLoggedInState(username) {
        loggedInInfo.innerHTML = "Logged in as: <strong>" + username + "</strong>";
        loggedInInfo.style.display = "block";
        logoutButton.style.display = "inline-block";
        loginForm.style.display = "none";
    }

    function displayErrorMessage(message) {
        errorMessage.innerText = message;
        errorMessage.style.display = "block";

        setTimeout(function() {
            errorMessage.style.display = "none";
        }, 10000);
    }

    function toggleForms(event) {
        var isNewUser = loginForm.getAttribute("data-new-user") === "true";

        if (isNewUser) {
            updateFormElements("Kirjaudu", false);
        } else {
            updateFormElements("Rekisteröidy", true);
        }
    }

    function toggleBack(event) {
        updateFormElements("Kirjaudu", false);
    }

    function updateFormElements(loginButtonText, showBackButton) {
        var loginButton = document.getElementById("loginButton");
        var backButton = document.getElementById("backButton");
        var registerButton = document.getElementById("registerButton");
    
        loginButton.innerText = loginButtonText;
    
        var addedLineBreaks = document.querySelectorAll('.added-line-break');
        addedLineBreaks.forEach(function(br) {
            br.remove();
        });
    
        if (showBackButton) {
            loginButton.style.display = "none";
            newUserButton.style.display = "none";
            backButton.style.display = "inline-block";
            registerButton.style.display = "inline-block";
        } else {
            loginButton.style.display = "inline-block";
            newUserButton.style.display = "inline-block";
            backButton.style.display = "none";
            registerButton.style.display = "none";
        }

        var usernameLabel = document.querySelector('label[for="username"]');
        var usernameInput = document.getElementById("username");
        var emailLabel = document.querySelector('label[for="email"]');
        var emailInput = document.getElementById("email");
    
        var br = document.createElement("br");
        br.classList.add("added-line-break");
    
        if (showBackButton) {
            if (!emailLabel) {
                emailLabel = document.createElement("label");
                emailLabel.setAttribute("for", "email");
                emailLabel.innerText = "Sähköposti:";
                loginForm.insertBefore(emailLabel, usernameLabel);
                loginForm.insertBefore(br.cloneNode(), usernameLabel);
            }
    
            if (!emailInput) {
                emailInput = document.createElement("input");
                emailInput.setAttribute("type", "email");
                emailInput.setAttribute("id", "email");
                emailInput.setAttribute("name", "email");
                emailInput.setAttribute("placeholder", "");
                emailInput.setAttribute("required", "");
                loginForm.insertBefore(emailInput, usernameLabel);
                loginForm.insertBefore(br.cloneNode(), usernameLabel);
            }
        } else {

            if (emailLabel) {
                emailLabel.remove();
            }
            if (emailInput) {
                emailInput.remove();
            }
    
            var addedLineBreaks = document.querySelectorAll('.added-line-break');
            addedLineBreaks.forEach(function(br) {
                br.remove();
            });
        }
    }

    function registerUser() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var email = document.getElementById("email").value;
    
        var formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("register", true);
    
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8000/azure_conn.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {

                    alert("Registration successful!");
                    document.getElementById("username").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("email").value = "";
                } else {
                    alert("Registration failed. Please try again later.");
                }
            }
        };
        xhr.send(formData);
    }    

    function logoutUser() {
        localStorage.removeItem("loggedInUser");
        location.reload();
    }

    var submissionForm = document.getElementById("task1");
    submissionForm.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Submit successful!");
    });

});
