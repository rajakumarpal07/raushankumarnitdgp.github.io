var on=false;
var count=0;
var timeouts = [];
var store=[];
var usr_str=[];
var cpu_turn=true;
var strict_mode = false;
var wrng=false;


var eleId=["red","green","yellow","blue"];

var bGcolor=["#9f0f17","#00a74a","#cca707","#094a8f"];


function reset(){
	
	for (var i = 0; i < timeouts.length; i++) {
		clearTimeout(timeouts[i]);
	}
	
	for(var i=0;i<4;i++)
		{
		document.getElementById(eleId[i]).removeEventListener("click",userClick);
	}
	
	document.getElementById("strict").removeEventListener("click", fStrict);
	document.getElementById("led").style.cssText="background-color: rgb(34, 34, 34)";
	
	for(var i=0;i<4;i++)
		{
		document.getElementById(eleId[i]).style.cssText="background-color:"+bGcolor[i];
	}
	
	strict_mode=false;
	
}

function set(){
	
	for(var i=0;i<4;i++)
		document.getElementById(eleId[i]).addEventListener("click",userClick);
	
	document.getElementById("strict").addEventListener("click", fStrict);
}


document.getElementById("count").innerHTML="";

document.getElementById("OnBtn").addEventListener("change", function(){
	on=!on;
	if(on===false)
		{
		reset();
		document.getElementById("start").removeEventListener("click", fstart);
		document.getElementById("count").innerHTML="";
	}
	else
		{
		set();
		document.getElementById("start").addEventListener("click", fstart);
		document.getElementById("count").innerHTML="--";
	}
});


//changing the color on click
function click_simon(eleId){
	var colorOn="";
	var colorBef="";
	switch(eleId)
	{
		case "red":
		colorOn="background-color:red";
		colorBef="background-color:#9f0f17";
		document.getElementById("Sred").play();
		break;
		case "green":
		colorOn="background-color:green";
		colorBef="background-color:#00a74a";
		document.getElementById("Sgreen").play();
		break;
		case "yellow":
		colorOn="background-color:yellow";
		colorBef="background-color:#cca707";
		document.getElementById("Syellow").play();
		break;
		case "blue":
		colorOn="background-color:blue";
		colorBef="background-color:#094a8f";
		document.getElementById("Sblue").play();
		break;
	}
	
	document.getElementById(eleId).style.cssText = colorOn;
	timeouts.push(setTimeout(function(){
		document.getElementById(eleId).style.cssText = colorBef;
	},400));
	
}



function fStrict(){
	strict_mode=!strict_mode;
	if(strict_mode===true)
		document.getElementById("led").style.cssText="background-color:red";
	else
		document.getElementById("led").style.cssText="background-color: rgb(34, 34, 34)";
	//change-led 
}

function fstart(){
	if(on===true)
		startGame();
}


function userClick(event){
	
	var eleId=event.target.getAttribute("id");
	var audId="S"+eleId;
	
	var btnNo=5;
	switch (eleId) {
		case "red":
		btnNo=1;
		break;
		case "green":
		btnNo=2;
		break;
		case "yellow":
		btnNo=3;
		break;
		case "blue":
		btnNo=4;
		break;
	}
	
	if(usr_str.length == store.length || cpu_turn === true)
		return;
	
	usr_str.push(btnNo);
	
	if(usr_str[usr_str.length-1]!==store[usr_str.length-1])
		{
		comp(store,usr_str);
	}
	
	click_simon(eleId);
}

function err() {
	document.getElementById('Swrong').play();
	timeouts.push(setTimeout(function(){
		document.getElementById("count").innerHTML="!!";
	},100));
	
	timeouts.push(setTimeout(function(){
		if(count<10)
			document.getElementById("count").innerHTML='0'+count;
		else
			document.getElementById("count").innerHTML=count;
	},700));	
}

//compares the user input with correct storage
function comp(store,usr_str) {
	if(on===false)
		return 0;
	
	if(JSON.stringify(store) === JSON.stringify(usr_str)){
		addMove();
	}
	else{
		wrng=true;
		if(strict_mode === true){
			err();
			emptyArr();
			timeouts.push(setTimeout(addMove,500));
		}
		else{
			click_sequence(store,wrng);
		}
	}
	return 1;
}

//adds random color move in memory and after adding cpu shows the memory in sequence to player
function addMove() {
	
	if(count>20)
		{
		alert("WON!! , Restart the Game");
		return 0;
	}
	
	
	var selBtn = Math.floor(Math.random()*5);
	switch (selBtn) {
		case 1:
		store.push(1);
		break;
		case 2:
		store.push(2);
		break;
		case 3:
		store.push(3);
		break;
		case 4:
		store.push(4);
		break;
		default:
		store.push(4);
		break;
	}
	
	count=store.length;
	if(count<10)
		document.getElementById("count").innerHTML='0'+count;
	else
		document.getElementById("count").innerHTML=count;
	
	wrng=false;
	click_sequence(store,wrng);
	
	return 1;
}

//shows the memory in sequence of clicks
function click_sequence(store,wrng) {
	
	cpu_turn=true;
	
	
	for (var i = 0; i < timeouts.length; i++) {
		clearTimeout(timeouts[i]);
	}
	
	if(wrng===true)
		{
		err();
		wrng=false;
	}
	
	if(on===false)
		return 0;
	
	var time = 600;
	for(var i=0;i<store.length;i++)
		{
		switch(store[i])
		{
			case 1:
			timeouts.push(setTimeout(click_simon,time,"red"));
			break;
			case 2:
			timeouts.push(setTimeout(click_simon,time,"green"));
			break;
			case 3:
			timeouts.push(setTimeout(click_simon,time,"yellow"));
			break;
			case 4:
			timeouts.push(setTimeout(click_simon,time,"blue"));
			break;
		}
		time+=1000;
	}
	
	while(usr_str.length > 0) {
		usr_str.pop();
	}
	
	
	timeouts.push(setTimeout(function(){cpu_turn=false;},time-999));
	time+=1500;
	timeouts.push(setTimeout(comp,time+1000*store.length,store,usr_str));
	
	
	
	return 1;
}


//empty the memory

function emptyArr() {
	while(store.length > 0) {
		store.pop();
	}
	
	while(usr_str.length > 0) {
		usr_str.pop();
	}
	
}

//game starts from here ,on start add a random move to sequence array store

function startGame() {
	
	reset();
	if(on===false)
		return 0;
	
	emptyArr();
	set();
	addMove();
	return 1;
}
