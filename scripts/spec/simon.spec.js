describe("Start Game", function() {
  beforeEach(function() {
    spyOn(window, "reset");
    spyOn(window, "emptyArr");
    spyOn(window, "set");
    spyOn(window, "addMove");
  })
  it("should start game only if on  is true and calls reset", function() {
    expect(startGame()).toBe(0);
    on = true; //game started
    expect(reset).toHaveBeenCalled();
    expect(startGame()).toBe(1);
  })

  it("should call emptyArr,set,addMove function", function() {
    startGame();
    expect(emptyArr).toHaveBeenCalled();
    expect(set).toHaveBeenCalled();
    expect(addMove).toHaveBeenCalled();
  })
})

describe("Empty Arr", function() {

  beforeEach(function() {
    store.push(1);
    usr_str.push(1);
  })
  it("should pop all elements from store, usr_str", function() {
    expect(usr_str.length).toBe(1);
    emptyArr();
    expect(usr_str.length).toBe(0);
    expect(store.length).toBe(0);
  })

})

describe("Reset", function() {
  beforeEach(function() {
    strict_mode = true;
    timeouts = [1, 2];
  })
  it("should reset the color", function() {
    expect(strict_mode).toBe(true);
    reset();
    expect(document.getElementById("led").style.cssText).toContain("background-color: rgb(34, 34, 34)");
    //reseting strict mode
    expect(strict_mode).toBe(false);
  })
})

describe("Addmove", function() {
  beforeEach(function() {
    store = [];
    count = 0;
  })
  it("push random value in store array", function() {
    //intially store length 0
    expect(store.length).toBe(0);
    expect(addMove()).toBe(1);
    expect(document.getElementById("count").innerHTML).toContain("0" + count);
    //a move just added to store
  })

  it("checks possible ,winning condition", function() {
    //winning condition when count>20
    count = 21;
    // if count is greater than 21  ,and alert WON
    expect(addMove()).toBe(0);
    // no move added
    expect(store.length).toBe(0);
  })



  it("store a random value at each call ", function() {
    //below will add 15 moves further
    for (var i = 0; i < 15; i++)
      addMove();
    console.log(store);
    expect(store.length).toBe(15);
    expect(document.getElementById("count").innerHTML).toContain(count);
  })


})

describe("ClickSquence", function() {
  beforeEach(function() {
    store = [1, 2, 3, 4];
    usr_str = [1, 2];
    jasmine.clock().install();
    cpu_turn = false;
    wrng = false;
    count = 1;
  })
  it("should click sequence present in store array in order", function() {
    click_sequence(store, wrng);
    for (var i = 0; i < store.length; i++) {
      switch (store[i]) {
        case 1:
          jasmine.clock().tick(600);
          expect(document.getElementById("red").style.cssText).toContain("background-color: red;");
          jasmine.clock().tick(400);
          expect(document.getElementById("red").style.cssText).toContain("background-color: rgb(159, 15, 23);");
          break;
        case 2:
          jasmine.clock().tick(600);
          expect(document.getElementById("green").style.cssText).toContain("background-color: green;");
          jasmine.clock().tick(400);
          expect(document.getElementById("green").style.cssText).toContain("background-color: rgb(0, 167, 74);");
          break;
        case 3:
          jasmine.clock().tick(600);
          expect(document.getElementById("yellow").style.cssText).toContain("background-color: yellow;");
          jasmine.clock().tick(400);
          expect(document.getElementById("yellow").style.cssText).toContain("background-color: rgb(204, 167, 7);");
          break;
        case 4:
          jasmine.clock().tick(600);
          expect(document.getElementById("blue").style.cssText).toContain("background-color: blue;");
          jasmine.clock().tick(400);
          expect(document.getElementById("blue").style.cssText).toContain("background-color: rgb(9, 74, 143);");
          break;
      }
    }
  })

  it("should turn cpu_turn flag to true while executing ", function() {
    expect(cpu_turn).toBe(false);
    click_sequence(store, wrng);
    expect(cpu_turn).toBe(true);
  })

  it("should alert on error , and execute the sequence", function() {
    wrng = true;
    click_sequence(store, wrng);
    jasmine.clock().tick(100);
    expect(document.getElementById("count").innerHTML).toContain("!!");
    jasmine.clock().tick(700);
    expect(document.getElementById("count").innerHTML).toContain("0" + count);
  })

  it("should return 0 if button is not ON", function() {
    on = false;
    expect(click_sequence(store, wrng)).toBe(0);
  })

  afterEach(function() {
    jasmine.clock().uninstall();
  })
})

