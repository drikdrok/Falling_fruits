var player;
var tiles = [];
var fallingTiles = [];
var fruits = [];
var state = "play"

function setup(){
	createCanvas(512, 384);
	background(150, 150, 150);
	textSize(25);

	player = new Player(width/2, 300);

	player.highscore = getCookie("highscore") || 0;
	document.getElementById("highscore").innerHTML = "Highscore: " + player.highscore;

	for (var i = 0; i < width/8; i++){ //Fill tiles
		tiles[i] = 1;
	}

	//fruits.push(new Fruit());	
}

function draw(){
	update();
	

	//Draw
	clear();
	background(150, 150, 150);

	for (var i = 0; i < tiles.length; i++){ //Draw every tile
		if (tiles[i] == 1) {
			rect(i*8, player.y+player.height, 8, 8);
		}
	}

	player.draw();

	drawFruits();
	drawFallingTiles();


	text(player.score, width / 2 - textWidth(player.score) / 2, 50);


	//print(fallingTiles.length);
}

function update(){
	player.update();

	if (state != "reset"){
		updateFruits();
		updateFallingTiles();
	}

	state = "play";
}

function resetGame(){
	if (player.score > player.highscore) {
		player.highscore = player.score;
		document.getElementById("highscore").innerHTML = "Highscore: " + player.highscore;
		setCookie("highscore", player.highscore, 365);
	}

	player = new Player(width/2, 300);

	for (var i = 0; i < width/8; i++){ //Refill tiles
		tiles[i] = 1;
	}

	fruits = []

	state = "reset";
}




//Cookie stuff

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}