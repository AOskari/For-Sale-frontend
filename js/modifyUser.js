"use strict";

const changeProfileInfoForm = document.getElementById("change_profile_info_form")
const profilePicForm = document.getElementById("profile_pic_form");

// Adding a submit eventListener which attempts to modify the user in with the given credentials.
changeProfileInfoForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const data = serializeJson(changeProfileInfoForm);
  const fd = new FormData(changeProfileInfoForm);

  let newPassword = "";

  // Creating fetch options for modify
  const fetchOptions = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: fd,
  };

  const modify = JSON.stringify(data);
  const modifyParse = JSON.parse(modify);

  let response = "";

  if (modifyParse.passwd === "") {
    response = await fetch(url + "/user", fetchOptions);
    newPassword = modifyParse.old_passwd;
  } else {
    response = await fetch(url + "/user/pw", fetchOptions);
    newPassword = modifyParse.passwd;
  }

  if (!response.ok) return;

  // After modifications, relog automatically to update token data.

  await logoutUser();

  const loginData = {
    username: modifyParse.email,
    password: newPassword
  };

  // Create a new login options object.
  const loginOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  }

  // Attempt to login with the given options object
  const loginResponse = await fetch(url + "/auth/login", loginOptions);
  const loginJson = await loginResponse.json();

  // Checking if the login was succesfully; If succeful, adding the user to the session storage.
  if (!loginJson.user) {
    alert(loginJson.message);
  } else {
    sessionStorage.setItem("token", loginJson.token);
    sessionStorage.setItem("user", JSON.stringify(loginJson.user));
    console.log(`Modified user values.`);
    displayProfileView();
  }

  // Update the UI.
  checkLoggedStatus();

});
