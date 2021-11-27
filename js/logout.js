"use strict";

// Logs out the user.
const logout = () => {
  console.log(`Logging out`);
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  alert("You have logged out.");
  displayHomeView();
  checkLoggedStatus();
}