describe("Err", function() {
  beforeEach(function() {
    jasmine.clock().install();
  })
  it("Prints !! on display board on error", function() {
    count = 1;
    err();
    jasmine.clock().tick(100);
    expect(document.getElementById("count").innerHTML).toContain("!!");
    jasmine.clock().tick(700);
    expect(document.getElementById("count").innerHTML).toContain("0" + count);
  })

  it("Prints !! on display board on error ,then count after some time", function() {
    count = 10;
    err();
    jasmine.clock().tick(100);
    expect(document.getElementById("count").innerHTML).toContain("!!");
    jasmine.clock().tick(700);
    expect(document.getElementById("count").innerHTML).toContain(count);
  })

  afterEach(function() {
    jasmine.clock().uninstall();
  })
})

describe("Compare", function() {
  beforeAll(function() {
    store = [1, 2, 3, 4];
    usr_str = [1, 2];
    on = false;
    strict_mode = false;
    wrng = false;
    spyOn(window, "addMove");
    spyOn(window, "click_sequence");
    spyOn(window, "err");
    spyOn(window, "emptyArr");
    jasmine.clock().install();
  })
  it("should not equal", function() {
    expect(comp(store, usr_str)).toBe(0);
    on = true;
    expect(comp(store, usr_str)).toBe(1);
    wrng = true;
    expect(click_sequence).toHaveBeenCalledWith(store, wrng);
    //testing strict mode
    strict_mode = true;
    comp(store, usr_str);
    expect(err).toHaveBeenCalled();
    expect(emptyArr).toHaveBeenCalled();
    expect(addMove).not.toHaveBeenCalled();
    //addMove will be called after 500 ms
    jasmine.clock().tick(500);
    expect(addMove).toHaveBeenCalled();
  })
  it("should compare two arrays", function() {
    usr_str = [1, 2, 3, 4];
    //testing if arrays equal 
    comp(store, usr_str);
    if (JSON.stringify(store) === JSON.stringify(usr_str))
      expect(addMove).toHaveBeenCalled();
    //changing usr_str to execute the false part
  })

})

describe("User Click", function() {
  beforeEach(function() {
    set();
    cpu_turn = false;
    usr_str = [];
    store = [1, 2, 3, 4, 5];
  })

  it("should click the division where user clicks", function() {
    var event = new Event("click");
    document.getElementById("red").dispatchEvent(event);
    expect(userClick(event)).toBe(1);
    document.getElementById("green").dispatchEvent(event);
    userClick(event);
    document.getElementById("yellow").dispatchEvent(event);
    userClick(event);
    document.getElementById("blue").dispatchEvent(event);
    userClick(event);
  })
})

describe("On Button", function() {
  beforeEach(function() {
    on = false;
  })
  it("should switch on if off ...", function() {
    expect(on).toBe(false);
    fOn();
    expect(on).toBe(true);
    //again switching it off
    fOn();
    expect(on).toBe(false);
  })
})

describe("Strict Mode Button", function() {
  beforeEach(function() {
    strict_mode = false;
  })
  it("should turn strict mode on if not ...", function() {
    expect(strict_mode).toBe(false);
    fStrict();
    expect(strict_mode).toBe(true);
    //again switching it off
    fStrict();
    expect(strict_mode).toBe(false);
  })
})

describe("Start Button", function() {
  beforeEach(function() {
    on = false;
    spyOn(window, "startGame");
  })
  it("should work if switch is on ...", function() {
    expect(fstart()).toBe(0);
    on = true;
    expect(fstart()).toBe(1);
    expect(startGame).toHaveBeenCalled();
  })
})
