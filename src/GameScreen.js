import device;
import ui.View;
import ui.TextView;
import src.Grocery as Grocery;
import src.Bag as Bag;

exports = Class(ui.View,function(supr) {
  this.init = function(opts) {
    //engine logic
    opts = merge(opts, {
      x: 0,
      y: 0,
      backgroundColor: '#FFDA73'
    });

    supr(this,'init',[opts])

    //game logic
    this._scoreboard = new ui.TextView({
      superview: this,
      x: 0,
      y: 0,
      width:200,
      height:100,
      size:30,
      color: '#fff'
    });

    this.on('app:start',bind(this,this.start_game_flow));
  }

  this.updateScoreboard = function () {
    console.log(this._scoreboard);
    this._scoreboard.setText('Score: ' + this._score);
  }

  this.start_game_flow = function () {
    this._gameSpeed = 1.0;
    this._groceries = [];
    this._score = 0;
    this._deltaTime = 30;
    this._deltaTimeSpawn = 4000;
    this._gameOn = true;
    this._Bag = new Bag({
      x:0,
      y:100
    });
    this.addSubview(this._Bag);

    this.updateScoreboard();
    this._spawnLoop = setInterval(bind(this,this.spawn),this._deltaTimeSpawn);
  }

  this.spawn = function () {
    var grocery = new Grocery({
      x: Math.random() > 0.5 ? 0 : device.width,
      y: 300
    });
    grocery.on('grocery:fall',bind(this,function() {
      if(this._gameOn) {
        this._gameOn = false;
        clearInterval(this._gameLoop);
        clearInterval(this._spawnLoop);
        this.emit('gameScreen:end');
      }
    }));
    this.addSubview(grocery);
    this._groceries.push(grocery);
  }

  this.tick = function (dt) {
    for(var i = 0; i < this._groceries.length; i++) {
      var x = this._groceries[i].style.x + this._groceries[i].style.width/2;
      var y = this._groceries[i].style.y + this._groceries[i].style.height/2;
      if(this._Bag.isOverlapping(this._groceries[i].style)) {
        this.removeSubview(this._groceries[i]);
        this._groceries.splice(i,1);
        i--;

        this._score += Math.floor(this._gameSpeed);
        this._gameSpeed *= 1.1;
        this.updateScoreboard();
      }
    }
  }
});
