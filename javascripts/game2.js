//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
//var song = document.getElementById("inkspots");
stage.width = GameWidth;
stage.height = GameHeight;
var ctx = stage.getContext("2d");
ctx.fillStyle = "black";
ctx.font = GameFont;

//---------------
//Preloading ...
//---------------
//Preload Art Assets
//- Sprite Sheet: Image API:
//http://www.html5canvastutorials.com/tutorials/html5-canvas-images/
//Alex(2/3/16) - may not need to have any message to indicate loading for project 1

var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PathToCharacter;  // source image location set in constants.js

//var audio = new Audio();
var audioWilhelm = new Audio('audio/Wilhelm.mp3');
var audioMaybe = new Audio('audio/TheInkSpots-Maybe.mp3');
var audioDream = new Audio('audio/LouisArmstrong-AKissToBuildADreamOn.mp3');
//audio.ready = false;
//audio.onload = setAssetReady;
//audio.src = 'audio/Wilhelm.mp3';
//audio2.play();
//song.play();

function setAssetReady()
{
	this.ready = true;
}

//Display Preloading (??)
ctx.fillRect(0,0,stage.width,stage.height);
ctx.fillStyle = "#FFFFFF";
ctx.fillText(TextPreloading, TextPreloadingX, TextPreloadingY);
var preloader = setInterval(preloading, TimePerFrame);
var gameloop;

function preloading()
{	
	if (charImage.ready)// && audio.ready)
	{
		clearInterval(preloader);		
		gameloop = setInterval(update, TimePerFrame);	
	}
}

//------------
//Game Loop
//------------
//currX, currY is a reference to  the image in sprite sheet
//currX = IMAGE_START_X;
//currY = IMAGE_START_Y;

//Game is 512w x 384h 
//Character is 46w x 63h
//Variables for character location
  //Start character in bottom right corner
var characterCurrentX = GameWidth - 140 - CharacterWidth;
var characterCurrentY = GameHeight - 40 - CharacterHeight;

var characterSpriteFacingLeftX = 0;
var characterSpriteFacingLeftY = 64;
var characterSpriteFacingRightX = 0;
var characterSpriteFacingRightY = 0;
var characterSpriteFacingUpMainX = 0;
var characterSpriteFacingUpMainY = 127;
var characterSpriteFacingUpSecondX = 0;
var characterSpriteFacingUpSecondY = 189;

var characterSpriteX = characterSpriteFacingRightX;
var characterSpriteY = characterSpriteFacingRightY;
//var currX = 0;
//var currY = 0;

var characterFacingUpCheck = true;
var characterFacingLeftCheck = false;
var characterFacingRightCheck = false;

var rightKeyDown = false;
var leftKeyDown = false;
var upKeyDown = false;
var downKeyDown = false;

var characterSpeed = 1;
var maxCharacterSpeed = 10;
var minCharacterSpeed = 1;
var distanceTraveled = 0;
var score = 0;
var powerRodCount = 20;

var deathclawSpriteX1 = 0;
var deathclawSpriteY1 = 253;
var deathclawSpriteX2 = 136;
var deathclawSpriteY2 = 253;
var deathclawHeight = 90;
var deathclawWidth = 136;
var deathclawCurrentX = 1000;
var deathclawCurrentY = -650;
var deathclawSpriteX = deathclawSpriteX1;
var deathclawSpriteY = deathclawSpriteY1;

var musicBoxSpriteX = 0;
var musicBoxSpriteY = 343;
var musicBoxHeight = 39;
var musicBoxWidth = 39;
var musicBox1CurrentX = 400;
var musicBox1CurrentY = 300;

var musicBox2CurrentX = 200;
var musicBox2CurrentY = 200;

var deadSpriteX = 0;
var deadSpriteY = 382;//375;
var deadHeight = 33;//32;
var deadWidth = 72; //72;

