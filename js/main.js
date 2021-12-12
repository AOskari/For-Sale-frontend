"use strict";
let logged = false;
let notification = false;
let currentListingId = 0;
let currentListingOwner = {};
let currentUserRating = {};
let currentModifiedListingId = 0;

let homeListing = {};
let searchListing = {};
let ownListing = {};

let currentHomePage = 1;
let currentSearchPage = 1;
let currentOwnPage = 1;

let home = true;
let search = false;
let ownlistings = false;
let targetPageElement = "";

const url = "http://localhost:3000";
const listingSize = 20;

/** Displays the Search view. **/
const displaySearchView = () => {
  toggleCurrentScreen("search");
  hideToolbarElements();
  hideMidSectionElements();
  hideElementById("toolbar_logo_container");
  displayElementById("searchbar");
  displayElementById("search_section");
  toggleNavButtonFocus("search_nav_button");
};

/** Displays the Home view. **/
const displayHomeView = () => {
  toggleCurrentScreen("home");
  hideToolbarElements();
  hideMidSectionElements();
  displayElementById("bottom_nav");
  getListing("");
  displayElementById("home_section");
  toggleNavButtonFocus("home_nav_button");
  targetPageElement = "home_page_btn_section";
};

/** Toggles the Own ads screen. **/
const displayOwnAdsView = () => {
  toggleCurrentScreen("ownlistings");
  if (!sessionStorage.getItem("user")) {
    alert("Login to view My listings!")
    return;
  }

  hideToolbarElements();
  hideMidSectionElements();
  getOwnListing();
  hideElementById("new_ad_section");
  displayElementById("own_listing_info_section");
  displayElementById("own_ads");
  toggleNavButtonFocus("own_ads_nav_button")
}

/** Displays the form for adding a new ad. **/
const displayNewAdForm = () => {
  toggleCurrentScreen("");
  hideElementById("own_listing_info_section");
  displayElementById("new_ad_section");
}

/** Toggles the Login and register screen. **/
const displayLoginView = () => {
  toggleCurrentScreen("");
  hideToolbarElements();
  hideMidSectionElements();
  toggleNavButtonFocus("");
  hideElementById("toolbar_logo_container");
  displayElementById("bottom_nav");
  displayElementById("login_and_register");
  displayElementById("login_form");
}

/** Toggles the register screen. **/
const displayRegisterView = () => {
  toggleCurrentScreen("");
  hideElementById("login_form");
  hideElementById("bottom_nav")
  displayElementById("register_form");
}

