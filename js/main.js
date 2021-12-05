"use strict";
let logged = false;
let notification = false;

const url = "http://localhost:3000";

/** Displays the Search view. **/
const displaySearchView = () => {
  hideToolbarElements();
  hideMidSectionElements();
  hideElementById("toolbar_logo_container");
  displayElementById("searchbar");
  displayElementById("search_section");
  toggleNavButtonFocus("search_nav_button");
};

/** Displays the Home view. **/
const displayHomeView = () => {
  hideToolbarElements();
  hideMidSectionElements();
  getListing("");
  displayElementById("home_section");
  toggleNavButtonFocus("home_nav_button");
};

/** Toggles the Own ads screen. **/
const displayOwnAdsView = () => {

  if (!sessionStorage.getItem("user")) {
    alert("Login to view own ads!")
    return;
  }
  
  hideToolbarElements();
  hideMidSectionElements();
  hideElementById("new_ad_section");
  displayElementById("own_listing_info_section");
  displayElementById("own_ads");
  toggleNavButtonFocus("own_ads_nav_button")
}

/** Displays the form for adding a new ad. **/
const displayNewAdForm = () => {
  hideElementById("own_listing_info_section");
  displayElementById("new_ad_section");
}

/** Toggles the Login and register screen. **/
const displayLoginView = () => {
  hideToolbarElements();
  hideMidSectionElements();
  hideElementById("toolbar_logo_container")
  displayElementById("login_and_register");
  displayElementById("login_form");
}

/** Toggles the register screen. **/
const displayRegisterView = () => {
  hideElementById("login_form");
  displayElementById("register_form");
}

/** Displays the profile view. **/
const displayProfileView = () => {
  hideToolbarElements();
  hideMidSectionElements();
  setProfileInfo();
  displayElementById("user_info");
  hideElementById("change_profile_info");
  displayElementById("user_profile");
  toggleNavButtonFocus("profile_button"); 
}

/** Displays the change profile info screen within the Profile screen **/
const displayChangeProfileInfoView = () => {

  hideElementById("user_info");
  displayElementById("change_profile_info");

  const user = JSON.parse(sessionStorage.getItem("user"));

  document.getElementById("change_email_input").value = user.email;
  document.getElementById("change_fname_input").value = user.first_name;
  document.getElementById("change_lname_input").value = user.last_name;

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
    default:
      break;
  }
}


/** Hides the toolbar elements. **/
const hideToolbarElements = () => {
  hideElementById("searchbar");
  displayElementById("toolbar_logo_container");
}

/** Hides the midsection elements. **/
const hideMidSectionElements = () => {
  // Hide login and register screen.
  hideElementById("login_and_register");
  hideElementById("register_form");

  // Hide home section.
  hideElementById("home_section");
  document.getElementById("home_listing_list").innerHTML = "";

  // Hide search screen.
  hideElementById("search_section");
  document.getElementById("search_listing_list").innerHTML = "";
  
  // Hide profile screen.
  hideElementById("user_profile");

  // Hide own ads screen.
  hideElementById("own_ads");
};


/** Checks if the user is logged in and updates the UI accordingly. **/
const checkLoggedStatus = () => {
  const userThumbnail = document.getElementById("user_thumbnail_container");
  const loginBtn = document.getElementById("login_btn");

  if (sessionStorage.getItem("token")) logged = true;
  else logged = false;

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

/** Sets the correct information to the Profile screen. */
const setProfileInfo = () => {
  const username = document.getElementById("username");
  const email = document.getElementById("user_email");
  const firstName = document.getElementById("user_fname");
  const lastName = document.getElementById("user_lname");
  let userImg = document.getElementById("user_img");
  let userThumbnail = document.getElementById("user_thumbnail");

  const user = JSON.parse(sessionStorage.getItem("user"));

  username.innerHTML = `${user.first_name} ${user.last_name}`;
  email.innerHTML = `Email: ${user.email}`;
  firstName.innerHTML = `First name: ${user.first_name}`;
  lastName.innerHTML = `Last name: ${user.last_name}`;

  if (user.profile_pic == 0) {
    userImg.src = "./images/default_profile_img.png";
    userThumbnail.src = "./images/default_profile_img.png";
  } else {
    userImg.src = url + "/uploads/" + user.profile_pic;
    userThumbnail.src = url + "/uploads/" + user.profile_pic;
  }
}

/** Displays a red dot if notification value is true. **/
const toggleNotification = (state) => {
  notification = state;
  if (notification) {
    displayElementById("notification");
    return;
  }
  hideElementById("notification");
}



// Fetches and creates elements for displaying the listing in the given element.
const createListingCards = (listing, targetElement) => {
  
  const listingList = document.getElementById(targetElement);
  
  console.log(`Listing at createListingCards: ${listing}`);

  for (let i = 0; i < Object.keys(listing).length; i++) {

    // Displaying only 20 items maximum in the home screen.
    if(i == 20 && targetElement == "home_listing_list") break;
  

    const img = document.createElement("img");
  //  img.src = url + "/uploads/" + listing[i].filename;
    img.alt = listing[i].title;

    const fig = document.createElement("figure").appendChild(img);
    const name = document.createElement("h3");
    name.innerHTML = listing[i].title;

    const price = document.createElement("h5");
    price.innerHTML = listing[i].price;

    const description = document.createElement("p");
    description.innerHTML = listing[i].description;


    const li = document.createElement("li");
    li.classList.add("listing_item");

    li.appendChild(fig);
    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(description);
    listingList.appendChild(li);
  }

}



/** Functions for hiding and displaying elements. **/
const hideElementById = (element) => {
  const e = document.getElementById(element);
  e.classList.add("none");
  e.classList.remove("display");
};
const displayElementById = (element) => {
  const e = document.getElementById(element);
  e.classList.add("display");
  e.classList.remove("none");
};








checkLoggedStatus();
displayHomeView();
if (logged) {
  setProfileInfo();
}
toggleNotification(false);