var powerRodSpriteX1 = 0;
var powerRodSpriteY = 469;
var powerRodSpriteX2 = 14;
var powerRodSpriteX3 = 27;
var powerRodSpriteX4 = 40;
var powerRodSpriteX5 = 53;
var powerRodSpriteX6 = 66;
var powerRodSpriteX7 = 79;
var powerRodSpriteX8 = 92;
//var powerRodHitBoxX = 3;
//var powerRodHitBoxY = 472;
var powerRodHeight = 13;
var powerRodWidth = 13;
var powerRodHitboxHeight = 7;
var powerRodHitboxWidth = 7;
var powerRod1CurrentX = 0;
var powerRod1CurrentY = 0;
var powerRod1CurrentSpriteX = powerRodSpriteX1;
var powerRod2CurrentX = 0;
var powerRod2CurrentY = 0;
var powerRod2CurrentSpriteX = powerRodSpriteX1;
var powerRod3CurrentX = 0;
var powerRod3CurrentY = 0;
var powerRod3CurrentSpriteX = powerRodSpriteX1;
var powerRod1Active = false;
var powerRod2Active = false;
var powerRod3Active = false;

var cloudSpriteX1 = 0;
var cloudSpriteY1 = 415;
var cloudSpriteX2 = 75;
var cloudSpriteY2 = 436;
var cloudSpriteX3 = 120;
var cloudSpriteY3 = 453;
var cloudHeight1 = 54;
var cloudWidth1 = 74;
var cloudHeight2 = 33;
var cloudWidth2 = 45;
var cloudHeight3 = 16;
var cloudWidth3 = 21;
var cloud1CurrentX = 0;
var cloud1CurrentY = 0;
var cloud2CurrentX = 0;
var cloud2CurrentY = 0;
var cloud3CurrentX = 0;
var cloud3CurrentY = 0;


//Set sprites to look left and move
function characterFacingLeft(){
	
	//If already facing left, move frame
	if(characterSpriteY == characterSpriteFacingLeftY)
	{
		if(characterSpriteX >= CharacterWidth*2)
		{
			characterSpriteX = 0;
		}
		else{
			characterSpriteX = characterSpriteX + CharacterWidth;
		}
	}
	//if facing right, move to middle
	else if(characterSpriteY == characterSpriteFacingRightY){
		characterSpriteX = characterSpriteFacingUpMainX;
		characterSpriteY = characterSpriteFacingUpMainY;
	}
	//if facing middle, face left
	else{
		characterSpriteX = characterSpriteFacingLeftX;
		characterSpriteY = characterSpriteFacingLeftY;
	}
}

//Set sprites to look right and move
function characterFacingRight(){
	
	//If already facing right, move frame
	if(characterSpriteY == characterSpriteFacingRightY)
	{
		if(characterSpriteX >= CharacterWidth*2)
		{
			characterSpriteX = 0;
		}
		else{
			characterSpriteX = characterSpriteX + CharacterWidth;
		}
	}
	//if facing left, move to middle
	else if(characterSpriteY == characterSpriteFacingLeftY){
		characterSpriteX = characterSpriteFacingUpMainX;
		characterSpriteY = characterSpriteFacingUpMainY;
	}
	//if facing middle, face lift
	else{
		characterSpriteX = characterSpriteFacingRightX;
		characterSpriteY = characterSpriteFacingRightY;
	}
}

function characterFacingUp(){
	if(characterSpriteY == characterSpriteFacingUpMainY)
	{
		if(characterSpriteX >= CharacterWidth*2)
		{
			characterSpriteX = 0;
		}
		else{
			characterSpriteX = characterSpriteX + CharacterWidth;
		}
	}
	else if(characterSpriteY == characterSpriteFacingUpSecondY)
	{
		if(characterSpriteX >= CharacterWidth*2)
		{
			characterSpriteX = 0;
		}
		else{
			characterSpriteX = characterSpriteX + CharacterWidth;
		}
	}
	else{
		characterSpriteX = characterSpriteFacingUpMainX;
		characterSpriteY = characterSpriteFacingUpMainY;
	}
}

