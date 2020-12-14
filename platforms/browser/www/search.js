var dosearch = function(){
  console.log("in")
  let workspace = document.getElementById("content");
  workspace.innerHTML = "search clicked";
  workspace.innerHTML = "";

  workspace.className = "content";

  let page_title = document.createElement("H1");
  page_title.innerHTML = "Search";
  workspace.appendChild(page_title);
  //creating search box and other elements and appending them
  let search_div = document.createElement("div");
  let search_box = document.createElement("input");
  search_box.className = "search_box";
  let search_button = document.createElement("button");
  //let search_suggestions = document.createElement("div")
  search_div.id = "search_div";

  let results_div = document.createElement("div");
  

  search_button.id = "search_button";
  search_button.className = "search_button";

  search_button.innerHTML = "search";
  search_div.appendChild(search_box);
  search_div.appendChild(search_button);
  search_div.appendChild(results_div);

  workspace.appendChild(search_div);

  //when the seach button is clicked the function stores the value of the searchbox
  //then sends an api request to get the search and display the results
  search_button.onclick = function(){
    //console.log(search_box.value);
    const search_value = search_box.value;
    api_test();

  function api_test(){
    var token = 'Bearer _lAZLVT_S1dEck3TmLhgKdNOy2BECCV4ui6Qk4jZQjPkgbg0AvCxluGa0a7UwA5GjqJh1gD9sdsTu7NfBkKGjeekzwx5hAEzq--fn1732bGzMD0JVuobsjY_9AnPX3Yx';
  
      var xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function(){
  
        if (this.readyState == 4 && this.status == 200){
          console.log(JSON.parse(this.response));
          results = JSON.parse(this.response);

          console.log(search_value);
          console.log(global_lat);
          console.log(global_lon);
          results_div.innerHTML = "results:";

          if(results.total == 0){
            results_div.innerHTML = "No Results, please search again";
          }
          else{
            for(i = 0; i < results.businesses.length; i++){

              console.log(results.businesses[i].id);

              let results_card = document.createElement("DIV");
              var results_card_id = results.businesses[i].id;
              let rating_card_title = document.createElement("H5");
              let rating_card_address = document.createElement("p");
              let rating_card_number = document.createElement("p");
              results_card.className = "rating";
              var img = document.createElement("img");
              img.className = "images";
              img.src = results.businesses[i].image_url;
              results_card.appendChild(img);
              results_card.appendChild(rating_card_title);

              results_card.appendChild(rating_card_number);
              results_card.appendChild(rating_card_address);
              
              rating_card_title.innerHTML = results.businesses[i].name;
              rating_card_number.innerHTML = results.businesses[i].display_phone;
              rating_card_address.innerHTML = results.businesses[i].location.display_address[0] + " " + results.businesses[i].location.display_address[1];

              rating_card_title.className = "rating_card_title";
              rating_card_number.className = "rating_card_number";
              rating_card_address.className = "rating_card_address";
              //this function is created to prevent a scope issue with the id
              let x = function(results_card_id){
              results_card.onclick = function(){ card_view(results_card_id)};
              }
              x(results_card_id);

              results_div.appendChild(results_card);



            }
          }

        }
      };
      xhr.open('GET', 'https://api.yelp.com/v3/businesses/search?term='+ search_value +'&latitude=' + global_lat +'&longitude=' + global_lon);
      xhr.setRequestHeader('Authorization', token);
      xhr.send();
  
  
    }

  }





}
