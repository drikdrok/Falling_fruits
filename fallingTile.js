function FallingTile(){
	this.possibilities = [];

	for (var i = 0; i < tiles.length; i++){ //Se all tiles that are missing
		if (tiles[i] == 0 && (tiles[i-1] == 1 || tiles[i+1] == 1)){
			this.possibilities.push(i);
		}
	}


	this.x = this.possibilities[Math.floor(Math.random() * this.possibilities.length)]*8;
	this.y = -10;

	this.id = fallingTiles.length;


	this.update = function(){
		if (this.possibilities.length == 0 || tiles[this.x/8] == 1){
			fallingTiles.splice(this.id, 1);
		}

		this.y += 4;

		if (this.y >= player.y+player.height){
			tiles[this.x/8] = 1;
			fallingTiles.splice(this.id, 1);
		}
	}

	this.draw = function(){
		rect(this.x, this.y, 8, 8);
	}

}

function updateFallingTiles() {
	for (var i = fallingTiles.length-1; i >= 0; i--){
		fallingTiles[i].update();
	}
}

function drawFallingTiles() {
	for (var i = fallingTiles.length-1; i >= 0; i--){
		fallingTiles[i].draw();
	}
}