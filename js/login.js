'use strict';

const url = "http://localhost:3000";
const registerUserForm = document.getElementById("register_form");
const loginForm = document.getElementById("login_form");


// Adding a submit eventlistener which registers the user to the database with the given credentials.
registerUserForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(registerUserForm);

  // Creating an object which contains the needed options for fetching
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + "/user", fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = "index.html";
});



// Adding an submit eventListener which attempts to log the user in with the given credentials.
loginForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);

  // Creating an object which contains the needed options for fetching
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + "/auth/login", fetchOptions);
  const json = await response.json();

  if (!json.user) {
    alert(json.message);
  } else {
    sessionStorage.setItem("token", json.token);
    sessionStorage.setItem("user", JSON.stringify(json.user));
    location.href = "index.html";
  }
});