/** Displays the profile view. **/
const displayProfileView = () => {
  toggleCurrentScreen("");
  hideToolbarElements();
  hideMidSectionElements();
  setProfileInfo();
  displayElementById("bottom_nav");
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

/** Displays the listing item view. **/
const displayListingItemView = () => {
  hideMidSectionElements();
  toggleNavButtonFocus("");
  displayElementById("listing_item_section");
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

  // Hide listing item section.
  hideElementById("listing_item_section");

  // Hide other user screen.
  hideElementById("other_user_profile");

  // Hide listing item modification.
  hideElementById("listing_item_modification");
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

// TODO: Add parameter which decides the screen to display.
const hideListingInfo = () => {
  hideElementById("listing_item_section");

  if (home) displayHomeView();
  else if (search) displaySearchView();

}


// Fetches and creates elements for displaying the listing in the given element.
const createListingCards = (targetElement, min, max) => {

  const listingList = document.getElementById(targetElement);
  listingList.innerHTML = "";

  let listing = {};

  if (targetElement == "home_listing_list") listing = homeListing;
  else if (targetElement == "search_listing_list") listing = searchListing;
  else if (targetElement == "own_listing_list") listing = ownListing;

  console.log(`Listing at createListingCards: ${listing}`);
  console.log(`Listing object size: ${Object.keys(listing).length}`);

  for (let i = min; i < max; i++) {
    
    const img = document.createElement("img");

    // Placing a placeholder image if image is not found.
    img.onerror = () => img.src = "./images/placeholder-listing-img.png";

    img.src = url + "/uploads/" + listing[i].filename;
    
    img.alt = listing[i].title;
    img.classList.add("listing_item_img");

    const fig = document.createElement("figure").appendChild(img);
    fig.classList.add("listing_item_img_container");

    const price = document.createElement("h5");
    price.innerHTML = listing[i].price + " €";


    const name = document.createElement("h3");
    name.innerHTML = listing[i].title;


    const infoContainer = document.createElement("div");
    infoContainer.appendChild(price);
    infoContainer.appendChild(name);

    infoContainer.classList.add("listing_item_info");

    const li = document.createElement("li");
    li.classList.add("listing_item");

    li.appendChild(fig);
    li.appendChild(infoContainer);

    // Adding an event listener which displays elements with information of the listing.
    if (targetElement != "own_listing_list") {
      li.addEventListener("click", async () => {

      // Setting fetched information to follow elements:
      const title = document.getElementById("listing_upper_section_title");
      const dateElement = document.getElementById("listing_upper_posted_date");
      const price = document.getElementById("listing_lower_section_price");
      const desc = document.getElementById("listing_lower_section_description");
      const img = document.getElementById("listing_section_img");
      const date = new Date(listing[i].listing_date);

      title.innerHTML = listing[i].title;
      dateElement.innerHTML = `${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`;

      img.onerror = () => {
        img.src = "./images/placeholder-listing-img.png";
        console.log("Listing image not found, placing placeholder.");
      }

      img.src = url + "/uploads/" + listing[i].filename;
      img.alt = listing[i].title;
      price.innerHTML = listing[i].price + " €";
      desc.innerHTML = listing[i].description;


      // Creating another fetch for getting user information of the owner.
      const userResponse = await fetch(url + "/userGet/" + listing[i].seller_id);
      const userJson = await userResponse.json();
      currentListingOwner = userJson;
      

      // Setting the owner information to the listing ad.
      document.getElementById("listing_user_name").innerHTML = `${userJson.first_name} ${userJson.last_name}`;
      document.getElementById("listing_user_email").innerHTML = `${userJson.email}`;
     

      // Creating another fetch for getting the user's review rating.
      const response = await fetch(url + "/review/user/" + userJson.user_id);
      const json = await response.json();
      currentUserRating = json;
      

      // Set the rating in the chosen element according if the user has a rating.
      if (response.ok) document.getElementById("listing_user_rating").innerHTML = `Reviews: ${json} / 5.0`;
      else document.getElementById("listing_user_rating").innerHTML = `No reviews.`;


      // Hiding other mid section elements and taking removing the focus of nav buttons.
      hideMidSectionElements();
      toggleNavButtonFocus("");


      // Creating yet another fetch for getting all the comments for the listing ad.
      const commentResponse = await fetch(url + "/commentGet/listing/" + listing[i].listing_id);
      const comments = await commentResponse.json();

      // Emptying the list of comments before displaying current ones.
      document.getElementById("listing_comments").innerHTML = "";


      // Looping through all comments and creating them into the listing_comments ul.
      for (let j = 0; j < Object.keys(comments).length; j++) {


        // Fetching the creator of the comment.
        const commentUser = await fetch(url + "/userGet/" + comments[j].user_id);
        const user = await commentUser.json();

        
        // Set correct information to selected elements.
        const li = document.createElement("li");
        const h2 = document.createElement("h2");
        const br = document.createElement("br");
        const p = document.createElement("p");

        h2.innerHTML = `${user.first_name} ${user.last_name}`;
        p.innerHTML = comments[j].comment;
        p.classList.add("comment_text");

        // Add previously created elements to the list and add the list element to the ul.
        li.appendChild(h2);
        li.appendChild(br);
        li.appendChild(p);
        li.classList.add("listing_comment");
        document.getElementById("listing_comments").appendChild(li);
      }
      
      
      currentListingId = listing[i].listing_id;

      // Displaying the list item section.
      displayElementById("listing_item_section");

      
      // If the user is logged in, display the comment input form.
      if (sessionStorage.getItem("user")) displayElementById("comment_form");
      else hideElementById("comment_form");
  
    });
  } else {

      li.addEventListener("click", (evt) => {
        evt.preventDefault();
        const img = document.getElementById("listing_img");
        const desc = document.getElementById("listing_modify_description");
        const title = document.getElementById("listing_modify_title");
        const price = document.getElementById("listing_modify_price");
  
        img.src = url + "/uploads/" + listing[i].filename;
        desc.value = listing[i].description;
        title.value = listing[i].title;
        price.value = listing[i].price;
        currentModifiedListingId = listing[i].listing_id

        hideMidSectionElements();
        displayElementById("listing_item_modification");

      });

    }

    listingList.appendChild(li);
 
  }
};


/** Creates page buttons to the target element. */
const createPageButtons = (listing, targetElement) => {
  
  let x = 0;
  let length = Object.keys(listing).length;
  let pages = Math.floor(length / listingSize) + 1;

  // Create page buttons, max. 3 page buttons and the 4th button is the last page.
  const btnContainer = document.getElementById(targetElement);
  btnContainer.innerHTML = "";

  // Adjusting the previousPages variable according to the amount of pages. 
  // This variable is used for displaying previous page buttons.
  let previousPages = currentHomePage - 1;
  if (currentHomePage <= 1) previousPages = 1;
  else if ((pages - currentHomePage < 3) && pages - currentHomePage > 0) previousPages = pages - 4;
  
 // Creating buttons to the selected div element.
 
  for (let i = previousPages; i <= Math.min(pages, previousPages + 4); i++) {
  

    // Create a new button element.
    const btn = document.createElement("button");
    btn.classList.add("listing_pages_btn");
  

    // Displaying a maximum amount of 5 page buttons in the screen. The last button is the last page available.
    // i.e. 1 2 3 4 ... 9
    if (x == 0) btn.classList.add("selected");    
    if (x == 4) btn.innerHTML = pages;
    else btn.innerHTML = i;


    // Adding an event listener which toggles the pages according to the pressed button.
    btn.addEventListener("click", (evt) => {
      evt.preventDefault();
      currentHomePage = btn.innerHTML;
      createListingCards("home_listing_list", (currentHomePage - 1) * listingSize, Math.min(((currentHomePage - 1) * listingSize) + listingSize, length));
      createPageButtons(listing, targetElement);
      togglePageButtonFocus(currentHomePage, targetElement);
    });


    // Add the created button to the parent object.
    btnContainer.append(btn);


    // Adding a text element between the 4th and 5th page button which contains ... to indicate that there are 
    // more available page buttons than displayed.
    if (x == 3) {
      let p = document.createElement("p");
      p.innerHTML = "...";
      btnContainer.append(p);
    }
    x++;
  }
};


// Displays the next 20 or less listing items on the home page.
document.getElementById("home_page_next_btn").addEventListener("click", evt => {
  evt.preventDefault();

  let length = Object.keys(homeListing).length;
  let pages = Math.floor(length / listingSize) + 1;

  if (currentHomePage < pages) {
    currentHomePage++;
    createListingCards("home_listing_list", (currentHomePage - 1) * listingSize, Math.min(((currentHomePage - 1) * listingSize) + listingSize, length));
    createPageButtons(homeListing, "home_page_btn_section");
    togglePageButtonFocus(currentHomePage, "home_page_btn_section");
  }

});

// Displays the previous 20 listing items on the home page.
document.getElementById("home_page_previous_btn").addEventListener("click", evt => {
  evt.preventDefault();
  let length = Object.keys(homeListing).length;

  if (currentHomePage > 1) {
    currentHomePage--;
    createListingCards("home_listing_list", (currentHomePage - 1) * listingSize, Math.min(((currentHomePage - 1) * listingSize) + listingSize, length));
    createPageButtons(homeListing, "home_page_btn_section");
    togglePageButtonFocus(currentHomePage, "home_page_btn_section");
  }

});


// Highlights the chosen page button.
const togglePageButtonFocus = (id, container) => {
  const children = document.getElementById(container).children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].innerHTML == id) children[i].classList.add("selected");
    else children[i].classList.remove("selected");
  }
};


