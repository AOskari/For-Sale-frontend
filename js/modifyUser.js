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
    console.log(`Modified user with new values: ${JSON.stringify(loginJson.user)}`);
    displayProfileView();
  }

  // Update the UI.
  checkLoggedStatus();

});



/** Adds the given profile picture to the database. **/

/* 
  const fd = new FormData(profilePicForm);

  const fetchOptions = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };

  const response = await fetch(url + '/user/pic', fetchOptions);
  const json = await response.json();

  if (!response.ok) return;

  alert("Profile picture added.");
  console.log('Added profile pic:', json);

  const formdataJson = serializeJson(fd);
  const stringFormData = JSON.stringify(formdataJson);
  console.log('Added profile pic:', stringFormData);

  // TODO: Update the current profile picture.

  const userImg = document.getElementById("user_img");
 // userImg.src = url + "/uploads/"
  //userImg.src = 
 */
