var on=false;
var count=0;
var timeouts = [];
var store=[];
var usr_str=[];
var cpu_turn=true;
var strict_mode = false;
var wrng=false;

function reset()
{
    for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }

    document.getElementById("red").removeEventListener("click",fn1);
    document.getElementById("green").removeEventListener("click",fn2);
    document.getElementById("yellow").removeEventListener("click",fn3);
    document.getElementById("blue").removeEventListener("click",fn4);

}


document.getElementById("count").innerHTML="";
document.getElementById("OnBtn").addEventListener("change", function(){
            on=!on;
            if(on===false)
            {
                 reset();
                 document.getElementById("start").removeEventListener("click", fn);
                 document.getElementById("strict").removeEventListener("click", fs);
                 document.getElementById("count").innerHTML="";
		         document.getElementById("led").style.cssText="background-color: rgb(34, 34, 34)";
            }
            else
            {
                document.getElementById("red").addEventListener("click", fn1);
                document.getElementById("green").addEventListener("click", fn2 );
                document.getElementById("yellow").addEventListener("click", fn3);
                document.getElementById("blue").addEventListener("click", fn4);
                document.getElementById("start").addEventListener("click", fn);
                document.getElementById("strict").addEventListener("click", fs);
                document.getElementById("count").innerHTML="-";
            }
    });






//-----------------mouse click by script-------------
    function click_red()
    {
        	document.getElementById('Sred').play();
            document.getElementById("red").style.cssText = "background-color:red";
            timeouts.push(setTimeout(function(){
            document.getElementById("red").style.cssText = "background-color:#9f0f17";
            },400));
    }
    
    function click_green()
    {
        document.getElementById('Sgreen').play();
            document.getElementById("green").style.cssText = "background-color:green";
            timeouts.push(setTimeout(function(){
            document.getElementById("green").style.cssText = "background-color:#00a74a";
            },400));
    }

    function click_yellow()
    {
        document.getElementById('Syellow').play();
            document.getElementById("yellow").style.cssText = "background-color:yellow";
            timeouts.push(setTimeout(function(){
            document.getElementById("yellow").style.cssText = "background-color:#cca707";
            },400));

    }

    function click_blue()
    {
       
            document.getElementById('Sblue').play();
            document.getElementById("blue").style.cssText = "background-color:blue";
            timeouts.push(setTimeout(function(){
            document.getElementById("blue").style.cssText = "background-color:#094a8f";
            },400));
    }


    function fs()
    {
        strict_mode=!strict_mode;
	   if(strict_mode===true)
	       document.getElementById("led").style.cssText="background-color:red";
	   else
	       document.getElementById("led").style.cssText="background-color: rgb(34, 34, 34)";
        //change-led 
    }

    function fn(){
            if(on===true)
                startGame();
    }

    function fn1(){

            if(usr_str.length == store.length || cpu_turn === true)
               return;

            
            usr_str.push(1);

            if(usr_str[usr_str.length-1]!==store[usr_str.length-1])
            {
               comp(store,usr_str);
            }


            document.getElementById('Sred').play();
            document.getElementById("red").style.cssText = "background-color:red";
            timeouts.push(setTimeout(function(){
            document.getElementById("red").style.cssText = "background-color:#9f0f17";
            },400));
        }


    function fn2(){

            if(usr_str.length == store.length || cpu_turn === true)
               return;

                     
            usr_str.push(2);

            if(usr_str[usr_str.length-1]!==store[usr_str.length-1])
            {
               comp(store,usr_str);
            }


            document.getElementById('Sgreen').play();
            document.getElementById("green").style.cssText = "background-color:green";
            timeouts.push(setTimeout(function(){
            document.getElementById("green").style.cssText = "background-color:#00a74a";
            },400));
        }


    function fn3(){

            if(usr_str.length == store.length || cpu_turn === true)
               return;

           

            usr_str.push(3);

            if(usr_str[usr_str.length-1]!==store[usr_str.length-1])
            {
               comp(store,usr_str);
            }

            document.getElementById('Syellow').play();
            document.getElementById("yellow").style.cssText = "background-color:yellow";
            timeouts.push(setTimeout(function(){
            document.getElementById("yellow").style.cssText = "background-color:#cca707";
            },400));
        }

    function  err()
    {
                document.getElementById('Swrong').play();
                timeouts.push(setTimeout(function(){
                    document.getElementById("count").innerHTML="!!";
                },100));

                timeouts.push(setTimeout(function(){
                    document.getElementById("count").innerHTML=count;
                },700));

    }

    function fn4(){

            if(usr_str.length == store.length || cpu_turn === true)
               return;

           


            usr_str.push(4);
            
            if(usr_str[usr_str.length-1]!==store[usr_str.length-1])
            {
               comp(store,usr_str);
            }            


            document.getElementById('Sblue').play();
            document.getElementById("blue").style.cssText = "background-color:blue";
            timeouts.push(setTimeout(function(){
            document.getElementById("blue").style.cssText = "background-color:#094a8f";
            },400));
        }
        

    function comp(store,usr_str) {
            if(on===false)
                return;


            console.log("usr_str in comp:"+usr_str);
            console.log("store in comp:"+store);
            if(JSON.stringify(store) === JSON.stringify(usr_str))
            {
                addMove();
            }
            else
            {
                console.log("Wrong Move");
                console.log("usr_str in comp:"+usr_str);
                console.log("store in comp:"+store);                
                wrng=true;
                if(strict_mode === true)
                {
                    strict_mode=false;
                    err();
                    // change-led -back
                    document.getElementById("led").style.cssText="background-color: rgb(34, 34, 34)";
                    timeouts.push(setTimeout(startGame,500));
                }
                else
                {
                    click_sequence(store,wrng);
                }
            }
        }


    function addMove()
        {
            if(on===false)
                return;


            if(store.length === 20)
                return ;
            console.log("In AddMove "+store.length);
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
            document.getElementById("count").innerHTML=count;
            wrng=false;
            click_sequence(store,wrng);
        }


    function click_sequence(store,wrng){
        
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
                return;
            var time = 1000;
            for(var i=0;i<store.length;i++)
            {
                switch(store[i])
                {
                    case 1:
                        timeouts.push(setTimeout(click_red,time));
                        break;
                    case 2:
                        timeouts.push(setTimeout(click_green,time));
                        break;
                    case 3:
                        timeouts.push(setTimeout(click_yellow,time));
                        break;
                    case 4:
                        timeouts.push(setTimeout(click_blue,time));
                        break;
                    default:
                        break;
                }
                time+=1000;
            }
            
             while(usr_str.length > 0) {
                 usr_str.pop();
             }

             console.log("store : "+store);
             console.log("usr_str: "+usr_str);

             timeouts.push(setTimeout(function(){cpu_turn=false;},time-999));
             time+=700;
             timeouts.push(setTimeout(comp,time+1000*store.length,store,usr_str));


        }
        


    function startGame()
    {
        reset();
        
	    document.getElementById("led").style.cssText="background-color: rgb(34, 34, 34)";
        if(on===false)
            return;
       
       while(store.length > 0) {
              store.pop();
        }

        while(usr_str.length > 0) {
              usr_str.pop();
        }

        document.getElementById("count").innerHTML=count;
        document.getElementById("red").addEventListener("click", fn1);
        document.getElementById("green").addEventListener("click", fn2 );
        document.getElementById("yellow").addEventListener("click", fn3);
        document.getElementById("blue").addEventListener("click", fn4);
        document.getElementById("strict").addEventListener("click", fs);


        //----------------------------------------------//
        



        
        
        //--------------------------------------------------------//

        addMove();




    }
    
