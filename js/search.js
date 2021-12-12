"use strict";

const searchInput = document.getElementById("searchbar_container");
const input = document.getElementById("searchbar");

searchInput.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  getListing(input.value);

});