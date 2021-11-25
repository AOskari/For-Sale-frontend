'use strict';

const url = "http://localhost:3000";
const registerUserForm = document.getElementById("register_form");

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