import device;
import ui.View;

exports = Class(ui.View,function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      width: 256,
      height: 256,
      backgroundColor:'red'
    });

    supr(this,'init',[opts]);

    this._imgView = new ui.View({
      superview: this,
      clip: true,
      x: 64,
      y: 64,
      width: 128,
      height: 128,
      backgroundColor: 'green'
    });

    //tweak these
    this.dx = (this.style.x ? -1 : 1) * (Math.random() * 100 + 100);
    this.dy = 0;
    this.ddx = 0;
    this.ddy = 100;

    var that = this;
    this.on('InputSelect',function(evt,pt) {
      //tweeeaks needed
      var x = this.style.width/2 - pt.x;
      var y = -(this.style.width-pt.y);
      var len = Math.sqrt(x*x + y*y);
      var scalar = 600/len;
      var ratio = device.width / device.height;
      that.dx = ratio * scalar * x;
      that.dy = scalar * y;
    });
  }

  this.tick = function(dt) {
    var x = (this.dx * dt)/1000 + this.style.x;
    var y = (this.dy * dt)/1000 + this.style.y;
    this.style.update({x:x,y:y});
    this.dx += (this.ddx * dt)/1000;
    this.dy += (this.ddy * dt)/1000;
    if(this.style.y > device.height) {
      this.emit('grocery:fall');
    }
  }
});
