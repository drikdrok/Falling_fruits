function Player(x, y){
	this.x = x || 10;
	this.y = y || 10;

	this.width = 16;
	this.height = 16;

	this.speed = 3;

	this.score = 0;
	this.highscore = 0;

	this.direction = 1; 
	this.toungeX = 0;
	this.toungeY = 0; 
	this.toungeState = "idle";
	this.toungeSpeed = 3;

	this.update = function(){

		if (this.toungeState == "idle") {
			if (tiles[Math.floor(this.x/8)] == 1 && keyIsDown(65)){ // Move Left
				this.x -= this.speed;
				this.direction = -1;
			}
			if (tiles[Math.floor(this.x/8)+2] == 1 && keyIsDown(68)){ //Move Right
				this.x += this.speed;
				this.direction = 1;
			}
		}

		if (this.x < 0) { // Boundary
			this.x = 0;
		}else if (this.x + this.width > width){
			this.x = width - this.width - 1;
		}


		//Tounge
		if (keyIsDown(32)){ //Space is down
			if (this.toungeState == "idle"){
				this.toungeState = "shooting";
			} else if(this.toungeState == "shooting"){
				this.toungeX += this.toungeSpeed * this.direction;
				this.toungeY -= this.toungeSpeed;

				var x = this.x + this.toungeX;
				var y = this.y + this.toungeY;
				if (x < 0 || x > width || y < 0){
					this.toungeState = "retracting";
				}
			}
		}else{ //Space is not down
			if (this.toungeState == "shooting"){
				this.toungeState = "retracting";
			}
		}

		if (this.toungeState == "retracting"){
			this.toungeX -= (this.toungeSpeed + 2) * this.direction;
			this.toungeY += this.toungeSpeed + 2; //I have no idea why this works no matter if i use += or -= it's the same wth

			if (this.toungeY >= 0){
				this.toungeState = "idle";
			}
		} else if (this.toungeState == "idle"){
			this.toungeX = 0;
			this.toungeY = 0;
		}



		//Collision

		for (var i = 0; i < fruits.length; i++){
			if (this.x < fruits[i].x + fruits[i].width && this.x + this.width > fruits[i].x && this.y < fruits[i].y + fruits[i].height && this.height + this.y > fruits[i].y){ // Collides with fruit
				resetGame();
			} else if (this.x + this.toungeX < fruits[i].x + fruits[i].width && this.x + this.toungeX + 10 > fruits[i].x && this.y + this.toungeY < fruits[i].y + fruits[i].height && 10 + this.y + this.toungeY > fruits[i].y){ // Tounge hits fruit
				this.score += Math.floor(height-fruits[i].y);
				this.toungeState = "retracting";

				if (fruits[i].type == "special"){
					fallingTiles.push(new FallingTile());
				}
				removeFruit(i);
			}
		}

	}

	this.draw = function(){

		fill(color(249, 134, 179));

		if (this.toungeState == "shooting" || this.toungeState == "retracting"){ // Tounge
			if (this.direction == -1) {
				line(this.x, this.y + 5, this.x + this.toungeX, this.y + this.toungeY);
			} else {
				line(this.x + 16, this.y + 5, this.x + 16 + this.toungeX, this.y + this.toungeY);
			}
		}

		fill(color(255,0,0));
		rect(this.x, this.y, this.width, this.height);
		fill(color(255,255,255));
	}
}