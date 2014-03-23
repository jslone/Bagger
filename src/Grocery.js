import device;
import ui.View;

var dpi=Math.max(device.width,device.height)/8;

exports = Class(ui.View,function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      width: dpi,
      height: dpi,
      backgroundColor:'red'
    });

    supr(this,'init',[opts]);

    this._imgView = new ui.View({
      superview: this,
      clip: true,
      x: dpi/4,
      y: dpi/4,
      width: dpi/2,
      height: dpi/2,
      backgroundColor: 'green'
    });

    //tweak these
    this.dx = (this.style.x ? -1 : 1) * (Math.random() * dpi/256 + dpi/256);
    this.dy = 0;
    this.ddx = 0;
    this.ddy = dpi/65536;

    var that = this;
    this.on('InputSelect',function(evt,pt) {
      //tweeeaks needed
      var x = this.style.width/2 - pt.x;
      var y = -(this.style.width-pt.y);
      var len = Math.sqrt(x*x + y*y);
      var scalar = dpi/(64*len);
      var ratio = device.width / device.height;
      that.dx = ratio * scalar * x;
      that.dy = scalar * y;
    });
  }

  this.tick = function(dt) {
    this.style.x += (this.dx * dt);
    this.style.y += (this.dy * dt);
    this.dx += (this.ddx * dt);
    this.dy += (this.ddy * dt);
    if(this.style.y > device.height) {
      this.emit('grocery:fall');
    }
  }
});
