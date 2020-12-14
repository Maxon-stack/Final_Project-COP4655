function doauth(){



  let nav = document.getElementById("tab_container");

  console.log("hi");

  let is_accepted = false;
  if (is_accepted == false){
    //nav.innerText = "";
    nav.style.display = "none";
    console.log("hi2");

  }

  let content = document.getElementById("content");
  content.innerHTML = "";
  /*
  let b = document.createElement("button");
  b.innerHTML = "click me";
  b.onclick = function(){
    is_accepted = true

    if (nav.style.display === "none") {
      nav.style.display = "";
    } else {
      nav.style.display = "none";
    }

  }

  */

  let username_div = document.createElement("div");
  let username = document.createElement("input");
  let password = document.createElement("input");
  let password_div = document.createElement("div");
  let btn_div = document.createElement("div");
  let login_btn = document.createElement("button");
  let signup_btn = document.createElement("button");
  login_btn.innerHTML = "LOG IN";
  signup_btn.innerHTML = "SIGN UP";
  username_div.innerHTML = "Email";
  password_div.innerHTML = "Password";

  username_div.className = "username_div";
  username.className = "username";
  password_div.className = "password_div";
  password.className = "password";
  login_btn.className = "login_btn";
  signup_btn.className = "signup_btn";


  login_btn.onclick = function(){
    console.log(username.value);
    console.log(password.value);

    auth.signInWithEmailAndPassword(username.value, password.value).then(cred => {
      console.log(cred);
      global_user = cred;
      dohome();
    })

  }
  
  content.appendChild(username_div);
  content.appendChild(username);
  content.appendChild(password_div);
  content.appendChild(password);
  content.appendChild(btn_div);
  btn_div.appendChild(login_btn);
  btn_div.appendChild(signup_btn);

  signup_btn.onclick = function(){
    content.innerHTML = "";
    let create_user_header = document.createElement("h1");
    create_user_header.innerHTML = "Create Account";
    let new_username_div = document.createElement("div");
    new_username_div.innerHTML = "Email";
    let create_name = document.createElement("input");
    let create_password = document.createElement("input");
    let new_password_div = document.createElement("div");
    new_password_div.innerHTML = "Password";
    let new_btn_div = document.createElement("div");
    let new_signup_btn = document.createElement("button");
    new_signup_btn.innerHTML = "Create Account";
    new_username_div.className = "username_div";
    create_name.className = "username";
    new_password_div.className = "password_div";
    create_password.className = "password";
    //login_btn.className = "login_btn";
    new_signup_btn.className = "signup_btn";
    content.appendChild(create_user_header);
    content.appendChild(new_username_div);
    content.appendChild(create_name);
    content.appendChild(new_password_div);
    content.appendChild(create_password);
    content.appendChild(new_btn_div);
    new_btn_div.appendChild(new_signup_btn);
    const new_account_name = create_name.value;
    const new_account_pass = create_password.value;
    //console.log(create_name.value);
    new_signup_btn.onclick = function(){
      console.log(create_name.value);
      console.log(create_password.value);
      auth.createUserWithEmailAndPassword(create_name.value, create_password.value).then(cred => {
        console.log(cred);
        global_user = cred;
        dohome();
      })
    }

  }


}