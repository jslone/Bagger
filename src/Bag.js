import device
import ui.View

var dpi=Math.max(device.width,device.height)/8;

exports = Class(ui.View,function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      width:dpi*2,
      height:dpi,
      backgroundColor: '#A68425'
    });

    supr(this,'init',[opts]);

    this.dx = dpi/256;
  }

  this.tick = function(dt) {
    var invSpeedScale = dpi;
    this.style.x = (this.dx * dt + this.style.x) % device.width;
  }

  this.isOverlapping = function(pt) {
    return  this.style.x < pt.x && pt.x < this.style.x + this.style.width &&
            this.style.y < pt.y && pt.y < this.style.y + this.style.height;
  }
});
