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
            default:
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
                default:
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

