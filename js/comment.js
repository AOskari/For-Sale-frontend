"use strict";

// Adds a comment to the database.
const addComment = async (listingId, form) => {

  const data = {
    comment: document.getElementById("comment_input").value,
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  };

  if (document.getElementById("comment_input").value == "") {
    alert("Enter a comment.");
    return;
  }

  const response = await fetch(url + "/comment/listing/" + listingId, fetchOptions);
  if (response.ok) {
    alert("Comment succesfully added.");
    document.getElementById("comment_input").value = "";
  }
};
