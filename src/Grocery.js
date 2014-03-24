import device;
import ui.ImageView

var dpi=Math.max(device.width,device.height)/4;

exports = Class(ui.ImageView,function(supr) {
  this.init = function(opts) {
    var images = [
      'resources/images/groceries/milk.png',
      'resources/images/groceries/spuds.png',
      'resources/images/groceries/noods.png',
      'resources/images/groceries/chicken.png'
    ]

    opts = merge(opts, {
      width: dpi,
      height: dpi,
      image: images[Math.floor(Math.random() * images.length)]
    });

    supr(this,'init',[opts]);

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
    this.grocery_init();
  }

  this.grocery_init = function () {
    //tweak these
    this.dx = (this.style.x < 0 ? -1 : 1) * (Math.random() * dpi/256 + dpi/256);
    this.dy = 0;
    this.ddx = 0;
    this.ddy = dpi/65536;
  }

  this.tick = function(dt) {
    dt /= 2;
    this.style.x += (this.dx * dt);
    this.style.y += (this.dy * dt);
    this.dx += (this.ddx * dt);
    this.dy += (this.ddy * dt);
    if(this.style.x < 0) {
      this.style.x = 0;
      this.dx = Math.abs(this.dx);
    }
    if(this.style.x + this.style.width > device.width) {
      this.style.x = device.width - this.style.width;
      this.dx = - Math.abs(this.dx);
    }
    if(this.style.y > device.height) {
      this.emit('grocery:fall');
    }
  }
});
