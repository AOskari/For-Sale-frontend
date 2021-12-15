"use strict";

// Adds a review to the database for the chosen user.
const addReview = async (userId) => {

  const data = {
    user_id: userId,
    score:  document.getElementById("review_input").value,
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  };

  if (document.getElementById("review_input").value == "") {
    alert("Enter a review.");
    return;
  }

  const response = await fetch(url + "/addreview/", fetchOptions); 

  if (response.ok) {
    alert("Review succesfully added.");
    document.getElementById("review_input").value = 0;
  }

};

/** Fetches the review rating of the given user. **/
const getReview = async (id) => {

  try {
    const response = await fetch(url + "/review/user/" + id);
    const json = await response.json();

    if (response.ok) return `Rating: ${json} / 5.0`;
    else return "No reviews.";
  
  } catch (e) {
    console.log(`error at getReview: ${e.message}`);
  }

}
  