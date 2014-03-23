import device
import ui.View

exports = Class(ui.View,function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      width:300,
      height:200,
      backgroundColor: '#A68425'
    });

    supr(this,'init',[opts]);

    this.dx = 200;
  }

  this.tick = function(dt) {
    this.style.x = (this.dx * dt)/500 + this.style.x % device.width;
  }

  this.isOverlapping = function(pt) {
    return  this.style.x < pt.x && pt.x < this.style.x + this.style.width &&
            this.style.y < pt.y && pt.y < this.style.y + this.style.height;
  }
});