// Display chosen user information on click.
const listingUserInfo = document.getElementById("listing_user_info");
listingUserInfo.addEventListener("click", (evt) => {
  evt.preventDefault();
  hideMidSectionElements();
  displayOtherUserInfo();
});


// Add comment to the database on submit.
const commentForm = document.getElementById("comment_form");
commentForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  addComment(currentListingId);
});


// Add a review to the database on submit.
const reviewForm = document.getElementById("review_form");
reviewForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  addReview(currentListingOwner.user_id);

  const response = await fetch(url + "/review/user/" + currentListingOwner.user_id);
  const json = await response.json();
  currentUserRating = json;
  displayOtherUserInfo();
});


/** Displays the listing owner's information. **/
const displayOtherUserInfo = () => {
  
  const img = document.getElementById("other_user_img");
  const username = document.getElementById("other_username");
  const rating = document.getElementById("review_rating");
  
  console.log(currentUserRating.message);

  if (!currentUserRating.message) rating.innerHTML = `Rating: ${currentUserRating}`;
  else rating.innerHTML = `No rating available.`;

  username.innerHTML = `${currentListingOwner.first_name} ${currentListingOwner.last_name}`;

  if (currentListingOwner.profile_pic == 0) img.src = "./images/default_profile_img.png";
  else img.src = url + "/uploads/" + currentListingOwner.profile_pic;

  displayElementById("other_user_profile");

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

/** Sets the correct boolean values according to displayed screen. **/
const toggleCurrentScreen = (screen) => {
  home = screen == "home";
  search = screen == "search";
  ownlistings = screen = "ownlistings";
}


// Initialization of the home view.
checkLoggedStatus();
displayHomeView();
if (logged) setProfileInfo();
toggleNotification(false);
