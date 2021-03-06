"use strict";

const logout = document.getElementById("logout_button");

// Logs out the user.
logout.addEventListener("click", async (evt) => {
  evt.preventDefault();

  if (confirm("Logout?")) {
    logoutUser();
  }

});

const logoutUser = async () => {
  console.log("Logging out");

  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('token'),
      },
    };

    const response = await fetch(url + '/auth/logout', options);
    const json = await response.json();
    console.log(json);

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    displayHomeView();
    checkLoggedStatus();

  } catch (e) {
    console.log(`Failed to logout: ${e.message}`);
  }
  
}