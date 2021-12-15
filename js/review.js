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
  const json = response.json();

  //const response = await fetch(url + "/review/", fetchOptions);
  if (!json.error) {
    alert(json.message);
    document.getElementById("review_input").value = 0;
    return;
  }

  alert(json.error.message);
  

};