/*
function upKeyDown()
{
	if(leftKeyDown == true || rightKeyDown == true){
		
	}
	else{
		characterFacingUpCheck = true;
		characterFacingLeftCheck = false;
		characterFacingRightCheck = false;
	}	
	if(characterSpriteY == characterSpriteFacingUpMainY){					
		characterSpriteY = characterSpriteFacingUpSecondY;
	}
	else if(characterSpriteY == characterSpriteFacingUpSecondY)
	{
		characterSpriteY = characterSpriteFacingUpMainY;
	}
	characterCurrentY = characterCurrentY - 4;
}
*/



function onKeyDown(evt) 
{	
	// http://www.w3schools.com/js/tryit.asp?filename=try_dom_event_keycode
	
	//Right Arrow Pressed
	if (evt.keyCode == 39){
		rightKeyDown = true;
		characterFacingUpCheck = false;
		characterFacingLeftCheck = false;
		characterFacingRightCheck = true;

	}
	//Left Arrow Pressed
  	else if (evt.keyCode == 37){
  		leftKeyDown = true;
		characterFacingUpCheck = false;
		characterFacingLeftCheck = true;
		characterFacingRightCheck = false;
  	}
	
	//Down Arrow Pressed
	if(evt.keyCode == 40){
		downKeyDown = true;
		if(leftKeyDown == true || rightKeyDown == true)
		{
		
		}
		else
		{
  			characterFacingUpCheck = true;
  			characterFacingLeftCheck = false;
  			characterFacingRightCheck = false;
  			if(characterSpriteY == characterSpriteFacingUpMainY){
  				characterSpriteY = characterSpriteFacingUpSecondY;
  			}
  			else if(characterSpriteY == characterSpriteFacingUpSecondY)
  			{
  				characterSpriteY = characterSpriteFacingUpMainY;
  			}
		}
		if(characterSpeed > minCharacterSpeed){
			characterSpeed = characterSpeed - 1;
		}
	}
	//Up Arrow Pressed
	else if(evt.keyCode == 38){
		upKeyDown = true
		if(leftKeyDown == true || rightKeyDown == true){
			
		}
		else{
			characterFacingUpCheck = true;
			characterFacingLeftCheck = false;
			characterFacingRightCheck = false;
			if(characterSpriteY == characterSpriteFacingUpMainY){					
				characterSpriteY = characterSpriteFacingUpSecondY;
			}
			else if(characterSpriteY == characterSpriteFacingUpSecondY)
			{
				characterSpriteY = characterSpriteFacingUpMainY;
			}
		}
		if(characterSpeed < maxCharacterSpeed){
			characterSpeed = characterSpeed + 1;
		}
	}
	//Spacebar pressed
	if(evt.keyCode == 32){
		throwPowerRod();
		powerRodCount = powerRodCount -1;
	}
	/*
	switch (evt.keyCode) 
	{
	
		case 38:  /* Up arrow was pressed */ 
		    /*   
			characterFacingUpCheck = true;
			characterFacingLeftCheck = false;
			characterFacingRightCheck = false;
			if(characterSpriteY == characterSpriteFacingUpMainY){					
				characterSpriteY = characterSpriteFacingUpSecondY;
			}
			else if(characterSpriteY == characterSpriteFacingUpSecondY)
			{
				characterSpriteY = characterSpriteFacingUpMainY;
			}
			characterCurrentY = characterCurrentY - 4;
			break;
			
		case 40:  /* Down arrow was pressed */ /*
			characterFacingUpCheck = true;
			characterFacingLeftCheck = false;
			characterFacingRightCheck = false;
			if(characterSpriteY == characterSpriteFacingUpMainY){
				characterSpriteY = characterSpriteFacingUpSecondY;
			}
			else if(characterSpriteY == characterSpriteFacingUpSecondY)
			{
				characterSpriteY = characterSpriteFacingUpMainY;
			}
			characterCurrentY = characterCurrentY + 4;
			break;
	
		case 37:  /* Left arrow was pressed */ /*
			characterCurrentX = characterCurrentX - 4;
			characterFacingUpCheck = false;
			characterFacingLeftCheck = true;
			characterFacingRightCheck = false;
			
			break;
	
		case 39:  /* Right arrow was pressed */  /*
			characterFacingUpCheck = false;
			characterFacingLeftCheck = false;
			characterFacingRightCheck = true;
		
			//characterCurrentX = characterCurrentX + 4;
			//break;				
		//case 16: // shift key
				//shiftkey=true;
				//break;
		
	} // end switch */
		
			
} // end function

