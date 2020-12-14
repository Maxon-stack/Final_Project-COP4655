var douser = function(){
  console.log("in")
  let workspace = document.getElementById("content");
  workspace.innerHTML = "User Email:";
  console.log(global_user);

  //let img = document.createElement("img");
  let user_email = document.createElement("h3");
  //gets the global user and adds the email and appends it to the screen
  user_email.innerHTML = global_user.user.email;
  //creates and appends a logout button
  let logout_btn = document.createElement("button");
  logout_btn.innerHTML = "Sign Out";
  logout_btn.className = "login_btn";

  workspace.appendChild(user_email);
  workspace.appendChild(logout_btn);
  //when the logout button is clicked the user is sent back to the login page
  logout_btn.onclick = function(){
    doauth();
  }

}


