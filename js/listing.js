"user strict";

/** Fetches the listing data from the database. **/
const getListing = async (searchInput) => {

  try {

    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
  
    let response = ""
    if (searchInput != "") response = await fetch(url + "/listing/search/" + searchInput, fetchOptions);
    else response = await fetch(url + "/listing", fetchOptions);
    const listing = await response.json();
  
    // Create the list to the home screen if there is no input. 
    // Otherwise create the list to the search screen.
    if (searchInput == "") {
      createListingCards(listing, "home_listing_list");
      return;
    }
    createListingCards(listing, "search_listing_list");
    

  } catch (e) {
    console.log(`Failed to fetch listing: ${e.message}`);
  }

};


/** Fetches the user's own listings from the database. **/
const getOwnListing = async (userId) => {
  try {
    
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    const response = await fetch(url + "/listing/user/" + sessionStorage.getItem(token).user_id, fetchOptions);
    const listing = await response.json();

    createListingCards(listing, "own_listing_list");

  } catch (e) {
    console.log(`Error ${e.message}`);
  }
};

const newAdForm = document.getElementById("new_ad_form");

/** Attempts to add the ad form input data into the database. **/
newAdForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const data = new FormData(newAdForm);

  // Adding the current date and user id to the data body.
  data.append("listing_date", new Date().toISOString());
  data.append("user_id", JSON.parse(sessionStorage.getItem("user")).user_id);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: data,
  };

  const response = await fetch(url + "/listing", fetchOptions);

  if (!response.ok) return;

  alert("Ad succesfully added.");

  // Empty the input fields after adding the ad listing.
  emptyListingInput("ad_form_file");
  emptyListingInput("ad_form_title");
  emptyListingInput("ad_form_description");
  emptyListingInput("ad_form_price");

});

/** Empties the chosen input field. */
const emptyListingInput = (element) => document.getElementById(element).value = "";