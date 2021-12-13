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

/** Fetches all comments for the given listing id. */
const getComments = async (id) => {

   // Creating a fetch for getting all the comments for the listing ad.
   const commentResponse = await fetch(url + "/commentGet/listing/" + id);
   const comments = await commentResponse.json();
 
   // Emptying the list of comments before displaying current ones.
   document.getElementById("listing_comments").innerHTML = "";
 
 
   // Looping through all comments and creating them into the listing_comments ul.
   for (let j = 0; j < Object.keys(comments).length; j++) {
 
 
     // Fetching the creator of the comment.
     const commentUser = await fetch(url + "/userGet/" + comments[j].user_id);
     const user = await commentUser.json();
 
     
     // Set correct information to selected elements.
     const li = document.createElement("li");
     const h2 = document.createElement("h2");
     const br = document.createElement("br");
     const p = document.createElement("p");
 
     h2.innerHTML = `${user.first_name} ${user.last_name}`;
     p.innerHTML = comments[j].comment;
     p.classList.add("comment_text");
 
     // Add previously created elements to the list and add the list element to the ul.
     li.appendChild(h2);
     li.appendChild(br);
     li.appendChild(p);
     li.classList.add("listing_comment");
     document.getElementById("listing_comments").appendChild(li);
   }


}