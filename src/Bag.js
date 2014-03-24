import device
import ui.View
import ui.ImageView

var dpi=Math.max(device.width,device.height)/8;

exports = Class(ui.View,function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      width:dpi*2,
      height:dpi,
    });

    supr(this,'init',[opts]);

    this._x = -this.style.width;
    this.dx = dpi/256;

    this._img = new ui.ImageView({
      superview:this,
      x:0,
      y:0,
      height:dpi*2,
      width:dpi*2,
      image:'resources/images/bag/bag.png'
    });
  }

  this.tick = function(dt) {
    this._x = (this._x + this.dx * dt) % (device.width + this.style.width);
    this.style.x = this._x - this.style.width
  }

  this.isOverlapping = function(pt) {
    return  this.style.x < pt.x && pt.x < this.style.x + this.style.width &&
            this.style.y < pt.y && pt.y < this.style.y + this.style.height;
  }
});
