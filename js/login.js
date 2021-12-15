"use strict";

const registerUserForm = document.getElementById("register_form");
const loginForm = document.getElementById("login_form");

// Adding a submit eventlistener which registers the user to the database with the given credentials.
registerUserForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(registerUserForm);

  // Creating fetch options for registering.
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // Attempt to register the user with given options and inform the user of the result.
  const response = await fetch(url + "/auth/register", fetchOptions);
  const json = await response.json();

  // After succesfully registering, log in with the newly registered account.
  if (json.user_id) {
    
    // Extracting required data and creating a new object for the request body
    const login = JSON.stringify(data);
    const loginParse = JSON.parse(login);
    
    const loginData = {
      username: loginParse.email,
      password: loginParse.passwd,
    };

    // Create a new options object.
    const loginFetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };

    // Attempt to login with the given options object
    const loginResponse = await fetch(url + "/auth/login", loginFetchOptions);
    const loginJson = await loginResponse.json();

    // Checking if the login was succesfully; If succeful, adding the user to the session storage.
    if (!loginJson.user) {
      alert(loginJson.message);
    } else {
      sessionStorage.setItem("token", loginJson.token);
      sessionStorage.setItem("user", JSON.stringify(loginJson.user));
    }

    // Finally, update the UI.
    checkLoggedStatus();
    setProfileInfo();
    displayHomeView();
  }

});



// Adding a submit eventListener which attempts to log the user in with the given credentials.
loginForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);

  // Creating fetch options for login
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // Attempt to login with given options
  const response = await fetch(url + "/auth/login", fetchOptions);
  const json = await response.json();

  // Set the token and user info to the session storage, if succesful.
  if (!json.user) {
    alert(json.message);
  } else {
    sessionStorage.setItem("token", json.token);
    sessionStorage.setItem("user", JSON.stringify(json.user));
  }

  // Update UI according to login status.
  
  checkLoggedStatus();
  setProfileInfo();
  displayHomeView();
});