function onKeyUp(evt){	
	if (evt.keyCode == 39) 		rightKeyDown = false;
  	if (evt.keyCode == 37) 		leftKeyDown = false;
	if (evt.keyCode == 38) 		upKeyDown = false;
	if (evt.keyCode == 40)		downKeyDown = false;
}

function moveDeathclaw(){
	if(deathclawSpriteX == deathclawSpriteX1)
	{
		deathclawSpriteX = deathclawSpriteX2;
	}
	else{
		deathclawSpriteX = deathclawSpriteX1;
	}
	
	if(deathclawSpriteY == deathclawSpriteY1){
		deathclawSpriteY = deathclawSpriteY2;
	}
	else{
		deathclawSpriteY = deathclawSpriteY1;
	}
	deathclawCurrentX = deathclawCurrentX-8 - characterSpeed;
	deathclawCurrentY = deathclawCurrentY+9 + characterSpeed;
	
}

function deathByDeathclaw(){
	if(deathclawSpriteX == deathclawSpriteX1)
	{
		deathclawSpriteX = deathclawSpriteX2;
	}
	else{
		deathclawSpriteX = deathclawSpriteX1;
	}
	
	if(deathclawSpriteY == deathclawSpriteY1){
		deathclawSpriteY = deathclawSpriteY2;
	}
	else{
		deathclawSpriteY = deathclawSpriteY1;
	}
	//deathclawCurrentX = deathclawCurrentX-8;
	//deathclawCurrentY = deathclawCurrentY+9;
}

function moveMusicBox(){
	musicBox1CurrentX = musicBox1CurrentX - characterSpeed;
	musicBox1CurrentY = musicBox1CurrentY + characterSpeed;
	musicBox2CurrentX = musicBox2CurrentX - characterSpeed;
	musicBox2CurrentY = musicBox2CurrentY + characterSpeed;
}

function throwPowerRod(){
	if(powerRod1Active == false){
		powerRod1CurrentX = characterCurrentX-1;
		powerRod1CurrentY = characterCurrentY-5;
		powerRod1Active = true;
	}
	else if(powerRod2Active == false){
		powerRod2CurrentX = characterCurrentX-1;
		powerRod2CurrentY = characterCurrentY-5;
		powerRod2Active = true;
		
	}
	else if(powerRod3Active == false){
		powerRod3CurrentX = characterCurrentX-1;
		powerRod3CurrentY = characterCurrentY-5;
		powerRod3Active = true;
		
	}
	//can only throw 3 at a time
}


//1 = active, 2 = inactive, 3 = points given
var musicBox1Active = 1;
var musicBox2Active = 1;
var deathclawActive = true;
var playerAlive = true;
var deathSound = true;

