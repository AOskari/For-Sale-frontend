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



}