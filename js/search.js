"use strict";

const searchInput = document.getElementById("searchbar_container");
const input = document.getElementById("searchbar");

// Fetches listing data from the database with the given input value.
searchInput.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  getListing(input.value);

});