"use strict";

/** Fetches listing data from the database. **/
const getListing = async (searchInput) => {
  try {

    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
  
    let response = ""

    // Fetching the whole list 
    if (searchInput != "") response = await fetch(url + "/listing/search/" + searchInput, fetchOptions);
    else response = await fetch(url + "/listing", fetchOptions);
    const listing = await response.json();

    // Create the list to the home screen if there is no input. 
    // Otherwise create the list to the search screen.

    const noResultLogo = document.getElementById("no_results_container");

    if (searchInput == "" && home) {
      homeListing = listing;
      createPageButtons(listing, "home_page_btn_section");
      createListingCards("home_listing_list", 0, 20);
      return;
    } else if ((searchInput == "" || listing.error) && search) {
      // Display no results logo if there is no listings.
      document.getElementById("search_listing_list").innerHTML = "";
      console.log("no listings found");
      noResultLogo.classList.add("display");
      noResultLogo.classList.remove("none");
      return;
    } 

    noResultLogo.classList.add("none");
    noResultLogo.classList.remove("display");
    
    searchListing = listing;

    createListingCards("search_listing_list", 0, Object.keys(listing).length);
     
  } catch (e) {
    console.log(`Failed to fetch listing: ${e.message}`);
  }

};


/** Fetches the user's own listings from the database. **/
const getOwnListing = async () => {
  try {
    
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    const userId = JSON.parse(sessionStorage.getItem("user")).user_id;

    // Fetching the user's own listing from the database.
    const response = await fetch(url + "/listing/user/" + userId, fetchOptions);
    const listing = await response.json();
    
    ownListing = listing;

    const noListings = document.getElementById("no_listings_container");
    const listingList = document.getElementById("own_listing_list");
    const amountOfAds = document.getElementById("amount_of_ads");

    if (listing.error) {
      noListings.classList.add("display");
      noListings.classList.remove("none");
      listingList.classList.add("none");
      listingList.classList.remove("display");
      listingList.innerHTML = "";
      amountOfAds.innerHTML = `Listings: 0`;
      return;
    } 

    noListings.classList.add("none");
    noListings.classList.remove("display");
    listingList.classList.add("display");
    listingList.classList.remove("none");

    // Creating the listing cards to the My listings page.
    createListingCards("own_listing_list", 0, Object.keys(listing).length);
    amountOfAds.innerHTML = `Listings: ${Object.keys(listing).length}`;
    
  } catch (e) {
    console.log(`Error ${e.message}`);
  }
};

const newAdForm = document.getElementById("new_ad_form");

/** Attempts to add the ad form input data into the database. **/
newAdForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const btn = document.getElementById("ad_form_button");

  btn.innerHTML = "Please wait";
  btn.disabled = true;

  const data = new FormData(newAdForm);
  const desc = document.getElementById("ad_form_description");

  // Adding the current date and user id to the data body.
  data.append("listing_date", new Date().toISOString());
  data.append("user_id", JSON.parse(sessionStorage.getItem("user")).user_id);
  data.append("description", desc.value);

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: data,
  };

  const response = await fetch(url + "/authListing/", fetchOptions);
  const json = await response.json();

  btn.innerHTML = "Post ad";
  btn.disabled = false;

  if (json.error) {
    alert(json.message);
    return;
  } else {
    // Empty the input fields after adding the ad listing.
    emptyListingInput("ad_form_file");
    emptyListingInput("ad_form_title");
    emptyListingInput("ad_form_description");
    emptyListingInput("ad_form_price");

    displayOwnAdsView();
  }

});

/** Empties the chosen input field. */
const emptyListingInput = (element) => document.getElementById(element).value = "";


/** Adding a submit event, which attempts to change the listing data in the backend. **/
const changeListingForm = document.getElementById("change_listing_info_form");
changeListingForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  try {

    if (confirm("Save changes?")) {

      const data = serializeJson(changeListingForm);
      const fd = new FormData(changeListingForm);
      fd.append("description", data.description);
    
      const fetchOptions = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: fd,
      };
    
      const response = await fetch(url + "/authListing/" + currentModifiedListingId, fetchOptions);
      const json = await response.json();

      if (!response.ok) {
        alert(json.error.message);
        return;
      }    
      displayOwnAdsView();

    }

  } catch (e) {
    console.log(`error at modifyListing: ${e.message}`);
  }

});


/** Deletes the chosen listing. */
const deleteListing = async () => {

  try {

    if (confirm("Delete listing?")) {

      const fetchOptions = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
    
      const response = await fetch(url + "/authListing/" + currentModifiedListingId, fetchOptions);
      
      if (!response.ok) {
        alert("Listing delete failed.");
        return;
      }
      displayOwnAdsView();

    }

  } catch (e) {
    console.log(e.message);
  }

  

}