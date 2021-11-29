"use strict";
let logged = false;

/** Toggles the Search screen. **/
const displaySearchView = () => {
  hideToolbarElements();
  hideMidSectionElements();
  const searchbar = document.getElementById("searchbar");
  searchbar.classList.add("visible");
  searchbar.classList.remove("hidden");
  toggleNavButtonFocus("search_nav_button");
}

/** Toggles the Home screen. **/
const displayHomeView = () => {
  hideToolbarElements();
  hideMidSectionElements();
   // TODO: Display Home screen.
  toggleNavButtonFocus("home_nav_button");
}

/** Toggles the Own ads screen. **/
const displayOwnAdsView = () => {
  hideToolbarElements();
  hideMidSectionElements();
  // TODO: Display Own ads screen.
  toggleNavButtonFocus("own_ads_nav_button")
}

/** Toggles the Login and register screen. **/
const displayLoginView = () => {
  hideToolbarElements();
  hideMidSectionElements();
  const loginAndRegister = document.getElementById("login_and_register");
  loginAndRegister.classList.remove("none");
  loginAndRegister.classList.add("display");
  loginForm.classList.remove("none");
  loginForm.classList.add("display");
}

/** Toggles the register screen. **/
const displayRegisterView = () => {
 // toggleWantedView("register");
  const loginForm = document.getElementById("login_form");
  loginForm.classList.remove("display");
  loginForm.classList.add("none");
 
  const registerForm = document.getElementById("register_form");
  registerForm.classList.remove("none");
  registerForm.classList.add("display");
}


const displayProfileView = () => {
  hideToolbarElements();
  hideMidSectionElements();
  setProfileInfo();

  const userInfo = document.getElementById("user_info");
  const changeProfileInfo = document.getElementById("change_profile_info");
  
  userInfo.classList.remove("none");
  userInfo.classList.add("display");
  changeProfileInfo.classList.remove("display");
  changeProfileInfo.classList.add("none");

  toggleNavButtonFocus("profile button");
  const userProfile = document.getElementById("user_profile");
  userProfile.classList.remove("none");
  userProfile.classList.add("display");
}

/** Displays the change profile info screen within the Profile screen **/
const displayChangeProfileInfoView = () => {
  
  const userInfo = document.getElementById("user_info");
  const changeProfileInfo = document.getElementById("change_profile_info");

  userInfo.classList.remove("display");
  userInfo.classList.add("none");
  changeProfileInfo.classList.remove("none");
  changeProfileInfo.classList.add("display");

  const email = document.getElementById("change_email_input");
  const firstName = document.getElementById("change_fname_input");
  const lastName = document.getElementById("change_lname_input");

  const user = JSON.parse(sessionStorage.getItem("user"));

  email.value = user.email;
  firstName.value = user.first_name;
  lastName.value = user.last_name;

}



/** Toggles the focus of the bottom navigation buttons according to the given parameter. **/
const toggleNavButtonFocus = (button) => {

  const homebtn = document.getElementById("home_nav_button");
  const searchbtn = document.getElementById("search_nav_button");
  const salesbtn = document.getElementById("own_ads_nav_button");
  
  homebtn.classList.remove("focused");
  searchbtn.classList.remove("focused");
  salesbtn.classList.remove("focused");

  switch (button) {
    case "home_nav_button":
      homebtn.classList.add("focused");
      homebtn.classList.remove("unfocused");
      break;
    case "search_nav_button":
      searchbtn.classList.add("focused");
      searchbtn.classList.remove("unfocused");
      break;
    case "own_ads_nav_button":
      salesbtn.classList.add("focused");
      salesbtn.classList.remove("unfocused");
      break;
    case "profile_button":
      break;
  }
}


/** A multipurpose function used for hiding the toolbar elements. **/
const hideToolbarElements = () => {

  const searchbar = document.getElementById("searchbar");
  searchbar.classList.add("hidden");
  searchbar.classList.remove("visible");
}

const hideMidSectionElements = () => {
  // Hide login and register screen.
  const loginAndRegister = document.getElementById("login_and_register");
  loginAndRegister.classList.remove("display");
  loginAndRegister.classList.add("none");  
  const registerForm = document.getElementById("register_form");
  registerForm.classList.remove("display");
  registerForm.classList.add("none");

  // Hide profile screen.
  const userProfile = document.getElementById("user_profile");
  userProfile.classList.remove("display");
  userProfile.classList.add("none");
}


/** Checks if the user is logged in and updates the UI accordingly. **/
const checkLoggedStatus = () => {
  const userThumbnail = document.getElementById("user_thumbnail");
  const loginBtn = document.getElementById("login_btn");

  if (sessionStorage.getItem("token")) logged = true;
  else logged = false;

  if (logged) {
    userThumbnail.classList.remove("hidden");
    userThumbnail.classList.add("visible");
    loginBtn.classList.remove("visible");
    loginBtn.classList.add("hidden");
    displayHomeView();
  } else {
    userThumbnail.classList.remove("visible");
    userThumbnail.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    loginBtn.classList.add("visible");
  }
}

const setProfileInfo = () => {
  const username = document.getElementById("username");
  const email = document.getElementById("user_email");
  const firstName = document.getElementById("user_fname");
  const lastName = document.getElementById("user_lname");

  const user = JSON.parse(sessionStorage.getItem("user"));

  username.innerHTML = `${user.first_name} ${user.last_name}`;
  email.innerHTML = `Email: ${user.email}`;
  firstName.innerHTML = `First name: ${user.first_name}`;
  lastName.innerHTML = `Last name: ${user.last_name}`;
}




checkLoggedStatus();