/*
  This has been implemented following w3schools tutorial at https://www.w3schools.com/howto/howto_css_modal_images.asp (read 15.12.2021)
 */
const modal = document.getElementById("myModal");

const img = document.getElementById("listing_section_img");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");

let clicked = false;

img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
  clicked = true;
}

const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

modal.onclick = function() {
  if (clicked) {
    modal.style.display = "none";
    console.log("This is happening!");
    clicked = false;
  }
}