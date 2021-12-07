"use strict";

const addComment = async (listingId, form) => {

  form.user_id = JSON.parse(sessionStorage.getItem("user")).user_id;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(form),
  };

  const response = await fetch(url + "/comment/listing/" + listingId, fetchOptions);
  const json = await response.json();

  if (response.ok) alert("Comment succesfully added.");

}