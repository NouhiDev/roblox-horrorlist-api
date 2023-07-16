var request = new XMLHttpRequest();

request.open("GET", "https://games.roblox.com/v1/games/multiget-place-details?placeIds=7902470429", true);

request.onload = function() {
  var data = JSON.parse(this.response);

  console.log(data);
}

request.send();