function update()
{		
	//Clear Canvas
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, stage.width, stage.height);	
		
	ctx.fillRect(0,0,40,40);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Speed: " + characterSpeed + "     Score: " + score + "      Fusion Cores: " + powerRodCount, 15, 15);
	
	//x,y,width,height
	//ctx.fillRect(200,0,40,40);
	//ctx.fillStyle = "#FFFFFF";
	//ctx.fillText("Score: " + score, 15, 15);
	
	//Draw Image
	//charImage = character
	//currX = current X location on sprite
	//currY = current Y location on canvas
	//CharacterWidth = CharacterWidth in sprite
	//CharacterHeight = CharacterHeight in sprite
	//CharacterSpriteStartX = Canvas image start x location
	//CharacterSpriteStartY = Canvas image start y location
	//CharacterWidth = CharacterWidth on canvas
	//CharacterHeight = CharacterHeight on canvas
	
	//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	//sx = x coordinate to start clipping
	//sy = y coordinate to start clipping
	//swidth = width of clipped image
	//sheight = height of clipped image
	//x = x coordinate to place on canvas
	//y coordinate to play on canvas
	//width of clipping on canvas
	//height of clipping on canvas
	
	ctx.moveTo(350, 384);
	ctx.lineTo(512, 192);
	ctx.strokeStyle="green"
	ctx.stroke();
	
	ctx.drawImage(charImage,deathclawSpriteX, deathclawSpriteY, deathclawWidth, deathclawHeight, 
			deathclawCurrentX, deathclawCurrentY, deathclawWidth, deathclawHeight);
	
	if(deathclawActive == true){
		moveDeathclaw();
	}
	else{
		deathByDeathclaw();
	}
	
	if(((deathclawCurrentX + deathclawWidth) >= (characterCurrentX)) &&
		((deathclawCurrentX <= characterCurrentX + CharacterWidth)) &&
		((deathclawCurrentY + deathclawHeight) >= (characterCurrentY) ) &&
		((deathclawCurrentY <= characterCurrentY + CharacterHeight))){
	//if(characterCurrentX == 100){
		//audioMaybe.stop();
		if(deathSound == true){
			audioWilhelm.play();
			deathSound = false;
		}
		deathclawActive = false;
		playerAlive = false;
		
	}
	
	if(musicBox1Active == 1){
		ctx.drawImage(charImage, musicBoxSpriteX, musicBoxSpriteY, musicBoxWidth, musicBoxHeight, 
				musicBox1CurrentX, musicBox1CurrentY, musicBoxWidth, musicBoxHeight);
	}
	
	if(musicBox2Active == 1){
		ctx.drawImage(charImage, musicBoxSpriteX, musicBoxSpriteY, musicBoxWidth, musicBoxHeight, 
				musicBox2CurrentX, musicBox2CurrentY, musicBoxWidth, musicBoxHeight);
	}
	
	if(playerAlive == true)
		moveMusicBox();
	
	
	if(((musicBox1CurrentX + musicBoxWidth) >= (characterCurrentX)) && 
			((musicBox1CurrentX <= characterCurrentX + CharacterWidth)) &&
			((musicBox1CurrentY + musicBoxHeight) >= (characterCurrentY) ) &&
			((musicBox1CurrentY <= characterCurrentY + CharacterHeight )) &&
			musicBox1Active == 1){
		//audioMaybe.play();
		audioDream.play();
		musicBox1Active = 2;	
		//score = score + 500;
	}
	
	if(musicBox1Active == 2)
	{
		musicBox1Active = 3;
		score = score + 500;
		
	}
	
	if(((musicBox2CurrentX + musicBoxWidth) >= (characterCurrentX)) && 
			((musicBox2CurrentX <= characterCurrentX + CharacterWidth)) &&
			((musicBox2CurrentY + musicBoxHeight) >= (characterCurrentY) ) &&
			((musicBox2CurrentY <= characterCurrentY + CharacterHeight )) &&
			musicBox2Active == 1){
		audioMaybe.play();
		//audioDream.play();
		musicBox2Active = 2;	
	}
	
	if(musicBox2Active == 2)
	{
		musicBox2Active = 3;
		score = score + 500;	
	}
	
	//Want player to always be on top (at the bottom of this list)
	if(playerAlive == true){
		ctx.drawImage(charImage,characterSpriteX,characterSpriteY,CharacterWidth,CharacterHeight,
					characterCurrentX,characterCurrentY,
					CharacterWidth,CharacterHeight);
	}
	else{
		ctx.drawImage(charImage, deadSpriteX, deadSpriteY, deadWidth, deadHeight, 
				characterCurrentX, characterCurrentY, deadWidth, deadHeight);
	}

	
	
	
	window.addEventListener('keydown',onKeyDown,true);
	window.addEventListener('keyup',onKeyUp,true);

	
	//if no key pressed, move back to facing right.
	if(playerAlive == true){
		if(rightKeyDown == false && leftKeyDown == false &&
				downKeyDown == false && upKeyDown == false && playerAlive == true){
			characterFacingUpCheck = false;
			characterFacingRightCheck = true;
			characterFacingLeftCheck = false;
		}
	
		if(characterFacingUpCheck == true)
		{
			characterFacingUp();
		}
		else if(characterFacingRightCheck == true)
		{
			characterFacingRight();
		}
		else if(characterFacingLeftCheck == true)
		{
			characterFacingLeft();
		}
	
		if(rightKeyDown == true){
			characterCurrentX = characterCurrentX + 5;
		}
		if(leftKeyDown == true){
			characterCurrentX = characterCurrentX - 5;
		}
	}
	if(playerAlive == true)
	{
		if(powerRod1Active == true){
			ctx.drawImage(charImage, powerRod1CurrentSpriteX, powerRodSpriteY, powerRodWidth, powerRodHeight, 
					powerRod1CurrentX, powerRod1CurrentY, powerRodWidth, powerRodHeight);
			powerRod1CurrentX = powerRod1CurrentX - 5;
			powerRod1CurrentY = powerRod1CurrentY; //- characterSpeed;
			
			//powerRod1CurrentSpriteX = 90;
			if(powerRod1CurrentSpriteX == powerRodSpriteX1){
				powerRod1CurrentSpriteX = powerRodSpriteX2;
			}
			
			else if(powerRod1CurrentSpriteX == powerRodSpriteX2){
				powerRod1CurrentSpriteX = powerRodSpriteX3;
			}
			else if(powerRod1CurrentSpriteX == powerRodSpriteX3){
				powerRod1CurrentSpriteX = powerRodSpriteX4;
			}
			else if(powerRod1CurrentSpriteX == powerRodSpriteX4){
				powerRod1CurrentSpriteX = powerRodSpriteX5;
			}
			else if(powerRod1CurrentSpriteX == powerRodSpriteX5){
				powerRod1CurrentSpriteX = powerRodSpriteX6;
			}
			else if(powerRod1CurrentSpriteX == powerRodSpriteX6){
				powerRod1CurrentSpriteX = powerRodSpriteX7;
			}
			else if(powerRod1CurrentSpriteX == powerRodSpriteX7){
				powerRod1CurrentSpriteX = powerRodSpriteX8;
			}
			else{
				powerRod1CurrentSpriteX = powerRodSpriteX1;
			}
			//Test for mushroom cloud
			
			if(powerRod1CurrentX == 35){
				ctx.drawImage(charImage, cloudSpriteX3, cloudSpriteY3, cloudWidth3, cloudHeight3,
						powerRod1CurrentX-(cloudWidth3/2), powerRod1CurrentY-cloudHeight3+30, cloudWidth3, cloudHeight3);
			}
			if(powerRod1CurrentX == 30){
				ctx.drawImage(charImage, cloudSpriteX2, cloudSpriteY2, cloudWidth2, cloudHeight2,
						powerRod1CurrentX-(cloudWidth2/2)+5, powerRod1CurrentY-cloudHeight2+30, cloudWidth2, cloudHeight2);
			}
			if(powerRod1CurrentX == 25){
				ctx.drawImage(charImage, cloudSpriteX1, cloudSpriteY1, cloudWidth1, cloudHeight1,
						powerRod1CurrentX-(cloudWidth1/2)+10, powerRod1CurrentY-cloudHeight1+30, cloudWidth1, cloudHeight1);
			}
			
		}
		if(powerRod2Active == true){
			ctx.drawImage(charImage, powerRod2CurrentSpriteX, powerRodSpriteY, powerRodWidth, powerRodHeight, 
					powerRod2CurrentX, powerRod2CurrentY, powerRodWidth, powerRodHeight);
			powerRod2CurrentX = powerRod2CurrentX - 5;
			powerRod2CurrentY = powerRod2CurrentY;// - characterSpeed;
			
			if(powerRod2CurrentSpriteX == powerRodSpriteX1){
				powerRod2CurrentSpriteX = powerRodSpriteX2;
			}
			else if(powerRod2CurrentSpriteX == powerRodSpriteX2){
				powerRod2CurrentSpriteX = powerRodSpriteX3;
			}
			else if(powerRod2CurrentSpriteX == powerRodSpriteX3){
				powerRod2CurrentSpriteX = powerRodSpriteX4;
			}
			else if(powerRod2CurrentSpriteX == powerRodSpriteX4){
				powerRod2CurrentSpriteX = powerRodSpriteX5;
			}
			else if(powerRod2CurrentSpriteX == powerRodSpriteX5){
				powerRod2CurrentSpriteX = powerRodSpriteX6;
			}
			else if(powerRod2CurrentSpriteX == powerRodSpriteX6){
				powerRod2CurrentSpriteX = powerRodSpriteX7;
			}
			else if(powerRod2CurrentSpriteX == powerRodSpriteX7){
				powerRod2CurrentSpriteX = powerRodSpriteX8;
			}
			else{
				powerRod2CurrentSpriteX = powerRodSpriteX1;
			}    
		}
		if(powerRod3Active == true){
			ctx.drawImage(charImage, powerRod3CurrentSpriteX, powerRodSpriteY, powerRodWidth, powerRodHeight, 
					powerRod3CurrentX, powerRod3CurrentY, powerRodWidth, powerRodHeight);
			powerRod3CurrentX = powerRod3CurrentX - 5;
			powerRod3CurrentY = powerRod3CurrentY;// - characterSpeed;
			
			if(powerRod3CurrentSpriteX == powerRodSpriteX1){
				powerRod3CurrentSpriteX = powerRodSpriteX2;
			}
			else if(powerRod3CurrentSpriteX == powerRodSpriteX2){
				powerRod3CurrentSpriteX = powerRodSpriteX3;
			}
			else if(powerRod3CurrentSpriteX == powerRodSpriteX3){
				powerRod3CurrentSpriteX = powerRodSpriteX4;
			}
			else if(powerRod3CurrentSpriteX == powerRodSpriteX4){
				powerRod3CurrentSpriteX = powerRodSpriteX5;
			}
			else if(powerRod3CurrentSpriteX == powerRodSpriteX5){
				powerRod3CurrentSpriteX = powerRodSpriteX6;
			}
			else if(powerRod3CurrentSpriteX == powerRodSpriteX6){
				powerRod3CurrentSpriteX = powerRodSpriteX7;
			}
			else if(powerRod3CurrentSpriteX == powerRodSpriteX7){
				powerRod3CurrentSpriteX = powerRodSpriteX8;
			}
			else{
				powerRod3CurrentSpriteX = powerRodSpriteX1;
			}    
		}
	}
	
	
	//if(upKeyDown == true){
	//	characterCurrentY = characterCurrentY - 4;
	//}
	//if(downKeyDown == true){
	//	characterCurrentY = characterCurrentY + 4;
	//}
	
	
}



