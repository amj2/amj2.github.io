var menuScreen = true;

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

//For Intro
var logoImage = new Image();
logoImage.ready = false;
logoImage.onload = setAssetReady;
logoImage.src = PathToLogo;  // source image location set in constants.js


//var audio = new Audio();
var audioWilhelm = new Audio('audio/Wilhelm.mp3');
var audioMaybe = new Audio('audio/TheInkSpots-Maybe.mp3');
var audioDream = new Audio('audio/LouisArmstrong-AKissToBuildADreamOn.mp3');

//Audio for Intro
var audioPowerSwitch = new Audio('audio/PowerboySwitchMain.mp3');
var audioGun = new Audio('audio/gun.mp3');

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
	if (charImage.ready && logoImage.ready)// && audio.ready)
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

//VARIABLE FOR INTRO
var logoX = 0;
var logoY1 = 1;
var logoY2 = 70;
var logoY3 = 139;
var logoY4 = 208;
var logoY5 = 277;
var logoY6 = 346;
var logoY7 = 415;
var logoY8 = 484;
var logoY9 = 553;
var logoY10 = 622;
var logoY11 = 691;
var logoY12 = 760;
var logoY13 = 829;
var logoY14 = 898;
var logoY15 = 967;
var logo1_15Height = 69;
var logo1_15Width = 241;

var logoY16 = 1036;
var logo16Height = 70;
var logo16Width = 270;

var logoY17 = 1106;
var logo17Height = 83;
var logo17Width = 278;

var logoY18 = 1189;
var logo18Height = 110;
var logo18Width = 279;

var logoY19 = 1299;
var logo19Height = 121;
var logo19Width = 243;

var logoY20 = 1420;
var logo20Height = 120;
var logo20Width = 234;

var currentLogoX = logoX;
var currentLogoY = logoY1;
var currentLogoHeight = logo1_15Height;
var currentLogoWidth = logo1_15Width;

//var logoCounter = -12;

var logoCounter = -15;
var secondCounter = -15;

var switchPlay = false;


//VARIABLE FOR GAME
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
var powerRodCount = 10;

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

var musicBox2CurrentX = 250+1500;
var musicBox2CurrentY = 200-1500;

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

var powerPlantSpriteX = 272;
var powerPlantSpriteY1 = 0;
var powerPlantSpriteY2 = 228;
var powerPlantSpriteY3 = 456;
var powerPlantSpriteY4 = 686;
var powerPlantSpriteY5 = 931;
var powerPlantSpriteY6 = 1195;
var powerPlantSpriteWidth = 245;
var powerPlantSpriteHeight1 = 228;
var powerPlantSpriteHeight2 = 228;
var powerPlantSpriteHeight3 = 230;
var powerPlantSpriteHeight4 = 245;
var powerPlantSpriteHeight5 = 263;
var powerPlantSpriteHeight6 = 286;

//take currentX + 196
//take currentY + 135;
var powerPlantHitBoxWidth = 21;
var powerPlantHitBoxHeight = 47;
var yoffset = 140;

var powerPlant1CurrentX = -60 + yoffset; //+ powerPlantSpriteWidth;
var powerPlant1CurrentY = GameHeight - powerPlantSpriteHeight1 - yoffset;
var powerPlant1CurrentSpriteY = powerPlantSpriteY1;
var powerPlant1CurrentSpriteHeight = powerPlantSpriteHeight1;

var frameCounter = 0;

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

function menuStart(evt){
	if(evt.keyCode == 32){
		//menuScreen = false;
		logoCounter++;
	}
}


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
		//menuScreen = false;
		throwPowerRod();
		//powerRodCount = powerRodCount -1;
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

function movePowerPlant(){
	powerPlant1CurrentX = powerPlant1CurrentX - characterSpeed;
	powerPlant1CurrentY = powerPlant1CurrentY + characterSpeed;
}

var powerRod1Velocity = 0;
var powerRod2Velocity = 0;
var powerRod3Velocity = 0;

