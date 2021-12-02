"use strict";

const searchInput = document.getElementById("searchbar");

searchInput.addEventListener("change", async (evt) => {
  evt.preventDefault();

  console.log(`Search input value: ${searchInput.value}`);
  getListing(searchInput.value);

});