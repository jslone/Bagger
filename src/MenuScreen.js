import device;
import ui.ImageView;
import ui.TextView;

var dpi=Math.max(device.width,device.height)/8;

exports = Class(ui.ImageView,function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      x: -Math.max(0,(device.height-device.width)/2),
      y: -Math.max(0,(device.width-device.height)/2),
      width: Math.max(device.width,device.height),
      height: Math.max(device.width,device.height),
      backgroundColor: '#FFDA73',
      image: 'resources/images/backgrounds/menuScreen.png'
    });

    supr(this,'init',[opts])

    var startButton = new ui.TextView({
      superview: this,
      x: device.width / 2 - dpi/2,
      y: device.height / 2 + dpi,
      width: dpi,
      height: dpi/2,
      text: 'Start',
      size:dpi
    });

    var creditButton = new ui.TextView({
      superview: this,
      x: device.width / 2 - dpi/2,
      y: startButton.style.y + dpi,
      width: dpi,
      height: dpi/2,
      text: 'Credits',
      size:dpi
    });

    startButton.on('InputSelect',bind(this,function() {
      this.emit('menuScreen:start');
    }));

    creditButton.on('InputSelect',bind(this,function() {
      this.emit('menuScreen:credits');
    }));

  }
});