function throwPowerRod(){
	if(powerRod1Active == false && powerRodCount > 0){
		powerRod1Velocity = characterSpeed;
		powerRod1CurrentX = characterCurrentX-1;
		powerRod1CurrentY = characterCurrentY-5;
		powerRod1Active = true;
		powerRodCount--;
	}
	else if(powerRod2Active == false && powerRodCount > 0){
		powerRod2Velocity = characterSpeed;
		powerRod2CurrentX = characterCurrentX-1;
		powerRod2CurrentY = characterCurrentY-5;
		powerRod2Active = true;
		powerRodCount--;
		
	}
	else if(powerRod3Active == false && powerRodCount > 0){
		powerRod3Velocity = characterSpeed;
		powerRod3CurrentX = characterCurrentX-1;
		powerRod3CurrentY = characterCurrentY-5;
		powerRod3Active = true;
		powerRodCount--;
		
	}
	//can only throw 3 at a time
}


//1 = active, 2 = inactive, 3 = points given
var musicBox1Active = 1;
var musicBox2Active = 1;
var deathclawActive = true;
var playerAlive = true;
var deathSound = true;
var powerPlant1Active = false;
var powerDelayTimer = 0;
var powerRod1Mushroom = false;
var powerRod1MushroomCounter = 1;
var powerRod2Mushroom = false;
var powerRod2MushroomCounter = 1;
var powerRod3Mushroom = false;
var powerRod3MushroomCounter = 1;
var crashMushroom = false;
var crashMushroomCounter = 1;
var powerPlantCounter = 1;
var endGame = false;

