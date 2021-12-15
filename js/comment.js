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

    let loggedIn = false;
    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    if (currentUser) loggedIn = true;

   // Emptying the list of comments before displaying current ones.
   document.getElementById("listing_comments").innerHTML = "";
 
 
   // Looping through all comments and creating them into the listing_comments ul.
   for (let j = 0; j < Object.keys(comments).length; j++) {
 
  
      // Fetching the creator of the comment.
      const commentUser = await fetch(url + "/userGet/" + comments[j].user_id);
      const user = await commentUser.json();
  
      
      // Set correct information to selected elements.
      const userImgContainer = document.createElement("div");
      const img = document.createElement("img");
      userImgContainer.classList.add("comment_img_container");
      img.classList.add("comment_img");

      img.onerror = () => img.src = "./images/default_profile_img.png";
      img.src = url + "/thumbnails/" + user.profile_pic;
      userImgContainer.appendChild(img);

      const li = document.createElement("li");
      const commentContainer = document.createElement("div");
      const deleteContainer = document.createElement("div");
      deleteContainer.classList.add("comment_delete_container");

      const h2 = document.createElement("h2");
      const date = document.createElement("h4");
      const br = document.createElement("br");
      const p = document.createElement("p");
 
      date.classList.add("comment_date");

      const formattedDate = new Date(comments[j].comment_date);

     // TODO: Format date, and add it to the date innerhtml.

      h2.innerHTML = `${user.first_name} ${user.last_name}`;
      p.innerHTML = comments[j].comment;

      let day = `${formattedDate.getDate()}`;
      let month = `${formattedDate.getMonth() + 1}`
      let minutes = `${formattedDate.getMinutes()}`
      let hours = `${formattedDate.getHours()}`

      if (formattedDate.getDate() <= 9) day = "0" + (formattedDate.getDate());
      if (formattedDate.getMonth() + 1 <= 9) month = "0" + (formattedDate.getMonth() + 1);
      if (formattedDate.getMinutes() <= 9) minutes = "0" + (formattedDate.getMinutes());
      if (formattedDate.getHours() <= 9) hours = "0" + (formattedDate.getHours());

      date.innerHTML = `${day}.${month}.${formattedDate.getFullYear()} 
      @ ${hours}:${minutes}`;
      p.classList.add("comment_text");

      deleteContainer.appendChild(h2);
      
      if (loggedIn && (currentUser.user_id == user.user_id ||currentUser.user_id == 0)) {

        const deleteBtn = document.createElement("div");
        const img = document.createElement("img");
        img.src = "./images/delete-logo.png";

        deleteBtn.classList.add("delete_button");
        deleteBtn.appendChild(img);
        deleteContainer.appendChild(deleteBtn); 

        deleteBtn.addEventListener("click", async (evt) => {
          evt.preventDefault();
          
          removeComment(comments[j].comment_id);
        }); 

        console.log("Delete button added.");

      }


      // Add previously created elements to the list and add the list element to the ul.
      commentContainer.appendChild(deleteContainer);
      commentContainer.appendChild(date);
      commentContainer.appendChild(br);
      commentContainer.appendChild(p);
      commentContainer.classList.add("listing_comment");

      li.classList.add("comment_list_object");

      li.appendChild(userImgContainer);
      li.appendChild(commentContainer);

      document.getElementById("listing_comments").appendChild(li);
   }


}

/** Removes the selected comment. */
const removeComment = async (id) => {
  try {

    const fetchOptions = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      }
    }
  
    if (confirm("Delete comment?")) {
      const response = await fetch(url + "/comment/" + id, fetchOptions);
  
      if (response.ok) {
        alert("Comment removal succesful.");
        return;
      }
    
      alert("Comment removal failed.");
    }
  
  

  } catch (e) {
    console.log(`error ${e.message} at removeComment`);
  }

}