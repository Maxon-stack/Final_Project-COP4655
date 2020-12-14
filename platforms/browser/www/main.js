//global variable meant to hold the users account post login
var global_user = {};
//global array to hold users favorates and share them with firebase
var user_favs = [];
document.addEventListener("DOMContentLoaded", function(){


  var global_lat = 1.1;
  var global_lon = 1.1;
  

  document.addEventListener("deviceready", onDeviceReady2(),false);

  console.log(global_lat);
  console.log(global_lon);

  doauth();

  //set event listners for tabs
  document.getElementById('tab_home').onclick = dohome;    
  document.getElementById('tab_search').onclick = dosearch;
  document.getElementById('tab_fav').onclick = dofav;
  document.getElementById('tab_user').onclick = douser;

  
});
//get users location
function onDeviceReady2() {
  console.log("navigator.geolocation works well");
  navigator.geolocation.getCurrentPosition(onSuccess, onError,
    { enableHighAccuracy: true, timeout: 20000 });
}

function onSuccess(position) {
  global_lat  = position.coords.latitude;
  global_lon = position.coords.longitude;
  //getGeolocationResult(lat,lon);
}

function onError(error) {
  alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
//addes user favorites
//saves the id to user_fav and saves user_fav to firebase
function add_fav(id){
  let index = user_favs.indexOf(id);
  if(index == -1){
    user_favs.push(id);
    firebase.database().ref("user/" + global_user.user.uid).set({user_favs});
  }
}
//removes user favorites
//removes the id to user_fav and updates user_fav to firebase
function remove_favorite(id){
  let index = user_favs.indexOf(id);
  if(index > -1){
    user_favs.splice(index,1);
    firebase.database().ref("user/" + global_user.user.uid).set(user_favs);
    dofav();

  } 
}
function card_view(id){
  console.log(id);
  //sends api request with the intent of showing a single result per div
  var token = 'Bearer _lAZLVT_S1dEck3TmLhgKdNOy2BECCV4ui6Qk4jZQjPkgbg0AvCxluGa0a7UwA5GjqJh1gD9sdsTu7NfBkKGjeekzwx5hAEzq--fn1732bGzMD0JVuobsjY_9AnPX3Yx';

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){

      if (this.readyState == 4 && this.status == 200){
        console.log(JSON.parse(this.response));
        //sets response from the api to be "post_search"
        post_search = JSON.parse(this.response);

        let lat  = post_search.coordinates.latitude;
        let lon  = post_search.coordinates.longitude;

        

        let content = document.getElementById("content");
        content.innerHTML = "";



        //firebase add fav
        //let fire_fav = document.createElement("button");

        let img_fav_div = document.createElement("div");
        content.appendChild(img_fav_div);

        img_fav_div.innerHTML = '<i class="far fa-heart"></i>';
        img_fav_div.id = "img_fav_div";
        
        img_fav_div.onclick = function(){
          add_fav(id);
          console.log("fav saved");
        }
        //creating elemtnts to hold business info
        let name = document.createElement("h3");
        //creating map element
        let map_div = document.createElement("div");
        map_div.id = "map";
        let number = document.createElement("p");
        let address = document.createElement("p");
        let open_closed = document.createElement("h2");
        name.innerHTML = post_search.name;
        number.innerHTML = post_search.display_phone;
        address.innerHTML = post_search.location.display_address[0] + " " + post_search.location.display_address[1];

        if(post_search.hours[0].is_open_now == true){
          open_closed.innerHTML = "Currently Open";
        }
        else{
          open_closed.innerHTML = "Currently Closed";
        }

        //settings for the map
        var options = {
          zoom:12,
          center: {lat:lat,lng:lon}
        }
        //business marker
        var map = new google.maps.Map(map_div , options)
        var marker = new google.maps.Marker({
          position: {lat:lat, lng:lon},
          map:map
        });
        //user marker
        var marker2 = new google.maps.Marker({
          position: {lat:global_lat, lng:global_lon},
          map:map,
          icon: 'http://maps.google.com/mapfiles/kml/shapes/man.png'
        });

        console.log(global_lat);
        console.log(global_lon);

    


        //adding elements to content
        content.appendChild(name);
        content.appendChild(number);
        content.appendChild(address);
        content.appendChild(open_closed);
        var img = document.createElement("img");
        content.appendChild(img);
        img.className = "main_image";
        img.src = post_search.image_url;
        content.appendChild(map_div);        
        //content.appendChild(img);


      }
    };

    xhr.open('GET', 'https://api.yelp.com/v3/businesses/'+ id);
    xhr.setRequestHeader('Authorization', token);
    xhr.send();


  }





