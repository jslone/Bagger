import device;
import ui.ImageView;
import ui.TextView;
import src.Sound as Sound;
import src.Grocery as Grocery;
import src.Bag as Bag;

var dpi=Math.max(device.width,device.height)/8;

exports = Class(ui.ImageView,function(supr) {
  this.init = function(opts) {
    //engine logic
    opts = merge(opts, {
      x: -Math.max(0,(device.height-device.width)/2),
      y: -Math.max(0,(device.width-device.height)/2),
      width: Math.max(device.width,device.height),
      height: Math.max(device.width,device.height),
      image: 'resources/images/backgrounds/gameScreen.png'
    });

    supr(this,'init',[opts])

    //game views
    this._scoreboard = new ui.TextView({
      superview: this,
      x: 0,
      y: 0,
      width:dpi,
      height:dpi/2,
      color: '#fff'
    });

    this._Bag = new Bag({
      superview:this,
      x:0,
      y:dpi
    });

    this.on('app:start',bind(this,this.start_game_flow));
  }

  this.updateScoreboard = function () {
    console.log(this._scoreboard);
    this._scoreboard.setText('Score: ' + this._score);
  }

  this.start_game_flow = function () {
    this._gameSpeed = 1.0;
    this._groceriesAvailable = this._groceriesAvailable || [];
    this._groceries = [];
    this._score = 0;
    this._deltaTime = 30;
    this._deltaTimeSpawn = 2000;
    this._gameOn = true;

    this.updateScoreboard();
    this._spawnLoop = setInterval(bind(this,this.spawn),this._deltaTimeSpawn);
  }

  this.spawn = function () {
    var grocery = null;
    if(this._groceriesAvailable.length > 10) { // don't keep all the same groceries
      grocery = this._groceriesAvailable.shift();
      grocery.style.x = Math.random() > 0.5 ? 0 : device.width;
      grocery.style.y = dpi*2;
      grocery.grocery_init();
    }
    else {
      grocery = new Grocery({
        x: Math.random() > 0.5 ? 0 : device.width,
        y: dpi*2
      });
    }
    grocery.on('grocery:fall',bind(this,function() {
      if(this._gameOn) {
        this._gameOn = false;
        clearInterval(this._spawnLoop);
        Sound.getSound().play('drop');
        this.end_game_flow();
        this.emit('gameScreen:end');
      }
    }));
    this.addSubview(grocery);
    this._groceries.push(grocery);
  }

  this.tick = function (dt) {
    if(this._gameOn) {
      for(var i = 0; i < this._groceries.length; i++) {
        var x = this._groceries[i].style.x + this._groceries[i].style.width/2;
        var y = this._groceries[i].style.y + this._groceries[i].style.height/2;
        if(this._Bag.isOverlapping(this._groceries[i].style)) {
          Sound.getSound().play('bag');
          this.removeSubview(this._groceries[i]);
          this._groceriesAvailable.push(this._groceries[i]);
          this._groceries.splice(i,1);
          i--;

          this._score += Math.floor(this._gameSpeed);
          this._gameSpeed *= 1.1;
          this.updateScoreboard();
        }
      }
    }
  }

  this.end_game_flow = function () {
    this._groceriesAvailable = this._groceriesAvailable.concat(this._groceries);
    for(var i = 0; i < this._groceries.length; i++) {
      this.removeSubview(this._groceries[i]);
    }
    this._groceries = [];
  }
});
