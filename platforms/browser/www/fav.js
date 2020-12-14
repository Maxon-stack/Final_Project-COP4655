var dofav = function(){
  console.log("in Fav");

  let workspace = document.getElementById("content");
  workspace.innerHTML = "";
  let page_title = document.createElement("H1");
  //creates a page title
  page_title.innerHTML = "Favorites";
  workspace.appendChild(page_title);
  //if the global user favorites array is empty then it will tell user to add favorites
  if(user_favs.length == 0){
    let no_fav_div = document.createElement("div");
    no_fav_div.innerHTML = "No favorites here, go add some!";
    workspace.appendChild(no_fav_div)
  }
  //otherwise it will take every id in the array and send an api request to get the favorite
  else{
    for(i = 0; i < user_favs.length; i++){
    var token = 'Bearer _lAZLVT_S1dEck3TmLhgKdNOy2BECCV4ui6Qk4jZQjPkgbg0AvCxluGa0a7UwA5GjqJh1gD9sdsTu7NfBkKGjeekzwx5hAEzq--fn1732bGzMD0JVuobsjY_9AnPX3Yx';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        console.log(JSON.parse(this.response));
        results = JSON.parse(this.response);
        let fav_div = document.createElement("div")
        console.log(results.id);
        let results_card = document.createElement("DIV");
        var results_card_id = results.id;
        let rating_card_title = document.createElement("H5");
        let rating_card_address = document.createElement("p");
        let rating_card_number = document.createElement("p");

        let remove_div = document.createElement('div');
        //remove_fav.innerHTML = "remove fav";
        remove_div.className = "remove_div";
        
        let remove_fav = document.createElement('button');
        remove_fav.innerHTML = "remove fav";
        remove_fav.className = "remove_fav";



        remove_div.appendChild(remove_fav);
        


        results_card.className = "rating";
        var img = document.createElement("img");
        img.className = "images";
        img.src = results.image_url;
        results_card.appendChild(img);
        results_card.appendChild(rating_card_title);

        results_card.appendChild(rating_card_number);
        results_card.appendChild(rating_card_address);
        
        rating_card_title.innerHTML = results.name;
        rating_card_number.innerHTML = results.display_phone;
        rating_card_address.innerHTML = results.location.display_address[0] + " " + results.location.display_address[1];

        rating_card_title.className = "rating_card_title";
        rating_card_number.className = "rating_card_number";
        rating_card_address.className = "rating_card_address";

        let remove_function = function(results_card_id){
          remove_fav.onclick = function(){
            remove_favorite(results_card_id);
          }
        }

        let x = function(results_card_id){
        results_card.onclick = function(){ card_view(results_card_id)};
        }


        remove_function(results_card_id);
        x(results_card_id);

        fav_div.appendChild(results_card);
        workspace.appendChild(fav_div);
        workspace.appendChild(remove_div);
        console.log(global_lat);
        console.log(global_lon);
      }
    };
    xhr.open('GET', 'https://api.yelp.com/v3/businesses/'+ user_favs[i]);
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

    
  }
  //logs the firebase value
  firebase.database().ref('user/'+ global_user.user.uid).on('value',function(snapshot){
    console.log(snapshot.val());
  });


}