function update()
{	
	if(false){}
	
	if(menuScreen == true){
		//Clear Canvas
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, stage.width, stage.height);	
		
		//ctx.moveTo(350, 384);
		//ctx.fillRect(500,200,40,40);
		//ctx.stroke();
		
		
		if(switchPlay == false){
			audioPowerSwitch.play();
			switchPlay = true;
		}
		
		
		ctx.drawImage(logoImage,currentLogoX, currentLogoY, currentLogoWidth, currentLogoHeight, 
				130, 50, currentLogoWidth, currentLogoHeight);
		
		if(logoCounter == 1){
			currentLogoY = logoY2;
			logoCounter++;
		}
		else if(logoCounter == 2){
			currentLogoY = logoY3;
			logoCounter++;
		}
		else if(logoCounter == 3){
			currentLogoY = logoY4;
			logoCounter++;
		}
		else if(logoCounter == 4){
			currentLogoY = logoY5;
			logoCounter++;
		}
		else if(logoCounter == 5){
			currentLogoY = logoY6;
			logoCounter++;
		}
		else if(logoCounter == 6){
			currentLogoY = logoY7;
			logoCounter++;
		}
		else if(logoCounter == 7){
			currentLogoY = logoY8;
			logoCounter++;
		}
		else if(logoCounter == 8){
			currentLogoY = logoY9;
			logoCounter++;
		}
		else if(logoCounter == 9){
			currentLogoY = logoY10;
			logoCounter++;
		}
		else if(logoCounter == 10){
			currentLogoY = logoY11;
			logoCounter++;
		}
		else if(logoCounter == 11){
			currentLogoY = logoY12;
			logoCounter++;
		}
		else if(logoCounter == 12){
			currentLogoY = logoY13;
			logoCounter--;
		}
		else if(logoCounter == 13 || logoCounter == 15 || logoCounter == 17){
			currentLogoY = logoY14;
			audioGun.play();
			logoCounter++;
		}
		else if(logoCounter == 14 || logoCounter == 16 || logoCounter == 18){
			currentLogoY = logoY15;
			audioPowerSwitch.pause();
			logoCounter++;
		}
		else if(logoCounter == 19){
			currentLogoY = logoY16;
			currentLogoHeight = logo16Height;
			currentLogoWidth = logo16Width;
			logoCounter++;
		}
		else if(logoCounter == 20){
			currentLogoY = logoY17;
			currentLogoHeight = logo17Height;
			currentLogoWidth = logo17Width;
			logoCounter++;
		}
		else if(logoCounter == 21 || logoCounter == 25){ //|| logoCounter == 29){
			currentLogoY = logoY18;
			currentLogoHeight = logo18Height;
			currentLogoWidth = logo18Width;
			logoCounter++;
		}
		else if(logoCounter == 22 || logoCounter == 24 || logoCounter == 26 || 
				logoCounter == 28){ //|| logoCounter == 30 || logoCounter == 32){
			currentLogoY = logoY19;
			currentLogoHeight = logo19Height;
			currentLogoWidth = logo19Width;
			logoCounter++;
		}
		else if(logoCounter == 23 || logoCounter == 27){// || logoCounter == 31){
			currentLogoY = logoY20;
			currentLogoHeight = logo20Height;
			currentLogoWidth = logo20Width;
			logoCounter++;
		}
		else if(logoCounter > 30){
			menuScreen = false;
			TimePerFrame = 120;
			preloading();
		}
		else{
			logoCounter++;
		}
		//secondCounter++;
		
		//if(secondCounter == 30){
		//	logoCounter++;
		//}
		
		if(logoCounter == 11 || logoCounter == 12 || logoCounter == 13){
			window.addEventListener('keydown',menuStart,true);
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText("Press SpaceBar To Play", 140 , stage.height / 1.5);
		}
		
		
		//if(evt.keyCode == 32){
		//	menuScreen = false;
		//}
	}
	else if(endGame == true){
		//Clear Canvas
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, stage.width, stage.height);	
		
		ctx.fillRect(0,0,40,40);
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText("Final Score: " + score + "      Frames: " + frameCounter, 15, 15);
	}
	else{
		
		
		//Clear Canvas
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, stage.width, stage.height);	
			
		ctx.fillRect(0,0,40,40);
		ctx.fillStyle = "#FFFFFF";
		//ctx.fillText("Speed: " + characterSpeed + "     Score: " + score + "      Fusion Cores: " + powerRodCount, 15, 15);
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
		
		ctx.moveTo(280, 384);
		ctx.lineTo(512, 96);
		ctx.strokeStyle="green"
		ctx.stroke();
		
		ctx.moveTo(210, 384);
		ctx.lineTo(512, 0);
		ctx.strokeStyle="green"
		ctx.stroke();
		
		
		/*
		var powerPlantSpriteX = 272;
		var powerPlantSpriteY1 = 0;
		var powerPlantSpriteY2 = 229;
		var powerPlantSpriteY3 = 458;
		var powerPlantSpriteY4 = 690;
		var powerPlantSpriteY5 = 935;
		var powerPlantSpriteY6 = 1199;
		var powerPlantSpriteWidth = 245;
		var powerPlantSpriteHeight1 = 228;
		var powerPlantSpriteHeight2 = 228;
		var powerPlantSpriteHeight3 = 231;
		var powerPlantSpriteHeight4 = 244;
		var powerPlantSpriteHeight5 = 263;
		var powerPlantSpriteHeight6 = 287;

		//take currentX + 196
		//take currentY + 135;
		var powerPlantHitBoxWidth = 21;
		var powerPlantHitBoxHeight = 47;

		var powerPlant1CurrentX = 0 + powerPlantSpriteHeight1;
		var powerPlant1CurrentY = 0 + powerPlantSpriteWidth;
		*/
		
		
		//PowerPlant1
		ctx.drawImage(charImage, powerPlantSpriteX, powerPlant1CurrentSpriteY, powerPlantSpriteWidth, 
				powerPlant1CurrentSpriteHeight, powerPlant1CurrentX, powerPlant1CurrentY, powerPlantSpriteWidth,
				powerPlant1CurrentSpriteHeight);

		if(playerAlive == true)
			movePowerPlant();
		
		//hitbox for power socket		
		if(((powerPlant1CurrentX + 196 + powerPlantHitBoxWidth) >= (powerRod1CurrentX)) &&
				((powerPlant1CurrentX + 196 <= powerRod1CurrentX + powerRodWidth)) &&
				((powerPlant1CurrentY + 135 + powerPlantHitBoxHeight) >= (powerRod1CurrentY) ) &&
				((powerPlant1CurrentY + 135 <= powerRod1CurrentY + powerRodHeight)) &&
				powerPlant1CurrentSpriteY == powerPlantSpriteY1 &&
				powerRod1Active && powerPlant1Active == false){
			powerRod1Active = false;
			powerPlant1CurrentSpriteY = powerPlantSpriteY2;
			powerPlant1CurrentSpriteHeight = powerPlantSpriteHeight2;
			powerPlant1CurrentY = powerPlant1CurrentY - (powerPlantSpriteHeight2 - powerPlantSpriteHeight1);
			powerPlant1Active = true;
			score = score + 1000;
		}
		else if(((powerPlant1CurrentX + 196 + powerPlantHitBoxWidth) >= (powerRod2CurrentX)) &&
				((powerPlant1CurrentX + 196 <= powerRod2CurrentX + powerRodWidth)) &&
				((powerPlant1CurrentY + 135 + powerPlantHitBoxHeight) >= (powerRod2CurrentY) ) &&
				((powerPlant1CurrentY + 135 <= powerRod2CurrentY + powerRodHeight)) &&
				powerPlant1CurrentSpriteY == powerPlantSpriteY1 &&
				powerRod2Active && powerPlant1Active == false){
			powerRod2Active = false;
			powerPlant1CurrentSpriteY = powerPlantSpriteY2;
			powerPlant1CurrentSpriteHeight = powerPlantSpriteHeight2;
			powerPlant1CurrentY = powerPlant1CurrentY - (powerPlantSpriteHeight2 - powerPlantSpriteHeight1);
			powerPlant1Active = true;
			score = score + 1000;
		}
		if(((powerPlant1CurrentX + 196 + powerPlantHitBoxWidth) >= (powerRod3CurrentX)) &&
				((powerPlant1CurrentX + 196 <= powerRod3CurrentX + powerRodWidth)) &&
				((powerPlant1CurrentY + 135 + powerPlantHitBoxHeight) >= (powerRod3CurrentY) ) &&
				((powerPlant1CurrentY + 135 <= powerRod3CurrentY + powerRodHeight)) &&
				powerPlant1CurrentSpriteY == powerPlantSpriteY1 &&
				powerRod3Active && powerPlant1Active == false){
			powerRod3Active = false;
			powerPlant1CurrentSpriteY = powerPlantSpriteY2;
			powerPlant1CurrentSpriteHeight = powerPlantSpriteHeight2;
			powerPlant1CurrentY = powerPlant1CurrentY - (powerPlantSpriteHeight2 - powerPlantSpriteHeight1);
			powerPlant1Active = true;
			score = score + 1000;
		}
		
		
		if(powerPlant1CurrentSpriteY == powerPlantSpriteY2 && powerPlant1Active && powerDelayTimer == 3){
			powerPlant1CurrentSpriteY = powerPlantSpriteY3;
			powerPlant1CurrentSpriteHeight = powerPlantSpriteHeight3;
			powerPlant1CurrentY = powerPlant1CurrentY - (powerPlantSpriteHeight3 - powerPlantSpriteHeight2);
			powerDelayTimer = 0;
		}
		else if(powerPlant1CurrentSpriteY == powerPlantSpriteY3 && powerPlant1Active && powerDelayTimer == 3){
			powerPlant1CurrentSpriteY = powerPlantSpriteY4;
			powerPlant1CurrentSpriteHeight = powerPlantSpriteHeight4;
			powerPlant1CurrentY = powerPlant1CurrentY - (powerPlantSpriteHeight4 - powerPlantSpriteHeight3);
			powerDelayTimer = 0;
		}
		else if(powerPlant1CurrentSpriteY == powerPlantSpriteY4 && powerPlant1Active && powerDelayTimer == 3){
			powerPlant1CurrentSpriteY = powerPlantSpriteY5;
			powerPlant1CurrentSpriteHeight = powerPlantSpriteHeight5;
			powerPlant1CurrentY = powerPlant1CurrentY - (powerPlantSpriteHeight5 - powerPlantSpriteHeight4);
			powerDelayTimer = 0;
		}
		else if(powerPlant1CurrentSpriteY == powerPlantSpriteY5 && powerPlant1Active && powerDelayTimer == 3){
			powerPlant1CurrentSpriteY = powerPlantSpriteY6;
			powerPlant1CurrentSpriteHeight = powerPlantSpriteHeight6;
			powerPlant1CurrentY = powerPlant1CurrentY - (powerPlantSpriteHeight6 - powerPlantSpriteHeight5);
			powerDelayTimer = 0;
		}
		else if(powerPlant1CurrentSpriteY == powerPlantSpriteY6 && powerPlant1Active && powerDelayTimer == 3 ){
			powerPlant1CurrentSpriteY = powerPlantSpriteY2;
			powerPlant1CurrentSpriteHeight = powerPlantSpriteHeight2;
			powerPlant1CurrentY = powerPlant1CurrentY + (powerPlantSpriteHeight6 - powerPlantSpriteHeight2);
			powerDelayTimer = 0;
		}
		else if(powerPlant1Active){
			powerDelayTimer++;
		}
		// end of PowerPlant Hitbox
		
		//PowerPlant ExplosionHit
		//Step 1, see if powerplant Y lines up with powerRod
		if(((powerPlant1CurrentX + 171) >= (powerRod1CurrentX)) &&
				((powerPlant1CurrentX + 150) <= (powerRod1CurrentX + powerRodWidth)) &&
				((powerPlant1CurrentY +(powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1)+ 203) >= powerRod1CurrentY) &&
				((powerPlant1CurrentY +(powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1)+ 136) <= (powerRod1CurrentY + powerRodHeight)) &&
				powerRod1Active){
					powerRod1Active = false;
					powerRod1Mushroom = true;
				}
		if(((powerPlant1CurrentX + 171) >= (powerRod2CurrentX)) &&
				((powerPlant1CurrentX + 150) <= (powerRod2CurrentX + powerRodWidth)) &&
				((powerPlant1CurrentY +(powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1)+ 203) >= powerRod2CurrentY) &&
				((powerPlant1CurrentY +(powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1)+ 136) <= (powerRod2CurrentY + powerRodHeight)) &&
				powerRod2Active){
					powerRod2Active = false;
					powerRod2Mushroom = true;
				}
		if(((powerPlant1CurrentX + 171) >= (powerRod3CurrentX)) &&
				((powerPlant1CurrentX + 150) <= (powerRod3CurrentX + powerRodWidth)) &&
				((powerPlant1CurrentY +(powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1)+ 203) >= powerRod3CurrentY) &&
				((powerPlant1CurrentY +(powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1)+ 136) <= (powerRod3CurrentY + powerRodHeight)) &&
				powerRod3Active){
					powerRod1Active = false;
					powerRod1Mushroom = true;
				}

		if(((powerPlant1CurrentX + 243) >= (powerRod1CurrentX)) &&
				((powerPlant1CurrentX + 175) <= (powerRod1CurrentX + powerRodWidth)) &&
				((powerPlant1CurrentY + (powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1) + 134) >= (powerRod1CurrentY))  &&
				((powerPlant1CurrentY + (powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1)) <= (powerRod1CurrentY + powerRodHeight)) &&
				powerRod1Active){
					powerRod1Active = false;
					powerRod1Mushroom = true;
				}
				
			
		
		/*if(((powerPlant1CurrentX +  + powerPlantHitBoxWidth) >= (powerRod3CurrentX)) &&
				((powerPlant1CurrentX + 196 <= powerRod3CurrentX + powerRodWidth)) &&
				((powerPlant1CurrentY + 135 + powerPlantHitBoxHeight) >= (powerRod3CurrentY) ) &&
				((powerPlant1CurrentY + 135 <= powerRod3CurrentY + powerRodHeight)) &&
				powerPlant1CurrentSpriteY == powerPlantSpriteY1 &&
				powerRod3Active && powerPlant1Active == false){*/
		
		//reset powerplant
		if(((powerPlant1CurrentX + powerPlantSpriteWidth) < 0) && ((powerPlant1CurrentY + powerPlant1CurrentSpriteHeight) > GameHeight)){
			powerPlant1CurrentX = 300;
			powerPlant1CurrentY = -300;
			if(powerPlantCounter < 10){
				powerPlantCounter++;
			}
			else{
				endGame = true;
			}
			powerPlant1Active = false;
			powerPlant1CurrentSpriteY = powerPlantSpriteY1;
			powerPlant1CurrentSpriteHeight = powerPlantSpriteHeight1;
		}
		
		//reset deathclaw
		if(((deathclawCurrentX + deathclawWidth) < 0) && ((deathclawCurrentY + deathclawHeight) > GameHeight)){
			deathclawCurrentX = (Math.floor((Math.random())*400) + 400);
			deathclawCurrentY = -200;
		}
	
		
		
		//Deathclaw
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
		
		
		//For power plant deaths
		//Use 3 squares
			//Square 1
			
		if(((powerPlant1CurrentX + 174) >= (characterCurrentX)) &&
				((powerPlant1CurrentX <= characterCurrentX + CharacterWidth)) &&
				((powerPlant1CurrentY + (powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1) + 202) >= (characterCurrentY) ) &&
				((powerPlant1CurrentY + (powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1) <= characterCurrentY + CharacterHeight))){
			//if(characterCurrentX == 100){
				//audioMaybe.stop();
				if(deathSound == true){
					audioWilhelm.play();
					deathSound = false;
				}
				//deathclawActive = false;
				crashMushroom = true;
				playerAlive = false;
				
		}
		
		if(((powerPlant1CurrentX + 212) >= (characterCurrentX)) &&
				((powerPlant1CurrentX + 175 <= characterCurrentX + CharacterWidth)) &&
				((powerPlant1CurrentY + (powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1) + 164) >= (characterCurrentY) ) &&
				((powerPlant1CurrentY + (powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1) <= characterCurrentY + CharacterHeight))){
			//if(characterCurrentX == 100){
				//audioMaybe.stop();
				if(deathSound == true){
					audioWilhelm.play();
					deathSound = false;
				}
				//deathclawActive = false;
				crashMushroom = true;
				playerAlive = false;
				
		}
		if(((powerPlant1CurrentX + 243) >= (characterCurrentX)) &&
				((powerPlant1CurrentX + 175 <= characterCurrentX + CharacterWidth)) &&
				((powerPlant1CurrentY + (powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1) + 134) >= (characterCurrentY) ) &&
				((powerPlant1CurrentY + (powerPlant1CurrentSpriteHeight - powerPlantSpriteHeight1) <= characterCurrentY + CharacterHeight))){
			//if(characterCurrentX == 100){
				//audioMaybe.stop();
				if(deathSound == true){
					audioWilhelm.play();
					deathSound = false;
				}
				//deathclawActive = false;
				crashMushroom = true;
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
			audioMaybe.pause();
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
			audioDream.pause();
			audioMaybe.play();
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
		else if(crashed = true){
			ctx.drawImage(charImage, deadSpriteX, deadSpriteY, deadWidth, deadHeight, 
					characterCurrentX, characterCurrentY, deadWidth, deadHeight);
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
				characterCurrentX = characterCurrentX + 9;
			}
			if(leftKeyDown == true){
				characterCurrentX = characterCurrentX - 9;
			}
		}
		if(playerAlive == true)
		{
			if(powerRod1Active == true){
				ctx.drawImage(charImage, powerRod1CurrentSpriteX, powerRodSpriteY, powerRodWidth, powerRodHeight, 
						powerRod1CurrentX, powerRod1CurrentY, powerRodWidth, powerRodHeight);
				powerRod1CurrentX = powerRod1CurrentX - 2*powerRod1Velocity;
				powerRod1CurrentY = powerRod1CurrentY - 2*powerRod1Velocity + characterSpeed;
				
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
				/*
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
				*/
				
			}
			if(powerRod2Active == true){
				ctx.drawImage(charImage, powerRod2CurrentSpriteX, powerRodSpriteY, powerRodWidth, powerRodHeight, 
						powerRod2CurrentX, powerRod2CurrentY, powerRodWidth, powerRodHeight);
				powerRod2CurrentX = powerRod2CurrentX - 2*powerRod2Velocity;
				powerRod2CurrentY = powerRod2CurrentY - 2*powerRod2Velocity + characterSpeed;
				
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
				powerRod3CurrentX = powerRod3CurrentX - 2*powerRod3Velocity;
				powerRod3CurrentY = powerRod3CurrentY - 2*powerRod3Velocity + characterSpeed;
				
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
		
		if(powerRod1Mushroom == true){
			if(powerRod1MushroomCounter == 1){
				ctx.drawImage(charImage,cloudSpriteX3, cloudSpriteY3, cloudWidth3, cloudHeight3,
						powerRod1CurrentX-(cloudWidth3/2), powerRod1CurrentY-cloudHeight3+30, cloudWidth3, cloudHeight3);
				powerRod1MushroomCounter++;
			}
			else if(powerRod1MushroomCounter == 2){
				ctx.drawImage(charImage, cloudSpriteX2, cloudSpriteY2, cloudWidth2, cloudHeight2,
						powerRod1CurrentX-(cloudWidth2/2), powerRod1CurrentY-cloudHeight2+30, cloudWidth2, cloudHeight2);
				powerRod1MushroomCounter++;
			}
			else if(powerRod1MushroomCounter == 3){
				ctx.drawImage(charImage, cloudSpriteX1, cloudSpriteY1, cloudWidth1, cloudHeight1,
						powerRod1CurrentX-(cloudWidth1/2), powerRod1CurrentY-cloudHeight1+30, cloudWidth1, cloudHeight1);
				powerRod1Mushroom = false;
				powerRod1MushroomCounter = 1;
			}
		}
		
		if(powerRod2Mushroom == true){
			if(powerRod2MushroomCounter == 1){
				ctx.drawImage(charImage,cloudSpriteX3, cloudSpriteY3, cloudWidth3, cloudHeight3,
						powerRod2CurrentX-(cloudWidth3/2), powerRod2CurrentY-cloudHeight3+30, cloudWidth3, cloudHeight3);
				powerRod2MushroomCounter++;
			}
			else if(powerRod2MushroomCounter == 2){
				ctx.drawImage(charImage, cloudSpriteX2, cloudSpriteY2, cloudWidth2, cloudHeight2,
						powerRod2CurrentX-(cloudWidth2/2), powerRod2CurrentY-cloudHeight2+30, cloudWidth2, cloudHeight2);
				powerRod2MushroomCounter++;
			}
			else if(powerRod1MushroomCounter == 3){
				ctx.drawImage(charImage, cloudSpriteX1, cloudSpriteY1, cloudWidth1, cloudHeight1,
						powerRod2CurrentX-(cloudWidth1/2), powerRod2CurrentY-cloudHeight1+30, cloudWidth1, cloudHeight1);
				powerRod2Mushroom = false;
				powerRod2MushroomCounter = 1;
			}
		}
		if(powerRod3Mushroom == true){
			if(powerRod3MushroomCounter == 1){
				ctx.drawImage(charImage,cloudSpriteX3, cloudSpriteY3, cloudWidth3, cloudHeight3,
						powerRod3CurrentX-(cloudWidth3/2), powerRod3CurrentY-cloudHeight3+30, cloudWidth3, cloudHeight3);
				powerRod3MushroomCounter++;
			}
			else if(powerRod3MushroomCounter == 2){
				ctx.drawImage(charImage, cloudSpriteX2, cloudSpriteY2, cloudWidth2, cloudHeight2,
						powerRod3CurrentX-(cloudWidth2/2), powerRod3CurrentY-cloudHeight2+30, cloudWidth2, cloudHeight2);
				powerRod3MushroomCounter++;
			}
			else if(powerRod3MushroomCounter == 3){
				ctx.drawImage(charImage, cloudSpriteX1, cloudSpriteY1, cloudWidth1, cloudHeight1,
						powerRod3CurrentX-(cloudWidth1/2), powerRod3CurrentY-cloudHeight1+30, cloudWidth1, cloudHeight1);
				powerRod3Mushroom = false;
				powerRod3MushroomCounter = 1;
			}
		}
		if(crashMushroom == true){
			if(crashMushroomCounter == 1){
				ctx.drawImage(charImage,cloudSpriteX3, cloudSpriteY3, cloudWidth3, cloudHeight3,
						characterCurrentX-(cloudWidth3/2), characterCurrentY-cloudHeight3+30, cloudWidth3, cloudHeight3);
				crashMushroomCounter++;
			}
			else if(crashMushroomCounter == 2){
				ctx.drawImage(charImage, cloudSpriteX2, cloudSpriteY2, cloudWidth2, cloudHeight2,
						characterCurrentX-(cloudWidth2/2), characterCurrentY-cloudHeight2+30, cloudWidth2, cloudHeight2);
				crashMushroomCounter++;
			}
			else if(crashMushroomCounter == 3){
				ctx.drawImage(charImage, cloudSpriteX1, cloudSpriteY1, cloudWidth1, cloudHeight1,
						characterCurrentX-(cloudWidth1/2), characterCurrentY-cloudHeight1+30, cloudWidth1, cloudHeight1);
				//powerRod1Mushroom = false;
				crashMushroomCounter = 1;
			}
		}
		
		//reset thrown rods
		if(powerRod1Active == true && ((powerRod1CurrentX+powerRodWidth) < 0)){
			powerRod1Active = false;
		}
		if(powerRod2Active == true && ((powerRod2CurrentX+powerRodWidth) < 0)){
			powerRod2Active = false;
		}if(powerRod3Active == true && ((powerRod3CurrentX+powerRodWidth) < 0)){
			powerRod3Active = false;
		}
		
		
		//if(upKeyDown == true){
		//	characterCurrentY = characterCurrentY - 4;
		//}
		//if(downKeyDown == true){
		//	characterCurrentY = characterCurrentY + 4;
		//}
		frameCounter++;
	}
		
}



