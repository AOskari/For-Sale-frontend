# For-Sale - Online marketplace frontend

For-Sale is a mobile first designed online marketplace application, which implements a single page and the MVC architecture. Registering, creating listings as well as modifying user or listing information has been implemented with form-elements and utilizing the Fetch API.

# Sending data

Data is sent to the backend using information the user has given to the form element:
```
<form id="login_form" class="display">
    <h3 style="font-weight: 700;">Login</h3>
    <div class="input_container">
        <h4>Email</h4>
        <input class="input_field" id="login_name" placeholder="..." name="username" type="email" required>
    </div>
    <div class="input_container">
        <h4>Password</h4>
        <input class="input_field" id="login_passwd" type="password" name="password" placeholder="..." required>
        <h4 id="register_text">
            New user? 
            <button type="button" onclick="displayRegisterView()" class="borderless_button">Create an account
            </button>
        </h4>
    </div>
    <button type="submit" class="borderless_button">Sign in</button>
</form>
```

This is handled by a asyncronous submit event:
```
const loginForm = document.getElementById("login_form");

// A submit eventListener which attempts to log the user in with the given credentials.
loginForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);

  // Creating fetch options for login
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // Attempt to login with given options
  const response = await fetch(url + "/auth/login", fetchOptions);
  const json = await response.json();

  // Set the token and user info to the session storage, if succesful.
  if (!json.user) {
    alert(json.message);
  } else {
    sessionStorage.setItem("token", json.token);
    sessionStorage.setItem("user", JSON.stringify(json.user));
  }

  // Update UI according to login status.
  
  checkLoggedStatus();
  setProfileInfo();
  displayHomeView();
});
```

# Single page
The single page architecture requires that certain elements are hidden and displayed according to the buttons the user is navigating through. Two simple functions are used for displaying and hiding elements.

```
const hideElementById = (element) => {
  const e = document.getElementById(element);
  e.classList.add("none");
  e.classList.remove("display");
};
const displayElementById = (element) => {
  const e = document.getElementById(element);
  e.classList.add("display");
  e.classList.remove("none");
};
```
