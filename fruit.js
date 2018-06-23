function Fruit() {
	this.x = Math.floor(Math.random() * width/8)*8;
	this.y = -10;

	this.width = 8;
	this.height = 8;

	this.id = fruits.length;

	this.speed = Math.random() * 2 + 1;

	this.type = "normal";

	if (Math.floor(Math.random() * 4) == 2){
		this.type = "special";
	}

	this.update = function(){
		this.y += this.speed;

		if (this.y+this.height > player.y+player.height && tiles[this.x/8] == 1){ // Hit floor
			tiles[this.x/8] = 0;
			removeFruit(this.id);
		}

	}

	this.draw = function(){

		if (this.type == "normal"){
			fill(color(0,255,0));
		}else{
			fill(color(221, 122, 255));
		}
		
		rect(this.x, this.y, this.width, this.height);
		fill(color(255,255,255));
	/*	textSize(10);
		text(this.id, this.x, this.y);
		textSize(25);
	*/
	}
}

function removeFruit(index){
	fruits.splice(index, 1);
	for (var i = 0; i < fruits.length; i++){
		fruits[i].id--;
		if (fruits[i].id < 0) { //Perhaps there is a better way...
			fruits[i].id = 0;
		}
	}
}

function updateFruits(){
	for (var i = fruits.length-1; i >= 0; i--){ 
		if (fruits[i].y > height){
			removeFruit(i);
		}
		if (fruits[i]) {
			fruits[i].update();
		}

	}


	if (frameCount % 120 == 0){
		fruits.push(new Fruit());
	}
}

function drawFruits(){
	for (var i = fruits.length-1; i >= 0; i--){
		fruits[i].draw();
	}
}