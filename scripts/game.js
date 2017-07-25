
    function  err(){
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
                return;

            if(JSON.stringify(store) === JSON.stringify(usr_str))
            {
                addMove();
            }
            else
            {              
                wrng=true;
                if(strict_mode === true)
                {
                    err();
                    // change-led -back
                    emptyArr();
                    timeouts.push(setTimeout(addMove,500));
                }
                else
                {
                    click_sequence(store,wrng);
                }
            }
        }



//adds random color move in memory and after adding cpu shows the memory in sequence to player
    function addMove(){
            if(count>20)
            {
                alert("WON!!");
                return;
            }
            if(on===false)
                return;


            if(store.length === 20)
                return ;
            
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
        }

//shows the memory in sequence of clicks
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
                    default:
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


        }
        

//empty the memory

    function emptyArr(){
         while(store.length > 0) {
              store.pop();
        }

        while(usr_str.length > 0) {
              usr_str.pop();
        }
    }

//game starts from here ,on start add a random move to sequence array store

    function startGame(){

        reset();

        if(on===false)
            return;
       
        emptyArr();

        if(count<10)
        document.getElementById("count").innerHTML='0'+count;
        else
        document.getElementById("count").innerHTML=count;
        
        set();

        addMove();
    }
    
