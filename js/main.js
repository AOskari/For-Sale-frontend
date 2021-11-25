

let showSearch = false;
let showHome = true;
let showOwnAds = false;
let showLogin = false;
let logged = false;

/** Toggles the Search screen. **/
const displaySearchView = () => {
  toggleWantedView("search");
  hideToolbarElements();
  hideMidSectionElements();
  const searchbar = document.getElementById("searchbar");
  searchbar.classList.add("visible");
  searchbar.classList.remove("hidden");
  toggleNavButtonFocus("search_nav_button");
}

/** Toggles the Home screen. **/
const displayHomeView = () => {
  toggleWantedView("home");
  hideToolbarElements();
  hideMidSectionElements();
   // TODO: Display Home screen.
  toggleNavButtonFocus("home_nav_button");
}

/** Toggles the Own ads screen. **/
const displayOwnAdsView = () => {
  toggleWantedView("ownAds");
  hideToolbarElements();
  hideMidSectionElements();
  // TODO: Display Own ads screen.
  toggleNavButtonFocus("own_ads_nav_button")
}

/** Toggles the Login and register screen. **/
const displayLoginView = () => {
  toggleWantedView("login");
  hideToolbarElements();
  hideMidSectionElements();
  const loginForm = document.getElementById("login_and_register");
  loginForm.classList.remove("none");
  loginForm.classList.remove("display");
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
  }
}


/** A multipurpose function used for hiding the toolbar elements. **/
const hideToolbarElements = () => {
  const userThumbnail = document.getElementById("user_thumbnail");
  const searchbar = document.getElementById("searchbar");
  const loginBtn = document.getElementById("login_btn");
  searchbar.classList.add("hidden");
  searchbar.classList.remove("visible");

  if (logged) {
    userThumbnail.classList.remove("hidden");
    userThumbnail.classList.add("visible");
    loginBtn.classList.remove("visible");
    loginBtn.classList.add("hidden");
  } else {
    userThumbnail.classList.remove("visible");
    userThumbnail.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    loginBtn.classList.add("visible");
  }
}

hideMidSectionElements = () => {
  const loginForm = document.getElementById("login_and_register");
  loginForm.classList.remove("display");
  loginForm.classList.add("none");  
}


/** Toggles the display booleans according to the given parameter. **/
const toggleWantedView = (view) => {
  showSearch = (view == "search");
  showHome = (view == "home");
  showOwnAds = (view == "ownAds");
  showLogin = (view == "login");
}


/** Checks if the user is logged in. **/
const checkLoggedStatus = () => {
  // TODO: Set logged in according if the user has logged in.
  // Update UI if user has logged in.
}
